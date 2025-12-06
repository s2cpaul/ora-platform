import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { CreditCard, Lock, CheckCircle, ArrowLeft, Shield, Clock, Video, FileText, Languages, Zap, Package, Heart } from "lucide-react";
import React from "react";

interface ServicePackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  savings?: string;
  seasonal?: boolean;
  locked?: boolean;
}

const servicePackages: ServicePackage[] = [
  {
    id: "entertain-me",
    name: "What Moves You?",
    price: 24,
    description: "Motivational messages & micro-learning lessons!\nPerfect for sending long distance messages,\nPersonal Branding or Just for fun!",
    seasonal: true,
    locked: false,
    features: [
      "30-second fun video",
      "Simple avatar setup",
      "Based on your description and script\n(up to 75 words)",
      "No revisions",
      "24-48 hour estimated delivery",
      "Perfect for last minute gifting & surprises",
      "Share on social media",
      "Creative expression of gratitude & appreciation"
    ]
  },
  {
    id: "single-with-script",
    name: "Single Video",
    price: 129,
    description: (
      <>
        You provide the script
        <br />
        Your Mission/Competitive edge
      </>
    ) as any,
    locked: true,
    features: [
      "First avatar setup included",
      "59-second video",
      "Your script provided",
      "1 revision round included",
      "3-5 business day delivery",
      "Professional quality"
    ]
  },
  {
    id: "single-existing-avatar",
    name: "Single Video - Existing Avatar",
    price: 69,
    description: (
      <>
        59-second video
        <br />
        When avatar already exists
      </>
    ) as any,
    locked: true,
    features: [
      "Uses existing avatar setup",
      "59-second video",
      "Your script provided",
      "1 revision round included",
      "3-5 business day delivery",
      "Professional quality"
    ]
  },
  {
    id: "single-full-service-option",
    name: "Single Video - Full Service",
    price: 100,
    description: (
      <>
        You give us the objective
        <br />
        We write the script for you
      </>
    ) as any,
    locked: false,
    features: [
      "First avatar setup included",
      "59-second video",
      "Professional script writing",
      "Script consultation",
      "1 revision round included",
      "3 business day delivery"
    ]
  },
  {
    id: "bundle-premium",
    name: "Video Bundle",
    price: 1999,
    description: (
      <>
        6 training videos + 1 promotional short
        <br />
        20 minutes total - Flexible 30 day timeline
      </>
    ) as any,
    savings: "Best Value",
    locked: true,
    features: [
      "Yes — Videos can be integrated into LMS platforms and layered with quiz content.",
      "20 minutes of video content total",
      "6 training videos included",
      "1 promotional short using existing avatar",
      "Avatar setup included (1 Avatar)",
      "Full script writing included (or you supply it)",
      "Professional quality",
      "Priority support",
      "1 Revision per video plus additional revisions available for $15 each"
    ]
  }
];

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

const addOns: AddOn[] = [
  {
    id: "extra-revision",
    name: "Additional Revision",
    price: 15,
    description: "Beyond the included revision(s)"
  },
  {
    id: "translation",
    name: "Translation",
    price: 100,
    description: "Per additional language"
  },
  {
    id: "rush-delivery",
    name: "Rush Delivery (48 hours)",
    price: 75,
    description: "50% premium for 48-hour turnaround"
  },
  {
    id: "live-consultation",
    name: "30 Minutes Live Video Coaching",
    price: 129,
    description: "One-on-one consultation. The first session is FREE!"
  }
];

interface PurchasePageProps {
  onBack: () => void;
  onExpressCheckout?: () => void;
}

