# 🇹🇼 Taiwan 2027 — Trip Itinerary Website

A private, password-protected Next.js itinerary website for a 5-day Taiwan trip.
Built with a dark Taiwanese aesthetic, GSAP animations, and Supabase authentication.

---

## ✨ Features

- **Login-only access** — No registration. You add users directly via Supabase dashboard.
- **Hero section** — Trip overview with animated stats and parallax kanji watermarks
- **Places section** — All 15+ destinations with filterable cards and a full map modal
- **Interactive Timetable** — Day-by-day view with activity details, maps, and route info
- **GSAP animations** — Scroll-triggered reveals, staggered text, parallax effects
- **Taiwanese aesthetic** — Dark ink background, crimson accents, Noto Serif TC font, kanji motifs

---

## 🚀 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your project dashboard, go to **Settings → API**
3. Copy your **Project URL** and **anon/public key**
4. Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Add Users (No Registration Page By Design)

1. In Supabase dashboard → **Authentication → Users**
2. Click **"Invite user"** or **"Add user"**
3. Enter email + password for each traveler
4. Done! They can log in immediately.

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/login`.

### 5. Deploy

```bash
# Vercel (recommended)
npx vercel

# Or build for production
npm run build
npm start
```

Add your environment variables in your Vercel/Netlify project settings.

---

## 📁 Project Structure

```
taiwan-trip/
├── app/
│   ├── auth/callback/route.ts     # Supabase OAuth callback
│   ├── dashboard/
│   │   ├── layout.tsx             # Auth guard for dashboard
│   │   └── page.tsx               # Main itinerary page
│   ├── login/
│   │   └── page.tsx               # Login page
│   ├── globals.css                # Global styles + CSS variables
│   ├── layout.tsx                 # Root layout with fonts
│   └── page.tsx                   # Root redirect
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx        # Hero with GSAP animations
│   │   ├── PlacesSection.tsx      # Filterable places grid + modal
│   │   └── TimetableSection.tsx   # Interactive day-by-day timetable
│   ├── Footer.tsx
│   └── Navbar.tsx                 # Fixed nav with scroll progress
├── lib/
│   ├── itinerary-data.ts          # All trip data (days, places, activities)
│   └── supabase/
│       ├── client.ts              # Browser Supabase client
│       └── server.ts              # Server Supabase client
├── middleware.ts                  # Auth session + route protection
├── tailwind.config.ts
└── next.config.js
```

---

## 🎨 Customization

### Edit the Itinerary
All trip data lives in `lib/itinerary-data.ts`. Edit days, activities, places, budgets, and tips there.

### Colors (CSS Variables in `globals.css`)
```css
--crimson: #C41E3A;   /* Primary accent — Taiwanese red */
--jade: #2D6A4F;      /* Secondary — nature green */
--gold: #C9A84C;      /* Tips + highlights */
--ink: #0D0D0D;       /* Background */
--paper: #F5F0E8;     /* Text */
```

### Google Maps Embed
The map iframes use coordinate-based embeds (no API key needed for basic embeds).
For full Google Maps API features, add `NEXT_PUBLIC_GOOGLE_MAPS_KEY` to your env.

---

## 📱 Responsive Breakpoints

- Mobile: Full-width stacked layout
- Tablet: 2-column places grid, side-by-side nav
- Desktop: 4-column places grid, 2-column timetable (activities + detail panel)

---

## 🔐 Auth Flow

```
User visits / → middleware checks auth
  → Not logged in → /login
  → Logged in → /dashboard

User logs in with email+password (Supabase)
  → Success → /dashboard
  → Fail → error message shown

User clicks Sign Out
  → Supabase session cleared → /login
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Auth | Supabase Auth |
| Animations | GSAP 3 (ScrollTrigger) |
| Styling | Tailwind CSS + Custom CSS |
| Fonts | Noto Serif TC, DM Sans, Space Mono |
| Maps | Google Maps Embed API |
| Deployment | Vercel (recommended) |

---

## 🗺️ Itinerary Summary

| Day | Focus | Budget |
|-----|-------|--------|
| Day 1 | Arrival + Ximending + Shilin Night Market | ₱1,500–2,500 |
| Day 2 | CKS Memorial + Taipei 101 + Elephant Mountain | ₱1,200–2,000 |
| Day 3 | Beitou Hot Springs + Chung Cheng University | ₱800–1,500 |
| Day 4 | Yehliu + Shifen + Jiufen (Shared Tour) | ₱2,000–3,500 |
| Day 5 | Maokong / Pasalubong + Departure | ₱1,000–2,500 |

**Total Estimate: ₱15,000–25,000** (excluding flights)

---

*Built for the Taiwan 2027 squad. 再見！*
