import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  Globe,
  Heart,
  Lightbulb,
  MapPin,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const CareersPage = () => {
  const openPositions = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Remote / New York, NY",
      type: "Full-time",
      description:
        "Build scalable e-commerce solutions and work with cutting-edge technologies.",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      description:
        "Define product strategy and drive innovation in our marketplace platform.",
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Remote / London, UK",
      type: "Full-time",
      description:
        "Create intuitive and delightful shopping experiences for millions of users.",
    },
    {
      title: "Customer Success Manager",
      department: "Customer Service",
      location: "Austin, TX",
      type: "Full-time",
      description:
        "Help our customers succeed and ensure they have the best experience possible.",
    },
    {
      title: "Data Analyst",
      department: "Analytics",
      location: "Remote",
      type: "Full-time",
      description:
        "Turn data into actionable insights to drive business growth and customer satisfaction.",
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Los Angeles, CA",
      type: "Full-time",
      description:
        "Develop and execute marketing campaigns that resonate with our global audience.",
    },
  ];

  const benefits = [
    {
      icon: Globe,
      title: "Remote Flexibility",
      description:
        "Work from anywhere with flexible hours. We trust our team to deliver results.",
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description:
        "Comprehensive health, dental, and vision insurance. Mental health support and wellness programs.",
    },

    {
      icon: TrendingUp,
      title: "Career Growth",
      description:
        "Continuous learning opportunities, mentorship programs, and clear career advancement paths.",
    },
    {
      icon: Lightbulb,
      title: "Innovation Culture",
      description:
        "Experiment with new ideas, attend conferences, and work on cutting-edge projects.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 to-primary/5 py-12">
        <div className="qtron-container text-center">
          <Badge className="mb-4 rounded py-1">Careers at Qtron</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Build the Future of E-Commerce
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our team of innovators, dreamers, and problem-solvers. Help us
            create exceptional shopping experiences for millions worldwide.
          </p>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-12">
        <div className="qtron-container">
          <h2 className="sr-only text-2xl md:text-3xl font-bold mb-8 text-center">
            Why Qtron?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="rounded">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <benefit.icon className="size-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-12 bg-muted/30">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Open positions
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {openPositions.map((position, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow rounded"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {position.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase className="size-4" />
                          {position.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="size-4" />
                          {position.location}
                        </span>
                        <Badge variant="secondary">{position.type}</Badge>
                      </div>
                    </div>
                    <Button asChild>
                      <Link href="/contact">Apply Now</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {position.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16">
        <div className="qtron-container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Culture</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              At Qtron, we believe in creating an inclusive, collaborative, and
              empowering workplace. Our team members come from diverse
              backgrounds, bringing unique perspectives that drive innovation.
            </p>
            <p>
              We encourage experimentation and learning from failure. Whether
              you&#39;re working on improving our search algorithms, designing
              new features, or helping customers solve problems, your work
              directly impacts millions of users.
            </p>
            <p>
              We invest in our people through continuous learning opportunities,
              mentorship programs, and clear career paths. Your growth is our
              growth.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CareersPage;
