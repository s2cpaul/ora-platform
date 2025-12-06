# ora-platform

[![CI/CD Pipeline](https://github.com/s2cpaul/ora-platform/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/s2cpaul/ora-platform/actions/workflows/ci-cd.yml)

A platform with integrated CI/CD pipeline supporting Visual Studio, Figma, Make, and Firestore.

## Features

- **Automated CI/CD Pipeline**: GitHub Actions workflow for continuous integration and deployment
- **Visual Studio / .NET Support**: Build and test .NET applications
- **Figma Integration**: Automated design asset syncing
- **Make Build System**: Traditional Makefile-based builds
- **Firestore Deployment**: Automated Firebase/Firestore deployments

## Getting Started

### Prerequisites

- Git
- Node.js (v18 or higher) - for Firestore and Figma integration
- .NET SDK (7.0 or higher) - for Visual Studio projects
- Make - for Makefile-based builds
- Firebase CLI - for Firestore deployment

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/s2cpaul/ora-platform.git
   cd ora-platform
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. Set up repository secrets in GitHub (see [CI/CD Setup Guide](CI-CD-SETUP.md))

## CI/CD Pipeline

This repository includes a comprehensive CI/CD pipeline that automatically:
- Builds projects with Make and Visual Studio
- Syncs design assets from Figma
- Deploys to Firebase/Firestore
- Runs code quality checks

For detailed setup instructions, see [CI-CD-SETUP.md](CI-CD-SETUP.md).

## Security

This project follows security best practices:
- All secrets are managed through environment variables
- Comprehensive `.gitignore` prevents accidental secret commits
- Automated secret scanning in CI/CD pipeline
- Service account credentials never committed to version control

**Important**: Never commit `.env` files or any files containing secrets to version control.

## Documentation

- [CI/CD Setup Guide](CI-CD-SETUP.md) - Detailed pipeline configuration instructions
- [Environment Variables](.env.example) - Template for required secrets

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure CI/CD pipeline passes
4. Open a pull request

## License

This project is licensed under the MIT License.