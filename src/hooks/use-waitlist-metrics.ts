import { useState, useEffect } from 'react'
import type { WaitlistMetrics } from '../app/api/metrics/route'

interface UseWaitlistMetricsReturn {
  metrics: WaitlistMetrics | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

// Fallback metrics for immediate display (based on real minimums)
const fallbackMetrics: WaitlistMetrics = {
  totalCompanies: 10, // Marketing minimum for credibility
  totalCountries: 2,  // Real minimum we actually have
  totalIndustries: 3, // Conservative estimate
  growthRate: '+8%',
  topCountries: [
    { country: 'Colombia', count: 6 },
    { country: 'México', count: 4 }
    // No fake countries
  ],
  topIndustries: [
    { industry: 'Tecnología', count: 4 },
    { industry: 'E-commerce', count: 3 },
    { industry: 'Servicios', count: 3 }
  ],
  recentRegistrations: 2,
  lastUpdated: new Date().toISOString()
}

export function useWaitlistMetrics(): UseWaitlistMetricsReturn {
  const [metrics, setMetrics] = useState<WaitlistMetrics | null>(fallbackMetrics)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMetrics = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/metrics', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      if (result.success && result.data) {
        // Ensure minimum values for marketing credibility
        const adjustedMetrics = {
          ...result.data,
          totalCompanies: Math.max(result.data.totalCompanies, 10),
          totalCountries: Math.max(result.data.totalCountries, 2),
          totalIndustries: Math.max(result.data.totalIndustries, 3)
        }
        setMetrics(adjustedMetrics)
      } else {
        console.error('API returned error:', result.error)
        setError(result.error || 'API returned no data')
        // Keep fallback metrics on API error
        setMetrics(fallbackMetrics)
      }

    } catch (err) {
      console.error('Error fetching metrics:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      
      // Keep fallback metrics on error
      if (!metrics) {
        setMetrics(fallbackMetrics)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()
    
    // Refresh metrics every 5 minutes
    const interval = setInterval(fetchMetrics, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  return {
    metrics,
    isLoading,
    error,
    refetch: fetchMetrics
  }
}