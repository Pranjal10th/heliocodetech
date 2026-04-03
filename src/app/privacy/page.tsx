import { PublicHeader } from "@/components/PublicHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { LegalDoc } from "@/components/LegalDoc";
import { getSiteSettings } from "@/lib/settings";
import { COMPANY, defaultSettings } from "@/lib/defaults";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${COMPANY.name}`,
};

export default async function PrivacyPage() {
  const settings = await getSiteSettings();
  const tagline = settings.footer_tagline ?? defaultSettings.footer_tagline;

  return (
    <>
      <PublicHeader />
      <main>
        <LegalDoc title="Privacy Policy">
          <section>
            <h2>1. Introduction</h2>
            <p>
              {COMPANY.name} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard information when you visit our website {COMPANY.website}, use our enquiry
              forms, or engage with our services.
            </p>
          </section>
          <section>
            <h2>2. Information we may collect</h2>
            <ul>
              <li>
                <strong>Contact details:</strong> name, email address, phone number, and message content when you submit an
                enquiry or contact us.
              </li>
              <li>
                <strong>Technical data:</strong> browser type, device information, and approximate usage data (e.g. through
                server logs or analytics), where applicable.
              </li>
            </ul>
          </section>
          <section>
            <h2>3. How we use your information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to enquiries and provide customer support;</li>
              <li>Deliver, improve, and personalize our services;</li>
              <li>Comply with legal obligations and protect our legitimate business interests.</li>
            </ul>
          </section>
          <section>
            <h2>4. Sharing of information</h2>
            <p>
              We do not sell your personal data. We may share information with trusted service providers who assist our
              operations (e.g. hosting, email), subject to appropriate safeguards, or when required by law.
            </p>
          </section>
          <section>
            <h2>5. Data retention</h2>
            <p>
              We retain personal information only as long as necessary for the purposes described above or as required by
              applicable law.
            </p>
          </section>
          <section>
            <h2>6. Your rights</h2>
            <p>
              Depending on applicable law (including Indian data protection norms where relevant), you may have the right to
              access, correct, or request deletion of your personal data. Contact us using the details below.
            </p>
          </section>
          <section>
            <h2>7. Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your information. No method of
              transmission over the Internet is 100% secure.
            </p>
          </section>
          <section>
            <h2>8. Changes to this policy</h2>
            <p>We may update this Privacy Policy from time to time. The revised version will be posted on this page with an updated date.</p>
          </section>
          <section>
            <h2>9. Contact</h2>
            <p>
              For privacy-related questions:{" "}
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
