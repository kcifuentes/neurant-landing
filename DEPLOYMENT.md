# 🚀 Deployment Guide - Vercel Native Integration

## Vercel Automatic Deployment Setup

Vercel provides native GitHub integration that automatically deploys your project without needing GitHub Actions.

### 1. Connect Repository to Vercel

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import from GitHub:**
   - Select `kcifuentes/neurant-landing` repository
   - Click "Import"

### 2. Configure Project Settings

**Framework Preset:** Next.js
**Root Directory:** `./` (default)
**Build Command:** `npm run build` (auto-detected)
**Output Directory:** `.next` (auto-detected)
**Install Command:** `npm ci` (auto-detected)

### 3. Environment Variables

Configure these in Vercel Dashboard → Project Settings → Environment Variables:

#### ⚠️ Public Variables (NEXT_PUBLIC_*)
**Estas variables son visibles en el navegador - NO incluir secrets:**

```env
# Production URLs
NEXT_PUBLIC_FRONTEND_URL=https://neurant.innovarting.com
NEXT_PUBLIC_API_URL=https://neurant.innovarting.com/api

# Supabase (usar ANON key, no service key)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional
NEXT_PUBLIC_CONTACT_EMAIL=contact@neurant.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### 🔒 Private Variables (Server-side only)
**Estas variables son seguras - NO visibles en el navegador:**

```env
# API Keys sensibles
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (si necesario)
```

#### 📋 Variable Types Explanation:
- **NEXT_PUBLIC_APP_URL**: ✅ Público - URL base de la aplicación (para SEO, canonical URLs, redirects)
- **NEXT_PUBLIC_API_URL**: ✅ Público - URL para llamadas API (mismo dominio + /api)
- **NEXT_PUBLIC_FRONTEND_URL**: ✅ Público - URL del frontend (alternativa a APP_URL)
- **NEXT_PUBLIC_SUPABASE_URL**: ✅ Público - URL del proyecto Supabase
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: ✅ Público - Clave anónima (tiene RLS protections)
- **NEXT_PUBLIC_CONTACT_EMAIL**: ✅ Público - Email de contacto mostrado en UI
- **RESEND_API_KEY**: ❌ PRIVADO - API key sensible para envío de emails

### 4. Deployment Behavior

**Automatic Deployments:**
- ✅ **Production:** Every push to `main` branch
- 🔍 **Preview:** Every push to feature branches and Pull Requests
- 🎯 **Domain:** `neurant-landing.vercel.app`

### 5. Custom Domain (Optional)

1. **Go to Project Settings → Domains**
2. **Add your custom domain**
3. **Configure DNS records as shown**
4. **SSL certificate is automatic**

## Benefits of Vercel Native Integration

- ✅ **Zero Configuration:** Works out of the box
- ⚡ **Faster Deployments:** Optimized build process
- 🔍 **Preview Deployments:** Automatic for all branches and PRs
- 📊 **Analytics:** Built-in performance monitoring
- 🌍 **Global CDN:** Automatic edge optimization
- 🔒 **HTTPS:** SSL certificates automatically managed
- 📈 **Serverless Functions:** Ready for API routes

## Troubleshooting

### Common Issues:
1. **Build Fails:** Check that all dependencies are in `package.json`
2. **Environment Variables:** Make sure they're set in Vercel dashboard
3. **Domain Issues:** Verify DNS configuration
4. **404 Errors:** Check that routes are properly configured

### Vercel CLI (Optional)
```bash
# Install Vercel CLI
npm i -g vercel

# Link project locally
vercel link

# Deploy from CLI (optional)
vercel --prod
```

---

**Note:** This setup provides automatic deployments, preview environments, and global CDN distribution without requiring any CI/CD configuration files.