import { useEffect } from 'react';

interface LegalDocsProps {
  mode: 'privacy' | 'terms';
}

export default function LegalDocs({ mode }: LegalDocsProps) {
  
  // Custom hook to handle jump link smooth scrolling
  const handleJumpToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      // Offset slightly for sticky header
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {mode === 'privacy' ? (
        <div id="privacy" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT INDEX NAV (25% -> 3 Cols) */}
          <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-28 z-20 space-y-4">
            <h4 className="font-serif text-base font-bold text-brand-green border-b border-slate-100 pb-3">
              Privacy Policy Index
            </h4>
            
            <nav className="flex flex-col space-y-2 text-xs font-sans font-semibold text-slate-500">
              {[
                { label: '1. Introduction', id: 'privacy-intro' },
                { label: '2. Data Collection', id: 'privacy-data-collection' },
                { label: '3. Data Usage', id: 'privacy-usage' },
                { label: '4. Cookie Management', id: 'privacy-cookies' },
                { label: '5. Sharing of Data', id: 'privacy-sharing' },
                { label: '6. Security Safeguards', id: 'privacy-security' },
                { label: '7. Your Statutory Rights', id: 'privacy-rights' },
                { label: '8. Legal Contact', id: 'privacy-contact' }
              ].map((jump) => (
                <button
                  key={jump.id}
                  onClick={() => handleJumpToSection(jump.id)}
                  className="text-left py-1 hover:text-brand-gold transition-colors focus:outline-none"
                >
                  {jump.label}
                </button>
              ))}
            </nav>

            <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-sans">
              Last Updated: January 15, 2025 <br />
              Version 2.0 (PDPA India Compliant)
            </div>
          </div>

          {/* RIGHT DETAILED LEGAL CONTENT (75% -> 9 Cols) */}
          <div className="lg:col-span-9 bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm space-y-8 font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
            
            <div className="border-b border-slate-100 pb-4 space-y-1">
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">REGULATORY CHARTER</span>
              <h1 className="font-serif text-3xl sm:text-4xl font-black text-brand-green">Corporate Privacy Policy</h1>
            </div>

            {/* Intro */}
            <div id="privacy-intro" className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green border-b border-slate-50 pb-2">1. Introduction</h3>
              <p>
                Aurum Properties (referred to as "the Company", "we", "us", or "our") operates as a registered premium plot developer within the jurisdiction of Tamil Nadu, India. We are deeply committed to protecting the private data and personal credentials of our customers, site visitors, and prospective buyers. This Privacy Policy outlines our procedures for gathering, storing, utilizing, and safeguarding personal data in accordance with the Personal Data Protection Act (PDPA) of India and associated digital security guidelines.
              </p>
              <p>
                By visiting our website (aurumproperties.in), filling out inquiry forms, subscribing to newsletters, or requesting physical site visit transport assistance, you formally consent to the storage and data processing protocols detailed within this policy charter.
              </p>
            </div>

            {/* Data Collection */}
            <div id="privacy-data-collection" className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green border-b border-slate-50 pb-2">2. Personal Data We Collect</h3>
              <p>
                To provide premium customer service, arrange site transport, and process statutory RERA paperwork, we collect the following classes of personal credentials:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Identity Credentials:</strong> Full name, gender, age, preferred language, and professional title.</li>
                <li><strong>Contact Credentials:</strong> Primary phone number, email address, postal address, and corporate communication preferences.</li>
                <li><strong>Inquiry Parameters:</strong> Selected plot layout, preferred size configurations, budget brackets, preferred site inspection dates, and details submitted via message panels.</li>
                <li><strong>Interactive Logs:</strong> IP address, browser cookie data, location metrics, and duration of pages viewed via browser sessions.</li>
              </ul>
            </div>

            {/* Data Usage */}
            <div id="privacy-usage" className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green border-b border-slate-50 pb-2">3. Utilization of Collected Data</h3>
              <p>
                Collected credentials undergo strict, secure database processing. We do not engage in automated decision-making or profiling. Your information is used solely for:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Processing and scheduling site visit request pickups and corporate consultation appointments.</li>
                <li>Sending requested digital property brochures, RERA plans, layout sheets, and price schedules.</li>
                <li>Pre-filling interactive plot layout SVG documents and executing booking registry applications.</li>
                <li>Dispatching weekly investment newsletter alerts and corporate announcements (which you can opt-out of instantly).</li>
                <li>Complying with municipal land registries, Tamil Nadu Real Estate Regulatory Authority (TNRERA) audits, and banking loan checks.</li>
              </ul>
            </div>

            {/* Cookies */}
            <div id="privacy-cookies" className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green border-b border-slate-50 pb-2">4. Cookie Management</h3>
              <p>
                Our website utilizes standard browser cookies to optimize page loading speed, maintain active user session parameters, and analyze anonymous web traffic pattern trends via analytical services. You can select to block or wipe cookies inside your browser's security settings panels. However, disabling cookies may limit access to interactive components like the Plot Calculator and layout selection grids.
              </p>
            </div>

            {/* Sharing */}
            <div id="privacy-sharing" className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green border-b border-slate-50 pb-2">5. Sharing & Transfers of Data</h3>
              <p>
                Aurum Properties does not rent, sell, trade, or expose customer credentials to third-party commercial marketing platforms. Your data is shared strictly on a need-to-know basis under NDA contracts with:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Subsidiary Contractors:</strong> Registered construction civil engineers, layout planners, and transport vendors handling site visits.</li>
                <li><strong>Financial Partners:</strong> Certified banking institutions providing home loan pre-approvals for registered plot buyers.</li>
                <li><strong>Legal Officers:</strong> Sub-registrars, document writers, and compliance attorneys preparing sale deed drafts.</li>
                <li><strong>Statutory Authorities:</strong> Tamil Nadu government land departments, when required by sub-registrar subpoena or RERA audit orders.</li>
              </ul>
            </div>

            {/* Security */}
            <div id="privacy-security" className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green border-b border-slate-50 pb-2">6. Security Safeguards</h3>
              <p>
                We execute state-of-the-art administrative and digital defense measures—including SSL database encryption, certified firewall panels, and multi-tier access privileges for employee credentials. No digital system is 100% impenetrable. In the highly unlikely event of a security exposure, we notify affected customers and statutory cyber compliance cells within 72 hours of verification.
              </p>
            </div>

            {/* Rights */}
            <div id="privacy-rights" className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green border-b border-slate-50 pb-2">7. Your Statutory Rights</h3>
              <p>
                Under Indian PDPA guidelines, property buyers retain absolute control over their digital credentials. Your rights include:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Right of Access:</strong> Request a complete copies of all personal credentials processed in our database.</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate names, phones, or email records.</li>
                <li><strong>Right of Erasure:</strong> Ask us to completely purge all contact records from our commercial CRM servers (provided there is no active property contract or mortgage pending).</li>
                <li><strong>Right to Withdraw Consent:</strong> Revoke consent for communications at any given time.</li>
              </ul>
            </div>

            {/* Contact */}
            <div id="privacy-contact" className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green border-b border-slate-50 pb-2">8. Legal Data Protection Contact</h3>
              <p>
                For questions, complaints, data rectifications, or formal erasure requests, connect with our designated Corporate Data Officer:
              </p>
              <p className="font-semibold text-brand-green">
                Attn: Data Compliance Cell, Aurum Properties <br />
                No. 626, MKN Road, Alandhur, Guindy, Chennai – 600 032. <br />
                Email: compliance@aurumproperties.in
              </p>
            </div>

          </div>

        </div>
      ) : (
        <div id="terms" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT INDEX NAV (25% -> 3 Cols) */}
          <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-28 z-20 space-y-4">
            <h4 className="font-serif text-base font-bold text-brand-green border-b border-slate-100 pb-3">
              Terms of Use Index
            </h4>
            
            <nav className="flex flex-col space-y-2 text-xs font-sans font-semibold text-slate-500">
              {[
                { label: '1. Acceptance of Terms', id: 'terms-acceptance' },
                { label: '2. Website Utilization', id: 'terms-utilization' },
                { label: '3. Property Disclaimer', id: 'terms-disclaimer' },
                { label: '4. Booking & Cancellation', id: 'terms-booking-cancellation' },
                { label: '5. RERA Compliance', id: 'terms-rera' },
                { label: '6. Intellectual Property', id: 'terms-ip' },
                { label: '7. Limitation of Liability', id: 'terms-liability' },
                { label: '8. Governing Law & Court', id: 'terms-governing-law' }
              ].map((jump) => (
                <button
                  key={jump.id}
                  onClick={() => handleJumpToSection(jump.id)}
                  className="text-left py-1 hover:text-brand-gold transition-colors focus:outline-none"
                >
                  {jump.label}
                </button>
              ))}
            </nav>

            <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-sans">
              Last Updated: January 15, 2025 <br />
              Tamil Nadu Jurisdiction Applies
            </div>
          </div>

          {/* RIGHT DETAILED LEGAL CONTENT (75% -> 9 Cols) */}
          <div className="lg:col-span-9 bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm space-y-8 font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
            
            <div className="border-b border-slate-100 pb-4 space-y-1">
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">LEGAL AGREEMENT</span>
              <h1 className="font-serif text-3xl sm:text-4xl font-black text-brand-green">Terms & Conditions</h1>
            </div>

            {/* MANDATORY: RERA warning to buyers */}
            <div className="bg-amber-50 border-l-4 border-brand-gold p-6 rounded-r-2xl text-amber-900 shadow-sm space-y-2">
              <h4 className="font-sans font-bold text-sm uppercase tracking-wide text-brand-gold-dark">★ MANDATORY RERA REGULATION DISCLAIMER</h4>
              <p className="text-xs leading-relaxed font-sans font-medium">
                All development projects designed, published, and offered by Aurum Properties are duly registered under the Tamil Nadu Real Estate Regulatory Authority (TNRERA). Prospective buyers are strongly advised to independently verify each project layout, registration status, approved plans, and compliance details by checking the official TNRERA web portal at <a href="https://rera.tn.gov.in" target="_blank" rel="noopener noreferrer" className="underline font-bold text-brand-green hover:text-brand-green-light">rera.tn.gov.in</a> prior to executing final deeds.
              </p>
            </div>

            {/* Acceptance */}
            <div id="terms-acceptance" className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green border-b border-slate-50 pb-2">1. Acceptance of Terms</h3>
              <p>
                By visiting, surfing, clicking, or entering information on this web portal, you unconditionally accept and agree to be bound by these Terms and Conditions. If you do not accept these corporate terms of use, you are instructed to immediately cease browsing this website. These terms govern all online features—including plot search filter tools, construction calculators, brochure requests, and site visit forms.
              </p>
            </div>

            {/* Use of Website */}
            <div id="terms-utilization" className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green border-b border-slate-50 pb-2">2. Website Utilization</h3>
              <p>
                Users agree to utilize this web portal solely for lawful personal research, plot inquiries, and scheduling visits. You are strictly forbidden from:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Utilizing automated script crawlers, scrapers, or database bots to extract pricing models or project catalogs.</li>
                <li>Submitting fraudulent email accounts, false telephone parameters, or mock inquiries.</li>
                <li>Bypassing structural cyber defenses, server firewalls, or security networks.</li>
                <li>Impersonating Aurum Properties representatives or making fake land reservations.</li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div id="terms-disclaimer" className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green border-b border-slate-50 pb-2">3. Property Listings Disclaimer</h3>
              <p>
                The digital catalogs, gradient placeholders, indicative plot dimensions, price starting tags, and layout boundaries shown on this website are compiled for illustrative marketing purposes. While we execute intense verification to ensure structural accuracy, dimensions and pricing are subject to adjustment without prior notice due to on-site layout revisions or market modifications.
              </p>
              <p>
                An interactive SVG layout map selection is merely a conceptual visualization. True boundaries, exact square feet, and plot availability are governed solely by physical surveyor checks and registered sale deed documents.
              </p>
            </div>

            {/* Booking & Cancellation */}
            <div id="terms-booking-cancellation" className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green border-b border-slate-50 pb-2">4. Booking & Cancellation Policy</h3>
              <p>
                Submitting a booking request form or scheduling a site visit does not constitute a formal reservation or transfer of ownership. A plot is formally locked in our layout registry only after:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Verification of prospective buyer's KYC credentials.</li>
                <li>Physical payment of the mutually agreed booking token amount.</li>
                <li>Formal execution of the bilateral Booking Agreement drafted by our legal cell.</li>
              </ol>
              <p>
                Cancellation rules, token refunds, and processing charges are clearly structured inside each bilateral Booking Agreement and vary depending on the specific project and development status.
              </p>
            </div>

            {/* RERA */}
            <div id="terms-rera" className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green border-b border-slate-50 pb-2">5. RERA Compliance</h3>
              <p>
                In compliance with TNRERA mandates, we publish the registration numbers and specific approval dossiers of each layout in our brochures. All layout developments, basic utilities, wide roads, and community parks will be finalized according to the formal timelines lodged with the RERA registrar.
              </p>
            </div>

            {/* IP */}
            <div id="terms-ip" className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green border-b border-slate-50 pb-2">6. Intellectual Property</h3>
              <p>
                The name "Aurum Properties", the gold circle branding, Playfair typography combinations, structural workflow calculators, interactive SVG maps, and custom real estate essays are the exclusive intellectual property of the Company. Any duplication, redistribution, or modification of these assets without written authorization from our CEO is strictly prohibited.
              </p>
            </div>

            {/* Liability */}
            <div id="terms-liability" className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green border-b border-slate-50 pb-2">7. Limitation of Liability</h3>
              <p>
                To the fullest extent permitted by Indian statutory law, Aurum Properties, its directors, employees, and legal compliance officers shall not be held liable for any financial losses, investment modifications, or direct/indirect damages arising from the utilization of info published on this website, calculator estimates, or brochure documentation. Investment choices are made entirely at the buyer's discretion.
              </p>
            </div>

            {/* Governing Law */}
            <div id="terms-governing-law" className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green border-b border-slate-50 pb-2">8. Governing Law & Jurisdiction</h3>
              <p>
                These Terms and Conditions shall be governed, construed, and enforced in accordance with the laws of the State of Tamil Nadu, India. Any disputes, litigations, or claim settlements arising from website utilization or property inquiries shall fall under the exclusive jurisdiction of the Courts of Chennai, Tamil Nadu.
              </p>
            </div>

          </div>

        </div>
      )}
    </section>
  );
}
