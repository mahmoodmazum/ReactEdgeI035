# Deploying to Vercel — Step-by-Step Guide

## Prerequisites
- A GitHub account
- Your React + Vite project pushed to a public or private GitHub repo

## Step 1 — Build your app

```bash
npm run build
```

This creates an optimized `/dist` folder with minified production files.

## Step 2 — Commit and push to GitHub

```bash
git add .
git commit -m "ready to deploy"
git push origin main
```

> Vercel watches your repository. Every push to `main` triggers a new deploy.

## Step 3 — Import your project on Vercel

1. Go to **vercel.com/new**
2. Click **"Add New → Project"**
3. Connect your GitHub account
4. Select the repository
5. Vercel auto-detects Vite — no manual config needed
6. Click **Deploy**

## Step 4 — Your app is live!

Your app will be available at: `https://your-project-name.vercel.app`

## Environment Variables

Never commit `.env` files! Instead:

1. Go to Vercel Dashboard → Your Project → **Settings → Environment Variables**
2. Add your `VITE_*` variables there
3. Redeploy

## Auto-deploy on every push

Once connected, every `git push origin main` automatically:
1. Triggers a new build on Vercel
2. Runs your build command (`npm run build`)
3. Deploys the new version — zero downtime

## Tips

- Add `vercel.app` to your `.gitignore` — it's not needed in the repo
- Use **Preview Deployments** for pull requests
- The free Hobby plan is sufficient for class projects
