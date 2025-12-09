import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const LocationsPage = () => {
  const locations = [
    {
      city: "New York",
      country: "USA",
      type: "Headquarters",
      address: "123 Commerce Avenue, New York, NY 10001",
      phone: "+1 (212) 555-0100",
      email: "newyork@qtron.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM EST",
    },
    {
      city: "San Francisco",
      country: "USA",
      type: "Engineering Hub",
      address: "456 Tech Boulevard, San Francisco, CA 94102",
      phone: "+1 (415) 555-0200",
      email: "sf@qtron.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM PST",
    },
    {
      city: "London",
      country: "UK",
      type: "European Office",
      address: "789 Oxford Street, London, W1D 2HG",
      phone: "+44 20 7946 0300",
      email: "london@qtron.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM GMT",
    },
    {
      city: "Singapore",
      country: "Singapore",
      type: "Asia-Pacific Hub",
      address: "101 Marina Bay, Singapore 018989",
      phone: "+65 6789 0400",
      email: "singapore@qtron.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM SGT",
    },
    {
      city: "Nairobi",
      country: "Kenya",
      type: "African Regional Office",
      address: "Westlands Square, Nairobi, 00100",
      phone: "+254 20 123 4500",
      email: "nairobi@qtron.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM EAT",
    },
    {
      city: "Sydney",
      country: "Australia",
      type: "Regional Office",
      address: "567 George Street, Sydney, NSW 2000",
      phone: "+61 2 9876 0600",
      email: "sydney@qtron.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM AEDT",
    },
  ];

  const warehouses = [
    {
      location: "New Jersey, USA",
      size: "500,000 sq ft",
      description: "Primary fulfillment center for North America",
    },
    {
      location: "Frankfurt, Germany",
      size: "350,000 sq ft",
      description: "European distribution hub",
    },
    {
      location: "Shanghai, China",
      size: "600,000 sq ft",
      description: "Asia-Pacific fulfillment center",
    },
    {
      location: "São Paulo, Brazil",
      size: "200,000 sq ft",
      description: "South American distribution center",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 to-primary/5 py-12">
        <div className="qtron-container">
          <Badge className="mb-4 py-1 rounded">Our Locations</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Global Presence, Local Service
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            With offices and fulfillment centers around the world, we&#39;re
            always close to you. Visit us or get in touch with your nearest
            location.
          </p>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-12">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Office Locations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {locations.map((location, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow rounded"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-xl">{location.city}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {location.country}
                      </p>
                    </div>
                    <Badge variant="secondary" className="rounded">
                      {location.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="size-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      {location.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-5 text-primary shrink-0" />
                    <a
                      href={`tel:${location.phone}`}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {location.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="size-5 text-primary shrink-0" />
                    <a
                      href={`mailto:${location.email}`}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {location.email}
                    </a>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium">Business Hours</p>
                    <p className="text-sm text-muted-foreground">
                      {location.hours}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fulfillment Centers */}
      <section className="py-12 bg-muted/30">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-5">
            Fulfillment Centers
          </h2>
          <p className=" text-muted-foreground mb-6">
            Our state-of-the-art warehouses ensure fast and reliable delivery to
            customers worldwide.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {warehouses.map((warehouse, index) => (
              <Card key={index} className="rounded">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">
                    {warehouse.location}
                  </h3>
                  <p className="text-primary font-medium mb-2">
                    {warehouse.size}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {warehouse.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach Stats */}
      <section className="py-12">
        <div className="qtron-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">6</p>
              <p className="text-muted-foreground">Office Locations</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">4</p>
              <p className="text-muted-foreground">Fulfillment Centers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">100+</p>
              <p className="text-muted-foreground">Countries Served</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">24/7</p>
              <p className="text-muted-foreground">Support Coverage</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-primary/5">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need to Get in Touch?
          </h2>
          <p className="text-muted-foreground mb-6">
            Have questions or want to visit one of our locations? Our team is
            here to help.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </>
  );
};
export default LocationsPage;
