# LEVORA ACADEMY - Frontend Client

This is the frontend application for Levora Academy, built with Next.js 14, Tailwind CSS, and Framer Motion.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🛠️ Built With

- **Next.js 14** (App/Pages Router)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **React Icons & Lucide React** (Icons)
- **Axios** (API requests)
- **React Hot Toast** (Notifications)

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## ⚡ Features & Optimizations
- **AI Virtual Counselor:** Integrated a global floating Chatbot powered by Gemini (`gemini-flash-latest`) with scroll-locking and click-outside dismissal optimizations.
- **Next.js Link Prefetching:** All `<Link>` components use `prefetch={false}` to prevent aggressive background fetching of React Server Component payloads (`?_rsc=...`) during scroll.
- **Removed Polling Mechanisms:** Eliminated arbitrary `setInterval` background polling across all data grids and layouts (including `LiveReloader`) to vastly reduce server load and unnecessary database queries.
- **Mobile Responsiveness:** Improved UI scaling on the Study Materials page and Navigation bar for smaller screens.
