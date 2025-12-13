import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  BookOpen,
  ClipboardCheck,
  FileText,
  Gift,
  Users,
} from "lucide-react";
import Link from "next/link";

const Research = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 to-primary/5 py-12">
        <div className="qtron-container">
          <Badge className="mb-4 rounded py-1">Research Program</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Help Shape the Future of E-Commerce
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            Join our research community and get rewarded for sharing your
            opinions. Participate in surveys, product tests, and user studies to
            improve your shopping experience.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <a href="https://www.elvis-o-dev.com/contact" target="_blank">
                Join Research Panel
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center sr-only">
            Why Participate in Our Research?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Gift className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Earn Rewards
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Get paid for your time and insights. Earn gift cards, cash
                  rewards, or Qtron credits.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <BookOpen className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Test New Products
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Be among the first to try new products and features before
                  they launch.
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
                  Share Your Voice
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Your feedback directly influences product development and
                  platform improvements.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <ClipboardCheck className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Flexible Participation
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Choose studies that fit your schedule. Participate as much or
                  as little as you want.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Award className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Exclusive Access
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Get early access to sales, special promotions, and exclusive
                  member benefits.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <FileText className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Simple Process
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Easy online surveys and studies. Most take 10-30 minutes to
                  complete.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Types of Research Section */}
      <section className="py-12 bg-muted/30">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Research Examples
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Online Surveys</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Quick surveys about your shopping preferences, product
                  opinions, and user experience. Typically takes 10-15 minutes.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="secondary" className="rounded">
                    $5-$15 per survey
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Product Testing</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try new products at home and provide detailed feedback. Keep
                  the products after testing or return them for rewards.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="secondary" className="rounded">
                    $25-$100 per test
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Focus Groups</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Join small group discussions (online or in-person) to share
                  detailed opinions about products and services.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="secondary" className="rounded">
                    $50-$200 per session
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">
                  Usability Studies
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Test new website features or mobile app functionality. Help us
                  improve the user experience for everyone.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="secondary" className="rounded">
                    $30-$75 per study
                  </Badge>
                </div>
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
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-sm text-muted-foreground">
                Create your free research panel account and complete your
                profile.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="size-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Invitations</h3>
              <p className="text-sm text-muted-foreground">
                Receive study invitations based on your profile and interests.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="size-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Participate</h3>
              <p className="text-sm text-muted-foreground">
                Complete surveys, tests, or studies at your convenience.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="size-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold">
                  4
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
              <p className="text-sm text-muted-foreground">
                Receive your compensation within 7-14 days of completion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Research;
