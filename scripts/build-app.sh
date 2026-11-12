#!/usr/bin/env bash
# Builds the real NSIN web app (from the submission repo) into site/public/app/.
# The hosted app reads its backend URL from /live.json at start-up, so a new tunnel needs no rebuild.
set -euo pipefail
WEB_APP="${WEB_APP:-/z/Content/IBM_Db2_TechX_Project_Submission/submissions/neighbourhood-safety-intelligence-network/src/web-app}"
export NSIN_APP_OUT="$(cd "$(dirname "$0")/.." && pwd)/site/public/app"
cd "$WEB_APP"
# Vite's Node API, so no shell rewrites the "/app/" base path (Git Bash does).
node --input-type=module -e "
process.env.VITE_LIVE_CONFIG = '/live.json';
const { build } = await import('vite');
await build({ base: '/app/', build: { outDir: process.env.NSIN_APP_OUT, emptyOutDir: true } });"
