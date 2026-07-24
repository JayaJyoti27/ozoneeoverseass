export type JobCategory = {
  title: string;
  icon:
    | "Stethoscope"
    | "HeartPulse"
    | "HandHeart"
    | "HardHat"
    | "Briefcase"
    | "Wrench"
    | "Building2"
    | "UtensilsCrossed"
    | "Zap"
    | "Snowflake"
    | "Hotel"
    | "Factory"
    | "Cog"
    | "ShoppingBag"
    | "Car"
    | "Hammer"
    | "GraduationCap";
};

export type FAQ = { q: string; a: string };
export type Stat = { value: string; label: string };
export type SalaryRow = { role: string; range: string; benefits: string };
export type Testimonial = { name: string; role: string; quote: string };
export type GalleryImage = { url: string; alt: string };

export type Country = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroImageKeywords: string;
  heroImageUrl: string;
  tagline: string;
  intro: string;
  jobCategories: JobCategory[];
  stats: Stat[];
  salaryTable: SalaryRow[];
  lifeInCountry: string;
  gallery: GalleryImage[];
  visaNotes: string;
  visaHandled: string[];
  documentationNotes: string;
  documentationChecklist: string[];
  testimonials: Testimonial[];
  faqs: FAQ[];
};

export const MEA_LICENSE = "B-0123/MUM/PER/1000+/5/9999/2020";

export const PROCESS_STEPS: { title: string; description: string }[] = [
  {
    title: "Apply & profile review",
    description:
      "Submit your CV through the candidate portal. Our sector desk shortlists you within 72 hours and requests any missing documents up front.",
  },
  {
    title: "Employer shortlist & interview",
    description:
      "We arrange video or in-person interviews with vetted, MEA-registered employers. You see the demand letter and contract before you commit.",
  },
  {
    title: "Documentation & attestation",
    description:
      "MEA-apostille, embassy attestation, GAMCA medicals, and Dataflow / Prometric (for regulated roles) are coordinated end-to-end from our office.",
  },
  {
    title: "Visa stamping & pre-departure",
    description:
      "Work-permit lodged, visa stamped, e-Migrate clearance filed. You attend our free orientation covering culture, rights, WPS, and grievance channels.",
  },
  {
    title: "Departure & post-arrival care",
    description:
      "Airport pickup coordinated with the employer, resident-permit follow-up, and a 90-day welfare check-in from your Ozone desk.",
  },
];

export const WHY_OZONE: { title: string; description: string }[] = [
  {
    title: "MEA-licensed, e-Migrate registered",
    description:
      "Every placement is filed through the Government of India's e-Migrate system. No cash, no informal channels, no unregistered sub-agents.",
  },
  {
    title: "Direct employer contracts",
    description:
      "We work only with principal employers and MOFA-verified sponsors — no chain sub-contracting, no bait-and-switch job descriptions.",
  },
  {
    title: "Transparent, capped fees",
    description:
      "Service charges follow the MEA fee ceiling and are collected against a printed receipt. Salary, deductions, and end-of-service benefits are on paper before you sign.",
  },
  {
    title: "Sector desks, not generalists",
    description:
      "Dedicated desks for healthcare, oil & gas, construction, hospitality, and skilled trades — recruiters who speak your industry, not just your language.",
  },
];

