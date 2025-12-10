import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const CookiePolicy = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 to-primary/5 py-12">
        <div className="qtron-container text-center">
          <Badge className="mb-4 rounded py-1">Cookies</Badge>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
            Cookie Policy
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
                <h2 className="text-2xl font-bold mb-4">
                  1. What Are Cookies?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are placed on your device
                  when you visit a website. They are widely used to make
                  websites work more efficiently, provide a better user
                  experience, and provide information to website owners. Cookies
                  help us remember your preferences, understand how you use our
                  site, and improve our services.
                </p>
              </div>

              <Separator />

              {/* Types of Cookies */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  2. Types of Cookies We Use
                </h2>
                <div className="space-y-6">
                  {/* Essential Cookies */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <span className="text-primary">●</span>
                      Essential Cookies
                    </h3>
                    <p className="text-muted-foreground leading-relaxed ml-6">
                      These cookies are necessary for the website to function
                      properly. They enable core functionality such as security,
                      network management, and accessibility. You cannot opt out
                      of these cookies as they are essential for the site to
                      work.
                    </p>
                    <div className="ml-6 mt-2 text-sm text-muted-foreground">
                      <p className="font-medium">Examples:</p>
                      <ul className="list-disc ml-6 space-y-1 mt-1">
                        <li>Authentication and login sessions</li>
                        <li>Shopping cart functionality</li>
                        <li>Security and fraud prevention</li>
                        <li>Load balancing</li>
                      </ul>
                    </div>
                  </div>

                  {/* Performance Cookies */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <span className="text-primary">●</span>
                      Performance Cookies
                    </h3>
                    <p className="text-muted-foreground leading-relaxed ml-6">
                      These cookies collect information about how visitors use
                      our website, such as which pages are visited most often
                      and if users receive error messages. These cookies help us
                      improve how our website works.
                    </p>
                    <div className="ml-6 mt-2 text-sm text-muted-foreground">
                      <p className="font-medium">Examples:</p>
                      <ul className="list-disc ml-6 space-y-1 mt-1">
                        <li>Google Analytics</li>
                        <li>Page load times and performance metrics</li>
                        <li>Error tracking</li>
                        <li>Traffic sources and user flow</li>
                      </ul>
                    </div>
                  </div>

                  {/* Functionality Cookies */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <span className="text-primary">●</span>
                      Functionality Cookies
                    </h3>
                    <p className="text-muted-foreground leading-relaxed ml-6">
                      These cookies allow our website to remember choices you
                      make (such as your username, language, or region) and
                      provide enhanced, personalized features.
                    </p>
                    <div className="ml-6 mt-2 text-sm text-muted-foreground">
                      <p className="font-medium">Examples:</p>
                      <ul className="list-disc ml-6 space-y-1 mt-1">
                        <li>Language and currency preferences</li>
                        <li>Theme and display settings</li>
                        <li>Recently viewed products</li>
                        <li>Saved shipping addresses</li>
                      </ul>
                    </div>
                  </div>

                  {/* Targeting Cookies */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <span className="text-primary">●</span>
                      Targeting/Advertising Cookies
                    </h3>
                    <p className="text-muted-foreground leading-relaxed ml-6">
                      These cookies are used to deliver advertisements that are
                      relevant to you and your interests. They also help us
                      measure the effectiveness of our advertising campaigns.
                    </p>
                    <div className="ml-6 mt-2 text-sm text-muted-foreground">
                      <p className="font-medium">Examples:</p>
                      <ul className="list-disc ml-6 space-y-1 mt-1">
                        <li>Facebook Pixel</li>
                        <li>Google Ads</li>
                        <li>Retargeting campaigns</li>
                        <li>Social media advertising</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Third-Party Cookies */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  3. Third-Party Cookies
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    In addition to our own cookies, we may use various
                    third-party cookies to report usage statistics, deliver
                    advertisements, and provide enhanced functionality.
                  </p>
                  <div className="space-y-4 mt-4">
                    <div>
                      <p className="font-semibold text-foreground mb-1">
                        Google Analytics
                      </p>
                      <p className="text-sm">
                        We use Google Analytics to understand how visitors
                        interact with our website. This helps us improve user
                        experience and content.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">
                        Payment Processors
                      </p>
                      <p className="text-sm">
                        Our payment partners (Stripe, PayPal, etc.) may set
                        cookies to process transactions securely and prevent
                        fraud.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">
                        Social Media Platforms
                      </p>
                      <p className="text-sm">
                        Social media cookies enable you to share content and
                        connect your social media accounts with our website.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Cookie Duration */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  4. How Long Do Cookies Last?
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Session Cookies
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      These cookies are temporary and are deleted when you close
                      your browser. They help us remember your actions during a
                      browsing session.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Persistent Cookies
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      These cookies remain on your device for a set period or
                      until you delete them. They help us recognize you when you
                      return to our website and remember your preferences.
                      Persistent cookies typically last from a few days to
                      several years.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Managing Cookies */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  5. How to Manage Cookies
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    You have the right to decide whether to accept or reject
                    cookies. You can exercise your cookie preferences through
                    your browser settings.
                  </p>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="font-semibold text-foreground mb-2">
                      Browser Settings
                    </p>
                    <p className="text-sm mb-3">
                      Most web browsers allow you to control cookies through
                      their settings. Here&#39;s how to manage cookies in
                      popular browsers:
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-sm">
                      <li>
                        <strong>Chrome:</strong> Settings → Privacy and security
                        → Cookies and other site data
                      </li>
                      <li>
                        <strong>Firefox:</strong> Options → Privacy & Security →
                        Cookies and Site Data
                      </li>
                      <li>
                        <strong>Safari:</strong> Preferences → Privacy → Manage
                        Website Data
                      </li>
                      <li>
                        <strong>Edge:</strong> Settings → Cookies and site
                        permissions → Cookies and site data
                      </li>
                    </ul>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg">
                    <p className="font-semibold text-foreground mb-1">
                      ⚠️ Important Note
                    </p>
                    <p className="text-sm">
                      Blocking or deleting cookies may impact your experience on
                      our website. Some features and services may not work
                      properly, and you may need to manually adjust some
                      preferences every time you visit.
                    </p>
                  </div>

                  <div className="mt-4">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      Manage Cookie Preferences
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Do Not Track */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  6. Do Not Track Signals
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Some browsers include a &#34;Do Not Track&#34; (DNT) feature
                  that signals to websites that you do not want to be tracked.
                  Currently, there is no industry standard for how DNT signals
                  should be interpreted. We do not currently respond to DNT
                  signals, but we are committed to respecting your privacy
                  choices.
                </p>
              </div>

              <Separator />

              {/* Updates to Policy */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  7. Updates to This Cookie Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect
                  changes in technology, legislation, or our business practices.
                  We will notify you of any significant changes by posting the
                  updated policy on this page with a new &#34;Last updated&#34;
                  date.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};
export default CookiePolicy;
