import { Metadata } from "next";
import { generateMetadata } from "@/lib/seo-colombia";
import Link from "next/link";

export const metadata: Metadata = generateMetadata('pymesCol');

const planes = [
  {
    nombre: "Pyme Starter",
    precio: "$99.000",
    periodo: "COP/mes",
    descripcion: "Perfecto para pequeñas empresas que inician",
    caracteristicas: [
      "Hasta 1,000 conversaciones/mes",
      "WhatsApp Business integrado",
      "IA básica en español",
      "Soporte por email",
      "Dashboard básico",
      "Integración con 1 plataforma"
    ],
    popular: false
  },
  {
    nombre: "Pyme Pro",
    precio: "$199.000",
    periodo: "COP/mes", 
    descripcion: "Ideal para pymes en crecimiento",
    caracteristicas: [
      "Hasta 5,000 conversaciones/mes",
      "IA avanzada colombiana",
      "Múltiples canales (WhatsApp, Web, FB)",
      "Soporte prioritario",
      "Analytics avanzado",
      "Integraciones ilimitadas",
      "Personalización de marca"
    ],
    popular: true
  },
  {
    nombre: "Enterprise",
    precio: "Personalizado",
    periodo: "",
    descripcion: "Solución completa para grandes empresas",
    caracteristicas: [
      "Conversaciones ilimitadas", 
      "IA personalizada para tu sector",
      "Todos los canales disponibles",
      "Soporte 24/7 dedicado",
      "Onboarding personalizado",
      "Integración con CRM/ERP",
      "SLA garantizado"
    ],
    popular: false
  }
];

const beneficiosPymes = [
  {
    icono: "💰",
    titulo: "Ahorro de Costos",
    descripcion: "Reduce hasta 60% los costos de atención al cliente automatizando respuestas frecuentes"
  },
  {
    icono: "⚡", 
    titulo: "Respuesta Instantánea",
    descripcion: "Atiende a tus clientes 24/7 sin contratar personal adicional"
  },
  {
    icono: "📈",
    titulo: "Más Ventas",
    descripcion: "Convierte más conversaciones en ventas con seguimiento automatizado"
  },
  {
    icono: "🎯",
    titulo: "Lead Qualification",
    descripcion: "Califica automáticamente leads y deriva los mejores a tu equipo de ventas"
  },
  {
    icono: "📱",
    titulo: "WhatsApp Nativo",
    descripcion: "Aprovecha el canal preferido por colombianos para hacer negocios"
  },
  {
    icono: "🤖",
    titulo: "IA Colombiana",
    descripcion: "Chatbot que entiende modismos, cultura y forma de hablar colombiana"
  }
];

const testimoniosPymes = [
  {
    empresa: "Tienda Online Medellín",
    sector: "E-commerce",
    testimonio: "En 3 meses aumentamos las ventas 250% automatizando WhatsApp. Nuestros clientes aman la atención inmediata.",
    nombre: "Carlos Mejía", 
    cargo: "Fundador"
  },
  {
    empresa: "Consultoría Bogotá",
    sector: "Servicios Profesionales", 
    testimonio: "NeurAnt nos ayudó a calificar leads automáticamente. Ahora solo atendemos clientes realmente interesados.",
    nombre: "Ana Rodríguez",
    cargo: "Directora Comercial"
  },
  {
    empresa: "Restaurante Cali",
    sector: "Gastronomía",
    testimonio: "Automatizamos reservas y pedidos por WhatsApp. Los clientes pueden ordenar sin esperas y somos más eficientes.",
    nombre: "Miguel Torres",
    cargo: "Propietario"
  }
];

export default function PymesColombiaPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Chatbots para <span className="text-blue-600">Pymes Colombia</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Soluciones de automatización diseñadas específicamente para pequeñas y medianas 
              empresas colombianas. Precios accesibles, soporte local y resultados comprobados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#waitlist" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Comenzar Prueba Gratis 14 días
              </Link>
              <Link 
                href="/whatsapp-automatizacion" 
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Ver Demo de WhatsApp
              </Link>
            </div>
          </header>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Beneficios para Tu Pyme Colombiana
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {beneficiosPymes.map((beneficio, index) => (
                <div key={index} className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{beneficio.icono}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {beneficio.titulo}
                  </h3>
                  <p className="text-gray-600">{beneficio.descripcion}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Planes Especiales para Pymes
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {planes.map((plan, index) => (
                <div key={index} className={`relative p-8 border-2 rounded-lg ${plan.popular ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Más Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.nombre}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-blue-600">{plan.precio}</span>
                      {plan.periodo && <span className="text-gray-600 ml-2">{plan.periodo}</span>}
                    </div>
                    <p className="text-gray-600">{plan.descripcion}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.caracteristicas.map((caracteristica, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{caracteristica}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    href="/#waitlist"
                    className={`block w-full text-center py-3 rounded-lg transition-colors ${
                      plan.popular 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {plan.precio === "Personalizado" ? "Contactar" : "Comenzar Prueba"}
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Lo Que Dicen Nuestras Pymes Colombianas
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimoniosPymes.map((testimonio, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">{testimonio.empresa}</h4>
                    <p className="text-blue-600">{testimonio.sector}</p>
                  </div>
                  <p className="text-gray-600 mb-4 italic">&ldquo;{testimonio.testimonio}&rdquo;</p>
                  <div className="border-t pt-4">
                    <p className="font-medium text-gray-900">{testimonio.nombre}</p>
                    <p className="text-sm text-gray-600">{testimonio.cargo}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              ¿Por Qué las Pymes Eligen NeurAnt?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  💼 Entendemos a las Pymes
                </h3>
                <p className="text-gray-600">
                  Conocemos los desafíos únicos de las pequeñas empresas colombianas: recursos 
                  limitados, necesidad de ROI rápido y atención personalizada.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  🚀 Implementación Rápida
                </h3>
                <p className="text-gray-600">
                  Tu chatbot está listo en menos de 48 horas. Sin instalaciones complejas, 
                  sin integraciones técnicas complicadas.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  🎓 Capacitación Incluida
                </h3>
                <p className="text-gray-600">
                  Entrenamos a tu equipo para sacar el máximo provecho del chatbot. 
                  Sesiones en español con ejemplos de tu industria.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  🔧 Soporte Local
                </h3>
                <p className="text-gray-600">
                  Soporte técnico en español, durante horario comercial colombiano. 
                  Entendemos tu negocio y tu mercado local.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center bg-blue-600 text-white p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para Automatizar tu Pyme?
            </h2>
            <p className="text-xl mb-6">
              Únete a las +500 pymes colombianas que ya aumentaron ventas con NeurAnt
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#waitlist" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Comenzar Prueba Gratis
              </Link>
              <Link 
                href="/empresas-colombia" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ver Casos de Éxito
              </Link>
            </div>
            <p className="text-sm mt-4 opacity-90">
              Sin compromiso • Configuración gratuita • Soporte en español
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}