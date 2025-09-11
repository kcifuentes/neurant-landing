import { Resend } from 'resend';

// Types and interfaces
export interface EmailTemplate {
  subject: string;
  html: string;
  text?: string;
}

export interface WaitlistUserData extends Record<string, unknown> {
  email: string;
  full_name: string;
  company_name: string;
  industry?: string;
  industry_id?: string;
  company_size: string;
  country: string;
  chatbot_type: string;
  expected_volume: string;
  phone?: string;
  website?: string;
  additional_info?: string;
  user_ip?: string;
  created_at?: string | null;
}

export interface EmailJob {
  id: string;
  to: string;
  template: EmailTemplate;
  data: Record<string, unknown>;
  status: 'pending' | 'sent' | 'failed';
  attempts: number;
  maxAttempts: number;
  createdAt: Date;
  sentAt?: Date;
  error?: string;
}

export interface EmailMetrics {
  totalSent: number;
  totalFailed: number;
  pending: number;
  lastSentAt?: Date;
}

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory email queue and tracking
class EmailQueue {
  private queue: EmailJob[] = [];
  private processing = false;
  private metrics: EmailMetrics = {
    totalSent: 0,
    totalFailed: 0,
    pending: 0
  };

  constructor() {
    // Note: setInterval doesn't work in Vercel serverless environment
    // Queue processing is handled via immediate execution and API calls
  }

