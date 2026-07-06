#  Shiraz Rozi Cafe Menu

An elegant, modern, and highly interactive multilingual digital menu built for **Shiraz Rozi Cafe**. Designed with a deep, rich emerald green visual theme (`#003d2b`), featuring fluid entrance animations, and built fully with TypeScript, React, and Tailwind CSS.

---

##  Features

- ** Deep Emerald Premium Design**: A meticulously curated brand-focused interface featuring elegant typography, balanced negative space, and vibrant food status tags styled specifically for Shiraz Rozi Cafe.
- ** Multilingual Support (3 Languages)**: Seamlessly switch menu items, titles, and descriptions dynamically between:
  - English (`en`)
  - Hungarian (`hu`)
  - German (`de`)
- ** Smart Search & Categorized Filtering**: Quick lookup system to filter and find coffees, tea, desserts, and savory treats in real-time.
- ** Dynamic Tray & Quick Select**: Allows guests to bookmark items, adjust quantities, and preview their selections directly in an interactive tray drawer.
- ** Fluid Micro-Animations**: Smooth, responsive spring animations and micro-transitions driven by `motion` for an incredibly premium user experience.

---

## Project Structure

```bash
├── src/
│   ├── App.tsx          # Main application housing interactive menu logic and layouts
│   ├── main.tsx         # React application entry point
│   ├── data.ts          # Structured multilingual menu catalog data
│   ├── types.ts         # TypeScript structural shapes, interfaces, and types
│   └── index.css        # Global styles featuring Tailwind directives and custom fonts
├── index.html           # HTML document template
├── vite.config.ts       # Vite bundler configuration (includes relative-path assets setting)
├── vercel.json          # Core routing configuration for seamless Vercel hosting
├── metadata.json        # Platform metadata definitions
└── package.json         # Dependency configuration and build automation commands
```

---

## Installation & Local Development

To run the project on your local machine:

1. **Clone your repository:**
   ```bash
   git clone <your-github-repo-url>
   cd <repo-folder-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   *Your browser will load the app locally (typically at `http://localhost:3000` or `http://localhost:5173`).*

4. **Lint Type Checking:**
   ```bash
   npm run lint
   ```

---

##  Deployment Guide

### Option 1: Deploy to Vercel (Recommended)
Since the `vercel.json` file is already in your repository, Vercel will auto-detect Vite and set up clean URL rewrites:
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Import your GitHub repository.
4. Keep the default build settings:
   - **Framework Preset:** `Vite` OR `Other`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**, and you will get a ready-to-share live link!

### Option 2: Deploy to GitHub Pages
The project's Vite config (`vite.config.ts`) has its `base` property set to `'./'` to allow path-agnostic relative asset loading, making it fully compatible with GitHub Pages:
1. Go to your GitHub Repository settings page.
2. Navigate to **Pages** in the sidebar.
3. Under **Build and deployment** -> **Source**, select **GitHub Actions** (to automate deployments) or **Deploy from a branch** (e.g., using a branch named `gh-pages` build folders).
   *(Tip: You can use standard npm deployment tools like `gh-pages` inside package.json to deploy easily with `npm run deploy` if set up).*

---

*Enjoy Shiraz Rozi Cafe Menu! Proudly crafted with premium design patterns and modern React workflows.*
