import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Supabase Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

// Singleton Supabase Client
let supabaseClient: ReturnType<typeof createClient<Database>> | null = null;

export const createSupabaseClient = () => {
  if (!supabaseClient) {
    try {
      supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false, // Disable auth for waitlist-only functionality
          autoRefreshToken: false,
        },
        global: {
          headers: {
            'x-client-info': 'neurant-landing/1.0.0',
          },
        },
      });
    } catch (error) {
      console.error('Error creating Supabase client:', error);
      throw new Error('Failed to initialize Supabase client');
    }
  }
  return supabaseClient;
};

// Server-side Supabase Client with Service Role Key
let supabaseServerClient: ReturnType<typeof createClient<Database>> | null = null;

export const createSupabaseServerClient = () => {
  if (!supabaseServerClient) {
    if (!supabaseServiceRoleKey) {
      throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable for server operations');
    }
    
    try {
      supabaseServerClient = createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
        global: {
          headers: {
            'x-client-info': 'neurant-landing-server/1.0.0',
          },
        },
      });
    } catch (error) {
      console.error('Error creating Supabase server client:', error);
      throw new Error('Failed to initialize Supabase server client');
    }
  }
  return supabaseServerClient;
};

// Singleton instances
export const supabase = createSupabaseClient(); // Client-side
export const supabaseServer = typeof window === 'undefined' ? createSupabaseServerClient() : supabase; // Server-side

// Types for Form Handling
export type Industry = Database['public']['Tables']['industries']['Row'];
export type WaitlistEntry = Database['public']['Tables']['waitlist_registrations']['Row'];
export type WaitlistInsert = Database['public']['Tables']['waitlist_registrations']['Insert'];
export type WaitlistUpdate = Database['public']['Tables']['waitlist_registrations']['Update'];

// Utility Functions for Industries
export const industriesService = {
  // Get all active industries
  async getActiveIndustries() {
    try {
      const { data, error } = await supabaseServer
        .from('industries')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching industries:', error);
        throw new Error(`Failed to fetch industries: ${error.message}`);
      }

      return { data: data || [], error: null };
    } catch (error) {
      console.error('Unexpected error in getActiveIndustries:', error);
      return { 
        data: [], 
        error: error instanceof Error ? error : new Error('Unknown error occurred') 
      };
    }
  }
};

// Static Countries Service (until countries table is implemented)
export type Country = {
  code: string;
  name: string;
};

export const countriesService = {
  // Get common Latin American countries
  getCommonCountries(): { data: Country[]; error: null } {
    const countries: Country[] = [
      { code: 'AR', name: 'Argentina' },
      { code: 'BO', name: 'Bolivia' },
      { code: 'BR', name: 'Brasil' },
      { code: 'CL', name: 'Chile' },
      { code: 'CO', name: 'Colombia' },
      { code: 'CR', name: 'Costa Rica' },
      { code: 'CU', name: 'Cuba' },
      { code: 'DO', name: 'República Dominicana' },
      { code: 'EC', name: 'Ecuador' },
      { code: 'SV', name: 'El Salvador' },
      { code: 'GT', name: 'Guatemala' },
      { code: 'HN', name: 'Honduras' },
      { code: 'MX', name: 'México' },
      { code: 'NI', name: 'Nicaragua' },
      { code: 'PA', name: 'Panamá' },
      { code: 'PY', name: 'Paraguay' },
      { code: 'PE', name: 'Perú' },
      { code: 'UY', name: 'Uruguay' },
      { code: 'VE', name: 'Venezuela' },
      { code: 'ES', name: 'España' },
      { code: 'US', name: 'Estados Unidos' },
    ];
    
    return { data: countries, error: null };
  }
};

// Utility Functions for Waitlist Operations
export const waitlistService = {
  // Add new waitlist entry
  async addEntry(entry: WaitlistInsert) {
    try {
      const { data, error } = await supabaseServer
        .from('waitlist_registrations')
        .insert([entry])
        .select()
        .single();

      if (error) {
        console.error('Error adding waitlist entry:', error);
        throw new Error(`Failed to add waitlist entry: ${error.message}`);
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error in addEntry:', error);
      return { 
        data: null, 
        error: error instanceof Error ? error : new Error('Unknown error occurred') 
      };
    }
  },

  // Check if email already exists
  async checkEmailExists(email: string) {
    try {
      const { data, error } = await supabaseServer
        .from('waitlist_registrations')
        .select('id')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error checking email:', error);
        throw new Error(`Failed to check email: ${error.message}`);
      }

      return { exists: !!data, error: null };
    } catch (error) {
      console.error('Unexpected error in checkEmailExists:', error);
      return { 
        exists: false, 
        error: error instanceof Error ? error : new Error('Unknown error occurred') 
      };
    }
  },

  // Get waitlist statistics
  async getStats() {
    try {
      const { count, error } = await supabaseServer
        .from('waitlist_registrations')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error getting waitlist stats:', error);
        throw new Error(`Failed to get stats: ${error.message}`);
      }

      return { count: count || 0, error: null };
    } catch (error) {
      console.error('Unexpected error in getStats:', error);
      return { 
        count: 0, 
        error: error instanceof Error ? error : new Error('Unknown error occurred') 
      };
    }
  }
};

// Connection Health Check
export const checkSupabaseConnection = async () => {
  try {
    const { error } = await supabaseServer
      .from('industries')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Supabase connection error:', error);
      return { connected: false, error: error.message };
    }

    return { connected: true, error: null };
  } catch (error) {
    console.error('Unexpected error in connection check:', error);
    return { 
      connected: false, 
      error: error instanceof Error ? error.message : 'Unknown connection error' 
    };
  }
};