  add(job: Omit<EmailJob, 'id' | 'status' | 'attempts' | 'createdAt'>): string {
    const jobId = `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const emailJob: EmailJob = {
      id: jobId,
      status: 'pending',
      attempts: 0,
      createdAt: new Date(),
      ...job
    };

    this.queue.push(emailJob);
    this.metrics.pending++;
    
    // Process immediately for serverless environments (Vercel)
    // Add timeout to prevent hanging in production
    Promise.race([
      this.processQueue(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Queue processing timeout')), 25000)
      )
    ]).catch(error => {
      console.error('[EmailQueue] Error processing queue:', error);
    });

    return jobId;
  }

  private async processQueue(): Promise<void> {
    if (this.processing) return;
    
    this.processing = true;
    const pendingJobs = this.queue.filter(job => job.status === 'pending');

    console.log(`[EmailQueue] Processing ${pendingJobs.length} pending jobs`);

    for (const job of pendingJobs) {
      if (job.attempts >= job.maxAttempts) {
        job.status = 'failed';
        job.error = 'Max attempts exceeded';
        this.metrics.pending--;
        this.metrics.totalFailed++;
        console.log(`[EmailQueue] Job ${job.id} failed: Max attempts exceeded`);
        continue;
      }

      try {
        console.log(`[EmailQueue] Sending email job ${job.id} to ${job.to}`);
        await this.sendEmail(job);
        job.status = 'sent';
        job.sentAt = new Date();
        this.metrics.totalSent++;
        this.metrics.pending--;
        this.metrics.lastSentAt = new Date();
        console.log(`[EmailQueue] Job ${job.id} sent successfully`);
      } catch (error) {
        job.attempts++;
        job.error = error instanceof Error ? error.message : 'Unknown error';
        console.error(`[EmailQueue] Job ${job.id} failed (attempt ${job.attempts}/${job.maxAttempts}):`, error);
        
        if (job.attempts >= job.maxAttempts) {
          job.status = 'failed';
          this.metrics.pending--;
          this.metrics.totalFailed++;
          console.log(`[EmailQueue] Job ${job.id} permanently failed after ${job.maxAttempts} attempts`);
        }
      }
    }

    this.processing = false;
    console.log(`[EmailQueue] Queue processing completed. Metrics:`, this.metrics);
  }

  private async sendEmail(job: EmailJob): Promise<void> {
    const { to, template, data } = job;
    
    // Replace template variables
    let html = template.html;
    let text = template.text || '';
    let subject = template.subject;

    // Enhanced template variable replacement with better null handling
    for (const [key, value] of Object.entries(data)) {
      const placeholder = `{{${key}}}`;
      const safeValue = value !== null && value !== undefined ? String(value) : '';
      
      // Use global regex replacement
      html = html.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), safeValue);
      text = text.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), safeValue);
      subject = subject.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), safeValue);
    }

    // Log data being sent for debugging
    console.log('[EmailService] Sending email with data:', {
      to,
      subject,
      dataKeys: Object.keys(data),
      sampleData: {
        phone: data.phone,
        website: data.website,
        comments: data.comments
      }
    });

    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'NeurAnt <no-reply@notifications.innovarting.com>',
      to,
      subject,
      html,
      text: text || undefined,
    });

    console.log('[EmailService] Resend API response:', { 
      to, 
      subject, 
      resendId: result.data?.id,
      error: result.error,
      success: !result.error
    });

    // Check if Resend returned an error
    if (result.error) {
      throw new Error(`Resend API error: ${result.error.message}`);
    }

    console.log('[EmailService] Email sent successfully:', { 
      to, 
      subject, 
      resendId: result.data?.id
    });
  }

  getMetrics(): EmailMetrics {
    return { ...this.metrics };
  }

  getJobStatus(jobId: string): EmailJob | null {
    return this.queue.find(job => job.id === jobId) || null;
  }

  private cleanup(): void {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    // Remove jobs older than 24 hours (completed or failed)
    const initialLength = this.queue.length;
    this.queue = this.queue.filter(job => 
      job.status === 'pending' || job.createdAt > oneDayAgo
    );
    
    if (this.queue.length < initialLength) {
      console.log(`[EmailQueue] Cleaned up ${initialLength - this.queue.length} old jobs`);
    }
  }
}

// Singleton instance
const emailQueue = new EmailQueue();

// Email Templates
export const emailTemplates = {
  welcomeUser: {
    subject: '¡Bienvenido a NeurAnt! Tu registro ha sido confirmado',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenido a NeurAnt</title>
          <style>
            @media only screen and (max-width: 600px) {
              .container { width: 100% !important; padding: 20px !important; }
              .content { padding: 20px !important; }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
          <div class="container" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); overflow: hidden;">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">¡Bienvenido a NeurAnt!</h1>
                <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 16px;">Tu registro ha sido confirmado exitosamente</p>
              </div>

              <!-- Content -->
              <div class="content" style="padding: 40px 30px;">
                <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Hola <strong>{{full_name}}</strong>,</p>
                
                <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                  ¡Gracias por unirte a nuestra lista de espera! Hemos registrado tu interés en NeurAnt y estás un paso más cerca de transformar la manera en que tu empresa interactúa con los clientes.
                </p>

                <div style="background: #f3f4f6; border-radius: 8px; padding: 25px; margin: 30px 0;">
                  <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">Información registrada:</h3>
                  <p style="color: #6b7280; margin: 0 0 8px 0;"><strong>Email:</strong> {{email}}</p>
                  <p style="color: #6b7280; margin: 0 0 8px 0;"><strong>Empresa:</strong> {{company_name}}</p>
                  <p style="color: #6b7280; margin: 0 0 8px 0;"><strong>Industria:</strong> {{industry}}</p>
                  <p style="color: #6b7280; margin: 0;"><strong>Tamaño:</strong> {{company_size}}</p>
                </div>

                <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                  <strong>¿Qué sigue ahora?</strong><br>
                  Nuestro equipo revisará tu información y te contactaremos pronto con acceso temprano a la plataforma y una demostración personalizada.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://neurant.ai" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
                    Visitar NeurAnt
                  </a>
                </div>
              </div>

              <!-- Footer -->
              <div style="background: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="color: #9ca3af; font-size: 14px; margin: 0 0 10px 0;">
                  Este email fue enviado a {{email}}
                </p>
                <p style="color: #9ca3af; font-size: 14px; margin: 0;">
                  © 2025 NeurAnt by Innovarting. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
¡Bienvenido a NeurAnt!

Hola {{full_name}},

¡Gracias por unirte a nuestra lista de espera! Hemos registrado tu interés en NeurAnt.

Información registrada:
- Email: {{email}}
- Empresa: {{company_name}}
- Industria: {{industry}}
- Tamaño: {{company_size}}

Nuestro equipo te contactará pronto con acceso temprano a la plataforma.

Visita: https://neurant.ai

Este email fue enviado a {{email}}
© 2025 NeurAnt by Innovarting
    `
  },

