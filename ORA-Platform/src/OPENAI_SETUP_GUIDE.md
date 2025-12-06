# OpenAI Integration Setup Guide

## Overview
This guide walks you through integrating OpenAI's API with your ORA AI Assistant to enable intelligent responses and conversational capabilities.

---

## STEP 1: Get Your OpenAI API Key

### 1.1 Create OpenAI Account
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to **API Keys** section

### 1.2 Generate API Key
1. Click **"Create new secret key"**
2. Give it a name: `ORA-AI-Assistant`
3. **IMPORTANT**: Copy the key immediately (you won't see it again)
4. Store it securely - never commit it to Git

### 1.3 Set Up Billing
1. Go to **Settings** → **Billing**
2. Add a payment method
3. Set up usage limits to control costs
4. Recommended starting limit: $10-20/month

---

## STEP 2: Create Environment Variables File

### 2.1 Create .env File in Project Root

```bash
# In your project root directory, create .env file
# This file is already in .gitignore - safe to use
```

### 2.2 Add OpenAI Configuration

Create a file named `.env` in your project root:

```env
# OpenAI API Configuration
VITE_OPENAI_API_KEY=sk-your-actual-api-key-here

# OpenAI Model Settings
VITE_OPENAI_MODEL=gpt-4-turbo-preview
VITE_OPENAI_MAX_TOKENS=1000
VITE_OPENAI_TEMPERATURE=0.7

# Optional: Organization ID (if you have one)
VITE_OPENAI_ORG_ID=org-your-org-id-here
```

**CRITICAL**: Replace `sk-your-actual-api-key-here` with your actual OpenAI API key

---

## STEP 3: Install OpenAI SDK

### 3.1 Install Required Package

Open terminal in VS Code and run:

```bash
npm install openai
```

### 3.2 Install Environment Variables Support

```bash
npm install dotenv
```

---

## STEP 4: Update AIAgent Component

The AIAgent.tsx file needs to be updated to integrate with OpenAI. See the updated component with:
- OpenAI API integration
- Streaming responses
- Error handling
- Rate limiting protection

---

## STEP 5: Test the Integration

### 5.1 Local Testing
1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open the AI Agent chat
3. Send a test message
4. Verify the AI responds with OpenAI-powered answers

### 5.2 Monitor Usage
1. Visit [OpenAI Usage Dashboard](https://platform.openai.com/usage)
2. Monitor API calls and costs
3. Adjust limits if needed

---

## STEP 6: Production Environment Variables

### 6.1 Firebase Hosting Environment Variables

For Firebase deployment, you'll need to add environment variables:

```bash
# Using Firebase CLI
firebase functions:config:set openai.api_key="sk-your-key-here"
firebase functions:config:set openai.model="gpt-4-turbo-preview"
```

### 6.2 Create firebase.env File (for local testing only)

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
OPENAI_MODEL=gpt-4-turbo-preview
```

Add to `.gitignore`: `firebase.env`

---

## STEP 7: Security Best Practices

### 7.1 Never Commit API Keys
✅ API key is in `.env` file
✅ `.env` is in `.gitignore`
✅ Never commit `.env` to GitHub

### 7.2 Use Environment Variables
```typescript
// Good ✅
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

// Bad ❌
const apiKey = "sk-12345..."; // Never hardcode!
```

### 7.3 Implement Rate Limiting
- Add user message rate limiting (included in updated AIAgent.tsx)
- Implement request queuing for high traffic
- Set OpenAI usage limits

### 7.4 Error Handling
- Handle API errors gracefully
- Display user-friendly error messages
- Log errors for debugging (without exposing keys)

---

## STEP 8: Cost Optimization

### 8.1 Choose the Right Model
- **gpt-4-turbo-preview**: Most capable, higher cost (~$0.01/1K tokens)
- **gpt-3.5-turbo**: Faster, lower cost (~$0.0015/1K tokens)
- For your use case: Start with gpt-3.5-turbo

### 8.2 Limit Token Usage
```typescript
max_tokens: 500-1000  // Reasonable for chat responses
temperature: 0.7      // Balance creativity and consistency
```

### 8.3 Implement Caching (Future Enhancement)
- Cache common questions/answers
- Reduce redundant API calls
- Use localStorage for session memory

---

## STEP 9: Monitoring and Analytics

### 9.1 Track API Usage
```typescript
// Add to your AIAgent component
const logAPIUsage = (tokens: number, cost: number) => {
  // Log to Firebase Analytics or your analytics service
  console.log(`API Call: ${tokens} tokens, $${cost}`);
};
```

### 9.2 Set Up Alerts
1. OpenAI Dashboard → Usage → Set alerts
2. Get notified at 50%, 75%, 90% of budget
3. Automatic cutoff at 100%

---

## STEP 10: Testing Checklist

- [ ] API key stored in `.env` file
- [ ] `.env` file in `.gitignore`
- [ ] OpenAI package installed
- [ ] AIAgent.tsx updated with OpenAI integration
- [ ] Test message sent successfully
- [ ] AI responds with intelligent answers
- [ ] Error handling works (test with invalid key)
- [ ] Usage monitoring set up
- [ ] Budget limits configured
- [ ] Production environment variables ready

---

## Troubleshooting

### Problem: "API key not found" error
**Solution**: 
1. Check `.env` file exists in root
2. Restart development server after creating `.env`
3. Verify variable name: `VITE_OPENAI_API_KEY`

### Problem: "Rate limit exceeded"
**Solution**:
1. Check OpenAI usage dashboard
2. Increase rate limits or upgrade plan
3. Implement request throttling

### Problem: High costs
**Solution**:
1. Switch to gpt-3.5-turbo model
2. Reduce max_tokens
3. Implement caching for common queries
4. Add rate limiting per user

### Problem: Slow responses
**Solution**:
1. Use streaming responses (included in updated code)
2. Reduce max_tokens
3. Consider gpt-3.5-turbo for faster responses

---

## Next Steps

After completing OpenAI setup:
1. ✅ Set up HeyGen video integration
2. ✅ Configure keyword-based video recommendations
3. ✅ Train AI with custom knowledge base
4. ✅ Deploy to production with Firebase

---

**Status**: OpenAI Integration Setup Complete
**Ready for**: HeyGen Video Integration and AI Training
