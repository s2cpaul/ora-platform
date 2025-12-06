import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Heart, Sparkles, Shield, Users, Target, CheckCircle, DollarSign, HandHeart, LifeBuoy } from 'lucide-react';

export function DonationSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');

  const presetAmounts = [10, 25, 50, 100, 250, 500];

  const handleDonate = () => {
    const amount = selectedAmount === 'custom' ? parseFloat(customAmount) : selectedAmount;
    
    if (!amount || amount <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    // In production, this would redirect to Stripe Checkout
    console.log(`Processing ${donationType} donation of $${amount}`);
    alert(`Thank you for your ${donationType === 'monthly' ? 'monthly' : 'one-time'} donation of $${amount}! Your contribution supports Suicide Awareness and resources for Surviving Spouses and Caretakers. Stripe payment integration will be configured in production.`);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Heart className="w-16 h-16 text-primary animate-pulse" fill="currentColor" />
              <LifeBuoy className="w-8 h-8 text-blue-500 absolute -bottom-1 -right-1" />
            </div>
          </div>
          <CardTitle className="text-4xl mb-4">You Are Not Alone</CardTitle>
          <CardDescription className="text-lg max-w-2xl mx-auto">
            Your donation supports <strong>Suicide Awareness & Prevention</strong> programs and provides critical resources 
            for <strong>Surviving Spouses and Caretakers</strong> who are navigating their journey through loss and healing.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Donation Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-primary" />
                Make a Donation
              </CardTitle>
              <CardDescription>
                Every contribution helps us continue our mission
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Donation Type Toggle */}
              <div>
                <label className="text-sm font-medium mb-3 block">Donation Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={donationType === 'one-time' ? 'default' : 'outline'}
                    onClick={() => setDonationType('one-time')}
                    className={`h-12 ${donationType === 'one-time' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  >
                    One-Time
                  </Button>
                  <Button
                    variant={donationType === 'monthly' ? 'default' : 'outline'}
                    onClick={() => setDonationType('monthly')}
                    className={`h-12 ${donationType === 'monthly' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  >
                    Monthly
                  </Button>
                </div>
              </div>

              {/* Preset Amounts */}
              <div>
                <label className="text-sm font-medium mb-3 block">Select Amount</label>
                <div className="grid grid-cols-3 gap-3">
                  {presetAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant={selectedAmount === amount ? 'default' : 'outline'}
                      onClick={() => setSelectedAmount(amount)}
                      className={`h-16 text-lg ${selectedAmount === amount ? 'bg-green-600 hover:bg-green-700' : ''}`}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="text-sm font-medium mb-3 block">Or Enter Custom Amount</label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount('custom');
                      }}
                      className="w-full h-12 pl-8 pr-4 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>
                  <Button
                    variant={selectedAmount === 'custom' ? 'default' : 'outline'}
                    onClick={() => setSelectedAmount('custom')}
                    className={`h-12 px-6 ${selectedAmount === 'custom' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  >
                    Custom
                  </Button>
                </div>
              </div>

              {/* Donation Summary */}
              {(selectedAmount !== 'custom' || customAmount) && (
                <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Your {donationType === 'monthly' ? 'monthly' : 'one-time'} donation:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${selectedAmount === 'custom' ? customAmount : selectedAmount}
                    </span>
                  </div>
                  {donationType === 'monthly' && (
                    <p className="text-sm text-muted-foreground">
                      That's ${((selectedAmount === 'custom' ? parseFloat(customAmount) : selectedAmount) * 12).toFixed(2)} per year
                    </p>
                  )}
                </div>
              )}

              {/* Donate Button */}
              <Button
                onClick={handleDonate}
                className="w-full h-14 text-lg bg-green-600 hover:bg-green-700"
                disabled={!selectedAmount || (selectedAmount === 'custom' && !customAmount)}
              >
                <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                Donate Now
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Secure payment processing powered by Stripe. All donations are tax-deductible.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Impact Section */}
        <div className="space-y-6">
          <Card className="border-red-500/30 bg-gradient-to-br from-red-500/5 to-background">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Heart className="w-6 h-6 text-purple-500" fill="currentColor" />
                Your Impact
              </CardTitle>
              <CardDescription>Surviving Spouse or Caretaker</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <HandHeart className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Surviving Spouse Support</p>
                    <p className="text-sm text-muted-foreground">
                      Provide grief counseling, peer support groups, and financial planning resources for widows/widowers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-pink-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Caretaker Resources</p>
                    <p className="text-sm text-muted-foreground">
                      Support surviving spouses and those caring for minor child survivors of parental suicide
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Free Education for All Veterans</p>
                    <p className="text-sm text-muted-foreground">
                      Continue providing 100% free AI education to help veterans transition to civilian careers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <LifeBuoy className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Suicide Awareness & Prevention</p>
                    <p className="text-sm text-muted-foreground">
                      Fund critical mental health resources, crisis intervention training, and 24/7 support hotlines
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-background">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
                Crisis Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="space-y-2">
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-medium mb-1">988 Suicide & Crisis Lifeline</p>
                  <p className="text-muted-foreground">Call or text <strong>988</strong> • Available 24/7</p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-medium mb-1">Veterans Crisis Line</p>
                  <p className="text-muted-foreground">Call <strong>1-800-273-8255</strong> (Press 1) • Text <strong>838255</strong></p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-medium mb-1">Crisis Text Line</p>
                  <p className="text-muted-foreground">Text <strong>HELLO</strong> to <strong>741741</strong></p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                ORA is committed to transparency. 100% of donations directly support our efforts to enable survivors, caretakers, suicide awareness programs and resources for surviving spouses and caretakers.
              </p>
              <div className="text-xs text-muted-foreground">
                <p>ORA is a Limited Liability Company (LLC)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Why Donate Section */}
      <Card className="border-red-500/20 bg-gradient-to-br from-red-500/5 to-background">
        <CardHeader>
          <CardTitle>Why Your Donation Saves Lives</CardTitle>
          <CardDescription>
            Supporting suicide awareness, prevention, and those left behind
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <LifeBuoy className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <h3 className="font-semibold">Suicide Prevention</h3>
              <p className="text-sm text-muted-foreground">
                Every day, 22 veterans die by suicide. Your donation funds crisis intervention training, 
                mental health resources, and 24/7 support hotlines that save lives. We provide education 
                on warning signs and connect at-risk individuals with immediate help.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center">
                  <HandHeart className="w-6 h-6 text-pink-500" />
                </div>
              </div>
              <h3 className="font-semibold">Surviving Spouse Support</h3>
              <p className="text-sm text-muted-foreground">
                Losing a spouse to suicide creates unique grief and trauma. We provide specialized counseling, 
                peer support groups, financial planning assistance, and long-term healing resources for widows 
                and widowers navigating life after loss.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
                </div>
              </div>
              <h3 className="font-semibold">Caretaker Support</h3>
              <p className="text-sm text-muted-foreground">
                Caring for a veteran with PTSD, TBI, or depression is emotionally exhausting. We provide 
                respite care, mental health services for caretakers, education on trauma-informed care, 
                and a supportive community who understands their journey.
              </p>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="mt-8 pt-8 border-t border-border">
            <h4 className="font-semibold mb-4 text-center">The Critical Need</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-background rounded-lg border border-border">
                <div className="text-3xl font-bold text-primary mb-2">22</div>
                <p className="text-sm text-muted-foreground">Veterans die by suicide every day in America</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <div className="text-3xl font-bold text-primary mb-2">1.5x</div>
                <p className="text-sm text-muted-foreground">Higher suicide rate for veterans compared to civilians</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <div className="text-3xl font-bold text-primary mb-2">5.5M</div>
                <p className="text-sm text-muted-foreground">Military caregivers providing support across the U.S.</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20 text-center">
            <p className="text-lg font-medium mb-2">Together, we can make a difference.</p>
            <p className="text-sm text-muted-foreground">
              Your donation provides hope, healing, and resources to those who need it most. 
              100% of contributions go directly to suicide prevention programs and support services.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}