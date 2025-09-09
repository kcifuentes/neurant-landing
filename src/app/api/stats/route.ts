import { NextResponse } from 'next/server';
import { createSupabaseClient } from '../../../lib/supabase';

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

interface StatsData {
  total_registrations: number;
  countries_represented: number;
  top_industries: Array<{
    name: string;
    slug: string;
    registrations: number;
  }>;
  last_updated: string;
}

let cacheData: {
  data: StatsData;
  timestamp: number;
} | null = null;

/**
 * GET /api/stats
 * Returns aggregated statistics for social proof display
 * 
 * Features:
 * - Total number of waitlist registrations
 * - Number of countries represented
 * - Top 3 most popular industries
 * - 5-minute cache for performance optimization
 */
export async function GET() {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 15);

  try {
    // Check cache first
    if (cacheData && (Date.now() - cacheData.timestamp) < CACHE_DURATION) {
      console.log(`[STATS-API] [${requestId}] Cache hit - serving cached data`);
      
      return NextResponse.json({
        success: true,
        data: cacheData.data,
        cached: true,
        cache_age: Math.floor((Date.now() - cacheData.timestamp) / 1000)
      }, {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
          'Content-Type': 'application/json',
        }
      });
    }

    console.log(`[STATS-API] [${requestId}] Cache miss - fetching fresh data`);

    const supabase = createSupabaseClient();

    // Execute all queries in parallel for better performance
    const [
      totalRegistrationsResult,
      countriesResult,
      industriesResult
    ] = await Promise.all([
      // Total number of registrations
      supabase
        .from('waitlist_registrations')
        .select('id', { count: 'exact', head: true }),

      // Count unique countries
      supabase
        .from('waitlist_registrations')
        .select('country')
        .not('country', 'is', null),

      // Get industry statistics with names
      supabase
        .from('waitlist_registrations')
        .select(`
          industry_id,
          industries!inner (
            name,
            slug
          )
        `)
        .not('industry_id', 'is', null)
    ]);

    // Handle potential errors in queries
    if (totalRegistrationsResult.error) {
      throw new Error(`Failed to fetch total registrations: ${totalRegistrationsResult.error.message}`);
    }

    if (countriesResult.error) {
      throw new Error(`Failed to fetch countries: ${countriesResult.error.message}`);
    }

    if (industriesResult.error) {
      throw new Error(`Failed to fetch industries: ${industriesResult.error.message}`);
    }

    // Process countries data
    const uniqueCountries = new Set(
      countriesResult.data
        ?.map(row => row.country?.trim())
        .filter(country => country && country.length > 0)
    );

    // Process industries data
    const industryCount = new Map<string, { name: string; slug: string; count: number }>();
    
    industriesResult.data?.forEach(row => {
      if (row.industries && row.industry_id) {
        const industry = row.industries as { name: string; slug: string };
        const key = row.industry_id;
        
        if (industryCount.has(key)) {
          industryCount.get(key)!.count++;
        } else {
          industryCount.set(key, {
            name: industry.name,
            slug: industry.slug,
            count: 1
          });
        }
      }
    });

    // Get top 3 industries sorted by count
    const topIndustries = Array.from(industryCount.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .map(industry => ({
        name: industry.name,
        slug: industry.slug,
        registrations: industry.count
      }));

    // Build response data
    const statsData = {
      total_registrations: totalRegistrationsResult.count || 0,
      countries_represented: uniqueCountries.size,
      top_industries: topIndustries,
      last_updated: new Date().toISOString()
    };

    // Update cache
    cacheData = {
      data: statsData,
      timestamp: Date.now()
    };

    const executionTime = Date.now() - startTime;

    console.log(`[STATS-API] [${requestId}] Fresh data served - execution time: ${executionTime}ms`);
    console.log(`[STATS-API] [${requestId}] Stats: ${statsData.total_registrations} registrations, ${statsData.countries_represented} countries, ${topIndustries.length} industries`);

    return NextResponse.json({
      success: true,
      data: statsData,
      cached: false,
      execution_time: executionTime
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
        'Content-Type': 'application/json',
      }
    });

  } catch (error: unknown) {
    const executionTime = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error(`[STATS-API] [${requestId}] Error fetching stats:`, {
      error: errorMessage,
      stack: errorStack,
      execution_time: executionTime
    });

    return NextResponse.json({
      success: false,
      error: 'Failed to fetch statistics',
      error_code: 'STATS_FETCH_ERROR',
      timestamp: new Date().toISOString()
    }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}

/**
 * Handle unsupported HTTP methods
 */
export async function POST() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed',
    allowed_methods: ['GET']
  }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed',
    allowed_methods: ['GET']
  }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed',
    allowed_methods: ['GET']
  }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed',
    allowed_methods: ['GET']
  }, { status: 405 });
}