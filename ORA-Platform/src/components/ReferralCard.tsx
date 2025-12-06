import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Copy, Check, Gift, Share2, Sparkles } from "lucide-react";

interface ReferralCardProps {
  couponCode?: string;
  discountAmount?: string;
  discountType?: "percentage" | "fixed";
  description?: string;
  expiryDate?: string;
}

export function ReferralCard({
  couponCode = "ORAFRIEND20",
  discountAmount = "20",
  discountType = "percentage",
  description = "Share this code with friends and they'll get a special discount on their first purchase!",
  expiryDate = "Mar 14, 2025"
}: ReferralCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async () => {
    const shareText = `Check out ORA! Use code ${couponCode} for ${discountAmount}${discountType === "percentage" ? "%" : "$"} off your first purchase. Valid until ${expiryDate}.`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "ORA Referral Code",
          text: shareText,
          url: window.location.origin
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  return (
    <Card className="relative overflow-hidden border-2 border-primary/40 bg-gradient-to-br from-primary/10 via-background to-background">
      {/* Decorative glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <CardHeader className="relative z-10 text-center pb-4">
        <div className="flex justify-center mb-3">
          <div className="bg-primary/20 p-3 rounded-full">
            <Gift className="w-8 h-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl mb-2 tracking-wide">
          Share the <span className="tracking-[0.2em]">ORA</span> Experience
        </CardTitle>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4">
        {/* Coupon Code Display */}
        <div className="bg-background/80 backdrop-blur-sm border-2 border-dashed border-primary/50 rounded-lg p-6 text-center">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3" />
            Referral Code
            <Sparkles className="w-3 h-3" />
          </div>
          <div className="text-4xl font-bold tracking-[0.3em] text-primary mb-3 font-mono">
            {couponCode}
          </div>
          <div className="text-sm text-muted-foreground">
            Get <span className="font-bold text-foreground">{discountAmount}{discountType === "percentage" ? "%" : "$"} OFF</span> your first purchase
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="w-full"
            disabled={copied}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </>
            )}
          </Button>

          <Button
            onClick={handleShare}
            className="w-full"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Expiry Notice */}
        {expiryDate && (
          <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border/50">
            Valid for first-time users only • Expires {expiryDate}
          </div>
        )}

        {/* Bonus Section */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
          <div className="text-sm font-semibold text-foreground mb-1">
            You Get Rewarded Too!
          </div>
          <div className="text-xs text-muted-foreground">
            When your friend makes their first purchase, you'll receive a special bonus credit.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
