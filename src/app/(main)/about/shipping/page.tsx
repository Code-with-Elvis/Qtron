import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Box,
  Clock,
  Globe,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";

const Shipping = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 to-primary/5 py-12">
        <div className="qtron-container text-center">
          <Badge className="mb-4 rounded py-1">Shipping Information</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Fast & Reliable Delivery Worldwide
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We partner with trusted carriers to deliver your orders safely and
            on time. Learn about our shipping options, delivery times, and
            policies.
          </p>
        </div>
      </section>

      {/* Shipping Options Section */}
      <section className="py-12">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Shipping Options
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Truck className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Standard Shipping
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Economical shipping option for non-urgent orders.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Delivery: 5-7 business days</li>
                  <li>• Cost: $5.99 or FREE over $50</li>
                  <li>• Track your package online</li>
                  <li>• Available nationwide</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded border-primary">
              <CardContent className="pt-6">
                <Badge className="mb-2 rounded">Popular</Badge>
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Package className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Express Shipping
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Faster delivery for time-sensitive orders.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Delivery: 2-3 business days</li>
                  <li>• Cost: $12.99</li>
                  <li>• Real-time tracking</li>
                  <li>• Signature required</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Clock className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Next-Day Delivery
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Get your order tomorrow with our fastest option.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Delivery: Next business day</li>
                  <li>• Cost: $19.99</li>
                  <li>• Order by 2 PM for next day</li>
                  <li>• Limited to select areas</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* International Shipping Section */}
      <section className="py-12 bg-muted/30">
        <div className="qtron-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                International Shipping
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We ship to over 100 countries worldwide. International
                  shipping rates and delivery times vary by destination.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Globe className="size-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>Standard International:</strong> 10-20 business
                      days, starting at $15.99
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Globe className="size-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>Express International:</strong> 5-10 business
                      days, starting at $29.99
                    </span>
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> International orders may be subject to
                  customs duties and import taxes, which are the customer&apos;s
                  responsibility.
                </p>
              </div>
            </div>
            <div
              style={{ backgroundImage: "url('/delivery.png')" }}
              className="h-64 md:h-96 bg-muted bg-cover bg-center bg-no-repeat rounded"
            ></div>
          </div>
        </div>
      </section>

      {/* Shipping Features Section */}
      <section className="py-12">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Shipping Benefits
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <ShieldCheck className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Secure Packaging
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  All items are carefully packed to ensure they arrive in
                  perfect condition.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <MapPin className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Real-Time Tracking
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Track your package every step of the way from warehouse to
                  doorstep.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Box className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Free Returns
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Easy, hassle-free returns within 30 days on eligible items.
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
                  Shipping Insurance
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  All shipments are insured against loss or damage during
                  transit.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-muted/30">
        <div className="qtron-container max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Shipping FAQs
          </h2>
          <div className="space-y-6">
            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">
                  When will my order ship?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Orders are processed within 1-2 business days. You&apos;ll
                  receive a shipping confirmation email with tracking
                  information once your order ships.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">
                  How can I track my package?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Once your order ships, you&apos;ll receive a tracking number
                  via email. You can also track your order from your account
                  dashboard on our website.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">
                  What if my package is delayed?
                </h3>
                <p className="text-sm text-muted-foreground">
                  While rare, delays can occur due to weather or carrier issues.
                  If your package is significantly delayed, please contact our
                  customer support team for assistance.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Do you ship to PO Boxes?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we ship to PO Boxes using USPS. However, express and
                  next-day delivery options may not be available for PO Box
                  addresses.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Can I change my shipping address after ordering?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Address changes can only be made before the order ships.
                  Contact customer support immediately if you need to update
                  your shipping address.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="qtron-container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need Help with Shipping?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our customer support team is available 24/7 to answer any questions
            about shipping and delivery.
          </p>
          <p className="text-muted-foreground">
            Email:{" "}
            <a href="mailto:shipping@qtron.com" className="text-primary">
              shipping@qtron.com
            </a>{" "}
            | Phone: 1-800-QTRON-SHIP
          </p>
        </div>
      </section>
    </>
  );
};
export default Shipping;
