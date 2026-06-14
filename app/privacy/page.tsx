import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/LegalPage";
import { PRIVACY } from "@/lib/content/legal/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Medari collects, uses, stores, protects and discloses information, in line with the Australian Privacy Principles.",
};

export default function PrivacyPage() {
  return <LegalPage doc={PRIVACY} />;
}
