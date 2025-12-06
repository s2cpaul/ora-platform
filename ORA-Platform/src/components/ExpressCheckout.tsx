import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { CreditCard, Lock, CheckCircle, ArrowLeft, Zap, Sparkles, Heart, Upload } from "lucide-react";

interface ExpressCheckoutProps {
  onBack: () => void;
}

export function ExpressCheckout({ onBack }: ExpressCheckoutProps) {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToStorage, setAgreeToStorage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatarName: "",
    characterSetting: "",
    script: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });
  const [accent, setAccent] = useState<string>("English");
  const [gender, setGender] = useState<string>("male");
  const [theme, setTheme] = useState<string>("cozy-winter");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
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
          packageId: "entertain-me",
          amount: 24,
          email: formData.email,
          characterSetting: formData.characterSetting,
          script: formData.script,
          accent: accent,
          gender: gender
        })
      });

      if (response.ok) {
        await new Promise(resolve => setTimeout(resolve, 1500));
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
      <div className="min-h-screen bg-background pt-[14px] pb-16 px-4">
        <div className="max-w-xl mx-auto">
          <Card className="border-2 border-green-500/20">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-6 w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <CardTitle className="text-3xl mb-2">You're All Set! 🎉</CardTitle>
              <CardDescription className="text-lg">
                Get ready for some fun! We'll create your entertaining video.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                <p className="text-sm text-muted-foreground">Order Details</p>
                <div className="flex justify-between">
                  <span>Package:</span>
                  <span className="font-semibold">What Moves You?</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-semibold">$24</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-semibold text-sm">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span className="font-semibold">5 business days</span>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  What's Next
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>✨ Confirmation email sent to {formData.email}</li>
                  <li>🎬 We'll create your fun video</li>
                  <li>📧 You'll get the final video via email</li>
                  <li>🚀 Share it and have a blast!</li>
                </ul>
              </div>
              
              <Button onClick={onBack} className="w-full" size="lg">
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-2 pb-16 px-4">
      <div className="max-w-xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 px-6 py-1 rounded-full mb-2 whitespace-nowrap">
            <span className="text-sm font-semibold">Promotional Campaign Special</span>
          </div>
          <div className="flex items-center justify-center gap-3 mb-2">
            <Heart className="w-10 h-10 text-red-500 fill-red-500" />
          </div>
          <h1 className="text-3xl font-bold mb-1 mt-3.5">What Moves You?</h1>
          <p className="text-sm text-foreground leading-tight mb-1">
            <strong>Gratitude</strong>
          </p>
          <p className="text-sm text-foreground leading-tight mb-1">
            Motivational messages & micro-learning lessons!
          </p>
          <p className="text-sm text-foreground leading-tight mb-1">
            Perfect for sending long distance messages,
          </p>
          <p className="text-sm text-foreground leading-tight mb-2">
            Personal Branding or Just for fun!
          </p>
          <p className="text-sm text-foreground leading-tight mb-2">
            <strong>Share on social media to show support for innovation, life long learning, health, and goodwill for all mankind! We are all in this together!</strong>
          </p>
        </div>

        {/* Package Details */}
        <Card className="mb-2 border-purple-500/20">
          <CardHeader className="pb-1 pt-3">
            <CardTitle className="text-lg">What's Included</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-3 -mt-[26px]">
            <p className="text-sm leading-relaxed">
              Your 30‑second video and message with our quality assurance guarantee. Should your 75 word script fail to be delivered or your likeness is misrepresented, we'll refund you in full. Our pledge is to maintain, safe, moral and ethical use of AI.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Express Checkout</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">Your Info</h3>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    required
                  />
                  <p className="text-xs text-muted-foreground">We'll send your video here</p>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Upload Your Image (Optional)</Label>
                  <div className="relative">
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="imageUpload">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => document.getElementById('imageUpload')?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploadedImage ? uploadedImage.name : 'Click to Upload'}
                      </Button>
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <strong>Note:</strong> Recent image required if you want to capture your likeness
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avatarName">Avatar Name</Label>
                  <Input
                    id="avatarName"
                    name="avatarName"
                    type="text"
                    value={formData.avatarName}
                    onChange={handleInputChange}
                    placeholder="Enter a name for your avatar (e.g., 'Coach Alex' or 'Dr. Smith')..."
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Give your avatar a memorable name
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="characterSetting">Description of Character and Setting</Label>
                  <Textarea
                    id="characterSetting"
                    name="characterSetting"
                    value={formData.characterSetting}
                    onChange={handleInputChange}
                    placeholder="Brief description of your avatar character and the setting/scene with indication of age (e.g., 'Professional business person in an office' or 'Friendly teacher in a classroom')..."
                    rows={3}
                    required
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Tell us about the character appearance and background setting
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="script">Script (up to 75 words)</Label>
                  <Textarea
                    id="script"
                    name="script"
                    value={formData.script}
                    onChange={handleInputChange}
                    placeholder="What should your avatar say? Write your script here..."
                    rows={3}
                    required
                    className="resize-y min-h-[80px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Be creative! Pranks, birthday messages, teaching moments - anything fun!
                    <br />
                    ⚠️ Intimidating, blackmailing, violent and cyber bullying messages will not be processed.
                  </p>
                </div>

                {/* Voice Accent Selection */}
                <div className="space-y-2">
                  <Label>Voice Accent</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    English will be the default accent unless you select below:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {["English", "British English", "Indian English", "Australian English"].map((accentOption) => (
                      <Button
                        key={accentOption}
                        type="button"
                        variant={accent === accentOption ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAccent(accentOption)}
                        className="w-full"
                      >
                        {accentOption}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Theme Selection */}
                <div className="space-y-2">
                  <Label>Select from available themes:</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={theme === "cozy-winter" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("cozy-winter")}
                      className="w-full"
                    >
                      Cozy Winter
                    </Button>
                    <Button
                      type="button"
                      variant={theme === "my-hero" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("my-hero")}
                      className="w-full"
                    >
                      My Hero
                    </Button>
                  </div>
                </div>

                {/* Gender Selection */}
                <div className="space-y-2">
                  <Label>Voice Gender</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={gender === "male" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setGender("male")}
                      className="w-full"
                    >
                      Male
                    </Button>
                    <Button
                      type="button"
                      variant={gender === "female" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setGender("female")}
                      className="w-full"
                    >
                      Female
                    </Button>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Payment Details
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
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
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      type="password"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Your name as it appears on payment method</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Smith"
                    required
                  />
                </div>
              </div>

              {/* Ethical Agreement */}
              <div className="border-t pt-6 space-y-4">
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg space-y-3">
                  <h3 className="font-semibold text-sm">Ethical and Moral Agreement</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The video will be used for positive messages and fun! You agree not to misrepresent the truth or the likeness of someone other than yourself. You will not use the image to cyber bully, intimidate, or incite violence or damage the reputation of another person. You understand that the likeness and voice will be human-like but will not be an exact human representation for ethical, moral and safety reasons.
                  </p>
                  <div className="flex items-start gap-3 pt-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                      I agree to share this video ethically and responsibly for educational purposes, positive messaging or entertainment only. I agree to do my part to share AI for making the world a better place.
                    </Label>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-lg space-y-3">
                  <h3 className="font-semibold text-sm">Promotional Storage Policy</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This is a seasonal promotional campaign available for a limited time (December 17 - March 17). Only the first 100 orders are processed each month during this promotional period.
                  </p>
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="storage" 
                      checked={agreeToStorage}
                      onCheckedChange={(checked) => setAgreeToStorage(checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="storage" className="text-sm cursor-pointer leading-relaxed">
                      I understand this is a seasonal promotion and not a perpetual data storage service. Videos can be downloaded for 90 days. All videos are automatically deleted 90 days from creation time and date. No exceptions.
                    </Label>
                  </div>
                </div>
              </div>

              {/* Total and Submit */}
              <div className="border-t pt-6 space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span>$24.00</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={loading || !agreeToTerms || !agreeToStorage}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Pay $24 Now
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="w-3 h-3" />
                  <span>Secured by Stripe • 256-bit SSL encryption</span>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}