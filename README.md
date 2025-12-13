# ora-platform

## Prerequisites Checklist

Before you begin, ensure you have:

- [ ] **Node.js** 18+ installed ([Download](https://nodejs.org/))
- [ ] **Git** installed ([Download](https://git-scm.com/))
- [ ] **Visual Studio Code** installed ([Download](https://code.visualstudio.com/))
- [ ] **GitHub account** ([Sign up](https://github.com/))
- [ ] **Supabase account** ([Sign up](https://supabase.com/))
- [ ] **Firebase account** ([Sign up](https://console.firebase.google.com/))
- [ ] **Google Cloud Console** access (for OAuth)
- [ ] **Stripe account** (for payments - optional initially)

## Pro tip: Make sure your .gitignore includes:

```
node_modules/
.env
.env.local
dist/
build/
.DS_Store
```

**Pro tip for macOS users:**
To install the Supabase CLI, use Homebrew:

```bash
brew install supabase/tap/supabase
```

This is the recommended method for Mac. For other platforms, see the official Supabase CLI docs.

---

# ORA-Global-AI-Community-UI

This is a code bundle for ORA-Global-AI-Community-UI. The original project is available at https://www.figma.com/design/Q1Oja4U0Wxhtd9XrT79Q3c/ORA-Global-AI-Community-UI.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

---

**Vite Development Server**

- VITE v7.2.6 ready in 377 ms
- Local:   http://localhost:5173/
- Network: use --host to expose
- Press h + enter to show help

## Automate Your Git Workflow

To automate staging, committing, rebasing, and pushing changes, use the provided script:

1. Save the following as `git-auto.sh` in your project root:

```sh
#!/bin/zsh

# Stage all changes
git add .

# Use a default commit message
git commit -m "Automated commit: update and resolve changes" || echo "No changes to commit."

# Pull and rebase with remote main
git pull --rebase origin main

# Push to remote main
git push origin main
```

2. Make the script executable:
```sh
chmod +x git-auto.sh
```

3. Run the script to automate your workflow:
```sh
./git-auto.sh
```

This will stage, commit, rebase, and push your changes automatically, activating your GitHub Actions workflow on every push.

## Firebase Project and Web App Naming

Firebase uses a two-level structure:
- **Project**: The main container for all Firebase services (e.g., `ora-platform`).
- **Web App**: A registered frontend app within your project (e.g., `ora-web-app`).

You only need one Firebase project for hosting and backend services. You can register multiple web apps inside that project for different frontends. Use the hosting and configuration from your main project (`ora-platform`).

If you see both names in your Firebase Console, this is normal. Your web app (`ora-web-app`) is just the frontend registered in your main project (`ora-platform`).

## Firebase Billing Setup

To use Firebase App Hosting and other advanced features, you must enable billing on your project:

- **Billing Plan**: Blaze (pay-as-you-go)
- **Billing Account Name**: Firebase Payment
- **Billing Account ID**: 0175A6-C0E8AE-A96919

You can manage billing in the Firebase Console under Usage & Billing. Enabling billing unlocks App Hosting and other production features.

## Content Guidelines

**Text Size Minimum for Lesson Content:**
- The text size used in lesson subtitles and content should be `text-sm` (this size) and not smaller.
- Example: "Micro-learning modeule • 15 min | Knowledge Check • Untimed: self paced"

## Training a Video-Centric AI Model

Training a video-centric AI model can be a multi-step challenging task, but here is how you could start:

### Data Gathering
Obtain a substantial collection of videos that reflect your pattern and context. Your video library will serve as the base dataset for teaching the AI.

### Labeling and Annotation
Videos need to be tagged and categorized so that the AI can begin to understand what they depict. Annotation tools can assist with this process.

### Designing an AI Model
A convolutional neural network (CNN) would be ideal for pattern recognition in videos. If the context is equally important, a recurrent neural network (RNN) might be needed to understand the sequence of frames as a whole.

### Train the AI Model
Use your annotated video library to train your model. In this phase, the model learns from the patterns and contexts you've defined.

### Test the AI Model
After training, you should test your AI model on unseen video data to evaluate its performance and adjust as necessary.

### Deployment of the AI Model
Once everything worked as envisaged, you can deploy the AI model to start interpreting videos automatically.

### Continual Learning
Machine Learning models also improve over time. It's crucial that the model keeps learning from new videos, even after it's been deployed.

**Remember that AI training can take a significant amount of time and resources.** It might be necessary to employ cloud-based services for more extensive computations or to use pre-trained models to hasten the learning process. Also, video annotation can be quite complex. Therefore make sure your annotation tools or services can handle it, or consider working with a partner that can help you with this part.
