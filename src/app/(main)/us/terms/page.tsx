import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TermsPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 to-primary/5 py-12">
        <div className="qtron-container text-center">
          <Badge className="mb-4 rounded py-1">Legal</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Terms & Conditions
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
                  Welcome to Qtron. These Terms and Conditions (&#34;Terms&#34;)
                  govern your use of our website and services. By accessing or
                  using Qtron, you agree to be bound by these Terms. If you do
                  not agree with any part of these Terms, you may not use our
                  services.
                </p>
              </div>

              <Separator />

              {/* Account Registration */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  2. Account Registration
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    To access certain features of Qtron, you must create an
                    account. When you create an account, you agree to:
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      Provide accurate, current, and complete information during
                      registration
                    </li>
                    <li>
                      Maintain and promptly update your account information
                    </li>
                    <li>
                      Maintain the security of your password and accept all
                      risks of unauthorized access
                    </li>
                    <li>
                      Notify us immediately if you discover any unauthorized use
                      of your account
                    </li>
                    <li>
                      Be responsible for all activities that occur under your
                      account
                    </li>
                  </ul>
                  <p>
                    You may not use another person&#39;s account without
                    permission. We reserve the right to suspend or terminate
                    accounts that violate these Terms.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Purchases and Payments */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  3. Purchases and Payments
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    All purchases made through Qtron are subject to product
                    availability and acceptance by us. We reserve the right to
                    refuse or cancel any order for any reason.
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      Prices are displayed in your local currency and include
                      applicable taxes unless stated otherwise
                    </li>
                    <li>
                      We reserve the right to change prices at any time without
                      prior notice
                    </li>
                    <li>
                      Payment must be received before we dispatch your order
                    </li>
                    <li>
                      We accept various payment methods including credit cards,
                      debit cards, and digital payment services
                    </li>
                    <li>
                      All transactions are processed securely through encrypted
                      connections
                    </li>
                  </ul>
                </div>
              </div>

              <Separator />

              {/* Shipping and Delivery */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  4. Shipping and Delivery
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    We strive to deliver your orders in a timely manner.
                    However, delivery times are estimates and not guaranteed.
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      Shipping costs are calculated at checkout based on your
                      location
                    </li>
                    <li>
                      Free shipping is available for eligible orders as
                      indicated on product pages
                    </li>
                    <li>
                      You are responsible for providing accurate delivery
                      information
                    </li>
                    <li>
                      Risk of loss and title pass to you upon delivery to the
                      carrier
                    </li>
                    <li>
                      Import duties, taxes, and customs fees are the buyer&#39;s
                      responsibility
                    </li>
                  </ul>
                </div>
              </div>

              <Separator />

              {/* Returns and Refunds */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  5. Returns and Refunds
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    We want you to be satisfied with your purchase. Our return
                    policy allows you to return most items within 30 days of
                    delivery.
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      Items must be unused, in original packaging, and in
                      resalable condition
                    </li>
                    <li>
                      Certain items are non-returnable including perishables,
                      intimate items, and custom products
                    </li>
                    <li>
                      Refunds will be processed within 5-10 business days after
                      we receive your return
                    </li>
                    <li>
                      Shipping costs are non-refundable unless the return is due
                      to our error
                    </li>
                    <li>You are responsible for return shipping costs</li>
                  </ul>
                </div>
              </div>

              <Separator />

              {/* Intellectual Property */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  6. Intellectual Property Rights
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content on Qtron, including text, graphics, logos, images,
                  and software, is the property of Qtron or its content
                  suppliers and is protected by international copyright and
                  trademark laws. You may not reproduce, distribute, or create
                  derivative works from our content without express written
                  permission.
                </p>
              </div>

              <Separator />

              {/* User Conduct */}
              <div>
                <h2 className="text-2xl font-bold mb-4">7. User Conduct</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>You agree not to:</p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      Use our services for any illegal or unauthorized purpose
                    </li>
                    <li>
                      Violate any laws in your jurisdiction (including but not
                      limited to copyright laws)
                    </li>
                    <li>
                      Transmit any viruses, malware, or other harmful code
                    </li>
                    <li>
                      Interfere with or disrupt the integrity of our services
                    </li>
                    <li>
                      Attempt to gain unauthorized access to our systems or
                      networks
                    </li>
                    <li>Engage in any form of automated data collection</li>
                    <li>
                      Impersonate any person or entity or misrepresent your
                      affiliation
                    </li>
                  </ul>
                </div>
              </div>

              <Separator />

              {/* Limitation of Liability */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  8. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, Qtron shall not be
                  liable for any indirect, incidental, special, consequential,
                  or punitive damages, or any loss of profits or revenues,
                  whether incurred directly or indirectly, or any loss of data,
                  use, goodwill, or other intangible losses resulting from your
                  use of our services.
                </p>
              </div>

              <Separator />

              {/* Dispute Resolution */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  9. Dispute Resolution
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Any disputes arising out of or relating to these Terms or your
                  use of Qtron shall be resolved through binding arbitration in
                  accordance with the rules of the American Arbitration
                  Association. You agree to waive any right to a jury trial or
                  to participate in a class action lawsuit.
                </p>
              </div>

              <Separator />

              {/* Changes to Terms */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  10. Changes to Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms at any time. We
                  will notify you of any changes by posting the new Terms on
                  this page and updating the &#34;Last updated&#34; date. Your
                  continued use of Qtron after any changes constitutes
                  acceptance of the new Terms.
                </p>
              </div>

              <Separator />

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  11. Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms, please contact us
                  at:
                </p>
                <div className="mt-4 space-y-1 text-muted-foreground">
                  <p>Email: legal@qtron.com</p>
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
export default TermsPage;
