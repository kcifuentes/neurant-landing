import { NextRequest, NextResponse } from 'next/server';
import { waitlistService } from '../../../lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const testData = {
      email: body.email || 'test.db@example.com',
      full_name: body.full_name || 'Test DB User',
      company_name: body.company_name || 'Test DB Company',
      industry_id: body.industry_id || '46b69971-0e17-4720-aa27-adb532d96b8c',
      country: body.country || 'CO',
      company_size: body.company_size || '1-10',
      expected_volume: body.expected_volume || '100-500',
      chatbot_type: body.chatbot_type || 'customer_service',
      phone: body.phone || '+57 300 123 4567',
      website: body.website || 'https://example.com',
      comments: body.comments || 'Test comment',
      ip_address: '127.0.0.1',
      user_agent: 'test-agent'
    };

    console.log('[TestDB] Attempting to insert:', testData);

    const result = await waitlistService.addEntry(testData);
    
    if (result.error) {
      console.error('[TestDB] Database error:', result.error);
      return NextResponse.json({
        success: false,
        error: result.error instanceof Error ? result.error.message : String(result.error),
        testData
      }, { status: 500 });
    }

    console.log('[TestDB] Success:', result.data);
    
    return NextResponse.json({
      success: true,
      data: result.data,
      message: 'Datos insertados correctamente'
    });

  } catch (error) {
    console.error('[TestDB] Unexpected error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}