

# GupShupGo — Product Landing Page

A dark-first, brutally clean landing page for the GupShupGo Flutter communication app. Design inspired by Notion × Linear × Nothing Phone aesthetics.

## Design System
- **Base**: Deep near-black (#0D0D0D) with dark surface cards (#161616) and subtle borders (#2A2A2A)
- **Accents**: Electric indigo/violet (#7C3AED → #4F46E5) + bright teal (#06B6D4)
- **Typography**: Inter for body, bold geometric sans for display headings
- **Texture**: Subtle CSS grain/noise overlay on hero section
- **No**: white backgrounds, stock photos, glassmorphism cards, Lottie/GIFs

## Sections

### 1. Sticky Navbar
- GupShupGo logo (using uploaded app icon) + wordmark
- Navigation links: Features, Architecture, Tech Stack, GitHub
- "View on GitHub" outlined button + star count badge
- Frosted glass blur effect on scroll, slight shrink animation

### 2. Hero Section
- Large display headline: "Talk. Vibe. Connect. Anywhere." with staggered character reveal
- Muted subheadline describing the app's capabilities
- Two CTAs: "Watch Demo →" (filled indigo) + "View Source" (ghost)
- Trust badges row: Flutter 3.5 · Firebase · Agora RTC · Open Source · MIT License
- CSS-built phone mockup with fake chat UI, subtle floating animation

### 3. Feature Grid (8 cards)
- 4-column desktop → 2-column mobile layout
- Dark surface cards with 1px borders, monochrome icons, title + 2-line description
- Features: HD Video Calling, Voice Calls, Real-Time Messaging, Status Updates, Background Calls, Call Logs, Phone Auth, Presence System
- Hover: border color transitions to indigo

### 4. Architecture Visualizer ("How It Works")
- Three-column horizontal flow: Device → Firebase → Agora RTC
- CSS/SVG-built diagram with rounded dark boxes, icons, and labels
- Animated dashed connection lines between nodes
- Hover glow effect on each node

### 5. Tech Stack Section
- Title: "Built on rock-solid infrastructure"
- Grid of pill/badge items: Flutter, Dart, Firebase, Agora, Provider, Firestore, FCM, Firebase Storage, Material Design 3
- Dark background pills with hover border light-up

### 6. Demo Highlight
- Full-width dark section, 2-column layout
- Left: Pure CSS video call mockup — two phone frames (outgoing + incoming call)
- Right: Bullet list of in-call features (Mute, Video toggle, Speaker, Flip Camera, Hold, Timer)

### 7. Open Source CTA Strip
- Violet-tinted dark banner
- "Open source. Production quality. Zero compromise."
- Two buttons: "GitHub Repo" + "Read Architecture Docs"

### 8. Footer
- Minimal: logo, nav links, GitHub link
- "Made with Flutter & ❤️ by vansh-121" + MIT License badge

## Animations & Polish
- Scroll-triggered fade-in-up for each section (Intersection Observer)
- All transitions ≤300ms, ease-out only
- Smooth scroll, navbar shrink on scroll
- Feature card hover border color shift
- Architecture diagram animated dashed lines + hover glow

