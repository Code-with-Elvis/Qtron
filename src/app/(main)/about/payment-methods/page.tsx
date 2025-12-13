import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  CreditCard,
  DollarSign,
  Lock,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";

const PaymentMethods = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 to-primary/5 py-12">
        <div className="qtron-container text-center">
          <Badge className="mb-4 rounded py-1">Payment</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Qtron Payment Methods
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Shop with confidence using your preferred payment method. We support
            multiple payment options with industry-leading security standards.
          </p>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-12">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center sr-only">
            Accepted Payment Methods
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <CreditCard className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Credit & Debit Cards
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  We accept all major credit and debit cards.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Visa</li>
                  <li>• Mastercard</li>
                  <li>• American Express</li>
                  <li>• Discover</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Wallet className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Digital Wallets
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Fast and secure checkout with digital wallets.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• PayPal</li>
                  <li>• Apple Pay</li>
                  <li>• Google Pay</li>
                  <li>• Samsung Pay</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <DollarSign className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Buy Now, Pay Later
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Split your purchase into flexible installments.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Klarna</li>
                  <li>• Afterpay</li>
                  <li>• Affirm</li>
                  <li>• 0% interest options</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Smartphone className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Mobile Payments
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Pay seamlessly using your mobile device.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Venmo</li>
                  <li>• Cash App</li>
                  <li>• Zelle</li>
                  <li>• Mobile banking apps</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <CreditCard className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Gift Cards
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Redeem Qtron gift cards at checkout.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Physical gift cards</li>
                  <li>• Digital gift cards</li>
                  <li>• No expiration date</li>
                  <li>• Combine with other payments</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <DollarSign className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Bank Transfer
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Direct bank transfers for large purchases.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• ACH transfers</li>
                  <li>• Wire transfers</li>
                  <li>• For orders over $1,000</li>
                  <li>• 2-3 day processing</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-12 bg-muted/30">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Payment Security
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Lock className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  SSL Encryption
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  All transactions are protected with 256-bit SSL encryption.
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
                  PCI Compliant
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  We meet strict PCI DSS standards for card data security.
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
                  Fraud Protection
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Advanced fraud detection systems monitor all transactions.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Lock className="size-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Data Privacy
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  We never store your full card details on our servers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <div className="qtron-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center sr-only">
            How Payment Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="size-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Add to Cart</h3>
              <p className="text-sm text-muted-foreground">
                Select your products and add them to your shopping cart.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="size-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Checkout</h3>
              <p className="text-sm text-muted-foreground">
                Proceed to checkout and enter your shipping information.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="size-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Payment</h3>
              <p className="text-sm text-muted-foreground">
                Select your preferred payment method and complete details.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="size-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold">
                  4
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Confirm Order</h3>
              <p className="text-sm text-muted-foreground">
                Review and confirm your order to complete the purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-muted/30">
        <div className="qtron-container max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Payment FAQs
          </h2>
          <div className="space-y-6">
            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Is my payment information secure?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we use industry-standard encryption and security measures
                  to protect your payment information. We are PCI DSS compliant
                  and never store your full card details.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">
                  When will my payment be charged?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your payment method is charged immediately when you place your
                  order. For pre-orders, payment is processed when the item
                  ships.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Can I use multiple payment methods?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Yes, you can split payments between gift cards and credit
                  cards. However, you cannot combine multiple credit cards in a
                  single transaction.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">
                  What if my payment is declined?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Payment declines can happen for various reasons. Contact your
                  bank or try a different payment method. Our support team can
                  help if issues persist.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">
                  How do refunds work?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Refunds are issued to your original payment method within 5-10
                  business days after we receive your return. Gift card refunds
                  are processed immediately.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Do you accept international payments?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we accept international credit cards and PayPal. Currency
                  conversion is handled automatically at checkout. Note that
                  your bank may charge foreign transaction fees.
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
            Payment Questions?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our payment support team is here to help with any questions about
            payment methods, billing, or refunds.
          </p>
          <p className="text-muted-foreground">
            Email:{" "}
            <a href="mailto:payments@qtron.com" className="text-primary">
              payments@qtron.com
            </a>{" "}
            | Phone: 1-800-QTRON-PAY
          </p>
        </div>
      </section>
    </>
  );
};
export default PaymentMethods;
