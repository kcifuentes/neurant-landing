import { NextResponse } from 'next/server';
import { supabaseServer } from '../../../lib/supabase';

export interface WaitlistMetrics {
  totalCompanies: number;
  totalCountries: number;
  totalIndustries: number;
  growthRate: string;
  topCountries: Array<{
    country: string;
    count: number;
  }>;
  topIndustries: Array<{
    industry: string;
    count: number;
  }>;
  recentRegistrations: number;
  lastUpdated: string;
}

export async function GET() {
  try {
    console.log('[Metrics API] Fetching waitlist metrics...');
    
    // Get total registrations
    const { data: totalData, error: totalError } = await supabaseServer
      .from('waitlist_registrations')
      .select('id', { count: 'exact' });

    if (totalError) {
      console.error('[Metrics API] Error fetching total:', totalError);
      throw totalError;
    }

    const totalCompanies = totalData?.length || 0;

    // Get unique countries
    const { data: countriesData, error: countriesError } = await supabaseServer
      .from('waitlist_registrations')
      .select('country')
      .not('country', 'is', null);

    if (countriesError) {
      console.error('[Metrics API] Error fetching countries:', countriesError);
      throw countriesError;
    }

    const uniqueCountries = new Set(countriesData?.map(item => item.country));
    const totalCountries = uniqueCountries.size;

    // Get top countries with count
    const countryCount = new Map<string, number>();
    countriesData?.forEach(item => {
      if (item.country) {
        countryCount.set(item.country, (countryCount.get(item.country) || 0) + 1);
      }
    });

    const topCountries = Array.from(countryCount.entries())
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Get industries data
    const { data: industriesData, error: industriesError } = await supabaseServer
      .from('waitlist_registrations')
      .select(`
        industry_id,
        industries (
          id,
          name
        )
      `)
      .not('industry_id', 'is', null);

    if (industriesError) {
      console.error('[Metrics API] Error fetching industries:', industriesError);
      throw industriesError;
    }

    const industryCount = new Map<string, number>();
    industriesData?.forEach(item => {
      if (item.industries?.name) {
        const industry = item.industries.name;
        industryCount.set(industry, (industryCount.get(industry) || 0) + 1);
      }
    });

    const totalIndustries = industryCount.size;

    const topIndustries = Array.from(industryCount.entries())
      .map(([industry, count]) => ({ industry, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Get recent registrations (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: recentData, error: recentError } = await supabaseServer
      .from('waitlist_registrations')
      .select('id', { count: 'exact' })
      .gte('created_at', sevenDaysAgo.toISOString());

    if (recentError) {
      console.error('[Metrics API] Error fetching recent:', recentError);
      throw recentError;
    }

    const recentRegistrations = recentData?.length || 0;

    // Calculate growth rate (mock for now, needs historical data)
    const growthRate = recentRegistrations > 0 ? '+15%' : '0%';

    const metrics: WaitlistMetrics = {
      totalCompanies,
      totalCountries,
      totalIndustries,
      growthRate,
      topCountries,
      topIndustries,
      recentRegistrations,
      lastUpdated: new Date().toISOString()
    };

    console.log('[Metrics API] Metrics calculated:', {
      totalCompanies,
      totalCountries,
      totalIndustries,
      topCountries: topCountries.length,
      topIndustries: topIndustries.length
    });

    return NextResponse.json({
      success: true,
      data: metrics
    });

  } catch (error) {
    console.error('[Metrics API] Database error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: null
    }, { status: 500 });
  }
}