import sgMail from '@sendgrid/mail';
import type { InsertApplication, InsertContactMessage } from '@shared/schema';

// Initialize SendGrid with API key from environment
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  html: string;
}

async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log('SendGrid API key not configured. Email would be sent to:', params.to);
      console.log('Subject:', params.subject);
      return false;
    }

    await sgMail.send(params);
    console.log('Email sent successfully to:', params.to);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendApplicationNotification(application: InsertApplication & { id: string }): Promise<boolean> {
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">New Course Application</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">TalentsHive Training Platform</p>
      </div>
      
      <div style="padding: 30px; background: #f9f9f9;">
        <h2 style="color: #333; margin-top: 0;">Application Details</h2>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #667eea; margin-top: 0;">Personal Information</h3>
          <p><strong>Name:</strong> ${application.firstName} ${application.lastName}</p>
          <p><strong>Email:</strong> ${application.email}</p>
          <p><strong>Phone:</strong> ${application.phone}</p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #667eea; margin-top: 0;">Course Information</h3>
          <p><strong>Course:</strong> ${application.course}</p>
          <p><strong>Plan:</strong> ${application.plan}</p>
          <p><strong>Preferred Start Date:</strong> ${application.startDate}</p>
          <p><strong>Experience Level:</strong> ${application.experience}</p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #667eea; margin-top: 0;">Background</h3>
          <p><strong>Educational Background:</strong></p>
          <p style="margin-left: 20px;">${application.previousEducation}</p>
          
          ${application.workExperience ? `
            <p><strong>Work Experience:</strong></p>
            <p style="margin-left: 20px;">${application.workExperience}</p>
          ` : ''}
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #667eea; margin-top: 0;">Motivation & Goals</h3>
          <p><strong>Motivation:</strong></p>
          <p style="margin-left: 20px;">${application.motivation}</p>
          
          <p><strong>Expectations:</strong></p>
          <p style="margin-left: 20px;">${application.expectations}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #666;">Application ID: ${application.id}</p>
          <p style="color: #666;">Submitted: ${new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
      </div>
      
      <div style="background: #333; padding: 20px; text-align: center;">
        <p style="color: white; margin: 0;">TalentsHive - Professional Technology Training</p>
        <p style="color: #ccc; margin: 5px 0 0 0; font-size: 14px;">Lagos | Abuja | Online</p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: 'admissions@talentshive.com', // Replace with actual admin email
    from: 'noreply@talentshive.com', // Replace with verified sender
    subject: `New Course Application - ${application.course} - ${application.firstName} ${application.lastName}`,
    html: emailHtml,
  });
}

export async function sendContactNotification(message: InsertContactMessage & { id: string }): Promise<boolean> {
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Message</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">TalentsHive Training Platform</p>
      </div>
      
      <div style="padding: 30px; background: #f9f9f9;">
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #667eea; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${message.firstName} ${message.lastName}</p>
          <p><strong>Email:</strong> ${message.email}</p>
          ${message.phone ? `<p><strong>Phone:</strong> ${message.phone}</p>` : ''}
          ${message.courseInterest ? `<p><strong>Course Interest:</strong> ${message.courseInterest}</p>` : ''}
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px;">
          <h3 style="color: #667eea; margin-top: 0;">Message</h3>
          <p style="line-height: 1.6;">${message.message}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #666;">Message ID: ${message.id}</p>
          <p style="color: #666;">Received: ${new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
      </div>
      
      <div style="background: #333; padding: 20px; text-align: center;">
        <p style="color: white; margin: 0;">TalentsHive - Professional Technology Training</p>
        <p style="color: #ccc; margin: 5px 0 0 0; font-size: 14px;">Lagos | Abuja | Online</p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: 'info@talentshive.com', // Replace with actual contact email
    from: 'noreply@talentshive.com', // Replace with verified sender  
    subject: `New Contact Message - ${message.firstName} ${message.lastName}`,
    html: emailHtml,
  });
}

export async function sendApplicationConfirmation(application: InsertApplication & { id: string }): Promise<boolean> {
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Application Received!</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Thank you for applying to TalentsHive</p>
      </div>
      
      <div style="padding: 30px; background: #f9f9f9;">
        <h2 style="color: #333;">Hi ${application.firstName},</h2>
        <p style="line-height: 1.6; color: #666;">
          Thank you for your interest in our <strong>${application.course}</strong> course. 
          We have received your application and our admissions team will review it carefully.
        </p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #667eea; margin-top: 0;">Your Application Summary</h3>
          <p><strong>Course:</strong> ${application.course}</p>
          <p><strong>Plan:</strong> ${application.plan}</p>
          <p><strong>Preferred Start Date:</strong> ${application.startDate}</p>
          <p><strong>Application ID:</strong> ${application.id}</p>
        </div>
        
        <div style="background: #e7f3ff; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
          <h3 style="color: #667eea; margin-top: 0;">What happens next?</h3>
          <ul style="line-height: 1.6; color: #666;">
            <li>Our admissions team will review your application within 48 hours</li>
            <li>You'll receive an email with next steps and enrollment details</li>
            <li>If selected, we'll schedule a brief orientation call</li>
            <li>You'll receive course materials and access information</li>
          </ul>
        </div>
        
        <p style="line-height: 1.6; color: #666;">
          If you have any questions, please don't hesitate to contact us at 
          <a href="mailto:admissions@talentshive.com">admissions@talentshive.com</a> 
          or call us at +234 XXX XXX XXXX.
        </p>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://talentshive.com" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Visit Our Website
          </a>
        </div>
      </div>
      
      <div style="background: #333; padding: 20px; text-align: center;">
        <p style="color: white; margin: 0;">TalentsHive - Professional Technology Training</p>
        <p style="color: #ccc; margin: 5px 0 0 0; font-size: 14px;">Lagos | Abuja | Online</p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: application.email,
    from: 'admissions@talentshive.com', // Replace with verified sender
    subject: `Application Received - ${application.course} Course`,
    html: emailHtml,
  });
}