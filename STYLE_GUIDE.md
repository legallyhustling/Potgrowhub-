# Style Guide

## Overview
This style guide defines the **visual, interaction, and content standards** for the platform, encompassing **AI, AR/VR, E-commerce, 3DPoD/PoD, voice interfaces, auto drop-shipping, auto procurement, and delivery**. It ensures a **cohesive user experience**, **brand consistency**, and **production-ready implementation** across web, mobile, and AR/VR environments.

---

## Table of Contents
1. [Brand Identity](#brand-identity)  
2. [Color Palette](#color-palette)  
3. [Typography](#typography)  
4. [Iconography](#iconography)  
5. [Spacing & Layout](#spacing--layout)  
6. [Components](#components)  
   - [Buttons](#buttons)  
   - [Forms & Inputs](#forms--inputs)  
   - [Cards](#cards)  
   - [Modals & Popups](#modals--popups)  
   - [Navigation](#navigation)  
7. [AI & Voice Interfaces](#ai--voice-interfaces)  
8. [AR/VR Components](#arvr-components)  
9. [E-commerce & 3DPoD/PoD](#e-commerce--3dpodpdp)  
10. [Gamification Elements](#gamification-elements)  
11. [Animation & Micro-Interactions](#animation--micro-interactions)  
12. [Accessibility & Localization](#accessibility--localization)  
13. [Content Guidelines](#content-guidelines)  
14. [Delivery & Procurement Workflows](#delivery--procurement-workflows)  
15. [Documentation & Versioning](#documentation--versioning)  

---

## Brand Identity

- **Logo:** Full color, monochrome, and icon-only variants  
- **Tagline:** “Scan. Design. Build. Delivered.”  
- **Tone & Voice:**  
  - Friendly, confident, professional  
  - AI assistance tone: knowledgeable but approachable  
  - E-commerce/product tone: precise, trustworthy, transparent  
- **Brand Voice Modulation:** Adaptive for AR/VR, voice assistants, and chatbots

---

## Color Palette

| Role                     | Hex       | Usage |
|---------------------------|-----------|-------|
| Primary                  | #1A73E8   | Buttons, links, highlights |
| Secondary                | #FF6D00   | CTAs, alerts |
| Neutral Dark             | #121212   | Backgrounds, headers |
| Neutral Light            | #F5F5F5   | Cards, sections |
| Accent Success           | #00C853   | Success states |
| Accent Warning           | #FFD600   | Warnings, minor alerts |
| Accent Error             | #D50000   | Error states |

- AR/VR holographic accents: neon cyan (#00FFFF), magenta (#FF00FF), lime (#A6FF00)

---

## Typography

| Element                  | Font Family              | Weight  | Size (px/rem) |
|---------------------------|------------------------|--------|---------------|
| Heading 1 (H1)           | Playfair Display        | 700    | 48px / 3rem   |
| Heading 2 (H2)           | Montserrat              | 700    | 36px / 2.25rem |
| Heading 3 (H3)           | Montserrat              | 500    | 28px / 1.75rem |
| Body Text                | Roboto                  | 400    | 16px / 1rem   |
| Captions/Labels          | Roboto Mono             | 400    | 14px / 0.875rem |

- AR/VR: Use dynamic scaling based on distance from user  
- Voice interfaces: Friendly, concise, semantically structured

---

## Iconography

- **Material Icons** for interface controls  
- **Custom AR/VR Icons:** wireframe and solid variations for 3D spatial cues  
- **E-commerce Icons:** cart, product, wishlist, shipping, payment  
- **AI/Voice Icons:** microphone, chat, suggestions, feedback  

---

## Spacing & Layout

- Base spacing unit: 8px  
- Grid system: 12 columns, responsive  
- Section padding: 48px desktop, 24px mobile  
- AR/VR/3D Canvas margins adapt to virtual user space

---

## Components

### Buttons
- **Primary:** Filled, bold text, hover/active states  
- **Secondary:** Outlined or ghost style  
- **AR/VR:** Interactive 3D buttons with hover glow and haptic feedback  

### Forms & Inputs
- **Text, Number, Email** fields with validation states  
- **AI Chat Input:** Auto-suggest, real-time typing feedback  
- **Voice Input:** Microphone activation with visual waveform

### Cards
- Product cards, AI suggestions, 3DPoD previews  
- Hover and focus states with elevation and shadow  
- AR/VR preview cards with rotation and depth cue

### Modals & Popups
- Full accessibility focus (focus trap, aria labels)  
- AR/VR context modals anchored to 3D coordinates  
- Gamification achievement popups with animation

### Navigation
- Header: Top / Middle / Bottom with utility links  
- AR/VR: Floating navigation panels  
- Voice commands: “Go to Home”, “Open Shop”, “Show Dashboard”

---

## AI & Voice Interfaces

- **AI Chatbot Styling:**  
  - Bubble style, dynamic colors, typing animation  
  - User messages: subtle shadow, AI messages: primary accent color  
- **Voice Assistant:**  
  - Waveform animation  
  - Voice input feedback in real-time  
- **Context Awareness:**  
  - AI suggestions tied to active project, e-commerce cart, or AR/VR scene

---

## AR/VR Components

- **3D Canvas:** Full-screen, responsive, GPU-optimized  
- **Models & Assets:** GLTF/FBX optimized with LOD  
- **User Interaction:** Grab, scale, rotate, teleport  
- **HUD:** AR overlays with labels, measurements, and product info  
- **AR/VR Animations:** Micro-transitions, particle effects, lighting adjustments

---

## E-commerce & 3DPoD/PoD

- **Product Grid:** Cards with AR preview button  
- **3DPoD Preview:** Model rotation, zoom, material selection  
- **Checkout Flow:** Multi-step with progress bar, saved addresses, payment methods  
- **Cart & Wishlist:** Persistent, real-time sync across devices  
- **Auto Drop Shipping:** Dynamic supplier selection, stock sync, live cost update  
- **Auto Procurement:** Backend service triggers for fulfillment  
- **Delivery & Tracking:** Visual progress indicator, estimated arrival, notifications

---

## Gamification Elements

- **XP Points & Badges:** Display on dashboard and AR HUD  
- **Achievements:** Unlockable through tasks, AI engagement, purchases  
- **Leaderboard:** Global and project-based  
- **Animations:** GSAP / Lottie micro-interactions  
- **Feedback Loops:** Visual + haptic cues in AR/VR

---

## Animation & Micro-Interactions

- **Scroll Animations:** Fade, slide, parallax using ScrollMagic / GSAP  
- **Hover Animations:** Buttons, cards, icons  
- **AR/VR Animations:** Object placement transitions, interactive scene cues  
- **AI Feedback Animations:** Typing indicator, suggestion highlight

---

## Accessibility & Localization

- **WCAG 2.1 AA compliance**  
- Keyboard navigation & ARIA labels  
- Voice input & output with fallback text  
- Multi-language support (i18n) with RTL/LTR adjustments

---

## Content Guidelines

- **Headlines:** Short, active, benefit-oriented  
- **Body Text:** Concise, readable, 16px+  
- **AI Copy:** Conversational, context-aware  
- **Product Descriptions:** Accurate, SEO optimized, AR/VR & PoD references  
- **Microcopy:** Button labels, status messages, error messages with clarity and guidance

---

## Delivery & Procurement Workflows

- **Order Flow:** Cart → Auto Procurement → Supplier Dispatch → Delivery Tracking  
- **Notifications:** Email, SMS, push, AR/VR HUD updates  
- **Status Badges:** Order Received, In Production, Shipped, Delivered  
- **3DPoD Integration:** Preview before order, automated supplier selection, material & finish confirmation  

---

## Documentation & Versioning

- **Component Library:** Storybook with AR/VR previews  
- **Versioning:** Semantic versioning for UI, API, and AR/VR assets  
- **Change Log:** Document updates to AI models, e-commerce flows, 3DPoD capabilities  
- **Testing:** Visual regression testing with Percy, interaction testing with Cypress

---

## Conclusion

This style guide ensures **consistent branding, high usability, and production-ready integration** across **AI, AR/VR, E-commerce, 3DPoD/PoD, voice interfaces, gamification, auto procurement, and delivery workflows**. All components are designed for **responsive, immersive, and interactive experiences** on web, PWA, and AR/VR platforms.