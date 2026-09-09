#!/bin/bash
# Auto-commit helper for the ezyweb monorepo
# Usage: bash printezy-9-products/scripts/auto-commit.sh "message"
MSG="${1:-auto: updates}"
cd "$(dirname "$0")/../../.."
git add README.md RESEARCH_TRADING_9_PRODUCTS.md assets printezy-9-products .github
git commit -m "$MSG" || echo "No changes to commit."
