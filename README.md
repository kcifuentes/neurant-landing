# NeurAnt Landing Page 🤖

Modern, responsive landing page for NeurAnt chatbot platform built with Next.js 15 and React 19.

![NeurAnt Landing](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🚀 Features

- ⚡ **Next.js 15** with App Router
- 🎨 **Modern Design** with Tailwind CSS v4
- 📱 **Fully Responsive** mobile-first approach
- 🎭 **Smooth Animations** with Framer Motion
- 📋 **Smart Forms** with React Hook Form + Zod validation
- 🗄️ **Supabase Integration** for waitlist management
- 🔍 **SEO Optimized** with proper meta tags
- 📊 **Analytics Ready** with tracking setup
- ♿ **Accessible** following WCAG guidelines

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Database**: Supabase
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics + Google Analytics

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kcifuentes/neurant-landing.git
   cd neurant-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # Reusable components
│   │   ├── forms/        # Form components
│   │   ├── layout/       # Layout components
│   │   ├── sections/     # Page sections
│   │   └── ui/           # shadcn/ui components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and configurations
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
├── components.json       # shadcn/ui configuration
├── tailwind.config.ts    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎨 Design System

This landing page uses a consistent design system with:

- **Color Palette**: Custom CSS variables for theming
- **Typography**: Optimized font hierarchy
- **Components**: shadcn/ui component library
- **Spacing**: Tailwind's spacing scale
- **Animations**: Framer Motion variants

## 📧 Waitlist Features

- **Smart Form Validation**: Real-time validation with Zod
- **Progressive Enhancement**: Multi-step form experience  
- **Data Collection**: Company size, industry, use case tracking
- **Email Integration**: Automated welcome emails
- **Analytics**: Form completion tracking

## 🚀 Deployment

### Deploy to Vercel (Recommended)

**Vercel Native GitHub Integration** - No CI/CD files needed!

1. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Automatic deployment on every push to `main`
   - Preview deployments for all Pull Requests

2. **Configure Environment Variables**
   - Add required variables in Vercel Dashboard
   - See `DEPLOYMENT.md` for complete setup guide

3. **Deploy automatically on git push!** ⚡

### Environment Variables for Production

⚠️ **Important**: Variables with `NEXT_PUBLIC_` prefix are visible in the browser

```env
# Production URLs (required)
NEXT_PUBLIC_FRONTEND_URL=https://neurant.innovarting.com
NEXT_PUBLIC_API_URL=https://neurant.innovarting.com/api

# Supabase (if using database)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Private Variables (server-side only)
RESEND_API_KEY=your_resend_api_key

# Optional
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for best UX
- **Bundle Size**: Optimized with Next.js automatic splitting
- **Images**: Optimized with Next.js Image component
- **Fonts**: Optimized loading with next/font

## 🔧 Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

## 📈 Analytics & Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Google Analytics**: User behavior tracking
- **Form Analytics**: Conversion funnel analysis
- **Error Tracking**: Automatic error reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README
- **Issues**: [GitHub Issues](https://github.com/kcifuentes/neurant-landing/issues)
- **Email**: support@neurant.com

## 🎯 About NeurAnt

NeurAnt is an advanced chatbot platform that helps businesses automate customer interactions with intelligent AI-powered conversations. Our landing page is designed to capture qualified leads and build anticipation for the platform launch.

---

**Built with ❤️ by the NeurAnt Team**
