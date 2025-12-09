"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    topic: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // === Simulate form submission ===
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      topic: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 to-primary/5 py-12">
        <div className="qtron-container text-center">
          <Badge className="mb-4 py-1 rounded">Contact Us</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            We&#39;re Here to Help
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question, suggestion, or issue? Get in touch with our team
            and we&#39;ll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12">
        <div className="qtron-container">
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="rounded">
                <CardContent className="pt-4">
                  <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="rounded"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="rounded"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="topic">
                          Topic <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.topic}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, topic: value }))
                          }
                          required
                        >
                          <SelectTrigger className="rounded w-full">
                            <SelectValue placeholder="Select a topic" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="order">Order Inquiry</SelectItem>
                            <SelectItem value="shipping">
                              Shipping & Delivery
                            </SelectItem>
                            <SelectItem value="returns">
                              Returns & Refunds
                            </SelectItem>
                            <SelectItem value="product">
                              Product Question
                            </SelectItem>
                            <SelectItem value="technical">
                              Technical Support
                            </SelectItem>
                            <SelectItem value="partnership">
                              Business Partnership
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">
                          Subject <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Brief description of your inquiry"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="rounded"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Message <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Please provide details about your inquiry..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className=" rounded  "
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      <Send />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <Card className="rounded">
                <CardContent className="pt-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Mail className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a
                        href="mailto:support@qtron.com"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        support@qtron.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Phone className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a
                        href="tel:1-800-QTRON-24"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        1-800-QTRON-24
                      </a>
                      <p className="text-xs text-muted-foreground mt-1">
                        Toll-free in US & Canada
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <MapPin className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-sm text-muted-foreground">
                        123 Commerce Avenue
                        <br />
                        New York, NY 10001
                        <br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Clock className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-sm text-muted-foreground">
                        Monday - Friday: 9 AM - 6 PM EST
                        <br />
                        Saturday: 10 AM - 4 PM EST
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time */}
      <section className="py-16 bg-muted/30">
        <div className="qtron-container text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Expected Response Times</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="border rounded py-2">
              <p className="text-3xl font-bold text-primary mb-1">&lt; 1 hr</p>
              <p className="text-sm text-muted-foreground">Phone Support</p>
            </div>
            <div className="border rounded py-2">
              <p className="text-3xl font-bold text-primary mb-1">&lt; 2 hrs</p>
              <p className="text-sm text-muted-foreground">Live Chat</p>
            </div>
            <div className="border rounded py-2">
              <p className="text-3xl font-bold text-primary mb-1">
                &lt; 24 hrs
              </p>
              <p className="text-sm text-muted-foreground">Email Support</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ContactPage;
