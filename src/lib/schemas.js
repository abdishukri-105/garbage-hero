// src/lib/schemas.js
import { z } from 'zod';

export const ClientLogoSchema = z.object({
  _id: z.string().optional(),
  companyName: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  logoImage: z.any().nullable().optional(),
});
export const ClientLogosSchema = z.array(ClientLogoSchema);

export const TeamMemberSchema = z.object({
  _id: z.string().optional(),
  name: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  image: z.any().nullable().optional(),
});
export const TeamSchema = z.array(TeamMemberSchema);

export const ProjectImageAssetSchema = z.object({
  _id: z.string().optional(),
  url: z.string().nullable().optional(),
  metadata: z.object({
    dimensions: z.object({ width: z.number().optional(), height: z.number().optional() }).partial().optional(),
  }).partial().optional(),
}).partial();

export const ProjectSchema = z.object({
  _id: z.string().optional(),
  companyName: z.string().nullable().optional(),
  images: z.array(z.object({ asset: ProjectImageAssetSchema })).nullable().optional(),
  category: z.string().nullable().optional(),
  timePeriod: z.string().nullable().optional(),
  shortDescription: z.string().nullable().optional(),
});
export const ProjectsSchema = z.array(ProjectSchema);

export const TestimonialSchema = z.object({
  _id: z.string().optional(),
  clientName: z.string().nullable().optional(),
  clientTitle: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  statement: z.string().nullable().optional(),
  companyLogo: z.any().nullable().optional(),
});
export const TestimonialsSchema = z.array(TestimonialSchema);
