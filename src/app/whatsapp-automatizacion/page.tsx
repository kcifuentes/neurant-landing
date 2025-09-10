import { Metadata } from "next";
import { generateMetadata } from "@/lib/seo-colombia";
import Link from "next/link";

export const metadata: Metadata = generateMetadata('whatsappAuto');

const caracteristicas = [
  {
    titulo: "Respuestas Automáticas 24/7",
    descripcion: "Tu chatbot responde instantáneamente a clientes, sin importar la hora",
    icono: "⏰"
  },
  {
    titulo: "Integración WhatsApp Business API",
    descripcion: "Conexión directa y oficial con la plataforma más usada en Colombia",
    icono: "📱"
  },
  {
    titulo: "IA que Entiende Colombiano",
    descripcion: "Entrenada con expresiones, modismos y cultura colombiana",
    icono: "🇨🇴"
  },
  {
    titulo: "Automatización de Ventas",
    descripcion: "Convierte conversaciones en ventas automáticamente",
    icono: "💰"
  },
  {
    titulo: "Analytics en Tiempo Real",
    descripcion: "Monitorea conversiones, engagement y métricas clave",
    icono: "📊"
  },
  {
    titulo: "Escalado Ilimitado", 
    descripcion: "Atiende miles de clientes simultáneamente sin límites",
    icono: "🚀"
  }
];

const casosUso = [
  {
    sector: "E-commerce",
    descripcion: "Automatiza consultas de productos, procesa pedidos y da seguimiento a envíos",
    resultados: ["+ 400% conversiones", "- 70% tiempo respuesta", "+ 300% satisfacción cliente"]
  },
  {
    sector: "Servicios Financieros",
    descripcion: "Atiende consultas bancarias, procesa solicitudes de crédito y brinda soporte",
    resultados: ["+ 250% leads calificados", "- 60% costos operativos", "+ 200% retención"]
  },
  {
    sector: "Salud y Bienestar",
    descripcion: "Agenda citas, recuerda tratamientos y brinda información médica básica",
    resultados: ["+ 180% citas agendadas", "- 50% no-shows", "+ 150% eficiencia"]
  }
];

const procesoImplementacion = [
  {
    paso: "1",
    titulo: "Análisis Inicial",
    descripcion: "Evaluamos tus necesidades y procesos actuales de WhatsApp"
  },
  {
    paso: "2", 
    titulo: "Configuración Personalizada",
    descripcion: "Creamos tu chatbot con IA entrenada para tu industria"
  },
  {
    paso: "3",
    titulo: "Integración WhatsApp",
    descripcion: "Conectamos con tu cuenta de WhatsApp Business existente"
  },
  {
    paso: "4",
    titulo: "Entrenamiento y Pruebas",
    descripcion: "Optimizamos respuestas y testemos funcionamiento completo"
  },
  {
    paso: "5",
    titulo: "Lanzamiento y Soporte",
    descripcion: "Activamos tu bot y brindamos soporte continuo"
  }
];

export default function WhatsAppAutomatizacionPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-green-600">Automatización WhatsApp</span> para Empresas
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Revoluciona tu WhatsApp Business con IA avanzada. Automatiza ventas, soporte y 
              engagement 24/7 mientras tus clientes obtienen respuestas instantáneas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#waitlist" 
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Probar Automatización Gratis
              </Link>
              <Link 
                href="/empresas-colombia" 
                className="border border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors"
              >
                Ver Casos Empresariales
              </Link>
            </div>
          </header>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Características de Automatización Avanzada
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {caracteristicas.map((caracteristica, index) => (
                <div key={index} className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{caracteristica.icono}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {caracteristica.titulo}
                  </h3>
                  <p className="text-gray-600">{caracteristica.descripcion}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Casos de Uso por Industria en Colombia
            </h2>
            <div className="space-y-8">
              {casosUso.map((caso, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-lg">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {caso.sector}
                  </h3>
                  <p className="text-gray-600 mb-6">{caso.descripcion}</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {caso.resultados.map((resultado, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-lg text-center">
                        <p className="text-lg font-bold text-green-600">{resultado}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Proceso de Implementación
            </h2>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
              <div className="space-y-8">
                {procesoImplementacion.map((proceso, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold relative z-10">
                      {proceso.paso}
                    </div>
                    <div className="ml-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {proceso.titulo}
                      </h3>
                      <p className="text-gray-600">{proceso.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-16 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              ¿Por Qué Elegir NeurAnt para WhatsApp?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  🏆 Especialistas en WhatsApp Business
                </h3>
                <p className="text-gray-600">
                  Somos expertos certificados en WhatsApp Business API con años de experiencia 
                  implementando soluciones para empresas colombianas de todos los tamaños.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  🤖 IA Entrenada para Colombia
                </h3>
                <p className="text-gray-600">
                  Nuestros chatbots entienden el contexto cultural colombiano, modismos regionales 
                  y preferencias de comunicación de tus clientes locales.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  📈 ROI Comprobado
                </h3>
                <p className="text-gray-600">
                  Nuestros clientes ven resultados desde el primer mes: más conversiones, 
                  menos costos operativos y clientes más satisfechos.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  🔒 Seguridad y Compliance
                </h3>
                <p className="text-gray-600">
                  Cumplimos con todas las normativas colombianas de protección de datos y 
                  estándares internacionales de seguridad.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center bg-green-600 text-white p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">
              Comienza a Automatizar WhatsApp Hoy
            </h2>
            <p className="text-xl mb-6">
              Únete a las +200 empresas colombianas que ya automatizan WhatsApp con NeurAnt
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#waitlist" 
                className="bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Solicitar Demo Personalizada
              </Link>
              <Link 
                href="/pymes-colombia" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Ver Precios Especiales Pymes
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}