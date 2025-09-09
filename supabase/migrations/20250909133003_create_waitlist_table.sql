-- Create waitlist system for NeurAnt Landing Page
-- This migration creates the tables and indexes needed for the waitlist registration system

-- Tabla de industrias (sincronizada con PostgreSQL business_sector)
CREATE TABLE industries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Poblar con datos de PostgreSQL business_sector (sin acentos para compatibilidad)
INSERT INTO industries (id, name, slug, description, is_active, sort_order) VALUES
('46b69971-0e17-4720-aa27-adb532d96b8c', 'Tecnologia', 'tecnologia', 'Desarrollo de software, IT, telecomunicaciones, hardware', true, 1),
('9fc6aaac-daf1-4128-a763-eae7ffbfcac9', 'Salud', 'salud', 'Servicios medicos, farmaceutica, dispositivos medicos', true, 2),
('c094e6ea-0bf3-4bb0-875c-1efbc09df42f', 'Educacion', 'educacion', 'Instituciones educativas, e-learning, capacitacion', true, 3),
('dbe6d778-ffc2-4c7b-95ce-bfdbd1c17159', 'Retail y E-commerce', 'retail-ecommerce', 'Venta al por menor, comercio electronico, marketplace', true, 4),
('ed7fe2c2-f7a8-4095-8960-a7f07f9735ce', 'Servicios Financieros', 'finanzas', 'Bancos, seguros, fintech, inversiones', true, 5),
('a6e4d23d-f4a0-46c2-aa6e-da14a5e8be0d', 'Servicios Profesionales', 'servicios-profesionales', 'Consultoria, legal, contabilidad, marketing', true, 6),
('1a070c4d-a91b-4226-a4f6-6321ab614c90', 'Manufactura', 'manufactura', 'Produccion industrial, automotriz, textil', true, 7),
('1af16a76-a6ce-4f23-8556-5268e3f8ab0a', 'Inmobiliario', 'inmobiliario', 'Bienes raices, construccion, desarrollo', true, 8),
('a791c0b5-127e-4ed9-b0b6-3a9b81e7e6bb', 'Turismo y Hospitalidad', 'turismo-hospitalidad', 'Hoteles, restaurantes, agencias de viaje, entretenimiento', true, 9),
('e3734fc3-28bc-45d3-b46b-ab9263107187', 'Agricultura y Alimentacion', 'agricultura-alimentacion', 'Agricultura, ganaderia, procesamiento de alimentos', true, 10),
('199e2b80-930f-4741-b2a3-b6a3ecee4bf3', 'Logistica y Transporte', 'logistica-transporte', 'Envios, distribucion, transporte publico', true, 11),
('7a01cd25-217f-455d-b64d-5e68f0429a5e', 'Energia', 'energia', 'Petroleo, gas, energias renovables, servicios publicos', true, 12),
('dc6268b6-94df-477f-8f09-1c05b5d3a150', 'Gobierno y ONG', 'gobierno-ong', 'Entidades gubernamentales, organizaciones sin fines de lucro', true, 13),
('f74804d8-51c0-4826-8218-de4ad816c875', 'Medios y Comunicacion', 'medios-comunicacion', 'Prensa, television, radio, redes sociales, publicidad', true, 14),
('1a3014a4-21f5-4544-928d-db329e8e6ee1', 'Otro', 'otro', 'Otros sectores no listados', true, 99);

-- Tabla de registros waitlist
CREATE TABLE waitlist_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  country VARCHAR(2) NOT NULL, -- ISO country code
  company_name VARCHAR(100) NOT NULL,
  industry_id UUID NOT NULL REFERENCES industries(id),
  company_size VARCHAR(20) NOT NULL,
  chatbot_type VARCHAR(50) NOT NULL,
  expected_volume VARCHAR(20) NOT NULL,
  phone VARCHAR(20),
  website VARCHAR(255),
  comments TEXT CHECK (char_length(comments) <= 500),
  referral_source VARCHAR(100),
  ip_address INET,
  user_agent TEXT,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices para optimizacion de consultas
CREATE INDEX idx_industries_slug ON industries(slug);
CREATE INDEX idx_industries_active ON industries(is_active) WHERE is_active = true;
CREATE INDEX idx_waitlist_email ON waitlist_registrations(email);
CREATE INDEX idx_waitlist_country ON waitlist_registrations(country);
CREATE INDEX idx_waitlist_industry ON waitlist_registrations(industry_id);
CREATE INDEX idx_waitlist_created_at ON waitlist_registrations(created_at DESC);

-- Constraints y validaciones
ALTER TABLE waitlist_registrations 
ADD CONSTRAINT check_email_format 
CHECK (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$');

ALTER TABLE waitlist_registrations 
ADD CONSTRAINT check_company_size 
CHECK (company_size IN ('1-10', '11-50', '51-200', '201-1000', '1000+'));

ALTER TABLE waitlist_registrations 
ADD CONSTRAINT check_expected_volume 
CHECK (expected_volume IN ('bajo', 'medio', 'alto', 'muy-alto'));

ALTER TABLE waitlist_registrations 
ADD CONSTRAINT check_chatbot_type 
CHECK (chatbot_type IN ('ventas', 'soporte', 'informativo', 'mixto'));

-- Function para actualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para updated_at en industries
CREATE TRIGGER update_industries_updated_at 
    BEFORE UPDATE ON industries 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para updated_at en waitlist_registrations
CREATE TRIGGER update_waitlist_registrations_updated_at 
    BEFORE UPDATE ON waitlist_registrations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) - Solo lectura publica, escritura controlada
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist_registrations ENABLE ROW LEVEL SECURITY;

-- Politica para industries: lectura publica de industrias activas
CREATE POLICY "Industries public read" ON industries
    FOR SELECT USING (is_active = true);

-- Politica para waitlist_registrations: solo insercion publica, sin lectura
CREATE POLICY "Waitlist public insert" ON waitlist_registrations
    FOR INSERT WITH CHECK (true);