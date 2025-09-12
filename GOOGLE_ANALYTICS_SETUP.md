# Google Analytics Setup - NeurAnt Landing Page

## 🎯 Configuración Google Analytics 4 (GA4)

### 1. Crear Propiedad GA4

1. Ir a [Google Analytics](https://analytics.google.com/)
2. Crear nueva propiedad GA4 para "NeurAnt Landing Page"
3. Configurar para mercado colombiano:
   - País: Colombia
   - Moneda: COP (Peso Colombiano)
   - Zona horaria: America/Bogota

### 2. Obtener Measurement ID

1. En GA4 → Admin → Data Streams
2. Crear nuevo stream para web
3. Configurar URL: https://neurant.co (production) o localhost:3002 (development)
4. Copiar el **Measurement ID** (formato: G-XXXXXXXXXX)

### 3. Configurar Environment Variable

Editar `apps/landing/.env.local`:

```env
# Google Analytics Configuration
NEXT_PUBLIC_GA_ID=G-TU_MEASUREMENT_ID_AQUI
```

**⚠️ Importante**: Reemplazar `G-XXXXXXXXXX` con tu Measurement ID real.

### 4. Configurar Eventos Personalizados en GA4

#### 4.1 Eventos Automáticos Implementados

✅ **Page Views**: Tracking automático de páginas visitadas
✅ **Scroll Depth**: 25%, 50%, 75%, 90%, 100%
✅ **Section Views**: hero, features, integrations, use-cases, momentum, waitlist
✅ **Form Events**: step_completed, form_submitted, form_errors
✅ **CTA Clicks**: hero_join_waitlist, momentum_secure_spot, etc.
✅ **Session Data**: device info, referrer, UTM parameters

#### 4.2 Crear Conversiones en GA4

1. GA4 → Configure → Conversions
2. Agregar estos eventos como conversiones:

- `form_submitted` - Registro completado en waitlist
- `form_step_completed` - Paso de formulario completado
- `hero_join_waitlist` - Click en CTA principal
- `lead_qualification` - Lead calificado automáticamente

#### 4.3 Configurar Audiencias Personalizadas

1. **High-Value Leads**:
   - Condición: `lead_score` ≥ 80
   - Usuarios con mayor probabilidad de conversión

2. **Colombian Market**:
   - Condición: `country` = "Colombia"
   - Mercado objetivo principal

3. **Large Companies**:
   - Condición: `company_size` = "large"
   - Segmento premium

### 5. Métricas Clave a Monitorear

#### 5.1 Conversión del Funnel
- **Landing Page Views** → **Waitlist Section Views** → **Form Start** → **Form Completion**
- **Tasa de Conversión**: form_submitted / page_views
- **Abandono por Paso**: Dónde los usuarios abandonan el formulario

#### 5.2 Engagement y Comportamiento
- **Tiempo en página**: Especialmente en secciones clave
- **Scroll Depth**: Qué tan profundo navegan los usuarios
- **Device Mix**: Mobile vs Desktop performance
- **Traffic Sources**: UTM campaigns, organic, direct

#### 5.3 Lead Quality
- **Lead Score Distribution**: Calidad de leads generados
- **Industry Breakdown**: Qué sectores están más interesados
- **Company Size**: SME vs Enterprise interest

### 6. Configurar Dashboards Recomendados

#### 6.1 Dashboard Principal - Conversión
- Total waitlist registrations (this week vs last week)
- Conversion rate by traffic source
- Form completion rate by step
- Top performing CTAs

#### 6.2 Dashboard Audience Insights
- User demographics and interests
- Device and browser breakdown
- Geographic distribution (focus on Colombia)
- Returning vs new visitors

#### 6.3 Dashboard Content Performance
- Most viewed sections
- Scroll depth by page
- Time spent on each section
- Bounce rate by landing page

### 7. Eventos Tracking Implementados

```javascript
// Form Events
trackWaitlistStep('basic_info', 1)
trackWaitlistSubmission({...formData})
trackLeadQualification({...leadData})

// CTA Events
trackCTAClick('hero_join_waitlist', 'hero_section')
trackCTAClick('momentum_secure_spot', 'momentum_section')

// Engagement Events
trackPageScroll(75) // User scrolled 75%
trackSectionView('features') // User viewed features section
```

### 8. Privacy y Compliance

✅ **GDPR Compliant**: 
- `anonymize_ip: true`
- `allow_google_signals: false`
- `allow_ad_personalization_signals: false`

✅ **Performance Optimized**:
- Lazy loading de scripts
- Transport type: beacon
- Throttled scroll events

✅ **Cookie Settings**:
- SameSite=Strict
- Secure flags
- 30 days expiration

### 9. Testing y Validación

#### 9.1 Development Testing
1. Usar GA4 DebugView con Chrome extension "GA Debugger"
2. Verificar eventos en Real-time reports
3. Comprobar que el Measurement ID esté configurado

#### 9.2 Production Validation
1. Verificar todos los eventos críticos funcionan
2. Comprobar conversion tracking
3. Validar datos de lead scoring

### 10. Optimización Continua

#### 10.1 A/B Testing Setup
- Usar GA4 + Google Optimize para test de CTAs
- Test de copy en formularios
- Test de ubicación de elementos

#### 10.2 Weekly Reviews
- Revisar métricas de conversión
- Identificar patrones de abandono
- Optimizar funnel basado en datos

---

## 🔧 Comandos de Testing

```bash
# Development con GA4 habilitado
cd apps/landing
npm run dev

# Verificar logs de GA4
# Abrir DevTools → Console → Buscar "Google Analytics"

# Build y test
npm run build
npm run start
```

## 📊 URLs Útiles

- **GA4 Dashboard**: https://analytics.google.com/
- **Real-time Reports**: GA4 → Reports → Real-time
- **DebugView**: GA4 → Configure → DebugView
- **Conversions Setup**: GA4 → Configure → Conversions

## 🚀 Ready for Production

Una vez configurado correctamente el Measurement ID, el landing page estará enviando datos detallados a Google Analytics, permitiendo:

- **Optimización de conversión** basada en datos reales
- **Segmentación de audiencias** para campañas dirigidas  
- **Análisis de funnel** para identificar fricciones
- **ROI tracking** de campañas de marketing digital

La implementación es **enterprise-grade** con privacy compliance y performance optimizada para el mercado colombiano.