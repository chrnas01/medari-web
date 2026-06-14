import type { LegalDoc } from "@/lib/content/types";

// Ported verbatim from https://medari.com.au/terms (last updated 27 May 2026).
export const TERMS: LegalDoc = {
  title: "Terms of Service",
  updated: "27 May 2026",
  blocks: [
    {
      type: "p",
      text: `Welcome to MEDARI ("we", "us", "our"). These Terms of Service ("Terms") govern your access to and use of MEDARI's AI-driven rostering and clinic optimisation platform (the "Service") provided by Medari Pty Ltd.`,
    },
    {
      type: "p",
      text: "By accessing or using MEDARI, you agree to be bound by these Terms. If you do not agree to these Terms, you must not use the Service.",
    },
    {
      type: "p",
      lead: "Important:",
      text: "Please read these Terms carefully. If you are using MEDARI on behalf of an organisation, you represent that you have authority to bind that organisation to these Terms.",
    },

    { type: "h2", text: "1. Acceptance of Terms" },
    {
      type: "p",
      text: "By creating an account, accessing, or using MEDARI, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy, which is incorporated by reference.",
    },
    {
      type: "p",
      text: "These Terms constitute a legally binding agreement between you (or the organisation you represent) and Medari Pty Ltd.",
    },

    { type: "h2", text: "2. Account Registration & Eligibility" },
    { type: "h3", text: "2.1. Eligibility" },
    {
      type: "p",
      text: "You must be at least 18 years old and have the legal capacity to enter into contracts. You represent that:",
    },
    {
      type: "ul",
      items: [
        "All information provided during registration is accurate and current",
        "You will maintain and update this information as necessary",
        "You are authorised to use the Service on behalf of your organisation (if applicable)",
      ],
    },
    { type: "h3", text: "2.2. Account Security" },
    { type: "p", text: "You are responsible for:" },
    {
      type: "ul",
      items: [
        "Maintaining the confidentiality of your account credentials",
        "All activities that occur under your account",
        "Notifying us immediately of any unauthorised access",
        "Ensuring staff members with account access follow security best practices",
      ],
    },
    { type: "h3", text: "2.3. Account Termination" },
    {
      type: "p",
      text: "We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or pose a security risk.",
    },

    { type: "h2", text: "3. Use of Service" },
    { type: "h3", text: "3.1. Permitted Use" },
    { type: "p", text: "MEDARI is designed for healthcare organisations to:" },
    {
      type: "ul",
      items: [
        "Generate AI-driven staff rosters based on clinic demand",
        "Optimise clinic operations and staffing levels",
        "Analyse operational patterns and efficiency",
        "Integrate with practice management systems (e.g., Best Practice)",
      ],
    },
    { type: "h3", text: "3.2. Prohibited Activities" },
    { type: "p", text: "You must not:" },
    {
      type: "ul",
      items: [
        "Use the Service for any illegal or unauthorised purpose",
        "Attempt to gain unauthorised access to our systems or other accounts",
        "Interfere with or disrupt the Service or servers",
        "Reverse engineer, decompile, or disassemble any part of the Service",
        "Use automated systems (bots, scrapers) to access the Service without permission",
        "Share account credentials with unauthorised parties",
        "Upload malicious code, viruses, or harmful content",
        "Use the Service to violate any applicable laws or regulations",
      ],
    },

    { type: "h2", text: "4. Data & Privacy" },
    {
      type: "p",
      text: "Your use of MEDARI is also governed by our Privacy Policy. By using the Service, you consent to the collection, use, and disclosure of information as described in our Privacy Policy.",
    },
    {
      type: "p",
      lead: "Data Responsibility:",
      text: "You are responsible for ensuring that any data you upload or integrate with MEDARI complies with applicable privacy laws, including the Privacy Act 1988 (Australia) and any relevant healthcare privacy regulations.",
    },

    { type: "h2", text: "5. Fees & Payment" },
    { type: "h3", text: "5.1. Subscription Fees" },
    {
      type: "p",
      text: "MEDARI may be offered on a subscription basis. Fees, billing cycles, and payment terms will be specified in your service agreement or during the sign-up process.",
    },
    { type: "h3", text: "5.2. Payment Terms" },
    {
      type: "ul",
      items: [
        "Fees are charged in advance for the billing period",
        "All fees are non-refundable except as required by law",
        "You must provide valid payment information",
        "Failure to pay may result in service suspension or termination",
      ],
    },
    { type: "h3", text: "5.3. Price Changes" },
    {
      type: "p",
      text: "We reserve the right to modify pricing with reasonable notice. Continued use of the Service after price changes constitutes acceptance of the new pricing.",
    },

    { type: "h2", text: "6. Intellectual Property" },
    { type: "h3", text: "6.1. Our Intellectual Property" },
    {
      type: "p",
      text: "The Service, including all software, algorithms, designs, text, graphics, and other content, is owned by Medari Pty Ltd or its licensors and is protected by Australian and international copyright, trademark, and other intellectual property laws.",
    },
    { type: "h3", text: "6.2. Your Data" },
    {
      type: "p",
      text: "You retain ownership of any data you upload or provide to MEDARI. By using the Service, you grant us a limited, non-exclusive license to use, process, and store your data solely for the purpose of providing and improving the Service.",
    },
    { type: "h3", text: "6.3. Feedback" },
    {
      type: "p",
      text: "Any feedback, suggestions, or ideas you provide about MEDARI may be used by us without obligation or compensation to you.",
    },

    { type: "h2", text: "7. Service Availability & Modifications" },
    {
      type: "p",
      text: "We strive to maintain high availability of the Service but do not guarantee uninterrupted or error-free operation. The Service may be temporarily unavailable due to:",
    },
    {
      type: "ul",
      items: [
        "Scheduled maintenance",
        "Technical issues",
        "Force majeure events",
        "Third-party service disruptions",
      ],
    },
    {
      type: "p",
      text: "We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice, except in cases of emergency.",
    },

    { type: "h2", text: "8. Third-Party Integrations" },
    {
      type: "p",
      text: "MEDARI may integrate with third-party services (e.g., Best Practice software). Your use of such integrations is subject to the terms and conditions of those third parties.",
    },
    {
      type: "p",
      text: "We are not responsible for the availability, accuracy, or functionality of third-party services. Any issues with third-party integrations should be directed to the respective service provider.",
    },

    { type: "h2", text: "9. Disclaimers & Limitations of Liability" },
    { type: "h3", text: `9.1. Service "As Is"` },
    {
      type: "p",
      text: `The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.`,
    },
    { type: "h3", text: "9.2. AI & Forecasting Accuracy" },
    {
      type: "p",
      text: "While MEDARI uses advanced AI and forecasting models, we do not guarantee the accuracy of predictions, forecasts, or recommendations. You should review and validate all roster suggestions before implementation.",
    },
    { type: "h3", text: "9.3. Limitation of Liability" },
    { type: "p", text: "To the maximum extent permitted by law:" },
    {
      type: "ul",
      items: [
        "We are not liable for any indirect, incidental, special, consequential, or punitive damages",
        "Our total liability is limited to the amount you paid us in the 12 months preceding the claim",
        "We are not responsible for decisions made based on MEDARI recommendations",
        "You are responsible for ensuring compliance with all applicable healthcare regulations",
      ],
    },
    {
      type: "p",
      lead: "Australian Consumer Law:",
      text: "Nothing in these Terms excludes, restricts, or modifies any rights you may have under the Australian Consumer Law or other applicable consumer protection laws that cannot be excluded.",
    },

    { type: "h2", text: "10. Indemnification" },
    {
      type: "p",
      text: "You agree to indemnify, defend, and hold harmless Medari Pty Ltd, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:",
    },
    {
      type: "ul",
      items: [
        "Your use of the Service",
        "Your violation of these Terms",
        "Your violation of any applicable laws or regulations",
        "Any data or content you provide to MEDARI",
        "Your infringement of any third-party rights",
      ],
    },

    { type: "h2", text: "11. Termination" },
    { type: "h3", text: "11.1. Termination by You" },
    {
      type: "p",
      text: "You may terminate your account at any time by contacting us or through your account settings. Termination will be effective at the end of your current billing period, unless otherwise specified.",
    },
    { type: "h3", text: "11.2. Termination by Us" },
    { type: "p", text: "We may suspend or terminate your account immediately if:" },
    {
      type: "ul",
      items: [
        "You breach these Terms",
        "You fail to pay fees when due",
        "You engage in fraudulent or illegal activity",
        "You pose a security risk to the Service",
      ],
    },
    { type: "h3", text: "11.3. Effect of Termination" },
    {
      type: "p",
      text: "Upon termination, your right to use the Service will immediately cease. We may delete your account data in accordance with our Privacy Policy and data retention practices.",
    },

    { type: "h2", text: "12. Governing Law & Dispute Resolution" },
    {
      type: "p",
      text: "These Terms are governed by the laws of New South Wales, Australia. Any disputes arising from these Terms or your use of the Service will be subject to the exclusive jurisdiction of the courts of New South Wales.",
    },
    {
      type: "p",
      text: "Before initiating formal legal proceedings, we encourage you to contact us to resolve any disputes through good faith negotiation.",
    },

    { type: "h2", text: "13. Changes to Terms" },
    {
      type: "p",
      text: "We may update these Terms from time to time to reflect changes in our Service, legal requirements, or business practices. Material changes will be notified to you via email or through the Service.",
    },
    {
      type: "p",
      text: "Your continued use of MEDARI after changes become effective constitutes acceptance of the updated Terms. If you do not agree to the changes, you must stop using the Service and terminate your account.",
    },

    { type: "h2", text: "14. General Provisions" },
    { type: "h3", text: "14.1. Entire Agreement" },
    {
      type: "p",
      text: "These Terms, together with our Privacy Policy, constitute the entire agreement between you and Medari Pty Ltd regarding the Service.",
    },
    { type: "h3", text: "14.2. Severability" },
    {
      type: "p",
      text: "If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full effect.",
    },
    { type: "h3", text: "14.3. Assignment" },
    {
      type: "p",
      text: "You may not assign or transfer these Terms without our prior written consent. We may assign these Terms to any successor or affiliate.",
    },
    { type: "h3", text: "14.4. Waiver" },
    {
      type: "p",
      text: "Our failure to enforce any provision of these Terms does not constitute a waiver of that provision.",
    },

    { type: "h2", text: "15. Contact Us" },
    { type: "p", text: "If you have questions about these Terms, please contact us:" },
    {
      type: "contact",
      entity: "Medari Pty Ltd",
      email: "support@medari.com.au",
      url: "https://medari.com.au",
    },
    { type: "p", text: "© 2026 Medari Pty Ltd. All rights reserved." },
  ],
};
