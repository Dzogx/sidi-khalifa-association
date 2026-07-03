import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import * as cmsDb from "../cms";
import * as emailService from "../email";
import * as utils from "../utils";

/**
 * Forms Router - Handle form submissions with email notifications
 */
export const formsRouter = router({
  /**
   * Membership Application
   */
  submitMembership: publicProcedure
    .input(
      z.object({
        fullName: z.string().min(2, "الاسم الكامل مطلوب"),
        email: z.string().email("البريد الإلكتروني غير صحيح"),
        phone: z.string().min(7, "رقم الهاتف غير صحيح"),
        address: z.string().optional(),
        occupation: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Create membership record
        await cmsDb.createMembership({
          fullName: input.fullName,
          email: input.email,
          phone: input.phone,
          address: input.address,
          occupation: input.occupation,
          status: "pending",
        });

        // Send confirmation email
        await emailService.sendMembershipConfirmation(input.fullName, input.email);

        return {
          success: true,
          message: "تم استلام طلب عضويتك بنجاح. سيتم التواصل معك قريباً.",
        };
      } catch (error) {
        console.error("[Forms] Membership submission error:", error);
        return {
          success: false,
          message: "حدث خطأ أثناء معالجة طلبك. يرجى المحاولة لاحقاً.",
        };
      }
    }),

  /**
   * Volunteer Application
   */
  submitVolunteer: publicProcedure
    .input(
      z.object({
        fullName: z.string().min(2, "الاسم الكامل مطلوب"),
        email: z.string().email("البريد الإلكتروني غير صحيح"),
        phone: z.string().min(7, "رقم الهاتف غير صحيح"),
        skills: z.string().optional(),
        availability: z.string().optional(),
        interests: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const referenceNumber = utils.generateReferenceNumber("VOL");

        // Create volunteer application record
        await cmsDb.createVolunteerApplication({
          fullName: input.fullName,
          email: input.email,
          phone: input.phone,
          skills: input.skills,
          availability: input.availability,
          interests: input.interests,
          status: "pending",
          referenceNumber,
        });

        // Send confirmation email
        await emailService.sendVolunteerConfirmation(input.fullName, input.email, referenceNumber);

        return {
          success: true,
          message: `تم استلام طلب التطوع بنجاح. رقم المرجع: ${referenceNumber}`,
          referenceNumber,
        };
      } catch (error) {
        console.error("[Forms] Volunteer submission error:", error);
        return {
          success: false,
          message: "حدث خطأ أثناء معالجة طلبك. يرجى المحاولة لاحقاً.",
        };
      }
    }),

  /**
   * Complaint/Suggestion Submission
   */
  submitComplaint: publicProcedure
    .input(
      z.object({
        fullName: z.string().min(2, "الاسم الكامل مطلوب"),
        email: z.string().email("البريد الإلكتروني غير صحيح"),
        phone: z.string().min(7, "رقم الهاتف غير صحيح"),
        complaintType: z.string().min(1, "نوع الشكوى مطلوب"),
        description: z.string().min(10, "الوصف يجب أن يكون على الأقل 10 أحرف"),
        additionalNotes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const referenceNumber = utils.generateReferenceNumber("CMP");

        // Create complaint record
        await cmsDb.createComplaint({
          fullName: input.fullName,
          email: input.email,
          phone: input.phone,
          complaintType: input.complaintType,
          description: input.description,
          additionalNotes: input.additionalNotes,
          status: "new",
          referenceNumber,
          priority: "medium",
        });

        // Send confirmation email
        await emailService.sendComplaintConfirmation(
          input.fullName,
          input.email,
          input.complaintType,
          referenceNumber
        );

        return {
          success: true,
          message: `تم استلام شكايتك/اقتراحك بنجاح. رقم المرجع: ${referenceNumber}`,
          referenceNumber,
        };
      } catch (error) {
        console.error("[Forms] Complaint submission error:", error);
        return {
          success: false,
          message: "حدث خطأ أثناء معالجة طلبك. يرجى المحاولة لاحقاً.",
        };
      }
    }),

  /**
   * Contact Form Submission
   */
  submitContact: publicProcedure
    .input(
      z.object({
        fullName: z.string().min(2, "الاسم الكامل مطلوب"),
        email: z.string().email("البريد الإلكتروني غير صحيح"),
        phone: z.string().optional(),
        subject: z.string().min(3, "الموضوع مطلوب"),
        message: z.string().min(10, "الرسالة يجب أن تكون على الأقل 10 أحرف"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Create contact submission record
        await cmsDb.createContactSubmission({
          fullName: input.fullName,
          email: input.email,
          phone: input.phone,
          subject: input.subject,
          message: input.message,
          status: "new",
        });

        // Send confirmation email
        await emailService.sendContactConfirmation(input.fullName, input.email, input.subject);

        return {
          success: true,
          message: "تم استلام رسالتك بنجاح. سنرد عليك قريباً.",
        };
      } catch (error) {
        console.error("[Forms] Contact submission error:", error);
        return {
          success: false,
          message: "حدث خطأ أثناء معالجة طلبك. يرجى المحاولة لاحقاً.",
        };
      }
    }),

  /**
   * Track complaint status
   */
  trackComplaint: publicProcedure
    .input(z.object({ referenceNumber: z.string() }))
    .query(async ({ input }) => {
      try {
        const complaint = await cmsDb.getComplaintByReferenceNumber(input.referenceNumber);
        if (!complaint) {
          return {
            found: false,
            message: "لم يتم العثور على الشكوى برقم المرجع المدخل",
          };
        }

        const statusAr = {
          new: "جديدة",
          reviewed: "تم المراجعة",
          in_progress: "قيد المعالجة",
          resolved: "تم حلها",
          closed: "مغلقة",
        };

        return {
          found: true,
          referenceNumber: complaint.referenceNumber,
          status: statusAr[complaint.status as keyof typeof statusAr] || complaint.status,
          description: complaint.description,
          createdAt: complaint.createdAt,
          updatedAt: complaint.updatedAt,
        };
      } catch (error) {
        console.error("[Forms] Track complaint error:", error);
        return {
          found: false,
          message: "حدث خطأ أثناء البحث عن الشكوى",
        };
      }
    }),
});
