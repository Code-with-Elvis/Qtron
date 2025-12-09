import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Package, ShieldCheck, Truck, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 to-primary/5 py-12">
        <div className="qtron-container">
          <Badge className="mb-4 rounded py-1">About Qtron</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Your Trusted Electrical Marketplace
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Since our founding, Qtron has been committed to bringing quality
            products from around the world directly to your doorstep. We believe
            shopping should be easy, secure, and enjoyable.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12">
        <div className="qtron-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Qtron was created with a simple mission: make high-quality
                  electronics accessible to everyone, no matter where they are.
                  What began as a small tech-focused store has evolved into a
                  trusted destination for buyers who demand performance,
                  reliability, and value.
                </p>

                <p>
                  Today, we offer a curated selection of electronics, from
                  smartphones and laptops to audio gear, gaming devices, smart
                  home gadgets, and more. Every category is carefully crafted to
                  ensure you find the right tech for your lifestyle.
                </p>

                <p>
                  We partner with trusted brands and verified sellers to ensure
                  that every product meets our high standards. Our team works
                  tirelessly to bring you the best deals, the latest trends, and
                  exceptional service.
                </p>
              </div>
            </div>
            <div
              style={{ backgroundImage: "url('/delivery.png')" }}
              className=" h-50 md:h-100 bg-muted bg-cover bg-center bg-no-repeat "
            ></div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-12 bg-muted/30">
        <div className="qtron-container">
          <h2 className=" text-2xl md:text-3xl font-bold mb-6">
            What We Stand For
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Users className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Customer First
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Your satisfaction is our top priority. We listen, adapt, and
                  continuously improve to serve you better.
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
                  Trust & Security
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Shop with confidence. We use advanced security measures to
                  protect your data and transactions.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Package className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Quality Products
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Every product is carefully selected and verified to meet our
                  high standards of quality.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Truck className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Fast Delivery
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Get your orders quickly with our efficient logistics network
                  and reliable shipping partners.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="qtron-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl  md:text-4xl font-bold text-primary mb-2">
                10M+
              </p>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl  md:text-4xl font-bold text-primary mb-2">
                50K+
              </p>
              <p className="text-muted-foreground">Products Available</p>
            </div>
            <div className="text-center">
              <p className="text-3xl  md:text-4xl font-bold text-primary mb-2">
                100+
              </p>
              <p className="text-muted-foreground">Countries Served</p>
            </div>
            <div className="text-center">
              <p className="text-3xl  md:text-4xl font-bold text-primary mb-2">
                24/7
              </p>
              <p className="text-muted-foreground">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-muted/30">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-8">
            To be the world&#39;s most customer-centric marketplace, where
            anyone can discover and purchase anything they want online. We
            strive to make every shopping experience seamless, secure, and
            satisfying.
          </p>
          <p className="text-muted-foreground">
            Join millions of satisfied customers who trust Qtron for their
            shopping needs. Experience the difference today.
          </p>
        </div>
      </section>
    </>
  );
};
export default AboutPage;
