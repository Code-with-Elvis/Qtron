import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Mail,
  Phone,
  FileText,
  HelpCircle,
  ExternalLink,
  Clock,
  CheckCircle2,
} from "lucide-react";

const SupportPage = () => {
  const supportChannels = [
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Get instant help from our support team",
      status: "Available",
      statusColor: "default" as const,
      action: "Start Chat",
      href: "#",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Reach out to us via email. We're here to help!",
      status: "Response in 24h",
      statusColor: "secondary" as const,
      action: "Send Email",
      href: "mailto:support@qtron.com",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description:
        "Speak directly with a support agent. Available during business hours.",
      status: "Mon-Fri 9AM-6PM",
      statusColor: "outline" as const,
      action: "Call Now",
      href: "tel:+1234567890",
    },
  ];

  const commonIssues = [
    {
      icon: HelpCircle,
      title: "Order Management",
      description: "Track, modify, or cancel orders",
      articles: 12,
    },
    {
      icon: FileText,
      title: "Product Listings",
      description: "Add, edit, or remove products",
      articles: 8,
    },
    {
      icon: CheckCircle2,
      title: "Inventory Updates",
      description: "Manage stock levels and alerts",
      articles: 6,
    },
    {
      icon: Clock,
      title: "Reports & Analytics",
      description: "Understanding your dashboard data",
      articles: 10,
    },
  ];

  const quickLinks = [
    "Getting Started Guide",
    "Admin Dashboard Tutorial",
    "Payment Settings",
    "Shipping Configuration",
    "User Management",
    "Security Best Practices",
    "API Documentation",
    "Plugin Integration",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
        <p className="text-muted-foreground mt-1">
          Get help and find answers to your questions
        </p>
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {supportChannels.map((channel, index) => (
          <Card
            key={index}
            className="hover:shadow-lg rounded transition-shadow"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <channel.icon className="size-6 text-primary" />
                </div>
                <Badge variant={channel.statusColor} className="text-xs">
                  {channel.status}
                </Badge>
              </div>
              <CardTitle className="text-lg mt-4">{channel.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {channel.description}
              </p>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a href={channel.href}>
                  {channel.action}
                  <ExternalLink className="size-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Common Issues */}
      <Card className="rounded">
        <CardHeader>
          <CardTitle className="text-xl">Common Issues & Solutions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Browse help articles by category
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commonIssues.map((issue, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <issue.icon className="size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1">{issue.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {issue.description}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {issue.articles} articles
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links & Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Quick Links */}
        <Card className="rounded">
          <CardHeader>
            <CardTitle className="text-lg">Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
                >
                  <span className="text-sm font-medium">{link}</span>
                  <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="rounded">
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Support Hours</h4>
              <p className="text-sm text-muted-foreground">
                Monday - Friday: 9:00 AM - 6:00 PM EST
              </p>
              <p className="text-sm text-muted-foreground">
                Saturday - Sunday: 10:00 AM - 4:00 PM EST
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Email</h4>
              <a
                href="mailto:support@qtron.com"
                className="text-sm text-primary hover:underline"
              >
                support@qtron.com
              </a>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Phone</h4>
              <a
                href="tel:+1234567890"
                className="text-sm text-primary hover:underline"
              >
                +1 (234) 567-890
              </a>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Address</h4>
              <p className="text-sm text-muted-foreground">
                123 Tech Street, Suite 100
                <br />
                San Francisco, CA 94105
                <br />
                United States
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Support Banner */}
      <Card className="bg-primary/5 rounded border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-lg shrink-0">
              <AlertTriangle className="size-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Need Urgent Help?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                For critical issues affecting your operations, contact our
                emergency support line available 24/7.
              </p>
              <Button variant="default">
                <Phone className="size-4 mr-2" />
                Emergency Support: +1 (800) 123-4567
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportPage;

function AlertTriangle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
