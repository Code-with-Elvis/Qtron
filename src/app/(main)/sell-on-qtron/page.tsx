import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  Globe,
  HeadphonesIcon,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";

const Sell = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 to-primary/5 py-12">
        <div className="qtron-container">
          <Badge className="mb-4 rounded py-1">Sell on Qtron</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Start Selling & Grow Your Business
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            Join thousands of successful sellers reaching millions of customers
            worldwide. List your products, manage orders, and scale your
            business with our powerful seller tools.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="">
              <a href="https://www.elvis-o-dev.com/contact" target="_blank">
                Start Selling
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Sell Section */}
      <section className="py-12">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center sr-only">
            Why Sell on Qtron?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Globe className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Global Reach
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Access millions of customers in over 100 countries. Expand
                  your market beyond borders.
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
                  Easy Setup
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Create your seller account in minutes. Start listing products
                  and making sales right away.
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
                  Powerful Analytics
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Track sales, monitor performance, and optimize your listings
                  with detailed insights.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <ShieldCheck className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Secure Payments
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Get paid securely and on time. We handle transactions so you
                  can focus on growing.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <HeadphonesIcon className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Dedicated Support
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Our seller support team is available 24/7 to help you succeed
                  on our platform.
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
                  Growth Tools
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Use promotions, advertising, and marketing tools to boost your
                  sales and visibility.
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
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="size-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Account</h3>
              <p className="text-sm text-muted-foreground">
                Sign up and contact our sales team to get started. Continue to
                next step after approval.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="size-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">List Products</h3>
              <p className="text-sm text-muted-foreground">
                Add your products with descriptions, images, and pricing. Set
                your inventory levels.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="size-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Selling</h3>
              <p className="text-sm text-muted-foreground">
                Receive orders, ship products, and get paid. Grow your business
                with our tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seller Success Stats */}
      <section className="py-12">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center sr-only">
            Join Our Growing Seller Community
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                50K+
              </p>
              <p className="text-muted-foreground">Active Sellers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                $500M+
              </p>
              <p className="text-muted-foreground">Total Sales Volume</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                2M+
              </p>
              <p className="text-muted-foreground">Products Listed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                95%
              </p>
              <p className="text-muted-foreground">Seller Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Sell;
