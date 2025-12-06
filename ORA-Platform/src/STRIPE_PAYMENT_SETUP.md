# Stripe Payment Integration Guide

## Overview
This guide will help you integrate Stripe payment processing into your ORA Voice of Customer application for handling in-app purchases, subscriptions, and one-time payments.

## What is Stripe?
Stripe is a payment processing platform that allows you to accept credit cards, debit cards, and other payment methods securely. It handles all the complex payment processing, security, and compliance requirements.

## Prerequisites
1. A Stripe account ([Sign up at stripe.com](https://stripe.com))
2. Your application connected to GitHub (from previous setup)
3. Supabase account (optional but recommended for backend)
4. Node.js and npm installed

## Step 1: Create Your Stripe Account

1. Go to [https://stripe.com](https://stripe.com)
2. Click **"Start now"** and create an account
3. Complete the business verification process
4. Get your API keys from the Stripe Dashboard

## Step 2: Get Your Stripe API Keys

1. Log into your [Stripe Dashboard](https://dashboard.stripe.com)
2. Click **"Developers"** in the left sidebar
3. Click **"API keys"**
4. You'll see two keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)

**IMPORTANT**: 
- Use **test keys** (`pk_test_` and `sk_test_`) during development
- Never commit your secret key to GitHub
- Switch to **live keys** only when ready for production

## Step 3: Install Stripe SDK

Add Stripe to your `package.json`:

```bash
npm install @stripe/stripe-js
npm install stripe
```

Or add manually to `package.json`:

```json
{
  "dependencies": {
    "@stripe/stripe-js": "^2.4.0",
    "stripe": "^14.11.0"
  }
}
```

## Step 4: Set Up Environment Variables

Create a `.env.local` file in your project root (already in .gitignore):

```env
# Stripe API Keys (use test keys for development)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Your application URL
VITE_APP_URL=http://localhost:5173
```

**NEVER commit this file to GitHub!** It's already in your `.gitignore`.

## Step 5: Backend Setup Options

### Option A: Supabase Edge Functions (Recommended)

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Create an Edge Function for payment processing:
```bash
supabase functions new create-payment-intent
```

3. Add this code to `supabase/functions/create-payment-intent/index.ts`:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.11.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

serve(async (req) => {
  try {
    const { amount, planId, email } = await req.json()

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      receipt_email: email,
      metadata: {
        planId: planId,
      },
    })

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
```

4. Deploy the function:
```bash
supabase functions deploy create-payment-intent --no-verify-jwt
```

5. Set the Stripe secret in Supabase:
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

### Option B: Firebase Cloud Functions

1. Initialize Firebase Functions:
```bash
firebase init functions
```

2. Install Stripe in functions:
```bash
cd functions
npm install stripe
```

3. Create `functions/src/stripe.ts`:

```typescript
import * as functions from 'firebase-functions';
import Stripe from 'stripe';

const stripe = new Stripe(functions.config().stripe.secret_key, {
  apiVersion: '2023-10-16',
});

export const createPaymentIntent = functions.https.onCall(async (data) => {
  const { amount, planId, email } = data;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'usd',
    receipt_email: email,
    metadata: { planId },
  });

  return { clientSecret: paymentIntent.client_secret };
});
```

4. Set Firebase config:
```bash
firebase functions:config:set stripe.secret_key="sk_test_your_secret_key_here"
```

5. Deploy:
```bash
firebase deploy --only functions
```

## Step 6: Update Your React Component

Create a file `src/lib/stripe.ts`:

```typescript
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);
```

## Step 7: Add Payment Component to Your App

Update `/App.tsx` to include the payment modal:

```typescript
import { useState } from "react";
import { StripePayment } from "./components/StripePayment";
import { Button } from "./components/ui/button";

export default function App() {
  const [showPayment, setShowPayment] = useState(false);

  // ... rest of your code

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      
      {/* Add a button to open payment modal */}
      <Button onClick={() => setShowPayment(true)}>
        View Plans & Pricing
      </Button>

      {showPayment && (
        <StripePayment onClose={() => setShowPayment(false)} />
      )}
      
      {/* rest of your app */}
    </div>
  );
}
```

## Step 8: Testing Payments

Stripe provides test card numbers for development:

### Successful Payment
- **Card Number**: 4242 4242 4242 4242
- **Expiry**: Any future date (e.g., 12/25)
- **CVV**: Any 3 digits (e.g., 123)

### Declined Payment
- **Card Number**: 4000 0000 0000 0002

### More test cards: [Stripe Testing Docs](https://stripe.com/docs/testing)

## Step 9: Webhook Setup (For Production)

Webhooks notify your server when payments succeed or fail:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click **"Add endpoint"**
3. Enter your webhook URL: `https://yourdomain.com/api/webhook`
4. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.deleted`

5. Create a webhook handler in your backend:

```typescript
// Supabase Edge Function example
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.11.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

  try {
    const body = await req.text()
    const event = stripe.webhooks.constructEvent(body, signature!, webhookSecret!)

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        // Handle successful payment
        console.log('Payment succeeded:', paymentIntent.id)
        break
      
      case 'payment_intent.payment_failed':
        // Handle failed payment
        console.log('Payment failed')
        break
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  }
})
```

## Step 10: Update package.json

Make sure these are in your `package.json`:

```json
{
  "dependencies": {
    "@stripe/stripe-js": "^2.4.0",
    "stripe": "^14.11.0"
  }
}
```

## Security Best Practices

1. ✅ **Never expose your Secret Key** - Keep it in environment variables
2. ✅ **Always validate on the server** - Never trust client-side payment data
3. ✅ **Use HTTPS in production** - Required for handling payments
4. ✅ **Implement webhook signature verification** - Prevents fake webhook calls
5. ✅ **Use test mode during development** - Avoid real charges
6. ✅ **Store minimal customer data** - Let Stripe handle sensitive information
7. ✅ **Implement proper error handling** - Show clear messages to users

## Production Checklist

Before going live:

- [ ] Switch from test keys to live keys
- [ ] Complete Stripe account verification
- [ ] Set up webhook endpoints
- [ ] Test payment flows thoroughly
- [ ] Enable Stripe Radar for fraud prevention
- [ ] Set up email receipts
- [ ] Configure tax collection (if applicable)
- [ ] Review Stripe's compliance requirements
- [ ] Test refund processes
- [ ] Set up customer support procedures

## Pricing Models You Can Implement

### 1. One-Time Purchases
```typescript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2999, // $29.99
  currency: 'usd',
});
```

### 2. Subscriptions
```typescript
const subscription = await stripe.subscriptions.create({
  customer: customerId,
  items: [{ price: 'price_xxxxx' }],
});
```

### 3. Usage-Based Billing
```typescript
const subscription = await stripe.subscriptions.create({
  customer: customerId,
  items: [{ price: 'price_xxxxx' }],
  billing_cycle_anchor: 'now',
});
```

## Common Issues & Solutions

### Issue: "No such payment intent"
**Solution**: Make sure you're using the correct API keys (test vs live)

### Issue: Card declined
**Solution**: In test mode, use Stripe's test card numbers

### Issue: Webhook not receiving events
**Solution**: Check webhook URL, signature verification, and selected events

### Issue: CORS errors
**Solution**: Configure CORS in your backend/edge functions

## Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Stripe React Integration](https://stripe.com/docs/stripe-js/react)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Firebase Cloud Functions](https://firebase.google.com/docs/functions)

## Support

- Stripe Support: [https://support.stripe.com](https://support.stripe.com)
- Stripe Status Page: [https://status.stripe.com](https://status.stripe.com)

## Next Steps After Setup

1. Customize the payment plans in `/components/StripePayment.tsx`
2. Implement subscription management
3. Add invoice generation
4. Set up customer portal for managing subscriptions
5. Integrate with your user authentication system
6. Add analytics for tracking payment conversions

---

**Ready to accept payments!** 💳✨

**IMPORTANT**: This is a development setup. Before going live, thoroughly test all payment flows and ensure compliance with payment regulations in your region.
