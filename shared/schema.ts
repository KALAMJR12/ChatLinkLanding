import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, decimal, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  level: text("level").notNull(),
  category: text("category").notNull(),
  standardPrice: decimal("standard_price", { precision: 10, scale: 2 }).notNull(),
  professionalPrice: decimal("professional_price", { precision: 10, scale: 2 }).notNull(),
  curriculum: text("curriculum").array().notNull(),
  prerequisites: text("prerequisites").array().notNull(),
  imageUrl: text("image_url"),
  isPopular: boolean("is_popular").default(false),
  maxStudents: integer("max_students").default(15),
  createdAt: timestamp("created_at").defaultNow(),
});

export const instructors = pgTable("instructors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url"),
  expertise: text("expertise").array().notNull(),
  experience: text("experience").notNull(),
  certifications: text("certifications").array().notNull(),
  studentsCount: integer("students_count").default(0),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("4.9"),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentName: text("student_name").notNull(),
  studentTitle: text("student_title").notNull(),
  content: text("content").notNull(),
  courseId: varchar("course_id").references(() => courses.id),
  rating: integer("rating").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const applications = pgTable("applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  course: text("course").notNull(),
  plan: text("plan").notNull(),
  startDate: text("start_date").notNull(),
  experience: text("experience").notNull(),
  motivation: text("motivation").notNull(),
  previousEducation: text("previous_education").notNull(),
  workExperience: text("work_experience"),
  expectations: text("expectations").notNull(),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  courseInterest: text("course_interest"),
  message: text("message").notNull(),
  status: text("status").default("new"), // "new", "responded", "closed"
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
});

export const insertInstructorSchema = createInsertSchema(instructors).omit({
  id: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
  status: true,
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Instructor = typeof instructors.$inferSelect;
export type InsertInstructor = z.infer<typeof insertInstructorSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
