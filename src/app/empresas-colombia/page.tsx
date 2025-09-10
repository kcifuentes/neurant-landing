import { Metadata } from "next";
import { generateMetadata, structuredData } from "@/lib/seo-colombia";
import Link from "next/link";

export const metadata: Metadata = generateMetadata('empresasCol');

const casosExito = [
  {
    empresa: "TechCorp Bogotá",
    sector: "Tecnología",
    resultado: "+300% conversiones",
    descripcion: "Automatización completa de ventas con WhatsApp Business"
  },
  {
    empresa: "RetailPlus Medellín", 
    sector: "Retail",
    resultado: "-60% costos operativos",
    descripcion: "Atención al cliente 24/7 con IA conversacional"
  },
  {
    empresa: "FinanceGroup Cali",
    sector: "Financiero", 
    resultado: "+250% leads calificados",
    descripcion: "Chatbot especializado en productos financieros"
  }
];

const beneficiosEmpresas = [
  "Atención al cliente 24/7 en español colombiano",
  "Automatización de ventas y generación de leads",
  "Integración con plataformas colombianas (Nequi, Daviplata)",
  "Soporte técnico local y capacitación en español",
  "Cumplimiento con normativas de datos colombianas",
  "Escalabilidad para empresas en crecimiento"
];

export default function EmpresasColombiaPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.faqPage)
        }}
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Chatbots para <span className="text-blue-600">Empresas en Colombia</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Descubre cómo las empresas colombianas están revolucionando su atención al cliente 
              con chatbots inteligentes que hablan como colombianos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#waitlist" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Solicitar Demo Gratis
              </Link>
              <Link 
                href="/whatsapp-automatizacion" 
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Ver Automatización WhatsApp
              </Link>
            </div>
          </header>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Casos de Éxito en Colombia
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {casosExito.map((caso, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {caso.empresa}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">{caso.sector}</p>
                  <p className="text-2xl font-bold text-green-600 mb-3">
                    {caso.resultado}
                  </p>
                  <p className="text-gray-600">{caso.descripcion}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              ¿Por Qué las Empresas Colombianas Eligen NeurAnt?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Inteligencia Artificial Avanzada
                </h3>
                <p className="text-gray-600 mb-6">
                  Nuestros chatbots utilizan IA de última generación entrenada específicamente 
                  para entender el contexto y modismos colombianos, proporcionando respuestas 
                  más naturales y efectivas.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Integración Total con WhatsApp
                </h3>
                <p className="text-gray-600 mb-6">
                  WhatsApp es la plataforma preferida en Colombia. Nuestros chatbots se integran 
                  perfectamente con WhatsApp Business para automatizar ventas y soporte.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Beneficios para Tu Empresa Colombiana
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {beneficiosEmpresas.map((beneficio, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">{beneficio}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Preguntas Frecuentes sobre Chatbots Empresariales
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  ¿Qué es un chatbot para empresas?
                </h3>
                <p className="text-gray-600">
                  Un chatbot empresarial es un asistente virtual con inteligencia artificial que 
                  automatiza la atención al cliente 24/7, mejora las ventas y optimiza procesos 
                  comerciales para empresas colombianas.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  ¿Cuánto cuesta un chatbot para mi empresa en Colombia?
                </h3>
                <p className="text-gray-600">
                  Los precios varían según las necesidades. Ofrecemos planes desde $99.000 COP 
                  mensuales para pymes hasta soluciones empresariales personalizadas. 
                  Incluye prueba gratuita de 14 días.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  ¿El chatbot funciona con WhatsApp Business?
                </h3>
                <p className="text-gray-600">
                  Sí, NeurAnt se integra perfectamente con WhatsApp Business API, permitiendo 
                  automatización completa de conversaciones, ventas y soporte técnico.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-blue-50 p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Listo para Revolucionar tu Empresa?
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Únete a las empresas colombianas que ya están automatizando su éxito con NeurAnt
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#waitlist" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Comenzar Prueba Gratuita
              </Link>
              <Link 
                href="/pymes-colombia" 
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Ver Planes para Pymes
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}