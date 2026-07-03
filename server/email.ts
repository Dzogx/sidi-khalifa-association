import { notifyOwner } from "./_core/notification";

/**
 * Email Service
 * Uses Manus built-in notification system to send emails to owner
 * Can be extended to use external email services like SendGrid
 */

export interface EmailData {
  to?: string;
  subject: string;
  content: string;
}

/**
 * Send email notification to admin/owner
 */
export async function sendAdminNotification(data: EmailData): Promise<boolean> {
  try {
    const result = await notifyOwner({
      title: data.subject,
      content: data.content,
    });
    return result;
  } catch (error) {
    console.error("[Email Service] Failed to send notification:", error);
    return false;
  }
}

/**
 * Send membership application confirmation
 */
export async function sendMembershipConfirmation(name: string, email: string, membershipNumber?: string): Promise<boolean> {
  const content = `
تم استلام طلب عضويتك في جمعية حي سيدي خليفة القادري
الاسم: ${name}
البريد الإلكتروني: ${email}
${membershipNumber ? `رقم العضوية: ${membershipNumber}` : ""}

سيتم التواصل معك قريباً لتأكيد طلبك.
  `;

  return sendAdminNotification({
    subject: `طلب عضوية جديد من ${name}`,
    content,
  });
}

/**
 * Send volunteer application confirmation
 */
export async function sendVolunteerConfirmation(
  name: string,
  email: string,
  referenceNumber?: string
): Promise<boolean> {
  const content = `
تم استلام طلب التطوع الخاص بك
الاسم: ${name}
البريد الإلكتروني: ${email}
${referenceNumber ? `رقم المرجع: ${referenceNumber}` : ""}

شكراً لاهتمامك بالتطوع معنا. سيتم التواصل معك قريباً.
  `;

  return sendAdminNotification({
    subject: `طلب تطوع جديد من ${name}`,
    content,
  });
}

/**
 * Send complaint confirmation
 */
export async function sendComplaintConfirmation(
  name: string,
  email: string,
  complaintType: string,
  referenceNumber?: string
): Promise<boolean> {
  const content = `
تم استلام شكايتك/اقتراحك
الاسم: ${name}
البريد الإلكتروني: ${email}
نوع الشكوى: ${complaintType}
${referenceNumber ? `رقم المرجع: ${referenceNumber}` : ""}

شكراً لمساهمتك في تحسين الحي. سيتم النظر في طلبك قريباً.
  `;

  return sendAdminNotification({
    subject: `شكوى/اقتراح جديد من ${name}`,
    content,
  });
}

/**
 * Send contact form confirmation
 */
export async function sendContactConfirmation(name: string, email: string, subject: string): Promise<boolean> {
  const content = `
تم استلام رسالتك
الاسم: ${name}
البريد الإلكتروني: ${email}
الموضوع: ${subject}

شكراً لتواصلك معنا. سنرد عليك في أقرب وقت.
  `;

  return sendAdminNotification({
    subject: `رسالة جديدة من ${name}`,
    content,
  });
}

/**
 * Send complaint status update
 */
export async function sendComplaintStatusUpdate(
  name: string,
  email: string,
  status: string,
  referenceNumber: string
): Promise<boolean> {
  const statusAr = {
    new: "جديدة",
    reviewed: "تم المراجعة",
    in_progress: "قيد المعالجة",
    resolved: "تم حلها",
    closed: "مغلقة",
  };

  const content = `
تحديث حالة شكايتك/اقتراحك
رقم المرجع: ${referenceNumber}
الحالة الجديدة: ${statusAr[status as keyof typeof statusAr] || status}

سيتم التواصل معك إذا كان هناك أي تطورات.
  `;

  return sendAdminNotification({
    subject: `تحديث حالة شكايتك - ${referenceNumber}`,
    content,
  });
}
