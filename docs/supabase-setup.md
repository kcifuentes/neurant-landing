# Supabase Setup - Landing Page (Cloud-Only)

## Overview
La landing page de NeurAnt utiliza **Supabase Cloud** directamente sin configuración local. Esto es ideal para:
- ✅ Formulario de waitlist
- ✅ Gestión simple de datos
- ✅ Deployment rápido y sencillo

## Project Information
- **Project Name**: NeurAnt Landing Page
- **Project ID**: `fdhrpeppevlbhzttgutx`
- **Project Type**: Cloud-hosted (no local development needed)

## Required Environment Variables

### Development (.env.local)
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://fdhrpeppevlbhzttgutx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Optional: Service Role Key (for admin operations)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Production (Vercel Environment Variables)
Same variables as development, configured in Vercel dashboard.

## Setup Instructions

### 1. Get API Keys from Supabase Dashboard
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select "NeurAnt Landing Page" project
3. Navigate to Settings → API
4. Copy:
   - **Project URL**: `https://fdhrpeppevlbhzttgutx.supabase.co`
   - **anon/public key**: For frontend operations
   - **service_role key**: For admin operations (keep secret)

### 2. Configure Environment Variables
```bash
# In apps/landing directory
cp .env.local.example .env.local
# Edit .env.local with your actual keys
```

### 3. Verify Connection
```bash
npm run dev
# Check browser console for Supabase connection
# Visit http://localhost:3002
```

## Database Schema (Waitlist)

### Required Table: `waitlist`
```sql
-- Already created in Supabase Cloud project
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Policy for inserting (anyone can add to waitlist)
CREATE POLICY "Allow waitlist signup" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Policy for reading (only service role)
CREATE POLICY "Admin only read" ON waitlist
  FOR SELECT USING (auth.role() = 'service_role');
```

## Client Configuration

The Supabase client is already configured in `lib/supabase.ts`:
- ✅ Singleton pattern for performance
- ✅ TypeScript types for waitlist table
- ✅ Error handling
- ✅ Health check functionality

## No Local Development Needed

**Important**: This setup does NOT require:
- ❌ Supabase CLI installation
- ❌ Local Supabase instance
- ❌ Migration files
- ❌ Local database setup

All development happens directly against the cloud instance.

## Benefits of Cloud-Only Approach

1. **Simplicity**: No local setup complexity
2. **Speed**: Immediate development without setup time
3. **Consistency**: Same database in dev and prod
4. **Reliability**: Managed by Supabase infrastructure
5. **Zero Maintenance**: No local services to manage

## Troubleshooting

### Connection Issues
1. Verify environment variables are set correctly
2. Check API keys are active in Supabase dashboard
3. Ensure project URL matches exactly
4. Check browser network tab for 401/403 errors

### Common Errors
- `Invalid API key`: Check NEXT_PUBLIC_SUPABASE_ANON_KEY
- `Project not found`: Verify NEXT_PUBLIC_SUPABASE_URL
- `CORS issues`: Ensure localhost:3002 is in allowed origins

## Next Steps
After setup is complete:
1. Test waitlist form functionality
2. Verify data is being saved to Supabase
3. Configure production environment variables in Vercel
4. Test production deployment