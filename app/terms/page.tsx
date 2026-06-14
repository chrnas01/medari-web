import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/LegalPage";
import { TERMS } from "@/lib/content/legal/terms";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing access to and use of the Medari platform, provided by Medari Pty Ltd.",
};

export default function TermsPage() {
  return <LegalPage doc={TERMS} />;
}
