// Common TypeScript types for React/Next.js projects

export interface BaseApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
}

export interface PaginatedResponse<T> extends BaseApiResponse<T[]> {
  pagination: PaginationParams;
}

// Component prop types
export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ClassNameProps {
  className?: string;
}

export interface CommonProps extends ChildrenProps, ClassNameProps { }

// IELTS Course API Types
export interface Medium {
  name: string;
  resource_type: 'video' | 'image';
  resource_value: string; // YouTube video ID for videos, URL for images
  thumbnail_url?: string; // Thumbnail URL for videos
}

export interface Checklist {
  id: string;
  text: string;
  color: string;
  icon: string;
  list_page_visibility: boolean;
  // Legacy properties for backwards compatibility
  title?: string;
  description?: string;
}

export interface Seo {
  title: string;
  description: string;
  keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
}

export interface CtaText {
  primary: string;
  secondary?: string;
}

export interface Instructor {
  description: string;
  has_instructor_page: boolean;
  image: string;
  name: string;
  short_description: string;
  slug: string;
}

export interface Feature {
  icon: string;
  id: string;
  subtitle: string;
  title: string;
}

export interface Pointer {
  color: string;
  icon: string;
  id: string;
  text: string;
}

export interface FeatureExplanation {
  checklist: string[];
  file_type: 'image' | 'video';
  file_url: string;
  id: string;
  title: string;
  video_thumbnail?: string;
}

export interface FaqItem {
  answer: string; // HTML content
  id: string;
  question: string;
}

export interface Section {
  bg_color?: string;
  description?: string;
  name: string;
  order_idx: number;
  type: 'instructors' | 'features' | 'pointers' | 'about' | 'instructor' | 'feature_explanations' | 'faq' | 'testimonials';
  values?: Instructor[] | Feature[] | Pointer[] | FeatureExplanation[] | FaqItem[] | Testimonial[];
  // Legacy properties for backwards compatibility
  id?: number;
  title?: string;
  content?: unknown;
  data?: unknown[];
}

export interface Testimonial {
  description: string;
  id: string;
  name: string;
  profile_image: string;
  testimonial: string;
  thumb?: string;
  video_type: string;
  video_url: string;
}

export interface CourseData {
  slug: string;
  id: number;
  title: string;
  description: string; // HTML string
  media: Medium[];
  checklist: Checklist[];
  seo: Seo;
  cta_text: CtaText;
  sections: Section[];
}

export interface ApiResponse {
  data: CourseData;
}

// Language types
export type Language = 'en' | 'bn';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}
