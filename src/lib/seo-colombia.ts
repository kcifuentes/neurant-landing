import type { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    type: string;
    locale: string;
    siteName: string;
    url: string;
    images: {
      url: string;
      width: number;
      height: number;
      alt: string;
    }[];
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images: string[];
  };
  alternates: {
    canonical: string;
    languages: {
      [key: string]: string;
    };
  };
  other: {
    [key: string]: string;
  };
}

const baseUrl = "https://neurant.co";

export const seoConfig: SEOConfig = {
  title: "NeurAnt - Chatbots Inteligentes para Empresas en Colombia | IA Avanzada",
  description: "La plataforma líder de chatbots inteligentes en Colombia. Automatiza tu atención al cliente con IA avanzada. Ideal para empresas, pymes y startups colombianas.",
  keywords: [
    "chatbot para empresas colombia",
    "automatización whatsapp empresas",
    "inteligencia artificial empresas colombia",
    "asistente virtual ia colombia",
    "chatbot whatsapp para pymes colombia",
    "automatización atención cliente bogotá",
    "bot conversacional para negocios",
    "chatbot ventas automáticas empresas",
    "precio chatbot empresa colombia",
    "contratar chatbot empresarial",
    "agente de ia para empresas",
    "empleado digital colombia",
    "automatización para mipymes",
    "chatbot para ecommerce colombia",
    "neurant colombia",
    "chatbot medellín",
    "automatización cali",
    "ia generativa para negocios"
  ],
  openGraph: {
    title: "NeurAnt - Chatbots Inteligentes para Empresas en Colombia",
    description: "Automatiza tu atención al cliente con la plataforma de chatbots más avanzada de Colombia. IA que entiende a tus clientes colombianos.",
    type: "website",
    locale: "es_CO",
    siteName: "NeurAnt Colombia",
    url: baseUrl,
    images: [
      {
        url: `${baseUrl}/images/og-colombia.jpg`,
        width: 1200,
        height: 630,
        alt: "NeurAnt - Chatbots para Empresas Colombianas"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NeurAnt - Chatbots para Empresas Colombia",
    description: "La revolución de la atención al cliente llegó a Colombia. Chatbots inteligentes que hablan como colombianos.",
    images: [`${baseUrl}/images/twitter-colombia.jpg`]
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'es-CO': baseUrl,
      'es': baseUrl,
      'x-default': baseUrl
    }
  },
  other: {
    'geo.region': 'CO',
    'geo.placename': 'Colombia',
    'geo.position': '4.570868;-74.297333',
    'ICBM': '4.570868, -74.297333'
  }
};

export const pageConfigs = {
  home: {
    title: "NeurAnt - Chatbots Inteligentes para Empresas en Colombia | IA Avanzada",
    description: "La plataforma líder de chatbots inteligentes en Colombia. Automatiza tu atención al cliente con IA avanzada para empresas, pymes y startups colombianas.",
    keywords: [
      "chatbot para empresas colombia",
      "automatización whatsapp empresas",
      "inteligencia artificial empresas colombia",
      "asistente virtual ia colombia"
    ]
  },
  empresasCol: {
    title: "Chatbots para Empresas en Colombia - Automatización con IA | NeurAnt",
    description: "Descubre cómo las empresas colombianas están revolucionando su atención al cliente con chatbots inteligentes. Casos de éxito en Bogotá, Medellín y Cali.",
    keywords: [
      "chatbot para empresas colombia",
      "asistente virtual ia colombia",
      "automatización empresas bogotá",
      "chatbot medellín cali"
    ]
  },
  whatsappAuto: {
    title: "Automatización WhatsApp para Empresas Colombia - NeurAnt",
    description: "Automatiza WhatsApp Business con IA avanzada. Ideal para empresas colombianas que buscan mejorar ventas y atención 24/7.",
    keywords: [
      "automatización whatsapp empresas",
      "bot conversacional para negocios",
      "whatsapp business colombia",
      "chatbot ventas automáticas"
    ]
  },
  pymesCol: {
    title: "Chatbots para Pymes Colombia - Soluciones Empresariales | NeurAnt",
    description: "Soluciones de chatbots diseñadas específicamente para pymes y mipymes colombianas. Precios accesibles y soporte local.",
    keywords: [
      "chatbot whatsapp para pymes colombia",
      "automatización para mipymes",
      "precio chatbot empresa colombia",
      "chatbot pymes bogotá"
    ]
  }
};

export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NeurAnt",
    "description": "Plataforma de chatbots inteligentes para empresas colombianas",
    "url": baseUrl,
    "logo": `${baseUrl}/images/logo.png`,
    "foundingDate": "2024",
    "founders": [
      {
        "@type": "Person",
        "name": "Equipo NeurAnt"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Colombia",
      "addressRegion": "CO"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+57-1-000-0000",
      "contactType": "customer service",
      "availableLanguage": "Spanish"
    },
    "sameAs": [
      "https://linkedin.com/company/neurant",
      "https://twitter.com/neurant_co"
    ]
  },
  softwareApplication: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "NeurAnt Chatbot Platform",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "Plataforma de chatbots inteligentes con IA avanzada para empresas colombianas",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "COP",
      "description": "Prueba gratuita disponible"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    }
  },
  faqPage: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es un chatbot para empresas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Un chatbot empresarial es un asistente virtual con inteligencia artificial que automatiza la atención al cliente 24/7, mejora las ventas y optimiza procesos comerciales para empresas colombianas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto cuesta un chatbot para mi empresa en Colombia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Los precios varían según las necesidades. Ofrecemos planes desde $99.000 COP mensuales para pymes hasta soluciones empresariales personalizadas. Incluye prueba gratuita de 14 días."
        }
      },
      {
        "@type": "Question",
        "name": "¿El chatbot funciona con WhatsApp Business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, NeurAnt se integra perfectamente con WhatsApp Business API, permitiendo automatización completa de conversaciones, ventas y soporte técnico."
        }
      }
    ]
  }
};

export function generateMetadata(page: keyof typeof pageConfigs): Metadata {
  const config = pageConfigs[page];
  
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: "NeurAnt Team" }],
    creator: "NeurAnt",
    publisher: "NeurAnt",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      ...seoConfig.openGraph,
      title: config.title,
      description: config.description,
    },
    twitter: {
      ...seoConfig.twitter,
      title: config.title,
      description: config.description,
    },
    alternates: seoConfig.alternates,
    other: seoConfig.other,
  };
}