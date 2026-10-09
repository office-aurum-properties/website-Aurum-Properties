import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Check, ExternalLink, Navigation, Compass } from 'lucide-react';
import { sanitizeInput, sanitizePhone, submitNetlifyForm } from '../lib/utils';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    reason: 'General Inquiry',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const cleanName = sanitizeInput(formData.name);
    const cleanPhone = sanitizePhone(formData.phone);
    const cleanEmail = sanitizeInput(formData.email);
    const cleanReason = sanitizeInput(formData.reason);
    const cleanMessage = sanitizeInput(formData.message);

    const errors: Record<string, string> = {};
    if (!cleanName) errors.name = 'Name is required';
    
    if (cleanPhone.length !== 10) errors.phone = 'Please enter a valid 10-digit mobile number';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) errors.email = 'Please enter a valid email address';
    
    if (!cleanMessage) errors.message = 'Please write a message detailing your inquiry';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setStatus('sending');
    await submitNetlifyForm('contact-inquiry', {
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      reason: cleanReason,
      message: cleanMessage,
    });
    setStatus('success');
    
    const emailTo = "info.aurumproperties@gmail.com";
    const subject = encodeURIComponent(`[Aurum Website Inquiry] ${cleanReason} - ${cleanName}`);
    const body = encodeURIComponent(
      `Dear Aurum Properties Team,\n\n` +
      `I am submitting an inquiry via the corporate website. Here are my details:\n\n` +
      `- Full Name: ${cleanName}\n` +
      `- Phone Number: ${cleanPhone}\n` +
      `- Email Address: ${cleanEmail}\n` +
      `- Inquiry Reason: ${cleanReason}\n\n` +
      `Message details:\n${cleanMessage}\n\n` +
      `Please reach out to me to discuss. Thanks!\n\n` +
      `Best regards,\n` +
      `${cleanName}`
    );
    
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;

    setFormData({
      name: '',
      phone: '',
      email: '',
      reason: 'General Inquiry',
      message: ''
    });
    setTimeout(() => {
      setStatus('idle');
    }, 5000);
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] font-bold text-brand-gold-dark tracking-widest uppercase font-sans">
          AURUM PROPERTIES &bull; PROPERTY DEVELOPERS TAMIL NADU
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-green">
          Contact Aurum Properties
        </h1>
        <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
          Reach out to book site visits for DTCP approved plots for sale, residential plots, and low budget land for sale in Chennai and Tamil Nadu.
        </p>
      </div>

      {/* Main Grid: Left 45% Info | Right 55% Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT PANEL: CORPORATE OFFICES (45% -> 5 Cols) */}
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 space-y-8"
        >
          {/* Main Chennai Headquarters */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <span className="bg-brand-green/5 text-brand-green text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider self-start inline-block">
              CORPORATE HEADQUARTERS
            </span>

            <div className="space-y-4 text-slate-600 font-sans text-xs sm:text-sm">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green">Chennai Office</h3>
              
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <a 
                    href="https://maps.app.goo.gl/T78zws5bpzYaTCeq8" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-brand-green transition-colors inline-flex items-start gap-1 group"
                  >
                    <span>No. 626, MKN Road, Alandhur, Guindy, Chennai – 600 032, Tamil Nadu, India.</span>
                    <ExternalLink className="w-3.5 h-3.5 text-brand-gold opacity-70 group-hover:opacity-100 shrink-0 mt-0.5" />
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                  <div className="flex items-center gap-2 flex-wrap">
                    <a href="tel:+917397395529" className="hover:text-brand-green transition-colors font-medium">+91 7397395529</a>
                    <a 
                      href="https://wa.me/917397395529?text=Hello%20Aurum%20Properties%2C%20I%20would%20like%20to%20inquire%20about%20your%20properties."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[10px] font-bold tracking-wide transition-colors"
                      title="Direct WhatsApp Chat"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      WhatsApp Chat
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                  <a href="mailto:office.aurumproperties@gmail.com" className="hover:text-brand-green transition-colors font-medium">office.aurumproperties@gmail.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-brand-gold shrink-0" />
                  <span>Mon - Sat: 10:00 AM - 6:30 PM | Sunday: Closed</span>
                </li>
              </ul>
            </div>

            {/* Live Google Map of Corporate Office */}
            <div className="space-y-3 pt-2" id="office-location-map">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-brand-green flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-brand-gold shrink-0" />
                  Live Office Location
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Verified Pin
                </span>
              </div>

              {/* Embedded Google Map */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
                <iframe
                  title="Aurum Properties Corporate Office Location"
                  src="https://maps.google.com/maps?q=13.005749,80.209146&hl=en&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Coordinates & Open Map Button */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-sans">
                  <span className="flex items-center gap-1 font-medium text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                    GPS Coordinates:
                  </span>
                  <span className="font-mono text-slate-700 font-semibold text-[10px]">
                    13.005749, 80.209146
                  </span>
                </div>

                <a
                  href="https://maps.app.goo.gl/T78zws5bpzYaTCeq8"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="open-office-google-maps-btn"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-light text-brand-gold hover:text-white border border-brand-gold/30 py-2 px-3 rounded-xl font-sans text-xs font-bold tracking-wide uppercase transition-all duration-200 shadow-sm hover:shadow cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT PANEL: CONTACT FORM (55% -> 7 Cols) */}
        <motion.div 
          initial={{ opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6"
        >
          <div className="space-y-1 border-b border-slate-100 pb-3">
            <h3 className="font-serif text-2xl font-bold text-brand-green">Corporate Communications Inquiry</h3>
            <p className="text-xs text-slate-500 font-sans">
              Fields marked with an asterisk (*) are mandatory. We respond to all written communications within 4 business hours.
            </p>
          </div>

          <form 
            name="contact-inquiry"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleContactSubmit} 
            className="space-y-4"
          >
            <input type="hidden" name="form-name" value="contact-inquiry" />
            <p className="hidden" aria-hidden="true">
              <label>Don't fill this out if you're human: <input name="bot-field" tabIndex={-1} /></label>
            </p>
            {/* Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">Your Full Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Devanathan S"
                className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs text-brand-green focus:bg-white focus:outline-none focus:ring-1 transition-all ${
                  formErrors.name ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:border-brand-gold focus:ring-brand-gold'
                }`}
              />
              {formErrors.name && <p className="text-red-400 text-[10px] font-sans">{formErrors.name}</p>}
            </div>

            {/* Phone & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="9876543210"
                  className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs text-brand-green focus:bg-white focus:outline-none focus:ring-1 transition-all ${
                    formErrors.phone ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:border-brand-gold focus:ring-brand-gold'
                  }`}
                />
                {formErrors.phone && <p className="text-red-400 text-[10px] font-sans">{formErrors.phone}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">Email Address*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="dev@example.com"
                  className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs text-brand-green focus:bg-white focus:outline-none focus:ring-1 transition-all ${
                    formErrors.email ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:border-brand-gold focus:ring-brand-gold'
                  }`}
                />
                {formErrors.email && <p className="text-red-400 text-[10px] font-sans">{formErrors.email}</p>}
              </div>
            </div>

            {/* Reason selection dropdown */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">Reason for Inquiry*</label>
              <select
                name="reason"
                id="contact-reason"
                value={formData.reason}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-green focus:bg-white focus:outline-none focus:border-brand-gold cursor-pointer"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Site Visit Request">Site Visit Request</option>
                <option value="Investment Consultation">Investment Consultation</option>
                <option value="Legal Documentation">Legal Documentation</option>
                <option value="Build Assist">Build Assist</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">Your Message Details*</label>
              <textarea
                name="message"
                id="contact-message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                placeholder="Please describe your requirements (preferred city size budget time of visit etc.)"
                className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs text-brand-green focus:bg-white focus:outline-none focus:ring-1 transition-all ${
                  formErrors.message ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:border-brand-gold focus:ring-brand-gold'
                }`}
              />
              {formErrors.message && <p className="text-red-400 text-[10px] font-sans">{formErrors.message}</p>}
            </div>

            {/* Actions & Success display */}
            <div className="space-y-4 pt-2">
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-brand-green hover:bg-brand-green-light text-brand-gold hover:text-white py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
              >
                {status === 'sending' ? 'Sending Communications...' : 'Submit Corporate Inquiry'}
              </motion.button>

              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl border border-green-200 bg-green-50 text-green-700 space-y-2 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto text-green-600">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <h4 className="font-sans font-bold text-xs sm:text-sm">Inquiry Logged Successfully!</h4>
                  <p className="text-[11px] text-slate-500 font-sans">
                    ✓ Thank you! Our corporate communication executive will respond to you within 4 business hours.
                  </p>
                </motion.div>
              )}
            </div>

          </form>
        </motion.div>

      </div>

    </section>
  );
}
