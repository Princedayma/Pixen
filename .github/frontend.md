# Pixellens UI/UX Wireframe & Page Layout Blueprint

## 🎨 Design Philosophy

Clean, cinematic, minimalistic visual language—strong focus on imagery, contrast, and whitespace. The brand essence should reflect creative professionalism rather than a typical college club site. Prioritize clarity, hierarchy, and intentional motion rather than noisy animations.

---

## 🏠 Home Page Wireframe

### Layout Structure

* **Navbar (Sticky)**

  * Logo (Pixellens)
  * Nav Links: Portfolio | Competitions | Workshops | Hire Us | About | Contact
  * Button: Join Community / Login

* **Hero Section**

  * Fullscreen cinematic reel / photo carousel
  * Headline: "Where Stories Meet Frames"
  * Sub‑text: "Photography & Filmmaking community driving creativity and professional content"
  * CTAs: Explore Portfolio | Join a Competition

* **Featured Gallery Preview**

  * 6‑grid collage with hover details
  * CTA: View Full Portfolio

* **Upcoming Competitions & Workshops**

  * Card slider with registration buttons

* **Services Highlight**

  * 3 service cards (Event Shoots, Brand Films, Creative Editing)
  * CTA: Request A Quote

* **Testimonials / Partner Logos**

* **Footer**

  * Quick links, social icons, contact mail, copyright

---

## 📸 Portfolio Page Wireframe

### Layout

* **Hero**

  * Cinematic banner + filters

* **Filters**

  * Photo / Film
  * Category dropdown
  * Sort: Latest, Most Viewed

* **Media Grid + Hover Details**

  * For photo: full image lightbox
  * For video: Thumbnail → modal video player

* **Optional Sidebar**

  * Filter by creator / equipment / tags (future ML tagging)

---

## 🏆 Competitions Page Wireframe

### List View

* **Tabs**: Ongoing | Upcoming | Past
* **Cards**: Title, dates, theme, rules preview, entry button

### Single Competition View

* Hero + theme poster
* Details section (Prizes, Judges, Rules, Timeline)
* Registration form scroll anchor
* Entry upload section
* Past winners showreel

---

## 🎓 Workshops & Courses Page Wireframe

### List layout

* Workshop cards grid
* Filters: Mode, Level, Category

### Workshop Details

* Curriculum outline timeline format
* Trainer profile
* Registration CTA
* Certificate demo preview

---

## 🎬 Hire Us Page Wireframe

### Layout

* Hero with commercial reel
* 4 service packages cards
* Requirement form
* Project expectation guide / process steps timeline

---

## 👥 Admin Dashboard Wireframe

### Sidebar Navigation

* Dashboard
* Competitions
* Workshops
* Portfolio
* Leads
* Members
* Settings

### Dashboard Panels

* Total registrations
* Active leads
* Revenue / participation chart
* Quick shortcuts (Add competition / Add workshop)

---

## 🎣 Contact Page Layout

* Simple clean layout
* Club map+address
* Direct contact form
* Social platform badges

---

## Visual Identity Guidelines

| Element       | Guideline                                          |
| ------------- | -------------------------------------------------- |
| Color palette | Black / White / Gold / Cinematic gradients         |
| Typography    | Headings: Bold cinematic serif / Body: Modern sans |
| Motion        | Subtle GSAP parallax + smooth transitions          |
| Imagery       | High‑resolution full bleed media emphasis          |
| Icons         | Lucide minimal line icons                          |

---

## Responsive Design Strategy

| Breakpoint | Layout Behavior                                  |
| ---------- | ------------------------------------------------ |
| Desktop    | Full grid, motion-heavy hero, multi‑column cards |
| Tablet     | 2‑column content, simplified navigation          |
| Mobile     | Single column, collapse filters, floating CTA    |

---

## Wireframe View Summary (Textual Mock Layout)

```
[Navbar fixed]
| Logo | Portfolio | Competitions | Workshops | Hire Us | About | Login |

[Hero: full bleed video + overlay CTA]
"Where Stories Meet Frames"
[ Explore Portfolio ]  [ Join Competition ]

[Featured Grid]
[Photo] [Photo] [Photo]
[Photo] [Photo] [Photo]

[Upcoming Events slider]
[Workshop Card] [Competition Card] [Workshop Card]

[Services cards]
[Event Shoots] [Commercial Films] [Creative Editing]

[Testimonials carousel]

[Footer]
```

---

## 🎨 Figma High‑Fidelity Mockup Blueprint

### Structure for Design in Figma

* Frame presets:

  * Desktop: 1440px width
  * Tablet: 1024px width
  * Mobile: 390px width
* Layout grid system:

  * 12‑column grid (Desktop), 8‑column (Tablet), 4‑column (Mobile)
  * Gutter: 24px (Desktop), 16px (Mobile)
  * Margins: 120px (Desktop), 24px (Mobile)

---

### Component-Level Wire Layout (Figma-ready)

#### **Navigation Bar Component**

* Auto‑layout horizontal
* Container width: 1440px / Content Max Width 1280px
* Items: Logo + Nav links + CTA button
* Variants: Transparent / Solid (scroll state)

#### **Hero Component**

* Fullscreen 1440×900 frame
* Background: video placeholder layer
* Overlay gradient: top transparent → bottom 80% black
* Typography frame (auto layout vertical)

  * H1 72px bold cinematic serif
  * Subtext 22px soft grey
  * CTA group: Primary & Secondary variant buttons

#### **Portfolio Grid Component**

* Masonry layout
* Cards: 360×240 ratio
* Hover state variant with dark overlay + text reveal

#### **Competition Card**

* Auto layout card container (Vertical)
* Poster placeholder top
* Meta details bottom section
* CTA "Register Now" variant

#### **Workshop Details Template**

* Two‑column top structure
* Left: Details, curriculum, instructor
* Right: Pricing & registration
* Sticky summary widget

#### **Hire Us — Lead Form**

* Multi‑step layout (Step 1: Project Type → Budget → Date → Contact)
* Progress bar component

---

### Color & Typography Tokens for Figma

| Token        | Sample   | Usage                      |
| ------------ | -------- | -------------------------- |
| Primary      | #000000  | Background, cinematic base |
| Secondary    | #FFFFFF  | Text and contrast          |
| Accent       | #D4AF37  | Premium gold highlights    |
| Grey‑100‑900 | Multiple | UI surface hierarchy       |

| Style   | Spec                          |
| ------- | ----------------------------- |
| H1      | 72px / Bold / Serif cinematic |
| H2      | 48px / Semibold               |
| Body    | 18px / Regular                |
| Caption | 14px                          |

---

### Interaction & Motion Guidelines

* Smooth page transitions (0.5s ease)
* Parallax hero scrolling
* On hover: subtle zoom‑in 1.05 + shadow
* Modal video playback
* Lazy‑load images & skeleton loaders

---

## Deliverables Prepared

* Full page wireframes in structured blueprint format
* UX hierarchy clarity for development workflow
* Animation & responsiveness guidelines
* Brand system guidance for UI consistency

---

### Next Available Deliverables

1. High fidelity mockup direction (Figma layout plan)
2. Component breakdown + reusable design system (atoms → organisms)
3. System architecture visual diagram (PDF export)
4. 4‑week sprint roadmap for development execution

**Tell me which deliverable you want generated next.**