export const countries: Country[] = [
  {
    slug: "kuwait",
    name: "Kuwait",
    metaTitle: "Kuwait Recruitment Agency — Ozone Overseas",
    metaDescription:
      "MEA-licensed ethical recruitment for Kuwait. End-to-end placements in nursing, caregiving, and skilled construction roles.",
    heroImageKeywords: "Kuwait City skyline",
    heroImageUrl:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80",
    tagline: "Ethical. Compliant. End-to-end recruitment to Kuwait.",
    intro:
      "Kuwait remains one of the highest-paying Gulf destinations for Indian nurses, caregivers, and skilled construction talent. Ozone Overseas has been placing candidates with Kuwaiti hospitals, ministries, and infrastructure contractors under the MEA e-Migrate framework — with every contract MOFA-attested and every candidate briefed before they board.",
    jobCategories: [
      { title: "Registered Nurses", icon: "Stethoscope" },
      { title: "Staff Nurses", icon: "HeartPulse" },
      { title: "Caregivers", icon: "HandHeart" },
      { title: "Construction Workers", icon: "HardHat" },
    ],
    stats: [
      { value: "1,200+", label: "Kuwait placements since 2015" },
      { value: "45", label: "MOH & MOI-approved employers" },
      { value: "8–12 wks", label: "Average offer-to-boarding time" },
      { value: "0", label: "Complaints upheld by MEA" },
    ],
    salaryTable: [
      {
        role: "Registered Nurse (MOH)",
        range: "KWD 480 – 680 / month",
        benefits: "Accommodation, transport, annual ticket, medical",
      },
      {
        role: "Staff Nurse (private hospital)",
        range: "KWD 350 – 520 / month",
        benefits: "Shared accommodation, overtime, annual ticket",
      },
      {
        role: "Caregiver (home / facility)",
        range: "KWD 180 – 260 / month",
        benefits: "Accommodation, meals, medical, ticket",
      },
      {
        role: "Construction (skilled trades)",
        range: "KWD 220 – 380 / month",
        benefits: "Camp accommodation, transport, food allowance",
      },
    ],
    lifeInCountry:
      "Life in Kuwait is centred on tight-knit expatriate communities across Salmiya, Hawally, and Fahaheel. Weekly Malayali, Tamil, Hindi, and Filipino congregations, a strong Indian Embassy welfare cell, and easy Friday getaways to Failaka Island or the Marina Crescent make settling in straightforward.",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1580332449264-1e35c9b6f4b0?auto=format&fit=crop&w=900&q=80",
        alt: "Nurse checking patient chart in Kuwaiti hospital ward",
      },
      {
        url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80",
        alt: "Construction site workers reviewing plans in the Gulf",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
        alt: "Modern residential accommodation for expatriate workers",
      },
      {
        url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
        alt: "Candidate briefing session at recruitment office",
      },
    ],
    visaNotes:
      "Ozone Overseas manages the full Kuwaiti work-visa cycle under the Kafala framework — from initial NOC coordination with the sponsoring employer through visa stamping at the Kuwait Consulate. Every step is documented and traceable, in line with MEA e-Migrate protocols.",
    visaHandled: [
      "Employer NOC and demand-letter verification",
      "MOFA and Kuwait Embassy attestation of certificates",
      "Medical fitness (GAMCA) coordination",
      "Work permit and residency (Iqama) processing support",
      "Visa stamping and pre-departure orientation",
    ],
    documentationNotes:
      "Kuwait's Ministry of Health and Manpower Authority require specific attestation formats. We prepare and verify every document before submission to prevent costly rework at the consulate stage.",
    documentationChecklist: [
      "Passport valid for 18+ months with two blank pages",
      "MOFA-attested educational and professional certificates",
      "Kuwait-format Police Clearance Certificate (PCC)",
      "GAMCA medical certificate from an approved centre",
      "Nursing council / trade certification (where applicable)",
    ],
    testimonials: [
      {
        name: "Anitha R.",
        role: "Staff Nurse, Ministry of Health Kuwait",
        quote:
          "From my Prometric booking to the visa stamp, Ozone kept me updated every week. I landed in Kuwait with my accommodation confirmed and joining letter in hand.",
      },
      {
        name: "Rakesh M.",
        role: "Site Supervisor, Ahmadi",
        quote:
          "Contract read exactly like the demand letter I signed in Mumbai. No surprise deductions, salary hit my Kuwaiti account on the 3rd of every month.",
      },
    ],
    faqs: [
      {
        q: "Is my Indian nursing licence recognised in Kuwait?",
        a: "Yes — Kuwait's Ministry of Health accepts nurses registered with an Indian State Nursing Council, subject to a prometric exam and license endorsement. We guide you through registration, exam scheduling, and dataflow verification.",
      },
      {
        q: "What are typical caregiver contract terms in Kuwait?",
        a: "Standard contracts run 24 months with employer-sponsored accommodation, annual air ticket, and medical insurance. All terms are printed in the demand letter and MEA-attested before you sign.",
      },
      {
        q: "How long does the Kuwait deployment process usually take?",
        a: "From offer to boarding, most healthcare placements complete in 8–12 weeks. Construction and technical categories vary with GAMCA slot availability.",
      },
      {
        q: "Do I pay any fees to Ozone Overseas?",
        a: "For employer-sponsored roles, our service charges are governed by the MEA fee ceiling. You will receive a written receipt for every rupee — no cash, no informal payments.",
      },
    ],
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    metaTitle: "Saudi Arabia Recruitment Agency — Ozone Overseas",
    metaDescription:
      "MEA-licensed recruitment to the Kingdom of Saudi Arabia. Nurses, doctors, engineers, hospitality staff, and skilled technicians placed under Nitaqat-compliant contracts.",
    heroImageKeywords: "Riyadh skyline Kingdom Tower",
    heroImageUrl:
      "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1600&q=80",
    tagline: "Ethical. Compliant. End-to-end recruitment to Saudi Arabia.",
    intro:
      "Saudi Arabia's Vision 2030 build-out has opened thousands of roles for Indian professionals across MoH hospitals, NEOM, Aramco contractors, and hospitality groups. Ozone Overseas places candidates only with Green and Platinum Nitaqat-tier employers — the tiers with the strongest track record on wage protection and Iqama processing.",
    jobCategories: [
      { title: "Nurses", icon: "Stethoscope" },
      { title: "Doctors", icon: "HeartPulse" },
      { title: "Engineers", icon: "Building2" },
      { title: "Hospitality Staff", icon: "UtensilsCrossed" },
      { title: "Skilled Technicians", icon: "Wrench" },
    ],
    stats: [
      { value: "3,400+", label: "KSA placements to date" },
      { value: "70+", label: "SCFHS-verified hospitals partnered" },
      { value: "10–14 wks", label: "Typical time from offer to Iqama" },
      { value: "24/7", label: "Riyadh liaison desk support" },
    ],
    salaryTable: [
      {
        role: "Registered Nurse (MoH)",
        range: "SAR 4,500 – 7,000 / month",
        benefits: "Accommodation, transport, 30 days paid leave",
      },
      {
        role: "General Practitioner",
        range: "SAR 15,000 – 25,000 / month",
        benefits: "Housing allowance, family visa eligibility, medical",
      },
      {
        role: "Civil / MEP Engineer",
        range: "SAR 8,000 – 15,000 / month",
        benefits: "Accommodation or allowance, transport, annual ticket",
      },
      {
        role: "Hospitality (F&B, front office)",
        range: "SAR 2,200 – 4,500 / month",
        benefits: "Duty meals, shared accommodation, tips",
      },
      {
        role: "Skilled Technician (HVAC / electrical)",
        range: "SAR 2,800 – 5,500 / month",
        benefits: "Camp accommodation, transport, overtime",
      },
    ],
    lifeInCountry:
      "Riyadh, Jeddah, Dammam, and the new Red Sea developments each have distinct Indian community footprints — with CBSE and Indian curriculum schools, strong consular support, and family-visa pathways for licensed professionals. Weekend life increasingly includes concerts, marathons, and heritage sites reopened under the 2030 tourism reforms.",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80",
        alt: "Medical team in Saudi hospital corridor",
      },
      {
        url: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&w=900&q=80",
        alt: "Civil engineers on Saudi infrastructure site",
      },
      {
        url: "https://images.unsplash.com/photo-1590650046871-92c887180603?auto=format&fit=crop&w=900&q=80",
        alt: "Hotel front office team in Riyadh",
      },
      {
        url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80",
        alt: "Riyadh cityscape at dusk",
      },
    ],
    visaNotes:
      "We handle Musaned-registered contracts and Qiwa work-permit processing for every Saudi placement. Enjazit visa applications are lodged through the Royal Embassy of Saudi Arabia in Delhi with full document traceability.",
    visaHandled: [
      "Musaned contract registration and employer verification",
      "Saudi Council for Health Specialties (SCFHS) Dataflow & Prometric coordination",
      "Ministry of Foreign Affairs (MOFA) and Embassy attestation",
      "Enjazit visa stamping and biometric appointments",
      "Iqama and Qiwa work-permit follow-through post-arrival",
    ],
    documentationNotes:
      "Saudi Arabia requires Dataflow verification for regulated professions and full apostille/attestation of academic credentials. We manage this end-to-end so candidates never chase paperwork alone.",
    documentationChecklist: [
      "Passport with 24+ months validity",
      "SCFHS Dataflow report (for healthcare roles)",
      "MEA-apostilled degree, transcripts, and experience letters",
      "Police Clearance Certificate attested by MEA and Saudi Embassy",
      "GAMCA medical fitness certificate",
    ],
    testimonials: [
      {
        name: "Dr. Vinod K.",
        role: "General Practitioner, Jeddah",
        quote:
          "SCFHS Dataflow finished in 42 days because Ozone had the file ready before I even accepted the offer. Family visa followed within four months.",
      },
      {
        name: "Sneha P.",
        role: "ICU Nurse, Riyadh",
        quote:
          "The pre-departure briefing on WPS and Musaned made a real difference — I knew exactly what to expect on payroll day one.",
      },
    ],
    faqs: [
      {
        q: "How does SCFHS Dataflow verification work?",
        a: "SCFHS verifies your credentials directly with the issuing university and employer. It takes 30–60 days. We initiate the request, track it, and prepare you for the Prometric exam that follows.",
      },
      {
        q: "What is Nitaqat and does it affect my job offer?",
        a: "Nitaqat is Saudi Arabia's Saudisation program that classifies employers by their Saudi-national headcount. We only work with Green and Platinum-tier employers, which means stable sponsorship and on-time salaries.",
      },
      {
        q: "Are engineering roles subject to SCE registration?",
        a: "Yes — engineers must register with the Saudi Council of Engineers within 90 days of arrival. We prepare your accreditation file before departure so registration is a formality, not an obstacle.",
      },
      {
        q: "Can my family join me on my Iqama?",
        a: "Family visas are available for most skilled and professional categories once your Iqama is issued and salary thresholds are met. We brief you on the exact criteria for your role.",
      },
    ],
  },
  {
    slug: "qatar",
    name: "Qatar",
    metaTitle: "Qatar Recruitment Agency — Ozone Overseas",
    metaDescription:
      "MEA-licensed recruitment to Qatar for nurses, electricians, HVAC technicians, and hotel staff. Ethical, contract-transparent placements to Doha and beyond.",
    heroImageKeywords: "Doha Corniche skyline Qatar",
    heroImageUrl:
      "https://images.unsplash.com/photo-1541417904950-b491bbdb85cd?auto=format&fit=crop&w=1600&q=80",
    tagline: "Ethical. Compliant. End-to-end recruitment to Qatar.",
    intro:
      "Post-World-Cup Qatar continues to invest heavily in healthcare, tourism, and facility management. With its Wage Protection System and the 2020 mobility reforms, Qatar is now one of the safest Gulf markets for Indian workers — provided the contract is right. That's where we come in.",
    jobCategories: [
      { title: "Nurses", icon: "Stethoscope" },
      { title: "Electricians", icon: "Zap" },
      { title: "HVAC Technicians", icon: "Snowflake" },
      { title: "Hotel Staff", icon: "Hotel" },
    ],
    stats: [
      { value: "900+", label: "Qatar placements since 2018" },
      { value: "100%", label: "WPS-compliant employer roster" },
      { value: "QVC", label: "In-India medicals & biometrics" },
      { value: "2 yrs", label: "Standard renewable contract" },
    ],
    salaryTable: [
      {
        role: "Registered Nurse (HMC / private)",
        range: "QAR 6,500 – 9,500 / month",
        benefits: "Accommodation, transport, ticket, medical",
      },
      {
        role: "Electrician (industrial)",
        range: "QAR 2,200 – 3,800 / month",
        benefits: "Camp, food allowance, overtime, ticket",
      },
      {
        role: "HVAC Technician",
        range: "QAR 2,400 – 4,200 / month",
        benefits: "Camp accommodation, transport, overtime",
      },
      {
        role: "Hotel Staff (4/5-star)",
        range: "QAR 1,800 – 3,500 / month",
        benefits: "Duty meals, shared room, service charge, tips",
      },
    ],
    lifeInCountry:
      "Doha's Indian community anchors life around Al Wakrah, Al Sadd, and the Industrial Area's workers' city. The Corniche, Katara Cultural Village, and Msheireb Downtown make weekends walkable. Direct daily flights from Kochi, Chennai, Mumbai, Delhi, and Kolkata keep home close.",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80",
        alt: "Nurse consulting with patient at Doha clinic",
      },
      {
        url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80",
        alt: "Electrician working on industrial panel",
      },
      {
        url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=900&q=80",
        alt: "HVAC technician on rooftop unit",
      },
      {
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
        alt: "Hotel front-of-house team in Doha",
      },
    ],
    visaNotes:
      "Qatar's post-Kafala labour reforms allow direct employer contracts and mid-contract mobility. We register every placement through the QVC (Qatar Visa Centre) in India and ensure contracts meet the Wage Protection System (WPS).",
    visaHandled: [
      "QVC biometric and medical appointment booking",
      "Contract attestation via Qatar Chamber and MOFA",
      "Ministry of Interior work-visa processing",
      "WPS-compliant salary account setup guidance",
      "Qatar ID (QID) coordination post-arrival",
    ],
    documentationNotes:
      "Qatar's QVC process centralises medicals, biometrics, and contract signing in India — so you land in Doha work-ready. We schedule and prepare every appointment.",
    documentationChecklist: [
      "Passport valid for 24+ months",
      "Trade certificates and experience letters (MEA-attested)",
      "Qatar Council for Healthcare Practitioners (QCHP) Dataflow report (nurses)",
      "Police Clearance Certificate attested by Qatar Embassy",
      "QVC medical clearance",
    ],
    testimonials: [
      {
        name: "Mohammed A.",
        role: "HVAC Technician, Doha Industrial Area",
        quote:
          "QVC medicals and trade test were all done in Mumbai. I flew to Doha with the job ready to start on day one.",
      },
      {
        name: "Priya S.",
        role: "Staff Nurse, HMC",
        quote:
          "QCHP Dataflow felt intimidating until Ozone's healthcare desk walked me through it. Cleared Prometric in the first attempt.",
      },
    ],
    faqs: [
      {
        q: "Do HVAC technicians need a Qatar trade test?",
        a: "Yes — most contractors require a practical trade test at QVC or the employer's site in Doha. We arrange pre-test familiarisation so you go in prepared.",
      },
      {
        q: "What is the standard hotel-staff contract length?",
        a: "Two years, renewable, with duty meals, shared accommodation, and paid annual leave with return ticket. All terms are printed in the demand letter you receive before signing.",
      },
      {
        q: "Can I change employers in Qatar after arrival?",
        a: "Since the 2020 labour reforms, workers can change jobs without a No-Objection Certificate after serving notice. We brief you on the current rules during pre-departure orientation.",
      },
      {
        q: "How does the Wage Protection System benefit me?",
        a: "WPS mandates that your salary is deposited directly into a Qatari bank account monthly. Any delay is flagged to the Ministry of Labour — a strong safeguard against wage disputes.",
      },
    ],
  },
  {
    slug: "oman",
    name: "Oman",
    metaTitle: "Oman Recruitment Agency — Ozone Overseas",
    metaDescription:
      "MEA-licensed placements to the Sultanate of Oman. Nurses, industrial workers, and mechanical technicians recruited under transparent, ethical contracts.",
    heroImageKeywords: "Muscat harbour Sultan Qaboos mosque",
    heroImageUrl:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80",
    tagline: "Ethical. Compliant. End-to-end recruitment to Oman.",
    intro:
      "Oman's oil, gas, and downstream manufacturing sectors — anchored around Sohar, Duqm, and Salalah — need thousands of skilled Indian technicians every year. Ozone Overseas is one of the few Indian recruiters with a permanent Muscat coordination presence, giving candidates a real handhold after arrival.",
    jobCategories: [
      { title: "Nurses", icon: "Stethoscope" },
      { title: "Industrial Workers", icon: "Factory" },
      { title: "Mechanical Technicians", icon: "Cog" },
    ],
    stats: [
      { value: "600+", label: "Oman deployments since 2016" },
      { value: "Sohar · Duqm", label: "Active industrial corridors" },
      { value: "H2S / BOSIET", label: "Safety training partnerships" },
      { value: "48 hrs", label: "Post-arrival check-in window" },
    ],
    salaryTable: [
      {
        role: "Registered Nurse (MoH / Royal Hospital)",
        range: "OMR 380 – 620 / month",
        benefits: "Accommodation, transport, ticket, medical",
      },
      {
        role: "Mechanical Technician (oil & gas)",
        range: "OMR 320 – 550 / month",
        benefits: "Camp, food, PPE, overtime, rotation ticket",
      },
      {
        role: "Industrial Worker (Sohar / Duqm)",
        range: "OMR 180 – 300 / month",
        benefits: "Camp accommodation, meals, transport",
      },
      {
        role: "Welder / Fitter (certified)",
        range: "OMR 260 – 480 / month",
        benefits: "Camp, PPE, overtime, ticket",
      },
    ],
    lifeInCountry:
      "Muscat is calm, coastal, and safe — Indian schools, temples, gurdwaras, and churches operate openly. Ruwi and Al Khuwair anchor the Indian professional community. Duqm and Sohar workers' cities are purpose-built with clinics, canteens, and Wi-Fi zones inspected under Oman's labour law.",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=900&q=80",
        alt: "Industrial technician inspecting refinery valve",
      },
      {
        url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80",
        alt: "Engineer with clipboard on plant walkway",
      },
      {
        url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80",
        alt: "Nurse in Omani hospital ward",
      },
      {
        url: "https://images.unsplash.com/photo-1590650046871-92c887180603?auto=format&fit=crop&w=900&q=80",
        alt: "Pre-departure orientation session with candidates",
      },
    ],
    visaNotes:
      "Ozone processes Oman employment visas via the Royal Oman Police (ROP) e-visa portal in coordination with your sponsoring employer. Every contract is vetted against Ministry of Labour Omanisation guidelines.",
    visaHandled: [
      "Employer sponsorship and demand-letter verification",
      "MOFA and Oman Embassy attestation",
      "Oman Medical Speciality Board (OMSB) prometric coordination for nurses",
      "ROP e-visa lodgement and stamping",
      "Resident card and labour clearance post-arrival",
    ],
    documentationNotes:
      "Industrial and mechanical roles in Oman's oil, gas, and manufacturing sectors require verified trade certificates and safety credentials. We audit every file before submission.",
    documentationChecklist: [
      "Passport valid for 18+ months",
      "ITI / trade certificate, MEA-attested",
      "H2S, BOSIET, or NEBOSH safety certifications where required",
      "Police Clearance Certificate attested by Oman Embassy",
      "GAMCA medical fitness certificate",
    ],
    testimonials: [
      {
        name: "Suresh N.",
        role: "Mechanical Technician, Sohar",
        quote:
          "Contract, camp, and rotation cycle were exactly as briefed. The 90-day welfare call from Ozone's Muscat desk was a genuine surprise.",
      },
      {
        name: "Fathima B.",
        role: "Nurse, Royal Hospital",
        quote:
          "OMSB Prometric coordination was seamless. Ozone shared previous-year question patterns and connected me with a Muscat mentor before I left.",
      },
    ],
    faqs: [
      {
        q: "Which safety certifications do industrial workers need for Oman?",
        a: "Oil-and-gas employers commonly require H2S Awareness, BOSIET, or NEBOSH IGC. We list the exact certifications on the job card and connect you to approved training centres in India if you don't hold them yet.",
      },
      {
        q: "Is there a trade test for mechanical technicians?",
        a: "Yes — most Omani contractors conduct a practical trade test either at our facilitation centre or at the employer's site. Shortlisted candidates receive a preparation brief tailored to the employer.",
      },
      {
        q: "How does Omanisation affect expatriate hiring?",
        a: "Certain job titles are reserved for Omani nationals. We only publish roles that are open to expatriates under current Ministry of Labour quotas, so your application is never on shaky ground.",
      },
      {
        q: "What are typical living conditions on industrial sites?",
        a: "Employers provide camp accommodation with meals, transport, and medical cover. Standards are inspected under Oman's labour law — we share employer camp ratings before you accept an offer.",
      },
    ],
  },
  {
    slug: "uae",
    name: "UAE (Dubai & Abu Dhabi)",
    metaTitle: "UAE Recruitment Agency (Dubai & Abu Dhabi) — Ozone Overseas",
    metaDescription:
      "MEA-licensed recruitment to the UAE. Healthcare, hospitality, retail, drivers, engineers, and skilled trades placed across Dubai and Abu Dhabi.",
    heroImageKeywords: "Dubai skyline Burj Khalifa",
    heroImageUrl:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
    tagline: "Ethical. Compliant. End-to-end recruitment to the UAE.",
    intro:
      "The UAE remains India's single largest overseas jobs corridor — from DHA hospitals in Dubai to DOH clinics in Abu Dhabi, Expo City projects, and the retail and hospitality boom across the emirates. Ozone Overseas maps each candidate to the right emirate, regulator, and free-zone or mainland pathway before we even quote a job.",
    jobCategories: [
      { title: "Healthcare Professionals", icon: "Stethoscope" },
      { title: "Hospitality Staff", icon: "UtensilsCrossed" },
      { title: "Retail Professionals", icon: "ShoppingBag" },
      { title: "Drivers", icon: "Car" },
      { title: "Engineers", icon: "Building2" },
      { title: "Skilled Trades", icon: "Hammer" },
    ],
    stats: [
      { value: "5,000+", label: "UAE placements to date" },
      { value: "DHA · DOH · MOH", label: "All three healthcare regulators" },
      { value: "12+", label: "Free-zone employer partners" },
      { value: "2 yrs", label: "Standard MOHRE contract" },
    ],
    salaryTable: [
      {
        role: "Registered Nurse (DHA / DOH)",
        range: "AED 5,500 – 9,000 / month",
        benefits: "Accommodation or allowance, transport, ticket, medical",
      },
      {
        role: "Hospitality (4/5-star hotels)",
        range: "AED 2,200 – 4,500 / month",
        benefits: "Duty meals, shared accommodation, service charge",
      },
      {
        role: "Retail Professional (mall / boutique)",
        range: "AED 2,500 – 5,500 / month",
        benefits: "Accommodation, transport, commission",
      },
      {
        role: "Driver (light / heavy)",
        range: "AED 2,800 – 5,000 / month",
        benefits: "Accommodation, fuel card, overtime",
      },
      {
        role: "Civil / MEP Engineer",
        range: "AED 7,000 – 15,000 / month",
        benefits: "Housing allowance, transport, family visa eligibility",
      },
      {
        role: "Skilled Trades (electrician / plumber)",
        range: "AED 2,000 – 4,200 / month",
        benefits: "Camp accommodation, transport, overtime",
      },
    ],
    lifeInCountry:
      "Dubai and Abu Dhabi are the most connected Gulf cities for Indian professionals — CBSE, ICSE, and Kerala-syllabus schools, direct flights to 20+ Indian cities, and one of the largest Indian consular networks in the region. Sharjah and Ajman offer affordable housing for skilled trades commuting into Dubai.",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80",
        alt: "Healthcare team on hospital rounds",
      },
      {
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
        alt: "Hospitality staff at hotel reception",
      },
      {
        url: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=900&q=80",
        alt: "Retail professional assisting customer at counter",
      },
      {
        url: "https://images.unsplash.com/photo-1590650046871-92c887180603?auto=format&fit=crop&w=900&q=80",
        alt: "Pre-departure orientation for UAE-bound candidates",
      },
    ],
    visaNotes:
      "We process UAE employment visas through MOHRE (Ministry of Human Resources and Emiratisation) for mainland roles, and through the relevant free-zone authority for DIFC, DMCC, and Abu Dhabi Global Market placements.",
    visaHandled: [
      "MOHRE / free-zone work-permit application",
      "Ministry of Foreign Affairs and UAE Embassy attestation",
      "DHA / HAAD / MOH licensing coordination for healthcare",
      "Employment visa stamping and entry-permit issuance",
      "Emirates ID and medical fitness post-arrival guidance",
    ],
    documentationNotes:
      "The UAE's document rules differ by emirate and by regulator. Healthcare candidates go through DHA (Dubai), DOH (Abu Dhabi), or MOH; drivers need UAE licence conversion — we map each candidate to the exact pathway.",
    documentationChecklist: [
      "Passport valid for 24+ months",
      "MEA + UAE Embassy attested degree and experience letters",
      "DHA / DOH / MOH eligibility letter (healthcare)",
      "Valid Indian driving licence for driver categories",
      "Police Clearance Certificate attested for the UAE",
    ],
    testimonials: [
      {
        name: "Reshma T.",
        role: "DHA Nurse, Dubai",
        quote:
          "Ozone routed me to DHA when another agency was pushing me toward DOH. That single call saved me six weeks of licensing rework.",
      },
      {
        name: "Ganesh V.",
        role: "Hotel F&B, Abu Dhabi",
        quote:
          "Contract, service charge, and duty meals were exactly as printed. The Ozone WhatsApp desk still replies when I have Emirates ID questions.",
      },
    ],
    faqs: [
      {
        q: "What's the difference between DHA, DOH, and MOH licensing?",
        a: "DHA governs Dubai, DOH (formerly HAAD) governs Abu Dhabi, and MOH covers the northern emirates. Each has its own Dataflow and Prometric process. We match your target emirate to the right regulator before you apply.",
      },
      {
        q: "Can I convert my Indian driving licence in the UAE?",
        a: "Indian licences are eligible for direct conversion in some emirates for specific licence categories, subject to an eye test and RTA fees. For commercial driving, additional UAE-issued permits are required — we outline the exact steps.",
      },
      {
        q: "What visa category applies to retail and hospitality staff?",
        a: "Most placements are on a standard 2-year MOHRE employment visa with sponsored accommodation or a housing allowance. Free-zone hospitality roles may use free-zone employment visas with equivalent benefits.",
      },
      {
        q: "Are there Emiratisation quotas that affect my role?",
        a: "Emiratisation targets apply mostly to mid- and senior-level corporate roles in mainland companies with 50+ staff. Skilled trades, healthcare, and hospitality remain broadly open to expatriates.",
      },
    ],
  },
];

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}