  internalNotification: {
    subject: '🎯 Nuevo registro en waitlist de NeurAnt - {{company_name}}',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nuevo Registro - Waitlist</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
              
              <!-- Header -->
              <div style="background: #059669; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">🎯 Nuevo Registro Waitlist</h1>
              </div>

              <!-- Content -->
              <div style="padding: 30px;">
                <p style="color: #374151; font-size: 16px; margin: 0 0 20px 0;">
                  Se ha registrado un nuevo usuario en la waitlist de NeurAnt:
                </p>

                <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin: 20px 0;">
                  <h3 style="color: #0c4a6e; margin: 0 0 15px 0;">Información del Cliente</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #374151; font-weight: 600; width: 120px;">Nombre:</td>
                      <td style="padding: 8px 0; color: #1f2937;">{{full_name}}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #374151; font-weight: 600;">Email:</td>
                      <td style="padding: 8px 0; color: #1f2937;">{{email}}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #374151; font-weight: 600;">Teléfono:</td>
                      <td style="padding: 8px 0; color: #1f2937;">{{phone}}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #374151; font-weight: 600;">Empresa:</td>
                      <td style="padding: 8px 0; color: #1f2937;">{{company_name}}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #374151; font-weight: 600;">Industria:</td>
                      <td style="padding: 8px 0; color: #1f2937;">{{industry}}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #374151; font-weight: 600;">Tamaño:</td>
                      <td style="padding: 8px 0; color: #1f2937;">{{company_size}}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #374151; font-weight: 600;">País:</td>
                      <td style="padding: 8px 0; color: #1f2937;">{{country}}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #374151; font-weight: 600;">Chatbot:</td>
                      <td style="padding: 8px 0; color: #1f2937;">{{chatbot_type}}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #374151; font-weight: 600;">Volumen:</td>
                      <td style="padding: 8px 0; color: #1f2937;">{{expected_volume}}</td>
                    </tr>
                  </table>
                </div>

                <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
                  <strong>Website:</strong> <span style="color: #d97706;">{{website}}</span>
                </div>

                <div style="background: #f3f4f6; border-radius: 6px; padding: 15px; margin: 20px 0;">
                  <strong>Comentarios:</strong><br>
                  <span style="color: #4b5563;">{{comments}}</span>
                </div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                  <p style="color: #6b7280; font-size: 14px; margin: 0;">
                    <strong>Fecha de registro:</strong> {{created_at}}<br>
                    <strong>IP:</strong> {{user_ip}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
🎯 NUEVO REGISTRO WAITLIST - NeurAnt

Información del Cliente:
- Nombre: {{full_name}}
- Email: {{email}}
- Teléfono: {{phone}}
- Empresa: {{company_name}}
- Industria: {{industry}}
- Tamaño: {{company_size}}
- País: {{country}}
- Tipo Chatbot: {{chatbot_type}}
- Volumen Esperado: {{expected_volume}}
- Website: {{website}}

Comentarios: {{comments}}

Fecha: {{created_at}}
IP: {{user_ip}}
    `
  }
};

// Main service functions
export class EmailService {
  static async sendWelcomeEmail(userData: WaitlistUserData): Promise<string> {
    const jobId = emailQueue.add({
      to: userData.email,
      template: emailTemplates.welcomeUser,
      data: userData,
      maxAttempts: 3
    });

    console.log(`[EmailService] Welcome email queued for ${userData.email} (Job ID: ${jobId})`);
    return jobId;
  }

  static async sendInternalNotification(userData: WaitlistUserData): Promise<string> {
    const internalEmail = process.env.INTERNAL_NOTIFICATION_EMAIL || 'innovarting.info@gmail.com';
    
    console.log(`[EmailService] Preparing internal notification to: ${internalEmail}`);
    
    const jobId = emailQueue.add({
      to: internalEmail,
      template: emailTemplates.internalNotification,
      data: {
        ...userData,
        created_at: new Date().toLocaleString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      },
      maxAttempts: 5
    });

    console.log(`[EmailService] Internal notification queued (Job ID: ${jobId})`);
    return jobId;
  }

  static async sendTestEmail(to: string): Promise<string> {
    const jobId = emailQueue.add({
      to,
      template: {
        subject: 'Test Email - NeurAnt Email Service',
        html: '<h1>Test Email</h1><p>This is a test email from NeurAnt email service.</p>',
        text: 'Test Email - This is a test email from NeurAnt email service.'
      },
      data: {},
      maxAttempts: 1
    });

    return jobId;
  }

  static getMetrics(): EmailMetrics {
    return emailQueue.getMetrics();
  }

  static getJobStatus(jobId: string): EmailJob | null {
    return emailQueue.getJobStatus(jobId);
  }

  // Utility for direct sending (bypass queue) - for testing
  static async sendDirectEmail(to: string, template: EmailTemplate, data: Record<string, unknown>): Promise<void> {
    let html = template.html;
    let text = template.text || '';
    let subject = template.subject;

    for (const [key, value] of Object.entries(data)) {
      const placeholder = `{{${key}}}`;
      html = html.replace(new RegExp(placeholder, 'g'), String(value));
      text = text.replace(new RegExp(placeholder, 'g'), String(value));
      subject = subject.replace(new RegExp(placeholder, 'g'), String(value));
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'NeurAnt <no-reply@notifications.innovarting.com>',
      to,
      subject,
      html,
      text: text || undefined,
    });
  }
}

export default EmailService;