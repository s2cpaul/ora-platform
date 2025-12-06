# CI/CD Pipeline Documentation

This repository includes a comprehensive CI/CD pipeline using GitHub Actions that supports:
- **Visual Studio / .NET**: Building and testing .NET applications
- **Figma**: Syncing and exporting design assets
- **Make**: Building with Makefiles
- **Firestore**: Deploying to Firebase/Firestore

## Pipeline Overview

The CI/CD pipeline consists of the following jobs:

### 1. Build with Make
- Runs on Ubuntu
- Executes `make build` if a Makefile is present
- Caches build artifacts
- Uploads artifacts for use in subsequent jobs

### 2. Visual Studio / .NET Build
- Runs on Windows
- Supports both MSBuild and dotnet CLI
- Restores dependencies, builds, and runs tests
- Works with both .sln and .csproj files

### 3. Figma Design Sync
- Syncs design assets from Figma
- Exports design components
- Commits updated assets back to the repository
- Only runs on push or manual trigger

### 4. Firestore Deployment
- Deploys Firestore rules and indexes
- Deploys Firebase Functions
- Only runs on pushes to the main branch
- Requires proper Firebase configuration

### 5. Code Quality Checks
- Runs linters (ESLint if configured)
- Scans for accidentally committed secrets
- Provides early feedback on code quality

## Setup Instructions

### 1. Configure Repository Secrets

Go to your repository Settings > Secrets and variables > Actions, and add the following secrets:

#### Required for Firestore Deployment:
- `FIREBASE_TOKEN`: Firebase CI token (get it by running `firebase login:ci`)
- `GOOGLE_APPLICATION_CREDENTIALS`: Service account JSON key (base64 encoded or stored as secret)

#### Required for Figma Integration:
- `FIGMA_TOKEN`: Personal access token from Figma (Account Settings > Personal Access Tokens)
- `FIGMA_FILE_KEY`: The file ID from your Figma file URL

### 2. Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your actual values in `.env`

3. **IMPORTANT**: Never commit `.env` to version control. It's already in `.gitignore`.

### 3. Firebase Configuration

If you're using Firestore, you need to set up Firebase:

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init
   ```
   - Select Firestore
   - Choose your Firebase project
   - Accept default files (firestore.rules, firestore.indexes.json)

4. Get CI token for GitHub Actions:
   ```bash
   firebase login:ci
   ```
   Add the token to GitHub Secrets as `FIREBASE_TOKEN`

### 4. Figma Configuration

To enable Figma integration:

1. Get your Figma Personal Access Token:
   - Go to Figma Account Settings
   - Navigate to Personal Access Tokens
   - Create a new token
   - Add it to GitHub Secrets as `FIGMA_TOKEN`

2. Get your Figma File Key:
   - Open your Figma file
   - Copy the file key from the URL: `https://www.figma.com/file/{FILE_KEY}/...`
   - Add it to GitHub Secrets as `FIGMA_FILE_KEY`

3. (Optional) Configure figma-export:
   ```bash
   npm install --save-dev @figma-export/cli @figma-export/output-components-as-svg
   ```

### 5. Visual Studio / .NET Projects

For .NET projects:

1. Ensure you have a `.sln` or `.csproj` file in your repository
2. The pipeline will automatically detect and build your project
3. Tests will run automatically if configured in your solution

### 6. Makefile Projects

If you use Make:

1. Create a `Makefile` in your repository root
2. Add a `build` target:
   ```makefile
   .PHONY: build
   build:
       # Your build commands here
       @echo "Building project..."
   ```

## Workflow Triggers

The pipeline runs on:
- **Push** to `main` or `develop` branches
- **Pull requests** to `main` or `develop` branches
- **Manual trigger** via workflow_dispatch

## Security Best Practices

### Secret Management

1. **Never commit secrets** to version control
2. Use GitHub Secrets for sensitive data
3. Use `.env.example` as a template only
4. Regularly rotate secrets and tokens

### Files Protected by .gitignore

The following sensitive files are automatically ignored:
- `*.key`, `*.pem`, `*.p12`, `*.pfx` - Certificate and key files
- `.env`, `.env.*` - Environment variable files
- `secrets.json` - Secret configuration files
- `service-account*.json` - Firebase service account keys
- `firebase-adminsdk*.json` - Firebase Admin SDK keys
- `credentials.json` - General credentials

### Code Scanning

The pipeline includes basic secret scanning that checks for:
- Hardcoded passwords
- API keys in code
- Secret tokens
- Suspicious patterns in commit messages

## Customization

### Modifying the Pipeline

Edit `.github/workflows/ci-cd.yml` to:
- Add more jobs
- Change trigger conditions
- Modify build steps
- Add deployment targets

### Adding New Secrets

1. Update `.env.example` with new secret placeholders
2. Add secrets to GitHub repository settings
3. Update workflow to use new secrets

## Troubleshooting

### Build Failures

- Check the Actions tab for detailed logs
- Verify all required secrets are configured
- Ensure dependencies are properly specified

### Firestore Deployment Issues

- Verify `FIREBASE_TOKEN` is valid (tokens expire)
- Check that `firebase.json` exists and is properly configured
- Ensure service account has proper permissions

### Figma Sync Issues

- Verify `FIGMA_TOKEN` is valid
- Check `FIGMA_FILE_KEY` is correct
- Ensure Figma file permissions allow API access

## Local Development

### Running Locally

1. Set up environment:
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

2. Install dependencies:
   ```bash
   npm install  # For Node.js projects
   dotnet restore  # For .NET projects
   ```

3. Build locally:
   ```bash
   make build  # If using Make
   dotnet build  # For .NET projects
   npm run build  # For Node.js projects
   ```

### Testing CI/CD Changes

To test workflow changes without pushing to main:
1. Create a feature branch
2. Push changes
3. Open a pull request
4. The pipeline will run automatically

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [Figma API Documentation](https://www.figma.com/developers/api)
- [Make Documentation](https://www.gnu.org/software/make/manual/)
- [.NET CLI Documentation](https://docs.microsoft.com/en-us/dotnet/core/tools/)

## Support

For issues or questions about the CI/CD pipeline:
1. Check the Actions tab for build logs
2. Review this documentation
3. Open an issue in the repository
