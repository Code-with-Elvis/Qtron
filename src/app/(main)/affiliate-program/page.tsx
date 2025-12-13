import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  Gift,
  LineChart,
  Percent,
  Share2,
  Users,
} from "lucide-react";
import Link from "next/link";

const AffiliateProgram = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 to-primary/5 py-12">
        <div className="qtron-container">
          <Badge className="mb-4 rounded py-1">Affiliate Program</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Earn Money By Promoting Qtron
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            Join our affiliate program and earn generous commissions by sharing
            Qtron with your audience. Get paid for every sale you refer.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <a href="https://www.elvis-o-dev.com/contact" target="_blank">
                Join as Affiliate
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Program Benefits Section */}
      <section className="py-12">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center sr-only">
            Why Join Our Affiliate Program?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Percent className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Competitive Commissions
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Earn up to 10% commission on every sale. The more you refer,
                  the more you earn.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <DollarSign className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Timely Payouts
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Get paid monthly via your preferred payment method. Minimum
                  payout threshold of just $50.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <LineChart className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Real-Time Tracking
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Monitor your clicks, conversions, and earnings with our
                  advanced affiliate dashboard.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Share2 className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Marketing Materials
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Access banners, product links, and promotional content to help
                  you succeed.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Gift className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Exclusive Bonuses
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Top performers receive special bonuses, rewards, and exclusive
                  promotional opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Users className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Dedicated Support
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Our affiliate team is here to help you maximize your earnings
                  and grow your business.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-muted/30">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            How it works
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="size-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-sm text-muted-foreground">
                Create your free affiliate account and get approved instantly.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="size-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Your Links</h3>
              <p className="text-sm text-muted-foreground">
                Access unique tracking links and promotional materials from your
                dashboard.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="size-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share & Promote</h3>
              <p className="text-sm text-muted-foreground">
                Share your links on your website, blog, social media, or email
                list.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="size-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold">
                  4
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn Commission</h3>
              <p className="text-sm text-muted-foreground">
                Get paid for every successful purchase made through your
                referral links.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Structure Section */}
      <section className="py-12">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center sr-only">
            Commission Structure
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="rounded">
              <CardContent className="pt-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Starter</h3>
                <p className="text-4xl font-bold text-primary mb-2">5%</p>
                <p className="text-sm text-muted-foreground mb-4">
                  0-50 sales per month
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>Basic tracking</li>
                  <li>Standard materials</li>
                  <li>Monthly payouts</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded border-primary">
              <CardContent className="pt-6 text-center">
                <Badge className="mb-2 rounded">Popular</Badge>
                <h3 className="text-xl font-semibold mb-2">Pro</h3>
                <p className="text-4xl font-bold text-primary mb-2">7%</p>
                <p className="text-sm text-muted-foreground mb-4">
                  51-200 sales per month
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>Advanced tracking</li>
                  <li>Premium materials</li>
                  <li>Bi-weekly payouts</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Elite</h3>
                <p className="text-4xl font-bold text-primary mb-2">10%</p>
                <p className="text-sm text-muted-foreground mb-4">
                  200+ sales per month
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>Priority support</li>
                  <li>Custom materials</li>
                  <li>Weekly payouts</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};
export default AffiliateProgram;
