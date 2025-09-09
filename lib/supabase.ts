import { createClient } from '@supabase/supabase-js';

// Database Types
export interface Database {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          company: string | null;
          role: string | null;
          interest_level: 'low' | 'medium' | 'high';
          referral_source: string | null;
          additional_info: string | null;
          created_at: string;
          updated_at: string;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          company?: string | null;
          role?: string | null;
          interest_level?: 'low' | 'medium' | 'high';
          referral_source?: string | null;
          additional_info?: string | null;
          created_at?: string;
          updated_at?: string;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          company?: string | null;
          role?: string | null;
          interest_level?: 'low' | 'medium' | 'high';
          referral_source?: string | null;
          additional_info?: string | null;
          created_at?: string;
          updated_at?: string;
          is_active?: boolean;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      interest_level: 'low' | 'medium' | 'high';
    };
  };
}

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

// Waitlist Types for Form Handling
export type WaitlistEntry = Database['public']['Tables']['waitlist']['Row'];
export type WaitlistInsert = Database['public']['Tables']['waitlist']['Insert'];
export type WaitlistUpdate = Database['public']['Tables']['waitlist']['Update'];

// Utility Functions for Waitlist Operations
export const waitlistService = {
  // Add new waitlist entry
  async addEntry(entry: WaitlistInsert) {
    try {
      const { data, error } = await supabase
        .from('waitlist')
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
        .from('waitlist')
        .select('id')
        .eq('email', email)
        .eq('is_active', true)
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
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

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
      .from('waitlist')
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