export function PurchasePage({ onBack, onExpressCheckout }: PurchasePageProps) {
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    mainMessage: "",
    learningObjective: "",
    projectDetails: "",
    scriptProvided: "yes",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const calculateTotal = () => {
    if (!selectedPackage) return 0;
    const packagePrice = selectedPackage.price;
    const addOnsTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
    return packagePrice + addOnsTotal;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Replace with actual Stripe API call
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId: selectedPackage?.id,
          amount: calculateTotal(),
          addOns: selectedAddOns,
          email: formData.email,
          projectDetails: formData.projectDetails
        })
      });

      if (response.ok) {
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
      <div className="min-h-screen bg-background pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-green-500/20">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-6 w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <CardTitle className="text-3xl mb-2">Order Confirmed!</CardTitle>
              <CardDescription className="text-lg">
                Thank you for your order. We'll start working on your HeyGen avatar videos right away.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-6 rounded-lg space-y-2">
                <p className="text-sm text-muted-foreground">Order Details</p>
                <div className="flex justify-between">
                  <span>Package:</span>
                  <span className="font-semibold">{selectedPackage?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-semibold">${calculateTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-semibold">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span className="font-semibold">
                    {selectedAddOns.includes('rush-delivery') ? '48 hours' : '3 business days'}
                  </span>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Next Steps
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• You'll receive a confirmation email within 5 minutes</li>
                  <li>• Our team will reach out within 24 hours to get started</li>
                  <li>• Please have your script ready (if applicable)</li>
                  <li>• We'll send drafts for your review and revisions</li>
                </ul>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button onClick={onBack} className="flex-1">
                  Back to Home
                </Button>
                <Button variant="outline" onClick={() => window.print()} className="flex-1">
                  Print Receipt
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (selectedPackage) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedPackage(null)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Packages
          </Button>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <Card>
                <CardHeader>
                  <CardTitle>{selectedPackage.name}</CardTitle>
                  <CardDescription className="whitespace-pre-line">{selectedPackage.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    {selectedPackage.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm whitespace-pre-line">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Add-ons Section */}
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3">Optional Add-ons</h3>
                    <div className="space-y-2">
                      {addOns.map((addOn) => (
                        <div 
                          key={addOn.id}
                          onClick={() => toggleAddOn(addOn.id)}
                          className={`p-3 border rounded-lg cursor-pointer transition-all ${
                            selectedAddOns.includes(addOn.id) 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <input 
                                  type="checkbox" 
                                  checked={selectedAddOns.includes(addOn.id)}
                                  onChange={() => {}}
                                  className="w-4 h-4"
                                />
                                <span className="font-medium">{addOn.name}</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 ml-6">
                                {addOn.description}
                              </p>
                            </div>
                            <span className="font-semibold ml-4">+${addOn.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Package Price:</span>
                        <span>${selectedPackage.price}</span>
                      </div>
                      {selectedAddOns.length > 0 && (
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Add-ons:</span>
                          <span>+${calculateTotal() - selectedPackage.price}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-lg font-bold pt-2 border-t">
                        <span>Total:</span>
                        <span>${calculateTotal()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>100% satisfaction guarantee</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>Professional quality delivery</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Video className="w-4 h-4 text-purple-500" />
                      <span>HeyGen avatar technology</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Project Details & Payment Form */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Project Description</h2>
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
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
                      <Label htmlFor="company">Company Name (Optional)</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Your Company"
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mainMessage">Main Message *</Label>
                      <Input
                        id="mainMessage"
                        name="mainMessage"
                        placeholder="What is the core message of your video?"
                        value={formData.mainMessage}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="learningObjective">Learning Objective *</Label>
                      <Input
                        id="learningObjective"
                        name="learningObjective"
                        placeholder="What should viewers learn or be able to do?"
                        value={formData.learningObjective}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectDetails">Project Description *</Label>
                      <Textarea
                        id="projectDetails"
                        name="projectDetails"
                        placeholder="Tell us about your training video needs, target audience, key messages, etc."
                        value={formData.projectDetails}
                        onChange={handleInputChange}
                        rows={4}
                        required
                        className="resize-none"
                      />
                    </div>

                    {selectedPackage.id === 'single-with-script' && (
                      <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
                        <p className="text-sm font-medium mb-2">Script Required</p>
                        <p className="text-xs text-muted-foreground">
                          Please email your script to us after completing your order, or attach it to your project details above.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                <Card>
                  <CardContent className="pt-6">
                    <form onSubmit={handlePayment} className="space-y-4">
                      <div className="space-y-4">
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
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
                        <Lock className="w-4 h-4" />
                        <span>Your payment is secure and encrypted</span>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        disabled={loading}
                      >
                        {loading ? "Processing..." : `Pay $${calculateTotal()}`}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-[14px] pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-3.5 -mt-[18px] h-[26px] py-0 text-[0.85em]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-[6px] -mt-3.5">
          <h1 className="text-[32px] font-bold mb-1 leading-[0.9] md:leading-normal">
            Instructional <br className="md:hidden" />
            Avatar <br className="md:hidden" />
            Video Services
          </h1>
          <p className="text-[15px] text-muted-foreground max-w-3xl mx-auto leading-tight">
            Professional training videos created with AI avatar technology. Choose the package that fits your needs.
          </p>
        </div>

        {/* Service Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {servicePackages.map((pkg, index) => {
            // Skip these - they've been removed from offerings
            if (pkg.id === 'single-existing-avatar' || pkg.id === 'single-full-service-option' || pkg.id === 'single-with-script') return null;
            
            // Regular card rendering for other packages
            const isLocked = pkg.locked;
            return (
              <React.Fragment key={pkg.id}>
                <Card 
                  className={`relative border-2 transition-all ${
                    isLocked ? 'opacity-60 mt-3' : 'hover:border-primary hover:shadow-lg'
                  } ${
                    pkg.popular && !isLocked ? 'border-primary shadow-lg' : ''
                  } ${
                    pkg.seasonal ? 'mt-3' : ''
                  }`}
                >
                  {isLocked && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <div className="bg-muted text-muted-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                        <Lock className="w-3 h-3" />
                        Locked
                      </div>
                    </div>
                  )}

                  {!isLocked && pkg.seasonal && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                      <div className="bg-green-500 text-white px-5 py-1 rounded-full text-sm font-semibold flex items-center gap-2 whitespace-nowrap">
                        Promotional Campaign Special
                      </div>
                    </div>
                  )}

                  {!isLocked && pkg.popular && !pkg.seasonal && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}

                  {!isLocked && pkg.savings && !pkg.popular && !pkg.seasonal && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        {pkg.savings}
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4 pt-8">
                    {pkg.seasonal && (
                      <div className="mb-4 -mt-4">
                        <p className="text-xs text-muted-foreground text-center mb-2 mt-[2px]">
                          Raising AI Awareness<br />
                          Making the World a Better Place!
                        </p>
                        <div className="flex justify-center">
                          <Heart className="w-[62px] h-[62px] text-red-500 fill-red-500 p-1.5" />
                        </div>
                      </div>
                    )}

                    <CardTitle className={`text-2xl mb-1 flex items-center justify-center gap-2 ${pkg.seasonal ? 'mt-0 -mt-4' : ''}`}>
                      {isLocked && <Lock className="w-5 h-5" />}
                      {pkg.name}
                    </CardTitle>
                    <CardDescription className="mb-0.5 whitespace-pre-line leading-tight">{pkg.description}</CardDescription>
                    {pkg.seasonal && (
                      <div className="text-xs text-foreground mt-0.5">
                        Available for a limited time!<br />Dec 17 - Mar 17<br />First 100 Each Month
                      </div>
                    )}
                    <div className="pt-1">
                      <span className="text-5xl font-bold">${pkg.price}</span>
                      {pkg.id === 'subscription' && (
                        <span className="text-muted-foreground">/month</span>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="-mt-6">
                    <h3 className="font-semibold mb-3"><strong>Raising AI Awareness</strong></h3>
                    <ul className="space-y-0.5 mb-4">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm whitespace-pre-line">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Quality Assurance Guarantee for What Moves You? */}
                    {pkg.id === 'entertain-me' && (
                      <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-950/20 border border-purple-500/20 rounded-lg">
                        <p className="text-sm">
                          <strong>Your 30‑second video with our quality assurance guarantee. Should your script fail to be delivered or your likeness is misrepresented, we'll refund you in full. Our pledge is to maintain, safe, moral and ethical use of AI.</strong>
                        </p>
                      </div>
                    )}
                    
                    {/* Avatar Placeholders for What Moves You? */}
                    {pkg.id === 'entertain-me' && (
                      <div className="flex gap-3 mb-4">
                        <div className="flex-1 bg-muted/30 border border-border rounded-lg h-32 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">Avatar Sample</span>
                        </div>
                        <div className="flex-1 bg-muted/30 border border-border rounded-lg h-32 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">Avatar Sample</span>
                        </div>
                      </div>
                    )}
                    
                    <Button
                      onClick={() => {
                        if (pkg.id === 'entertain-me' && onExpressCheckout) {
                          onExpressCheckout();
                        } else {
                          setSelectedPackage(pkg);
                        }
                      }}
                      className="w-full"
                      size="lg"
                      variant={pkg.popular && !isLocked ? "default" : (pkg.id === 'entertain-me' && !isLocked ? "default" : "outline")}
                      disabled={isLocked}
                    >
                      {isLocked ? (
                        <><Lock className="w-4 h-4 mr-2" />Locked</>
                      ) : (
                        pkg.id === 'entertain-me' ? 'Purchase Now' : 'Get Started'
                      )}
                    </Button>
                  </CardContent>
                </Card>
                
                {/* Show In-kind & Custom Requests Card after What Moves You? package */}
                {pkg.id === 'entertain-me' && (
                  <Card className="relative border-2 border-purple-500/30 bg-gradient-to-br from-purple-900/10 to-background mt-3">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                      <div className="bg-purple-500 text-white px-5 py-1 rounded-full text-sm font-semibold flex items-center gap-2 whitespace-nowrap">
                        In-kind & Custom Requests
                      </div>
                    </div>
                    
                    <CardHeader className="text-center pb-6 pt-3">
                      <CardTitle className="text-2xl mb-2 mt-[10px]">Need Something Different?</CardTitle>
                      <div className="text-sm font-semibold text-purple-500 mb-2">COMING SOON</div>
                      <CardDescription>Tell us about your custom video needs, in-kind donations, or special requests for volunteer service, and we'll get back to you within 24 hours</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          const name = formData.get('customName');
                          const email = formData.get('customEmail');
                          const details = formData.get('customDetails');
                          
                          // TODO: Replace with actual form submission API
                          console.log('Custom request submitted:', { name, email, details });
                          alert("Thank you! We've received your custom request and will contact you within 24 hours.");
                          e.currentTarget.reset();
                        }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="customName">Your Name *</Label>
                          <Input
                            id="customName"
                            name="customName"
                            placeholder="John Doe"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="customEmail">Email Address *</Label>
                          <Input
                            id="customEmail"
                            name="customEmail"
                            type="email"
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="customPhone">Phone Number (Optional)</Label>
                          <Input
                            id="customPhone"
                            name="customPhone"
                            type="tel"
                            placeholder="(555) 123-4567"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="customDetails">Project Details *</Label>
                          <Textarea
                            id="customDetails"
                            name="customDetails"
                            placeholder="Please describe your custom video needs, including:\n• Number of videos needed\n• Approximate length\n• Timeline/deadline\n• Special requirements\n• Budget range"
                            rows={6}
                            required
                            className="resize-none"
                          />
                        </div>

                        <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-lg">
                          <div className="flex items-start gap-2">
                            <FileText className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                              <p className="font-semibold mb-1">What happens next?</p>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                <li>• Your request within 48 hours</li>
                                <li>• When requests can be fulfilled you will be contacted</li>
                                <li>• Schedule a free consultation call</li>
                                <li>• No obligation to proceed</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full" 
                          size="lg"
                        >
                          Submit Custom Request →
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </React.Fragment>
            );
          })}
          
          {/* Add-ons in Single Compact Card */}
          <Card className="relative border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-background">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="bg-primary text-primary-foreground px-6 py-1 rounded-full font-semibold whitespace-nowrap">
                Add-ons & Extras
              </div>
            </div>
            
            <CardHeader className="text-center pb-6 pt-8">
              <CardTitle className="text-2xl mb-2">Enhance Your Package</CardTitle>
              <CardDescription>Available with any video package purchase</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid gap-3 mb-6">
                {addOns.map((addOn) => {
                  return (
                    <div 
                      key={addOn.id}
                      className="flex items-center justify-between p-4 rounded-lg border transition-all bg-card border-border hover:border-primary/50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{addOn.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{addOn.description}</p>
                      </div>
                      <div className="text-right ml-4 flex-shrink-0">
                        <span className="font-bold text-xl">+${addOn.price}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => window.location.href = 'mailto:contact@oratf.info?subject=Custom Video Package Inquiry'}
                  className="flex-1"
                  size="lg"
                >
                  Request Custom Quote →
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Card */}
          <Card id="faq-section" className="bg-muted/50 border-2">
            <CardHeader className="text-center pb-4 pt-6">
              <CardTitle className="text-2xl mb-2">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-sm">What if I need more revisions?</h3>
                <p className="text-xs text-muted-foreground">
                  No problem! Each additional revision is $15. We want you to be completely satisfied with your video.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-sm">Which bundle should I choose?</h3>
                <p className="text-xs text-muted-foreground">
                  The Video Bundle offers the best value with professional quality learning content and flexible delivery timeline.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-sm">What languages do you support?</h3>
                <p className="text-xs text-muted-foreground">
                  We can create videos in multiple languages. Each additional language translation costs $100.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}