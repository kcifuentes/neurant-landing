import { NextResponse } from 'next/server';
import { EmailService } from '@/lib/email-service';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    console.log('[DEBUG] Starting email debug test...');
    
    // Test environment variables
    console.log('[DEBUG] Environment variables:', {
      RESEND_API_KEY: process.env.RESEND_API_KEY ? 'SET' : 'NOT SET',
      EMAIL_FROM: process.env.EMAIL_FROM || 'NOT SET',
      INTERNAL_NOTIFICATION_EMAIL: process.env.INTERNAL_NOTIFICATION_EMAIL || 'NOT SET'
    });

    // Test direct Resend call
    console.log('[DEBUG] Testing direct Resend call...');
    
    const directResult = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'NeurAnt <no-reply@notifications.innovarting.com>',
      to: 'cifuenteskevin85@gmail.com',
      subject: 'TEST - Direct Resend Call',
      html: '<h1>Test Email</h1><p>This is a direct test email from debug endpoint.</p>',
    });

    console.log('[DEBUG] Direct Resend result:', {
      success: !directResult.error,
      data: directResult.data,
      error: directResult.error
    });

    // Test EmailService
    console.log('[DEBUG] Testing EmailService...');
    
    const testData = {
      email: 'cifuenteskevin85@gmail.com',
      full_name: 'Kevin Test',
      company_name: 'Test Company',
      industry: 'Test Industry',
      company_size: 'Test Size',
      country: 'Test Country',
      chatbot_type: 'Test Type',
      expected_volume: 'Test Volume',
      phone: '+1234567890',
      website: 'https://test.com',
      comments: 'Test comments',
      user_ip: '127.0.0.1',
      created_at: new Date().toISOString()
    };

    const welcomeJobId = await EmailService.sendWelcomeEmail(testData);
    console.log('[DEBUG] Welcome email job ID:', welcomeJobId);

    // Wait a bit and check job status
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const jobStatus = EmailService.getJobStatus(welcomeJobId);
    console.log('[DEBUG] Job status after 2s:', jobStatus);

    const metrics = EmailService.getMetrics();
    console.log('[DEBUG] Email metrics:', metrics);

    return NextResponse.json({
      success: true,
      directResult: {
        success: !directResult.error,
        data: directResult.data,
        error: directResult.error
      },
      welcomeJobId,
      jobStatus,
      metrics
    });

  } catch (error) {
    console.error('[DEBUG] Error in debug endpoint:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}