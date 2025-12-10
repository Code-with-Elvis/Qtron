import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 to-primary/5 py-12">
        <div className="qtron-container text-center">
          <Badge className="mb-4 rounded py-1">Privacy</Badge>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Last updated: December 10, 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="qtron-container max-w-4xl mx-auto">
          <Card className="rounded">
            <CardContent className="p-8 space-y-8">
              {/* Introduction */}
              <div>
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At Qtron, we take your privacy seriously. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your
                  information when you visit our website and use our services.
                  Please read this privacy policy carefully. If you do not agree
                  with the terms of this privacy policy, please do not access
                  the site.
                </p>
              </div>

              <Separator />

              {/* Information We Collect */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  2. Information We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Personal Information
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-2">
                      We may collect personal information that you voluntarily
                      provide to us when you:
                    </p>
                    <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                      <li>Register for an account</li>
                      <li>Make a purchase</li>
                      <li>Subscribe to our newsletter</li>
                      <li>Participate in surveys or promotions</li>
                      <li>Contact customer support</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mt-3">
                      This information may include: name, email address, phone
                      number, shipping address, billing address, payment
                      information, and any other information you choose to
                      provide.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Automatically Collected Information
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-2">
                      When you visit our website, we automatically collect
                      certain information about your device, including:
                    </p>
                    <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                      <li>IP address and location data</li>
                      <li>Browser type and version</li>
                      <li>Operating system</li>
                      <li>Referring URLs and pages visited</li>
                      <li>Date and time of visits</li>
                      <li>Browsing behavior and shopping preferences</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              {/* How We Use Your Information */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  3. How We Use Your Information
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Process and fulfill your orders</li>
                    <li>Communicate with you about your orders and account</li>
                    <li>Send you marketing and promotional communications</li>
                    <li>Personalize your shopping experience</li>
                    <li>Improve our website and services</li>
                    <li>Detect and prevent fraud and security threats</li>
                    <li>Comply with legal obligations</li>
                    <li>Analyze trends and user behavior</li>
                    <li>Provide customer support</li>
                  </ul>
                </div>
              </div>

              <Separator />

              {/* Sharing Your Information */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  4. Sharing Your Information
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    We may share your information with third parties in the
                    following situations:
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      <strong>Service Providers:</strong> We work with
                      third-party companies to help us operate our business,
                      such as payment processors, shipping companies, and
                      marketing platforms.
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> If we are involved in
                      a merger, acquisition, or sale of assets, your information
                      may be transferred.
                    </li>
                    <li>
                      <strong>Legal Requirements:</strong> We may disclose your
                      information when required by law or to protect our rights
                      and safety.
                    </li>
                    <li>
                      <strong>With Your Consent:</strong> We may share your
                      information with third parties when you give us permission
                      to do so.
                    </li>
                  </ul>
                  <p className="mt-3">
                    We do not sell your personal information to third parties
                    for their marketing purposes.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Cookies and Tracking */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  5. Cookies and Tracking Technologies
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    We use cookies and similar tracking technologies to track
                    activity on our website and store certain information.
                    Cookies help us:
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Remember your preferences and settings</li>
                    <li>Keep you logged in</li>
                    <li>Understand how you use our website</li>
                    <li>Show you relevant advertisements</li>
                    <li>Analyze website performance</li>
                  </ul>
                  <p className="mt-3">
                    You can control cookies through your browser settings.
                    However, disabling cookies may affect your ability to use
                    certain features of our website. For more information, see
                    our Cookie Policy.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Data Security */}
              <div>
                <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures
                  to protect your personal information from unauthorized access,
                  alteration, disclosure, or destruction. These measures
                  include:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-muted-foreground mt-3">
                  <li>SSL encryption for data transmission</li>
                  <li>
                    Secure payment processing through PCI-compliant systems
                  </li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  However, no method of transmission over the internet is 100%
                  secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <Separator />

              {/* Your Privacy Rights */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  7. Your Privacy Rights
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Depending on your location, you may have the following
                    rights:
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      <strong>Access:</strong> Request a copy of the personal
                      information we hold about you
                    </li>
                    <li>
                      <strong>Correction:</strong> Request correction of
                      inaccurate or incomplete information
                    </li>
                    <li>
                      <strong>Deletion:</strong> Request deletion of your
                      personal information
                    </li>
                    <li>
                      <strong>Opt-out:</strong> Unsubscribe from marketing
                      communications
                    </li>
                    <li>
                      <strong>Data Portability:</strong> Request transfer of
                      your data to another service
                    </li>
                    <li>
                      <strong>Object:</strong> Object to processing of your
                      personal information
                    </li>
                  </ul>
                  <p className="mt-3">
                    To exercise these rights, please contact us at
                    privacy@qtron.com.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Third-Party Links */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  8. Third-Party Links
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites. We are
                  not responsible for the privacy practices or content of these
                  external sites. We encourage you to review the privacy
                  policies of any third-party sites you visit.
                </p>
              </div>

              <Separator />

              {/* Children's Privacy */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  9. Children&#39;s Privacy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not intended for children under the age of
                  13. We do not knowingly collect personal information from
                  children under 13. If we learn that we have collected personal
                  information from a child under 13, we will take steps to
                  delete that information as soon as possible.
                </p>
              </div>

              <Separator />

              {/* International Transfers */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  10. International Data Transfers
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your information may be transferred to and processed in
                  countries other than your country of residence. These
                  countries may have different data protection laws. We take
                  appropriate safeguards to ensure your personal information
                  remains protected in accordance with this Privacy Policy.
                </p>
              </div>

              <Separator />

              {/* Changes to Policy */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  11. Changes to This Privacy Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the &#34;Last updated&#34; date. We
                  encourage you to review this Privacy Policy periodically for
                  any changes.
                </p>
              </div>

              <Separator />

              {/* Contact Us */}
              <div>
                <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please
                  contact us:
                </p>
                <div className="mt-4 space-y-1 text-muted-foreground">
                  <p>Email: privacy@qtron.com</p>
                  <p>Phone: 1-800-QTRON-24</p>
                  <p>Address: 123 Commerce Avenue, New York, NY 10001</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};
export default PrivacyPolicy;
