import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Mail, Phone } from "lucide-react";
import Link from "next/link";

const FaqPage = () => {
  const faqCategories = [
    {
      category: "Orders & Shipping",
      icon: "📦",
      questions: [
        {
          question: "How long does shipping take?",
          answer:
            "Standard shipping typically takes 3-7 business days within the same country. International shipping may take 7-21 business days depending on the destination. Express shipping options are available at checkout for faster delivery.",
        },
        {
          question: "How can I track my order?",
          answer:
            "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and visiting the 'Orders' section. Click on the specific order to view detailed tracking information.",
        },
        {
          question: "Do you offer free shipping?",
          answer:
            "Yes! We offer free standard shipping on orders over $50 within the continental US. Some products are eligible for free shipping regardless of order value - look for the 'Free Shipping' badge on product pages.",
        },
        {
          question: "Can I change my shipping address after ordering?",
          answer:
            "If your order hasn't shipped yet, you can update the shipping address by contacting our customer service team immediately. Once the order has shipped, we cannot modify the address, but you may be able to redirect it through the carrier.",
        },
      ],
    },
    {
      category: "Returns & Refunds",
      icon: "↩️",
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for most items. Products must be unused, in original packaging, and in the same condition you received them. Some items like perishables, custom products, and intimate items are non-returnable.",
        },
        {
          question: "How do I return an item?",
          answer:
            "Log into your account, go to 'Orders', select the order with the item you want to return, and click 'Return Item'. Follow the instructions to print a prepaid return label. Pack the item securely and drop it off at any authorized shipping location.",
        },
        {
          question: "When will I receive my refund?",
          answer:
            "Refunds are processed within 3-5 business days after we receive and inspect your return. The refund will be issued to your original payment method. Depending on your bank, it may take an additional 5-10 business days to appear in your account.",
        },
        {
          question: "Can I exchange an item instead of returning it?",
          answer:
            "Currently, we don't offer direct exchanges. However, you can return the item for a refund and place a new order for the item you want. This ensures you get what you need as quickly as possible.",
        },
      ],
    },
    {
      category: "Payment & Security",
      icon: "💳",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Amazon Pay. For some regions, we also accept local payment methods.",
        },
        {
          question: "Is my payment information secure?",
          answer:
            "Absolutely. We use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers. All payments are processed through PCI-compliant payment processors.",
        },
        {
          question: "Why was my payment declined?",
          answer:
            "Payment declines can happen for various reasons: insufficient funds, incorrect card details, card restrictions, or fraud prevention measures. Please verify your payment information and contact your bank if the issue persists. You can also try a different payment method.",
        },
        {
          question: "Can I use multiple payment methods for one order?",
          answer:
            "Currently, we only support one payment method per order. However, you can use gift cards in combination with a primary payment method to complete your purchase.",
        },
      ],
    },
    {
      category: "Account & Privacy",
      icon: "👤",
      questions: [
        {
          question: "Do I need an account to place an order?",
          answer:
            "No, you can checkout as a guest. However, creating an account allows you to track orders, save addresses, manage returns, view order history, and receive exclusive offers.",
        },
        {
          question: "How do I reset my password?",
          answer:
            "Click 'Sign In' at the top of the page, then click 'Forgot Password'. Enter your email address and we'll send you a password reset link. Follow the instructions in the email to create a new password.",
        },
        {
          question: "How is my personal information used?",
          answer:
            "We use your information to process orders, communicate about your purchases, improve our services, and send you relevant offers (if you've opted in). We never sell your personal information to third parties. Read our Privacy Policy for complete details.",
        },
        {
          question: "How do I delete my account?",
          answer:
            "To delete your account, please contact our customer service team. We'll verify your identity and process your request within 7 business days. Note that some information may be retained for legal and compliance purposes.",
        },
      ],
    },
    {
      category: "Products & Availability",
      icon: "🛍️",
      questions: [
        {
          question: "How do I know if an item is in stock?",
          answer:
            "If an item is available for purchase, it's in stock. Out-of-stock items will be marked as 'Currently Unavailable'. You can sign up for notifications to be alerted when an out-of-stock item becomes available again.",
        },
        {
          question: "Are your product images accurate?",
          answer:
            "We strive to display accurate product images. However, colors may vary slightly due to monitor settings and lighting conditions. Always refer to product descriptions for detailed specifications.",
        },
        {
          question: "Do you offer price matching?",
          answer:
            "We regularly monitor our prices to remain competitive. While we don't offer formal price matching, we do adjust prices based on market conditions. Check our Daily Deals and Best Sellers sections for great offers.",
        },
        {
          question: "How often do you restock items?",
          answer:
            "Restock times vary by product and supplier. Popular items are typically restocked weekly, while specialty items may take longer. Enable stock notifications on product pages to be notified when items are available.",
        },
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 to-primary/5 py-12">
        <div className="qtron-container">
          <Badge className="mb-4 rounded py-1">Help Center</Badge>
          <h1 className=" text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Find answers to common questions about ordering, shipping, returns,
            and more.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-12">
        <div className="qtron-container">
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-3xl">{category.icon}</span>
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`item-${categoryIndex}-${faqIndex}`}
                    >
                      <AccordionTrigger className="text-left text-base">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12 bg-muted/30">
        <div className="qtron-container">
          <h2 className="text-2xl font-bold mb-6">Still Have Questions?</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="rounded">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <MessageCircle className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with our support team in real-time
                </p>
                <Button variant="outline" className="w-full rounded-full">
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Mail className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get help via email within 24 hours
                </p>
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  asChild
                >
                  <Link href="/contact">Send Email</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Phone className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Call us: 1-800-QTRON-24
                </p>
                <Button variant="outline" className="w-full rounded-full">
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};
export default FaqPage;
