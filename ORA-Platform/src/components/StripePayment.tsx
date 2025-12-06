import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CreditCard, Lock, CheckCircle } from "lucide-react";

interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

const paymentPlans: PaymentPlan[] = [
  {
    id: "basic",
    name: "Basic Plan",
    price: 9.99,
    description: "Perfect for getting started",
    features: ["Access to basic lessons", "Community support", "Monthly updates"]
  },
  {
    id: "pro",
    name: "Pro Plan",
    price: 29.99,
    description: "For serious learners",
    features: ["All basic features", "Advanced AI tools", "Priority support", "Exclusive content"]
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    price: 99.99,
    description: "For teams and organizations",
    features: ["All pro features", "Team collaboration", "Custom integrations", "Dedicated support"]
  }
];

interface StripePaymentProps {
  onClose?: () => void;
}

export function StripePayment({ onClose }: StripePaymentProps) {
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    email: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Replace with actual Stripe API call
      // This is where you'll integrate with your backend/Supabase Edge Function
      
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: selectedPlan?.id,
          amount: selectedPlan?.price,
          email: formData.email
        })
      });

      if (response.ok) {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        setPaymentSuccess(true);
      }
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <CardTitle>Payment Successful!</CardTitle>
            <CardDescription>
              Thank you for your purchase. You now have access to {selectedPlan?.name}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={onClose} className="w-full">
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedPlan) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <Card className="max-w-md w-full my-8">
          <CardHeader>
            <CardTitle>Complete Your Purchase</CardTitle>
            <CardDescription>
              {selectedPlan.name} - ${selectedPlan.price}/month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePayment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  name="cardName"
                  placeholder="John Doe"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="4242 4242 4242 4242"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength={19}
                    required
                  />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    maxLength={5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4" />
                <span>Your payment information is secure and encrypted</span>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedPlan(null)}
                  className="flex-1"
                  disabled={loading}
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "Processing..." : `Pay $${selectedPlan.price}`}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="max-w-5xl w-full my-8">
        <Card>
          <CardHeader>
            <CardTitle>Choose Your Plan</CardTitle>
            <CardDescription>
              Select the perfect plan for your needs. Cancel anytime.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paymentPlans.map((plan) => (
                <Card key={plan.id} className="relative border-2 hover:border-primary transition-colors">
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="pt-4">
                      <span className="text-4xl">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => setSelectedPlan(plan)}
                      className="w-full"
                    >
                      Select Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-6">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
