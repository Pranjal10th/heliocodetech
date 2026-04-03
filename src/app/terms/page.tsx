import { PublicHeader } from "@/components/PublicHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { LegalDoc } from "@/components/LegalDoc";
import { getSiteSettings } from "@/lib/settings";
import { COMPANY, defaultSettings } from "@/lib/defaults";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and Conditions for ${COMPANY.name}`,
};

export default async function TermsPage() {
  const settings = await getSiteSettings();
  const tagline = settings.footer_tagline ?? defaultSettings.footer_tagline;

  return (
    <>
      <PublicHeader />
      <main>
        <LegalDoc title="Terms & Conditions">
          <section>
            <h2>1. Agreement</h2>
            <p>
              By accessing or using the website at {COMPANY.website} (the &quot;Site&quot;) operated by {COMPANY.name}
              (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;), you agree to these Terms &amp; Conditions. If you do not agree, please do not use
              the Site.
            </p>
          </section>
          <section>
            <h2>2. Services</h2>
            <p>
              Information on the Site describes our IT, software, AI, web/app development, solar energy, and related services
              in general terms. Specific scope, deliverables, and fees are governed by separate written proposals or contracts.
            </p>
          </section>
          <section>
            <h2>3. Use of the Site</h2>
            <p>You agree to use the Site only for lawful purposes. You must not:</p>
            <ul>
              <li>Attempt to gain unauthorized access to our systems or other users&apos; data;</li>
              <li>Transmit malware, spam, or harmful content;</li>
              <li>Misrepresent your identity or affiliation.</li>
            </ul>
          </section>
          <section>
            <h2>4. Intellectual property</h2>
            <p>
              Content on the Site (text, graphics, logos, and design) is owned by the Company or its licensors and is protected
              by applicable intellectual property laws. You may not copy or reuse such content without prior written consent,
              except as allowed by law.
            </p>
          </section>
          <section>
            <h2>5. Limitation of liability</h2>
            <p>
              The Site and its content are provided &quot;as is&quot; without warranties of any kind, to the fullest extent permitted by
              law. We are not liable for any indirect, incidental, or consequential damages arising from your use of the Site.
            </p>
          </section>
          <section>
            <h2>6. Indemnity</h2>
            <p>You agree to indemnify and hold harmless the Company from claims arising out of your misuse of the Site or violation of these terms.</p>
          </section>
          <section>
            <h2>7. Governing law</h2>
            <p>
              These terms are governed by the laws of India. Courts at Lucknow, Uttar Pradesh, shall have exclusive jurisdiction
              over disputes, subject to applicable law.
            </p>
          </section>
          <section>
            <h2>8. Changes</h2>
            <p>We may modify these Terms &amp; Conditions at any time. Continued use of the Site after changes constitutes acceptance of the updated terms.</p>
          </section>
          <section>
            <h2>9. Contact</h2>
            <p>
              Questions:{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-teal-400 hover:underline">
                {COMPANY.email}
              </a>
              , {COMPANY.address}.
            </p>
          </section>
        </LegalDoc>
      </main>
      <SiteFooter tagline={tagline} />
      <WhatsAppFloat />
    </>
  );
}
