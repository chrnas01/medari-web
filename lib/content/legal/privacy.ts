import type { LegalDoc } from "@/lib/content/types";

// Ported verbatim from https://medari.com.au/privacy (last updated 27 May 2026).
export const PRIVACY: LegalDoc = {
  title: "Privacy Policy & Data Handling Policy",
  updated: "27 May 2026",
  blocks: [
    {
      type: "p",
      text: `MEDARI ("we", "us", "our") provides an AI-driven rostering and clinic optimisation platform for General Practices and healthcare organisations. We are committed to protecting the privacy, security, and confidentiality of all information processed through our systems.`,
    },
    {
      type: "p",
      text: `This policy outlines how we collect, use, store, protect, and disclose information in accordance with the Australian Privacy Principles (APPs) under the Privacy Act 1988, as well as industry-standard security and data governance practices.`,
    },

    { type: "h2", text: "1. Information We Collect" },
    {
      type: "p",
      text: "We only collect the minimum information required to operate MEDARI safely and effectively. This includes:",
    },
    { type: "h3", text: "1.1. Clinic Operational Data" },
    {
      type: "p",
      text: "From practice management systems (PMS), manually uploaded files, or other practice systems:",
    },
    {
      type: "ul",
      items: [
        "Appointment schedules (dates, times, provider IDs)",
        "Arrival and check-in timestamps",
        "Wait times",
        "Consultation durations (derived from billing/timestamp data)",
        "Provider calendars and availability",
        "Staff roles and hours (GPs, nurses, admin)",
        "Clinic operational metrics (patient volume, demand patterns)",
      ],
    },
    {
      type: "p",
      lead: "Important:",
      text: "We do not collect patient names, Medicare numbers, clinical notes, diagnoses, or any identifiable health information.",
    },
    { type: "h3", text: "1.2. User Information" },
    { type: "p", text: "For administrators and staff:" },
    {
      type: "ul",
      items: [
        "Full name",
        "Email address",
        "Phone number",
        "Role (GP, nurse, admin, etc.)",
        "Work preferences (hours, days, availability)",
      ],
    },
    { type: "h3", text: "1.3. Technical Information" },
    { type: "p", text: "Automatically captured when using MEDARI:" },
    {
      type: "ul",
      items: [
        "IP address",
        "Device type",
        "Browser type",
        "Usage logs",
        "Authentication records",
        "System events",
      ],
    },
    {
      type: "p",
      text: "This information is used solely for platform performance, security, and troubleshooting.",
    },

    { type: "h2", text: "2. How We Use Your Information" },
    { type: "p", text: "We use collected data to:" },
    {
      type: "ul",
      items: [
        "Generate AI-driven rosters based on clinic demand",
        "Predict patient flow and optimise staffing levels",
        "Provide analytics and efficiency reports",
        "Support administrative functions",
        "Enhance service performance",
        "Maintain security and auditing",
        "Facilitate integration with clinic practice management systems (PMS)",
      ],
    },
    {
      type: "p",
      text: "We do not use clinic data for advertising, marketing, or selling to third parties.",
    },

    { type: "h2", text: "3. Data Minimisation & De-Identification" },
    { type: "p", text: "Where possible, MEDARI:" },
    {
      type: "ul",
      items: [
        "Removes all patient identifiers",
        "Uses only aggregated and time-based data",
        "Converts operational data into statistical patterns",
        "Stores no Medicare or clinical details",
      ],
    },
    {
      type: "p",
      text: "All AI and forecasting models use de-identified, non-personal operational data.",
    },

    { type: "h2", text: "4. Secure Data Storage" },
    {
      type: "p",
      text: "All data is stored in secure, encrypted infrastructure located in Australia.",
    },
    { type: "h3", text: "Security Measures:" },
    {
      type: "ul",
      items: [
        "AES-256 encryption at rest",
        "TLS 1.2+ encryption in transit",
        "Strict access controls and role-based permissions",
        "Multi-factor authentication for admin accounts",
        "Isolated tenant architecture",
        "Continuous monitoring and logging",
      ],
    },
    { type: "h3", text: "Backup & Retention:" },
    {
      type: "ul",
      items: [
        "Daily encrypted backups",
        "Incremental version retention",
        "Secure deletion in accordance with APPs",
      ],
    },

    { type: "h2", text: "5. Access & Permissions" },
    {
      type: "p",
      text: "Only authorised personnel may access clinic data, and only for purposes of:",
    },
    { type: "ul", items: ["Technical support", "Troubleshooting", "Integration maintenance"] },
    {
      type: "p",
      text: "All access is logged, audited, and restricted on a need-to-know basis.",
    },

    { type: "h2", text: "6. Data Sharing" },
    { type: "p", text: "We do not sell, rent, or trade data." },
    { type: "p", text: "Data may only be shared with:" },
    { type: "h3", text: "6.1 Practice Management Systems (PMS)" },
    {
      type: "p",
      text: "For syncing roster and operational data back to the clinic system (if enabled).",
    },
    { type: "h3", text: "6.2 Service Providers" },
    { type: "p", text: "Trusted partners who support our infrastructure, including:" },
    {
      type: "ul",
      items: [
        "Cloud hosting providers (AWS, Azure)",
        "Email and SMS delivery tools",
        "Security monitoring services",
      ],
    },
    {
      type: "p",
      text: "All providers must meet strict security and confidentiality standards.",
    },
    { type: "h3", text: "6.3 Legal or Regulatory Obligations" },
    { type: "p", text: "Only if required by law and with proper verification." },

    { type: "h2", text: "7. Data Retention & Deletion" },
    { type: "p", text: "Clinics may request:" },
    {
      type: "ul",
      items: ["Data export", "Data correction", "Data deletion", "Account closure"],
    },
    { type: "p", text: "We retain operational data only as long as necessary for:" },
    { type: "ul", items: ["Reporting", "Compliance", "Service performance"] },
    { type: "p", text: "Upon account termination:" },
    {
      type: "ul",
      items: [
        "All identifiable user data is deleted",
        "Operational data is anonymised or securely destroyed",
        "Backups are purged according to retention cycles",
      ],
    },

    { type: "h2", text: "8. User Responsibilities" },
    { type: "p", text: "Clinics must ensure:" },
    {
      type: "ul",
      items: [
        "Staff access follows least-privilege principles",
        "Login credentials are kept secure",
        "Compliance with local privacy obligations when connecting systems to MEDARI",
      ],
    },

    { type: "h2", text: "9. Cookies & Tracking" },
    { type: "p", text: "MEDARI uses minimal cookies for:" },
    { type: "ul", items: ["Authentication", "Session management", "Platform performance"] },
    { type: "p", text: "We do not use tracking for marketing or advertising." },

    { type: "h2", text: "10. Changes to This Policy" },
    { type: "p", text: "We may update this policy periodically." },
    { type: "p", text: "Clinics will be notified of any material changes." },

    { type: "h2", text: "11. Contact Us" },
    { type: "p", text: "For privacy inquiries or requests:" },
    {
      type: "contact",
      entity: "Medari Pty Ltd",
      email: "support@medari.com.au",
      url: "https://medari.com.au",
    },
  ],
};
