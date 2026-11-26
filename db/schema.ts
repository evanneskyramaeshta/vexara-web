import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

// 1. Tabel Katalog Koleksi Buku (Perpustakaan Vexara)
export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  author: varchar("author", { length: 160 }).notNull(),
  publisher: varchar("publisher", { length: 160 }).notNull(),
  year: integer("year").notNull(),
  pages: integer("pages").notNull(),
  isbn: varchar("isbn", { length: 40 }).notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  status: varchar("status", { length: 40 }).notNull(), // "Ringkasan Digital" | "Arsip Fisik"
  featured: boolean("featured").default(false).notNull(),
  synopsis: text("synopsis").notNull(),
  curatorNote: text("curator_note").notNull(),
  quote: text("quote").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 2. Tabel Submisi Naskah Publik (Portal Komunitas & Kurasi Redaksi)
export const manuscripts = pgTable("manuscripts", {
  id: serial("id").primaryKey(),
  ticketCode: varchar("ticket_code", { length: 20 }).notNull().unique(),
  authorName: varchar("author_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(), // "Puisi" | "Esai Kritis" | "Resensi Buku" | "Prosa"
  title: varchar("title", { length: 180 }).notNull(),
  content: text("content").notNull(),
  status: varchar("status", { length: 30 }).default("pending").notNull(), // "pending" | "reviewed" | "published" | "rejected"
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

// 3. Tabel Modul Pembelajaran (Vexara Akademi)
export const academyModules = pgTable("academy_modules", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 30 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  track: varchar("track", { length: 100 }).notNull(),
  chaptersCount: integer("chapters_count").notNull(),
  duration: varchar("duration", { length: 40 }).notNull(),
  summary: text("summary").notNull(),
  chapters: jsonb("chapters")
    .$type<{ number: string; heading: string; keyPoint: string }[]>()
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 4. Tabel Agenda & Pengumuman Komunitas
export const communityEvents = pgTable("community_events", {
  id: serial("id").primaryKey(),
  eventDate: varchar("event_date", { length: 40 }).notNull(),
  type: varchar("type", { length: 60 }).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  format: varchar("format", { length: 120 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});