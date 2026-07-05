import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const adminEmail = process.env.ADMIN_EMAIL;

if (!resendApiKey) {
  console.warn('[Email] Resend API key not configured');
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Send email using Resend
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  if (!resend || !adminEmail) {
    console.warn('[Email] Email service not configured');
    return false;
  }

  try {
    const result = await resend.emails.send({
      from: `جمعية حي سيدي خليفة <noreply@resend.dev>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo || adminEmail,
    });

    if (result.error) {
      console.error('[Email] Failed to send email:', result.error);
      return false;
    }

    console.log('[Email] Email sent successfully:', result.data?.id);
    return true;
  } catch (error) {
    console.error('[Email] Error sending email:', error);
    return false;
  }
}

/**
 * Send membership confirmation email
 */
export async function sendMembershipConfirmation(email: string, name: string, referenceNumber: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right;">
      <h2>مرحباً ${name}</h2>
      <p>شكراً لانضمامك إلى جمعية حي سيدي خليفة القادري</p>
      <p>رقم المرجع: <strong>${referenceNumber}</strong></p>
      <p>سيتم التواصل معك قريباً للتحقق من بيانات الانخراط</p>
      <hr />
      <p>جمعية حي سيدي خليفة القادري</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'تأكيد الانخراط في الجمعية',
    html,
  });
}

/**
 * Send volunteer confirmation email
 */
export async function sendVolunteerConfirmation(email: string, name: string, referenceNumber: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right;">
      <h2>مرحباً ${name}</h2>
      <p>شكراً على رغبتك في التطوع مع جمعية حي سيدي خليفة القادري</p>
      <p>رقم المرجع: <strong>${referenceNumber}</strong></p>
      <p>سيتم التواصل معك قريباً لمناقشة فرص التطوع المتاحة</p>
      <hr />
      <p>جمعية حي سيدي خليفة القادري</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'تأكيد طلب التطوع',
    html,
  });
}

/**
 * Send complaint confirmation email
 */
export async function sendComplaintConfirmation(email: string, name: string, referenceNumber: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right;">
      <h2>مرحباً ${name}</h2>
      <p>تم استقبال شكواك / اقتراحك بنجاح</p>
      <p>رقم المرجع: <strong>${referenceNumber}</strong></p>
      <p>يمكنك متابعة حالة شكواك من خلال هذا الرقم</p>
      <hr />
      <p>جمعية حي سيدي خليفة القادري</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'تأكيد استقبال الشكوى / الاقتراح',
    html,
  });
}

/**
 * Send contact form confirmation email
 */
export async function sendContactConfirmation(email: string, name: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right;">
      <h2>مرحباً ${name}</h2>
      <p>شكراً لتواصلك معنا</p>
      <p>سيتم الرد على رسالتك في أقرب وقت ممكن</p>
      <hr />
      <p>جمعية حي سيدي خليفة القادري</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'تأكيد استقبال رسالتك',
    html,
  });
}

/**
 * Send admin notification email
 */
export async function sendAdminNotification(subject: string, html: string) {
  if (!adminEmail) {
    console.warn('[Email] Admin email not configured');
    return false;
  }

  return sendEmail({
    to: adminEmail,
    subject: `[إشعار] ${subject}`,
    html,
  });
}

/**
 * Send new membership notification to admin
 */
export async function notifyAdminNewMembership(name: string, email: string, phone: string, referenceNumber: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right;">
      <h2>طلب انخراط جديد</h2>
      <p><strong>الاسم:</strong> ${name}</p>
      <p><strong>البريد الإلكتروني:</strong> ${email}</p>
      <p><strong>الهاتف:</strong> ${phone}</p>
      <p><strong>رقم المرجع:</strong> ${referenceNumber}</p>
      <p><a href="https://your-domain.com/admin">اذهب إلى لوحة التحكم</a></p>
    </div>
  `;

  return sendAdminNotification('طلب انخراط جديد', html);
}

/**
 * Send new volunteer notification to admin
 */
export async function notifyAdminNewVolunteer(name: string, email: string, phone: string, referenceNumber: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right;">
      <h2>طلب تطوع جديد</h2>
      <p><strong>الاسم:</strong> ${name}</p>
      <p><strong>البريد الإلكتروني:</strong> ${email}</p>
      <p><strong>الهاتف:</strong> ${phone}</p>
      <p><strong>رقم المرجع:</strong> ${referenceNumber}</p>
      <p><a href="https://your-domain.com/admin">اذهب إلى لوحة التحكم</a></p>
    </div>
  `;

  return sendAdminNotification('طلب تطوع جديد', html);
}

/**
 * Send new complaint notification to admin
 */
export async function notifyAdminNewComplaint(name: string, email: string, subject: string, referenceNumber: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right;">
      <h2>شكوى / اقتراح جديد</h2>
      <p><strong>الاسم:</strong> ${name}</p>
      <p><strong>البريد الإلكتروني:</strong> ${email}</p>
      <p><strong>الموضوع:</strong> ${subject}</p>
      <p><strong>رقم المرجع:</strong> ${referenceNumber}</p>
      <p><a href="https://your-domain.com/admin">اذهب إلى لوحة التحكم</a></p>
    </div>
  `;

  return sendAdminNotification('شكوى / اقتراح جديد', html);
}
