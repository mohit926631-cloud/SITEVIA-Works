import { VITEWEB_WHATSAPP_NUMBER } from '../constants';
import { ProjectFormData } from '../types';

export function createWhatsAppUrl(data: Partial<ProjectFormData>): string {
  const name = data.name?.trim() || 'Not specified';
  const businessName = data.businessName?.trim() || 'Not specified';
  const businessType = data.businessType || 'Not specified';
  const websiteType = data.websiteType || 'Not specified';
  const selectedPackage = data.package || 'Not Sure';
  const pages = data.pages || 'Not specified';
  const features = data.features && data.features.length > 0 ? data.features.join(', ') : 'Standard Features';
  const budget = data.budget || 'Standard Pricing';
  const phone = data.phone?.trim() || 'Not specified';
  const email = data.email?.trim() || 'Not specified';
  const requirements = data.requirements?.trim() || 'None provided';

  const message = `Hello SITEVIA WORKS 👋

I'd like to discuss a website project.

Name: ${name}

Business Name: ${businessName}

Business Type: ${businessType}

Website Type: ${websiteType}

Selected Package: ${selectedPackage}

Required Pages:
${pages}

Required Features:
${features}

Budget:
${budget}

WhatsApp:
${phone}

Email:
${email}

Additional Requirements:
${requirements}

Sent via SITEVIA WORKS Website.`;

  return `https://wa.me/${VITEWEB_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function createQuickWhatsAppUrl(customGreeting?: string): string {
  const greeting = customGreeting || "Hello SITEVIA WORKS 👋 I'm interested in getting a custom website built for my business. Let's discuss details and pricing!";
  return `https://wa.me/${VITEWEB_WHATSAPP_NUMBER}?text=${encodeURIComponent(greeting)}`;
}

