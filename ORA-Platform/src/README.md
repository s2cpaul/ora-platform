# ORA - Voice of the Customer AI Platform

A comprehensive AI-powered educational platform for veterans and service members, featuring training modules, gamification, sentiment tracking, and PDF library management.

## 🌟 Features

- **Multi-App Showcase**: 3 Progressive Web Applications
- **AI Assistant**: Interactive AI agent with contextual help
- **Lesson System**: Comprehensive training modules with video content
- **Gamification**: Points, badges, and progress tracking
- **AI Notebook**: Mind mapping and note-taking
- **Sentiment Tracking**: 45 different sentiment options with analytics
- **PDF Library**: Upload, organize, and share training materials
- **Revenue Dashboards**: B2B and Veterans monetization tracking
- **Dark/Light Mode**: Theme persistence
- **Mobile-First Design**: Optimized for all devices

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons
- **Recharts** - Data visualization
- **Motion (Framer Motion)** - Animations

### Backend
- **Supabase** - Backend as a Service
  - PostgreSQL Database
  - Edge Functions (Deno/Hono)
  - Storage (PDF files)
  - Authentication
- **Hono** - Web framework for Edge Functions

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun
- Supabase account
- Firebase account (for Google OAuth)
- Git

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd ora-platform
```

### 2. Install Dependencies
```bash
npm install
# or
bun install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_DB_URL=your_database_url

# Firebase Configuration (Optional)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id

# OpenAI (for AI Assistant)
OPENAI_API_KEY=your_openai_api_key
```

### 4. Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. The app uses a pre-configured KV store table (`kv_store_3504d096`)
3. Deploy the Edge Function:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Deploy functions
supabase functions deploy make-server-3504d096
```

4. Set environment secrets:
```bash
supabase secrets set SUPABASE_URL=your_url
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_key
```

### 5. Firebase Setup (for Google OAuth)

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Google Authentication in Firebase Console
3. Add your domain to authorized domains
4. Copy your Firebase config to `.env`

For detailed Google OAuth setup:
https://supabase.com/docs/guides/auth/social-login/auth-google

## 🚀 Development

```bash
# Start development server
npm run dev
# or
bun dev

# Access at http://localhost:5173
```

## 📱 Building for Production

```bash
# Build the app
npm run build
# or
bun run build

# Preview production build
npm run preview
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended for Frontend)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### Option 3: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📂 Project Structure

```
ora-platform/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── AIAgent.tsx     # AI assistant
│   ├── PDFLibrary.tsx  # PDF management
│   ├── Navigation.tsx  # Global navigation
│   └── ...
├── supabase/
│   └── functions/
│       └── server/     # Edge Functions (Hono API)
├── styles/
│   └── globals.css     # Global styles & Tailwind
├── utils/
│   └── supabase/       # Supabase utilities
├── App.tsx             # Main application
└── main.tsx            # Entry point
```

## 🔑 Key Features Guide

### PDF Library
- Upload PDFs with metadata
- Search and filter by category, tags
- Grid/List view toggle
- Download and preview
- Edit metadata
- Access control (public/private)

### AI Assistant
- Contextual help
- Lesson recommendations
- Integration with PDF library
- HeyGen video integration (planned)

### Gamification System
- Points for completing lessons
- Achievement badges
- Progress tracking
- Leaderboard

### Revenue Dashboards
- B2B/Enterprise: $20K entry point
- Consumer: $19.99/month subscriptions
- In-app purchases: $29.99-$99.99
- AdMob integration (mobile)

## 🔒 Security Notes

**IMPORTANT**: 
- Never commit `.env` files
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to frontend
- Use environment variables for all API keys
- The KV store provides basic storage but is not designed for highly sensitive PII
- For production, implement proper authentication and authorization

## 🛣️ Roadmap

- [ ] Google OAuth integration
- [ ] Firebase Analytics
- [ ] HeyGen video integration
- [ ] Stripe payment processing
- [ ] AdMob monetization
- [ ] Push notifications
- [ ] Offline mode (PWA)
- [ ] Social sharing features
- [ ] Advanced analytics dashboard

## 📄 License

Copyright © 2025 ORA Platform. All rights reserved.

## 🤝 Support

For issues and questions, please open an issue in the repository.

---

Built with ❤️ for veterans and service members
