import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Supabase Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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

// Singleton instance
export const supabase = createSupabaseClient();

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
      const { data, error } = await supabase
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

// Utility Functions for Waitlist Operations
export const waitlistService = {
  // Add new waitlist entry
  async addEntry(entry: WaitlistInsert) {
    try {
      const { data, error } = await supabase
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
      const { data, error } = await supabase
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
      const { count, error } = await supabase
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
    const { error } = await supabase
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