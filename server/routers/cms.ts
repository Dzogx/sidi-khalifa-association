import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import * as cmsDb from "../cms";

/**
 * CMS Router - Public and Protected procedures for content management
 */
export const cmsRouter = router({
  /**
   * NEWS ENDPOINTS
   */
  news: router({
    list: publicProcedure.query(() => cmsDb.getPublishedNews(20)),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(({ input }) => cmsDb.getNewsBySlug(input.slug)),
    create: protectedProcedure
      .input(
        z.object({
          title: z.string(),
          slug: z.string(),
          excerpt: z.string().optional(),
          content: z.string(),
          category: z.string(),
          imageUrl: z.string().optional(),
          author: z.string().optional(),
          published: z.boolean().optional(),
        })
      )
      .mutation(({ input }) => cmsDb.createNews(input)),
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          data: z.object({
            title: z.string().optional(),
            slug: z.string().optional(),
            excerpt: z.string().optional(),
            content: z.string().optional(),
            category: z.string().optional(),
            imageUrl: z.string().optional(),
            author: z.string().optional(),
            published: z.boolean().optional(),
          }),
        })
      )
      .mutation(({ input }) => cmsDb.updateNews(input.id, input.data)),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => cmsDb.deleteNews(input.id)),
  }),

  /**
   * PROJECTS ENDPOINTS
   */
  projects: router({
    list: publicProcedure.query(() => cmsDb.getPublishedProjects(20)),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(({ input }) => cmsDb.getProjectBySlug(input.slug)),
    create: protectedProcedure
      .input(
        z.object({
          title: z.string(),
          slug: z.string(),
          description: z.string(),
          details: z.string().optional(),
          category: z.string(),
          imageUrl: z.string().optional(),
          progress: z.number().optional(),
          startDate: z.date().optional(),
          endDate: z.date().optional(),
          budget: z.string().optional(),
          status: z.enum(["planned", "ongoing", "completed", "paused"]).optional(),
          published: z.boolean().optional(),
        })
      )
      .mutation(({ input }) => cmsDb.createProject(input)),
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          data: z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            progress: z.number().optional(),
            status: z.enum(["planned", "ongoing", "completed", "paused"]).optional(),
            published: z.boolean().optional(),
          }),
        })
      )
      .mutation(({ input }) => cmsDb.updateProject(input.id, input.data)),
  }),

  /**
   * EVENTS ENDPOINTS
   */
  events: router({
    list: publicProcedure.query(() => cmsDb.getPublishedEvents(20)),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(({ input }) => cmsDb.getEventBySlug(input.slug)),
    create: protectedProcedure
      .input(
        z.object({
          title: z.string(),
          slug: z.string(),
          description: z.string(),
          details: z.string().optional(),
          category: z.string(),
          imageUrl: z.string().optional(),
          location: z.string(),
          startDate: z.date(),
          endDate: z.date().optional(),
          time: z.string().optional(),
          expectedAttendees: z.number().optional(),
          published: z.boolean().optional(),
        })
      )
      .mutation(({ input }) => cmsDb.createEvent(input)),
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          data: z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            actualAttendees: z.number().optional(),
            published: z.boolean().optional(),
          }),
        })
      )
      .mutation(({ input }) => cmsDb.updateEvent(input.id, input.data)),
  }),

  /**
   * BOARD MEMBERS ENDPOINTS
   */
  boardMembers: router({
    list: publicProcedure.query(() => cmsDb.getPublishedBoardMembers()),
    create: protectedProcedure
      .input(
        z.object({
          name: z.string(),
          position: z.string(),
          email: z.string().optional(),
          phone: z.string().optional(),
          bio: z.string().optional(),
          imageUrl: z.string().optional(),
          order: z.number().optional(),
          published: z.boolean().optional(),
        })
      )
      .mutation(({ input }) => cmsDb.createBoardMember(input)),
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          data: z.object({
            name: z.string().optional(),
            position: z.string().optional(),
            bio: z.string().optional(),
            order: z.number().optional(),
            published: z.boolean().optional(),
          }),
        })
      )
      .mutation(({ input }) => cmsDb.updateBoardMember(input.id, input.data)),
  }),

  /**
   * GALLERY ENDPOINTS
   */
  gallery: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }))
      .query(({ input }) => cmsDb.getPublishedGalleryImages(input.category)),
    create: protectedProcedure
      .input(
        z.object({
          title: z.string(),
          description: z.string().optional(),
          imageUrl: z.string(),
          category: z.string(),
          order: z.number().optional(),
          published: z.boolean().optional(),
        })
      )
      .mutation(({ input }) => cmsDb.createGalleryImage(input)),
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          data: z.object({
            title: z.string().optional(),
            order: z.number().optional(),
            published: z.boolean().optional(),
          }),
        })
      )
      .mutation(({ input }) => cmsDb.updateGalleryImage(input.id, input.data)),
  }),

  /**
   * DOCUMENTS ENDPOINTS
   */
  documents: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }))
      .query(({ input }) => cmsDb.getPublishedDocuments(input.category)),
    create: protectedProcedure
      .input(
        z.object({
          title: z.string(),
          description: z.string().optional(),
          category: z.string(),
          fileUrl: z.string(),
          fileType: z.string().optional(),
          fileSize: z.number().optional(),
          published: z.boolean().optional(),
        })
      )
      .mutation(({ input }) => cmsDb.createDocument(input)),
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          data: z.object({
            title: z.string().optional(),
            published: z.boolean().optional(),
          }),
        })
      )
      .mutation(({ input }) => cmsDb.updateDocument(input.id, input.data)),
  }),

  /**
   * MEMBERSHIPS ENDPOINTS
   */
  memberships: router({
    create: publicProcedure
      .input(
        z.object({
          fullName: z.string(),
          email: z.string().email(),
          phone: z.string(),
          address: z.string().optional(),
          occupation: z.string().optional(),
        })
      )
      .mutation(({ input }) => cmsDb.createMembership(input)),
    getPending: protectedProcedure.query(() => cmsDb.getPendingMemberships()),
    updateStatus: protectedProcedure
      .input(z.object({ id: z.number(), status: z.string() }))
      .mutation(({ input }) => cmsDb.updateMembershipStatus(input.id, input.status)),
  }),

  /**
   * VOLUNTEER APPLICATIONS ENDPOINTS
   */
  volunteers: router({
    create: publicProcedure
      .input(
        z.object({
          fullName: z.string(),
          email: z.string().email(),
          phone: z.string(),
          skills: z.string().optional(),
          availability: z.string().optional(),
          interests: z.array(z.string()).optional(),
        })
      )
      .mutation(({ input }) => cmsDb.createVolunteerApplication(input)),
    getPending: protectedProcedure.query(() => cmsDb.getPendingVolunteerApplications()),
    updateStatus: protectedProcedure
      .input(z.object({ id: z.number(), status: z.string() }))
      .mutation(({ input }) => cmsDb.updateVolunteerApplicationStatus(input.id, input.status)),
  }),

  /**
   * COMPLAINTS ENDPOINTS
   */
  complaints: router({
    create: publicProcedure
      .input(
        z.object({
          fullName: z.string(),
          email: z.string().email(),
          phone: z.string(),
          complaintType: z.string(),
          description: z.string(),
          additionalNotes: z.string().optional(),
        })
      )
      .mutation(({ input }) => cmsDb.createComplaint(input)),
    getNew: protectedProcedure.query(() => cmsDb.getNewComplaints()),
    updateStatus: protectedProcedure
      .input(z.object({ id: z.number(), status: z.string() }))
      .mutation(({ input }) => cmsDb.updateComplaintStatus(input.id, input.status)),
  }),

  /**
   * CONTACT SUBMISSIONS ENDPOINTS
   */
  contact: router({
    create: publicProcedure
      .input(
        z.object({
          fullName: z.string(),
          email: z.string().email(),
          phone: z.string().optional(),
          subject: z.string(),
          message: z.string(),
        })
      )
      .mutation(({ input }) => cmsDb.createContactSubmission(input)),
    getNew: protectedProcedure.query(() => cmsDb.getNewContactSubmissions()),
    updateStatus: protectedProcedure
      .input(z.object({ id: z.number(), status: z.string() }))
      .mutation(({ input }) => cmsDb.updateContactSubmissionStatus(input.id, input.status)),
  }),

  /**
   * STATISTICS ENDPOINTS
   */
  statistics: router({
    getAll: publicProcedure.query(() => cmsDb.getAllStatistics()),
    get: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(({ input }) => cmsDb.getStatistic(input.key)),
    update: protectedProcedure
      .input(z.object({ key: z.string(), value: z.number() }))
      .mutation(({ input }) => cmsDb.updateStatistic(input.key, input.value)),
  }),
});
