import React, { useState } from 'react';
import {
  Check,
  MessageCircle,
  UtensilsCrossed,
  Briefcase,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Clock,
  Star,
} from 'lucide-react';
import { createQuickWhatsAppUrl } from '../utils/whatsapp';

interface ServicesSectionProps {
  onDiscussService: (websiteType: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onDiscussService }) => {
  // Interactive booking calendar demo state for Salon/Clinic Booking card
  const [selectedDay, setSelectedDay] = useState<number>(8);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM');
  const [isBooked, setIsBooked] = useState<boolean>(false);

  // Interactive Digital Menu demo state for Restaurant / Brand card
  const [activeMenuCategory, setActiveMenuCategory] = useState<'specials' | 'drinks' | 'mains'>('specials');
  const [isTableReserved, setIsTableReserved] = useState<boolean>(false);

  const handleConfirmBooking = () => {
    setIsBooked(true);
    setTimeout(() => setIsBooked(false), 3000);
  };

  const handleReserveTable = () => {
    setIsTableReserved(true);
    setTimeout(() => setIsTableReserved(false), 3000);
  };

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 sm:py-24 bg-white dark:bg-[#070C18] text-slate-900 dark:text-white transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
            OUR WEBSITE PACKAGES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-slate-900 dark:text-white">
            The Perfect Website for{' '}
            <span className="text-blue-600 dark:text-cyan-400">Your Business</span>
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-3 max-w-xl mx-auto">
            Choose from our tailored website packages designed specifically for small businesses, salons, doctors, and restaurants.
          </p>
        </div>

        {/* 3 Main Package Cards */}
        <div className="flex flex-col gap-10">
          
          {/* ========================================================================= */}
          {/* 1. STARTER & PORTFOLIO WEBSITE (₹1,999)                                   */}
          {/* ========================================================================= */}
          <div
            id="package-business-website"
            className="group p-6 sm:p-8 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col gap-6 shadow-sm hover:shadow-2xl hover:scale-[1.02] hover:border-blue-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 transform-gpu cursor-pointer"
          >
            {/* Top Category Badge */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-cyan-300 text-xs font-semibold">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Perfect for Professionals & Local Services</span>
              </div>
              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                From ₹1,999
              </span>
            </div>

            {/* Photo / Visual Preview Container */}
            <div className="w-full rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner">
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  🔒 www.yourbusiness.com
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  1-Sec Load
                </span>
              </div>

              {/* Photo Showcase with Real Business Website Hero */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80"
                  alt="Business Website Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-600 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                      Live Showcase
                    </span>
                    <div className="flex items-center text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 inline mr-1" />
                      5.0 (Client Rating)
                    </div>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold leading-tight">
                    Professional 1-Page Business Showcase
                  </h4>
                  <p className="text-xs text-slate-200 mt-1 line-clamp-1">
                    Hero Section • Services Overview • Google Map • Instant WhatsApp CTA
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Starter Business Website
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                Perfect for professionals, consultants, freelancers, and local service providers who want a clean, fast, and credible online presence that converts visitors into leads.
              </p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5">
                <div className="p-0.5 rounded-full bg-emerald-500 text-white shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">1–3 Custom Pages</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Home, Services, Portfolio, About, and Contact</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-0.5 rounded-full bg-emerald-500 text-white shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Mobile-Responsive Design</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Looks crisp and fast on all smartphones and laptops</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-0.5 rounded-full bg-emerald-500 text-white shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Direct WhatsApp CTA</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">One-tap WhatsApp button to receive customer inquiries instantly</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-0.5 rounded-full bg-emerald-500 text-white shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Google Maps & SEO Ready</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Easy local discovery on Google search and maps</p>
                </div>
              </div>
            </div>

            {/* Dual Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200/80 dark:border-slate-800">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToPricing();
                }}
                className="py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white font-bold text-sm text-center shadow-sm"
              >
                View Pricing
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDiscussService('Starter Business Website (₹1,999)');
                }}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm text-center border border-slate-200 dark:border-slate-700"
              >
                Get Started
              </button>
            </div>
          </div>


          {/* ========================================================================= */}
          {/* 2. SALON, CLINIC & GYM BOOKING WEBSITE (₹3,499)                           */}
          {/* ========================================================================= */}
          <div
            id="package-booking-website"
            className="group p-6 sm:p-8 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border-2 border-blue-500/40 dark:border-cyan-500/40 flex flex-col gap-6 shadow-md hover:shadow-2xl hover:scale-[1.02] hover:border-blue-500 dark:hover:border-cyan-400 transition-all duration-300 transform-gpu cursor-pointer relative"
          >
            {/* Top Category Badge */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Salons, Spas, Dentists & Clinics</span>
              </div>
              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                From ₹3,499
              </span>
            </div>

            {/* Photo / Visual + Live Booking Interactive Widget */}
            <div className="w-full rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner">
              {/* Browser Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  🔒 www.elegancesalon.com/book
                </span>
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                  ★ Popular
                </span>
              </div>

              {/* Photo Showcase Top Banner */}
              <div className="relative h-32 sm:h-36 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80"
                  alt="Salon & Clinic Booking Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex items-end p-3.5 text-white">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 text-black px-2 py-0.5 rounded font-mono">
                      Salon & Spa Booking System
                    </span>
                    <h5 className="text-sm font-bold text-white mt-1">
                      Online Appointment & Service Lookbook
                    </h5>
                  </div>
                </div>
              </div>

              {/* Interactive Calendar Mockup Widget */}
              <div className="p-3.5 sm:p-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-2 py-1.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-xs font-bold mb-2.5">
                  <ChevronLeft className="w-4 h-4" />
                  <span>October 2026</span>
                  <ChevronRight className="w-4 h-4" />
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] mb-2 font-mono">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <span key={i} className="text-slate-400 font-bold">{d}</span>
                  ))}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSelectedDay(num)}
                      className={`py-1 rounded-lg font-bold transition-all ${
                        selectedDay === num
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                {/* Time Slots */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1.5">
                    🕒 Choose Time Slot:
                  </span>
                  <div className="grid grid-cols-3 gap-1.5 mb-2.5">
                    {['10:00 AM', '11:30 AM', '02:00 PM'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition-all ${
                          selectedSlot === slot
                            ? 'bg-emerald-500 border-emerald-600 text-white shadow-sm'
                            : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirmBooking}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>{isBooked ? '✓ Appointment Booked for Day ' + selectedDay + ' @ ' + selectedSlot : '📅 Confirm Booking Demo (Instant WhatsApp Alert)'}</span>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Salon, Spa & Clinic Booking Website
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                Let your customers view services, lookbook galleries, pricing, and book appointments directly with automated WhatsApp notifications.
              </p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5">
                <div className="p-0.5 rounded-full bg-emerald-500 text-white shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">4–7 Custom Pages</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Home, Services Rate Card, Lookbook Gallery, About, Contact</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-0.5 rounded-full bg-emerald-500 text-white shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Online Appointment Booking</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Interactive slot selector with instant WhatsApp confirmations</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-0.5 rounded-full bg-emerald-500 text-white shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Style Lookbook & Gallery</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">High-resolution photo showcases of previous client results</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-0.5 rounded-full bg-emerald-500 text-white shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Google Maps & Directions</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Pinpoint your clinic/salon on map for easy customer navigation</p>
                </div>
              </div>
            </div>

            {/* Dual Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200/80 dark:border-slate-800">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToPricing();
                }}
                className="py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white font-bold text-sm text-center shadow-sm"
              >
                View Pricing
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDiscussService('Salon & Clinic Booking Website (₹3,499)');
                }}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm text-center border border-slate-200 dark:border-slate-700"
              >
                Get Started
              </button>
            </div>
          </div>


          {/* ========================================================================= */}
          {/* 3. RESTAURANT, CAFE & MULTI-PAGE BRAND WEBSITE (₹5,999)                  */}
          {/* ========================================================================= */}
          <div
            id="package-restaurant-website"
            className="group p-6 sm:p-8 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col gap-6 shadow-sm hover:shadow-2xl hover:scale-[1.02] hover:border-blue-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 transform-gpu cursor-pointer"
          >
            {/* Top Category Badge */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200/80 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold">
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>Restaurants, Cafes & Multi-Page Brands</span>
              </div>
              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                From ₹5,999
              </span>
            </div>

            {/* Photo Showcase + Interactive Digital Menu Preview */}
            <div className="w-full rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner">
              {/* Browser Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  🔒 www.theurbanbistro.com
                </span>
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Open Now
                </span>
              </div>

              {/* Photo Showcase */}
              <div className="relative h-36 sm:h-40 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                  alt="Restaurant & Cafe Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex items-end p-4 text-white">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white px-2 py-0.5 rounded font-mono">
                      Digital Menu & Table Reservation
                    </span>
                    <h5 className="text-sm font-bold text-white mt-1">
                      Multi-Page Experience • QR Menu Ready
                    </h5>
                  </div>
                </div>
              </div>

              {/* Interactive Digital Menu Tabbed Preview */}
              <div className="p-3.5 sm:p-4" onClick={(e) => e.stopPropagation()}>
                {/* Menu category selector */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl mb-3">
                  <button
                    type="button"
                    onClick={() => setActiveMenuCategory('specials')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeMenuCategory === 'specials'
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    🔥 Specials
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMenuCategory('mains')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeMenuCategory === 'mains'
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    🍽️ Mains
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMenuCategory('drinks')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeMenuCategory === 'drinks'
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    ☕ Artisan Drinks
                  </button>
                </div>

                {/* Menu Items List */}
                <div className="space-y-2 mb-3">
                  {activeMenuCategory === 'specials' && (
                    <>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs">
                        <div>
                          <span className="font-bold text-slate-800 dark:text-slate-200">Truffle Mushroom Risotto</span>
                          <span className="text-[10px] text-slate-400 block">Wild mushrooms, parmesan crisp</span>
                        </div>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">₹420</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs">
                        <div>
                          <span className="font-bold text-slate-800 dark:text-slate-200">Woodfired Margherita Pizza</span>
                          <span className="text-[10px] text-slate-400 block">San Marzano tomatoes, fresh basil</span>
                        </div>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">₹380</span>
                      </div>
                    </>
                  )}

                  {activeMenuCategory === 'mains' && (
                    <>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs">
                        <div>
                          <span className="font-bold text-slate-800 dark:text-slate-200">Paneer Tikka Sizzler</span>
                          <span className="text-[10px] text-slate-400 block">Herbed butter rice, grilled veggies</span>
                        </div>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">₹390</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs">
                        <div>
                          <span className="font-bold text-slate-800 dark:text-slate-200">Creamy Alfredo Penne</span>
                          <span className="text-[10px] text-slate-400 block">Garlic herb sourdough bread</span>
                        </div>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">₹340</span>
                      </div>
                    </>
                  )}

                  {activeMenuCategory === 'drinks' && (
                    <>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs">
                        <div>
                          <span className="font-bold text-slate-800 dark:text-slate-200">Iced Hazelnut Latte</span>
                          <span className="text-[10px] text-slate-400 block">Single-origin roast, oat milk</span>
                        </div>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">₹220</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs">
                        <div>
                          <span className="font-bold text-slate-800 dark:text-slate-200">Fresh Mint Mojito</span>
                          <span className="text-[10px] text-slate-400 block">Crushed lime, sparkling soda</span>
                        </div>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">₹180</span>
                      </div>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleReserveTable}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>{isTableReserved ? '✓ Table Reserved for 2 (WhatsApp Notified)' : 'Reserve Table Demo (Instant WhatsApp Enquiry)'}</span>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Restaurant, Café & Multi-Page Website
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                Appetizing digital menus, photo galleries, dining hours, Google Maps directions, and one-tap WhatsApp table reservations for restaurants, cafes, and multi-page brands.
              </p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5">
                <div className="p-0.5 rounded-full bg-emerald-500 text-white shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">7–10+ Custom Pages</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Home, Interactive Menu, Gallery, About, Events, Contact</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-0.5 rounded-full bg-emerald-500 text-white shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Interactive Digital Menu</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Categorized menu with high-res food photography & prices</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-0.5 rounded-full bg-emerald-500 text-white shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Table Booking & Party Inquiries</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">One-tap WhatsApp reservation alerts for management</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-0.5 rounded-full bg-emerald-500 text-white shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Google Maps & Opening Hours</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">GPS directions and live dining hours for foot traffic</p>
                </div>
              </div>
            </div>

            {/* Dual Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200/80 dark:border-slate-800">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToPricing();
                }}
                className="py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white font-bold text-sm text-center shadow-sm"
              >
                View Pricing
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDiscussService('Restaurant & Multi-Page Website (₹5,999)');
                }}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm text-center border border-slate-200 dark:border-slate-700"
              >
                Get Started
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Direct WhatsApp Callout Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900 dark:bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg">
          <div>
            <h4 className="text-lg font-bold text-white">Need a custom package or something unique?</h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Free consultation • Quick response • No commitment required
            </p>
          </div>

          <a
            href={createQuickWhatsAppUrl('Hi SITEVIA WORKS! I would like to discuss a custom website for my business.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-bold text-sm shadow-md whitespace-nowrap transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
