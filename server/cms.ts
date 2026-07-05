import { eq, desc, and, like } from "drizzle-orm";
import {
  news,
  projects,
  events,
  boardMembers,
  galleryImages,
  documents,
  memberships,
  volunteerApplications,
  complaints,
  contactSubmissions,
  statistics,
} from "../drizzle/schema";
import { getDb } from "./db";

/**
 * NEWS QUERIES
 */
export async function getPublishedNews(limit = 10) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(news)
    .where(eq(news.published, true))
    .orderBy(desc(news.publishedAt))
    .limit(limit);
}

export async function getNewsBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db
    .select()
    .from(news)
    .where(eq(news.slug, slug))
    .limit(1);
  return result[0] || null;
}

export async function createNews(data: typeof news.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(news).values(data);
}

export async function updateNews(id: number, data: Partial<typeof news.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(news).set(data).where(eq(news.id, id));
}

export async function deleteNews(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(news).where(eq(news.id, id));
}

/**
 * PROJECTS QUERIES
 */
export async function getPublishedProjects(limit = 10) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(projects)
    .where(eq(projects.published, true))
    .orderBy(desc(projects.createdAt))
    .limit(limit);
}

export async function getProjectBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);
  return result[0] || null;
}

export async function createProject(data: typeof projects.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(projects).values(data);
}

export async function updateProject(id: number, data: Partial<typeof projects.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(projects).set(data).where(eq(projects.id, id));
}

/**
 * EVENTS QUERIES
 */
export async function getPublishedEvents(limit = 10) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(events)
    .where(eq(events.published, true))
    .orderBy(desc(events.startDate))
    .limit(limit);
}

export async function getEventBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db
    .select()
    .from(events)
    .where(eq(events.slug, slug))
    .limit(1);
  return result[0] || null;
}

export async function createEvent(data: typeof events.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(events).values(data);
}

export async function updateEvent(id: number, data: Partial<typeof events.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(events).set(data).where(eq(events.id, id));
}

/**
 * BOARD MEMBERS QUERIES
 */
export async function getPublishedBoardMembers() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(boardMembers)
    .where(eq(boardMembers.published, true))
    .orderBy(boardMembers.order);
}

export async function createBoardMember(data: typeof boardMembers.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(boardMembers).values(data);
}

export async function updateBoardMember(id: number, data: Partial<typeof boardMembers.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(boardMembers).set(data).where(eq(boardMembers.id, id));
}

/**
 * GALLERY IMAGES QUERIES
 */
export async function getPublishedGalleryImages(category?: string) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(galleryImages.published, true)];
  if (category) {
    conditions.push(eq(galleryImages.category, category));
  }
  return db
    .select()
    .from(galleryImages)
    .where(and(...conditions))
    .orderBy(galleryImages.order);
}

export async function createGalleryImage(data: typeof galleryImages.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(galleryImages).values(data);
}

export async function updateGalleryImage(id: number, data: Partial<typeof galleryImages.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(galleryImages).set(data).where(eq(galleryImages.id, id));
}

/**
 * DOCUMENTS QUERIES
 */
export async function getPublishedDocuments(category?: string) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(documents.published, true)];
  if (category) {
    conditions.push(eq(documents.category, category));
  }
  return db
    .select()
    .from(documents)
    .where(and(...conditions))
    .orderBy(desc(documents.createdAt));
}

export async function createDocument(data: typeof documents.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(documents).values(data);
}

export async function updateDocument(id: number, data: Partial<typeof documents.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(documents).set(data).where(eq(documents.id, id));
}

/**
 * MEMBERSHIPS QUERIES
 */
export async function createMembership(data: typeof memberships.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(memberships).values(data);
}

export async function getMembershipByEmail(email: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db
    .select()
    .from(memberships)
    .where(eq(memberships.email, email))
    .limit(1);
  return result[0] || null;
}

export async function getPendingMemberships() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(memberships)
    .where(eq(memberships.status, "pending"))
    .orderBy(desc(memberships.createdAt));
}

export async function updateMembershipStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(memberships).set({ status: status as any }).where(eq(memberships.id, id));
}

/**
 * VOLUNTEER APPLICATIONS QUERIES
 */
export async function createVolunteerApplication(data: typeof volunteerApplications.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(volunteerApplications).values(data);
}

export async function getPendingVolunteerApplications() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(volunteerApplications)
    .where(eq(volunteerApplications.status, "pending"))
    .orderBy(desc(volunteerApplications.createdAt));
}

export async function updateVolunteerApplicationStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(volunteerApplications).set({ status: status as any }).where(eq(volunteerApplications.id, id));
}

/**
 * COMPLAINTS QUERIES
 */
export async function createComplaint(data: typeof complaints.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(complaints).values(data);
}

export async function getComplaintByReferenceNumber(refNumber: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db
    .select()
    .from(complaints)
    .where(eq(complaints.referenceNumber, refNumber))
    .limit(1);
  return result[0] || null;
}

export async function getNewComplaints() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(complaints)
    .where(eq(complaints.status, "new"))
    .orderBy(desc(complaints.createdAt));
}

export async function updateComplaintStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(complaints).set({ status: status as any }).where(eq(complaints.id, id));
}

/**
 * CONTACT SUBMISSIONS QUERIES
 */
export async function createContactSubmission(data: typeof contactSubmissions.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(contactSubmissions).values(data);
}

export async function getNewContactSubmissions() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(contactSubmissions)
    .where(eq(contactSubmissions.status, "new"))
    .orderBy(desc(contactSubmissions.createdAt));
}

export async function updateContactSubmissionStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contactSubmissions).set({ status: status as any }).where(eq(contactSubmissions.id, id));
}

/**
 * STATISTICS QUERIES
 */
export async function getStatistic(key: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db
    .select()
    .from(statistics)
    .where(eq(statistics.key, key))
    .limit(1);
  return result[0] || null;
}

export async function updateStatistic(key: string, value: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getStatistic(key);
  if (existing) {
    await db.update(statistics).set({ value }).where(eq(statistics.key, key));
  } else {
    await db.insert(statistics).values({ key, value });
  }
}

export async function getAllStatistics() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(statistics);
}
