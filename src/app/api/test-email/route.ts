import { NextRequest, NextResponse } from 'next/server';
import { EmailService } from '../../../lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const emailData = {
      email: body.email || 'prueba.test@example.com',
      full_name: body.full_name || 'Prueba Final',
      company_name: body.company_name || 'Empresa Final',
      industry: 'Tecnología',
      company_size: 'Startup (1-10 empleados)',
      chatbot_type: 'Atención al cliente',
      expected_volume: 'Medio (100-500 mensajes/mes)',
      phone: body.phone || '+57 300 123 4567',
      website: body.website || 'https://example.com',
      comments: body.comments || 'Esto es una prueba para verificar que los placeholders se resuelvan correctamente',
      country: 'Colombia',
      user_ip: '127.0.0.1',
      created_at: new Date().toLocaleString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    console.log('[TestEmail] Sending test emails with data:', emailData);

    // Send welcome email to user
    const welcomeJobId = await EmailService.sendWelcomeEmail(emailData);
    console.log(`[TestEmail] Welcome email queued: ${welcomeJobId}`);

    // Send internal notification to team
    const internalJobId = await EmailService.sendInternalNotification(emailData);
    console.log(`[TestEmail] Internal notification queued: ${internalJobId}`);

    return NextResponse.json({
      success: true,
      message: 'Emails de prueba enviados exitosamente',
      jobs: {
        welcomeEmail: welcomeJobId,
        internalNotification: internalJobId
      }
    });

  } catch (error) {
    console.error('[TestEmail] Error:', error);
    return NextResponse.json(
      { 
        error: 'Error al enviar emails de prueba',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}