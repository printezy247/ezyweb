#!/bin/bash
# Manual deploy helper for GoldPulse (Run AFTER setting secrets).
# This script does NOT auto-deploy on every push — it only runs when you call it.
set -e

APP_DIR="$(dirname "$0")/../apps/goldpulse"
cd "$APP_DIR"

echo "🚀 Deploying GoldPulse from $APP_DIR"
echo "Make sure FLY_API_TOKEN is set if using Fly.io, or use Railway's GitHub integration."

if command -v fly &> /dev/null; then
    fly deploy --remote-only --yes
else
    echo "⚠️  flyctl not found. Install it first: https://fly.io/docs/hands-on/install-flyctl/"
    echo "Or deploy via Railway: https://railway.app"
    exit 1
fi
