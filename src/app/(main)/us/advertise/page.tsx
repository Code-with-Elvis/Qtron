import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  Eye,
  MousePointerClick,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";

const Advertise = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 to-primary/5 py-12">
        <div className="qtron-container">
          <Badge className="mb-4 rounded py-1">Advertising Solutions</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Reach Millions of Active Shoppers
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            Advertise your products and brand on Qtron to reach a highly engaged
            audience. Drive sales, increase brand awareness, and grow your
            business with our targeted advertising solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Request a Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Advertise Section */}
      <section className="py-12">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center sr-only">
            Why Advertise on Qtron?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Eye className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  High Visibility
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Reach over 10 million monthly visitors actively searching for
                  products to buy.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Target className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Precise Targeting
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Target customers by demographics, interests, shopping
                  behavior, and purchase intent.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <BarChart3 className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Measurable Results
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Track impressions, clicks, conversions, and ROI with detailed
                  analytics.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <MousePointerClick className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  High Engagement
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Advertise to shoppers with high purchase intent and conversion
                  rates.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Zap className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Quick Setup
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Launch campaigns in minutes with our self-service platform or
                  managed services.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <TrendingUp className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Flexible Budget
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Start with any budget. Pay only for results with our
                  performance-based pricing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ad Formats Section */}
      <section className="py-12 bg-muted/30">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Solutions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">
                  Sponsored Products
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Promote individual products in search results and product
                  pages. Pay only when shoppers click.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Keyword targeting</li>
                  <li>• Product page placement</li>
                  <li>• Cost-per-click pricing</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Display Ads</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Showcase your brand with banner ads across the Qtron platform.
                  Build awareness and drive traffic.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Homepage placement</li>
                  <li>• Category pages</li>
                  <li>• Custom creatives</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Brand Stores</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create a dedicated storefront to showcase your entire product
                  catalog and tell your brand story.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Custom design</li>
                  <li>• Multiple pages</li>
                  <li>• Rich media support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Video Ads</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Engage customers with video content on product pages and
                  across the platform.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Auto-play or click-to-play</li>
                  <li>• Desktop and mobile</li>
                  <li>• Performance tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Email Marketing</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Reach customers directly with targeted email campaigns to our
                  engaged subscriber base.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Segmented audiences</li>
                  <li>• A/B testing</li>
                  <li>• Campaign analytics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">
                  Influencer Marketing
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Partner with Qtron influencers and content creators to promote
                  your products authentically.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Verified creators</li>
                  <li>• Campaign management</li>
                  <li>• Performance tracking</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center sr-only">
            How to Get Started
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="size-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Consult</h3>
              <p className="text-sm text-muted-foreground">
                Schedule a call with our advertising team to discuss your goals.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="size-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Plan Campaign</h3>
              <p className="text-sm text-muted-foreground">
                Choose ad formats, set budgets, and define your target audience.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="size-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Launch Ads</h3>
              <p className="text-sm text-muted-foreground">
                Create your ads and launch campaigns across the Qtron platform.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="size-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold">
                  4
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track & Optimize</h3>
              <p className="text-sm text-muted-foreground">
                Monitor performance and optimize campaigns for better results.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Advertise;
