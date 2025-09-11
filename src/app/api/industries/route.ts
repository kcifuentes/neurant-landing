import { NextResponse } from 'next/server';
import { industriesService } from '../../../lib/supabase';

export async function GET() {
  try {
    const result = await industriesService.getActiveIndustries();
    
    if (result.error) {
      console.error('Error fetching industries:', result.error);
      return NextResponse.json(
        { 
          error: 'Error al obtener industrias',
          code: 'INDUSTRIES_FETCH_ERROR'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data
    });

  } catch (error) {
    console.error('Unexpected error in industries API:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        code: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}