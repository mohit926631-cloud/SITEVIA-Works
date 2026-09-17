export type ProjectCategory = 'all' | 'business' | 'portfolio';

export interface ProjectItem {
  id: string;
  name: string;
  category: 'business' | 'portfolio';
  categoryLabel: string;
  tagline: string;
  description: string;
  url: string;
  previewImage: string;
  tags: string[];
  themeColor: string;
  badge?: string;
  highlights: string[];
  mobileMockupType?: 'food' | 'beauty' | 'fitness' | 'fashion' | 'cafe' | 'dev' | 'photo' | 'design' | 'freelance' | 'student';
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  recommendedFor: string;
  websiteTypeVal: string;
  startingPrice: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  subtitle: string;
  badge?: string;
  isPopular?: boolean;
  pages: string;
  features: string[];
  ctaText: string;
  websiteTypeVal: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface WorkStep {
  step: string;
  title: string;
  description: string;
  detail: string;
}

export interface WhyReason {
  number: string;
  title: string;
  description: string;
}

export interface TargetAudience {
  id: string;
  title: string;
  description: string;
  iconName: string;
  sampleWebsite: string;
  featuresNeeded: string[];
}

export interface ProjectFormData {
  name: string;
  businessName: string;
  businessType: string;
  websiteType: string;
  package: string;
  pages: string;
  features: string[];
  budget: string;
  phone: string;
  email: string;
  requirements: string;
}

export type PageType = 'home' | 'services' | 'pricing' | 'about' | 'contact' | 'terms' | 'privacy';

