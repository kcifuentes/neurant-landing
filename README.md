This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

🪝 **Auto-Sync Enabled**: Changes automatically sync to public repository via pre-commit hook.

🗃️ **Supabase Integration**: Connected to Supabase Cloud for waitlist management

## Setup Instructions

### 1. Environment Configuration
Copy the environment template and configure your variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your actual Supabase credentials
```

### 2. Verify Supabase Connection
```bash
npm run verify-supabase
```

### 3. Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3002](http://localhost:3002) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Supabase Configuration

This project uses **Supabase Cloud** directly (no local setup required).

### Project Details
- **Project Name**: NeurAnt Landing Page  
- **Project ID**: `fdhrpeppevlbhzttgutx`
- **Database**: Cloud-hosted PostgreSQL
- **Type**: Production-ready cloud setup

### Available Scripts
- `npm run verify-supabase` - Test Supabase connection and configuration
- `npm run dev` - Start development server on port 3002

### Documentation
- [Supabase Setup Guide](docs/supabase-setup.md) - Complete setup instructions
- [Environment Variables](.env.local.example) - Configuration reference

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

**Important**: Configure the same environment variables in Vercel dashboard for production deployment.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
