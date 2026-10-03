# Roop Glass Solutions - Commercial Glass & Façade Platform

A modern, high-performance web platform and content management system for **Roop Glass Solutions (RGS)** — premier commercial architectural glass contractors, façade engineers, ACP cladding specialists, and structural railing installers based in Mumbai, servicing projects across Maharashtra and India.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase (PostgreSQL & Storage)**.

---

## 🌟 Key Features

- **Unified Inquiries Workflow**: Clean, single-point contact system for commercial inquiries, project specifications, and architectural consultations (replacing confusing fixed-price retail quote forms with verified commercial consultation).
- **Commercial Engineering Catalog**: Organized into verified architectural categories:
  - *Glass Façade Systems* (Structural Glazing, Curtain Walls, Unitized Glazing)
  - *ACP & Aluminium Cladding* (Exterior Panels, Commercial Elevations)
  - *Commercial Glass Work* (Office Partitions, Frameless Glazing, Acoustic Systems)
  - *Glass & Structural Railings* (Laminated Glass Railings, Balustrades)
  - *Roofing & Frameworks* (Canopies, MS & SS Support Frameworks)
- **Dedicated Project Showcase**: Individual permanent pages for landmark commercial installations (e.g. Magic Square Malad, AJL Project Bandra, Amanora Mall Pune, Income Tax Building Mumbai, Tania Horizon Thane, VVMC, NMMC Vashi, NMMC Airoli) with multi-image galleries, location badges, and native video player support.
- **Dynamic SEO & Indexing**: Fully automated OpenGraph tags, semantic HTML hierarchy, dynamic `sitemap.xml` generation, and search engine crawler instructions (`robots.txt`).
- **Client Admin Panel (`/admin`)**: Secure, lightweight password-protected CMS enabling Roop Glass staff to manage categories, services, project portfolios, blog articles, and incoming customer inquiries without touching code.
- **Supabase Integration**: PostgreSQL-backed content store with resilient offline fallbacks and media storage for project photos and videos.
- **Automated Email Notifications**: Dual-channel email system using Nodemailer/SMTP delivering instant inquiry notifications to the team and branded confirmation receipts to clients.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, Server Components & Actions) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) (Strict type-checking) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + Custom Glassmorphism Design System |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Database** | [Supabase](https://supabase.com/) PostgreSQL (via REST API + Connection Pooler) |
| **Storage** | Supabase Storage (`media` bucket for images & videos) |
| **Email** | [Nodemailer](https://nodemailer.com/) (Gmail SMTP Integration) |
| **Validation** | [Zod](https://zod.dev/) |

---

## 📁 Repository Structure

```text
├── app/
│   ├── admin/                  # Admin authentication & CRUD dashboard (/admin)
│   ├── api/
│   │   ├── admin/              # Secured admin API endpoints (login, logout, resources, upload)
│   │   └── contact/            # Inquiry submission & email handler
│   ├── catalog/                # Commercial services catalog & [slug] detail pages
│   ├── contact/                # Main contact page with inquiry form
│   ├── insights/               # Architectural insights & technical articles
│   ├── projects/               # Completed commercial portfolio & [slug] project showcase
│   ├── layout.tsx              # Root layout with responsive navigation & footer
│   ├── page.tsx                # Homepage featuring hero, services, portfolio, stats & CTA
│   ├── robots.ts               # Automated search crawler rules
│   └── sitemap.ts              # Dynamic XML sitemap generation
├── components/                 # Reusable UI components & section blocks
│   ├── call-popup.tsx          # Quick phone consultation popup
│   ├── catalog-browser.tsx     # Filterable commercial catalog component
│   ├── contact-form.tsx        # High-conversion commercial inquiry form
│   ├── footer.tsx              # Company footer with quick links & certifications
│   ├── hero-section.tsx        # Modern animated hero banner
│   ├── navbar.tsx              # Glassmorphic header with mobile drawer
│   ├── project-browser.tsx     # Filterable projects showcase with video indicators
│   └── ui/                     # Primitives (Button, Dialog, Input, Tabs, etc.)
├── lib/
│   ├── admin-auth.ts           # HMAC-SHA256 session token management & password verification
│   ├── content.ts              # Content types & verified commercial fallback data
│   ├── email.ts                # Nodemailer transporter & responsive email templates
│   └── supabase.ts             # Supabase REST client, content store & storage uploader
├── scripts/
│   └── setup-db.mjs            # Automated database schema migration & initial seed script
├── supabase/
│   └── schema.sql              # PostgreSQL tables, triggers, indexes & RLS policies
├── tailwind.config.ts          # Color palette, animation keyframes & font configuration
└── .env.example                # Sample environment variable template
```

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js** 18.18+ (Node 20 or 22 LTS recommended)
- **npm** 9+ (or pnpm / yarn)
- A **Supabase** project (free or pro tier)
- A **Gmail** account with an App Password (or custom SMTP provider)

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/AnshulParkar/RGS_Website_NextJs.git
cd RGS_Website_NextJs
npm install
```

### 3. Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configure the following variables in `.env`:

```ini
# Gmail / SMTP Email Notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=info.roopglass@gmail.com
SMTP_PASS=your-16-char-google-app-password
FROM_EMAIL=info.roopglass@gmail.com
CONTACT_EMAIL=info.roopglass@gmail.com
SALES_EMAIL=info.roopglass@gmail.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.roopglass.com

# Supabase (Database & Storage)
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Direct PostgreSQL Connection (Used by migration & seed scripts)
DATABASE_URL=postgresql://postgres.<project-id>:<password>@<pooler-host>:6543/postgres

# Admin Dashboard Authentication
ADMIN_PASSWORD=your-secure-admin-password
ADMIN_SESSION_SECRET=generate-a-random-64-character-hex-secret
```

> **Tip for Google App Passwords**: Navigate to [Google Account > Security > 2-Step Verification > App Passwords](https://myaccount.google.com/apppasswords), select "Mail", and paste the generated 16-character string into `SMTP_PASS`.

---

## 🗄️ Database Setup & Migrations

The database setup script will automatically connect to your PostgreSQL database, apply table definitions, setup timestamp triggers, and seed verified commercial categories, services, and landmark projects.

Run the automated setup command:

```bash
npm run db:setup
```

### Supabase Storage Bucket Setup

To enable image and video uploads directly from the Admin Panel:
1. Open your [Supabase Dashboard](https://supabase.com/dashboard).
2. Go to **Storage** and click **New Bucket**.
3. Name the bucket **`media`**.
4. Check **Public bucket** (so uploaded photos/videos are viewable on the website).
5. Click **Save bucket**.

---

## 💻 Running the Application

### Development Server

Start the local Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

### Production Build

To test the optimized production bundle locally:

```bash
npm run build
npm run start
```

---

## 🔐 Admin Panel Guide (`/admin`)

The website includes a dedicated Content Management System accessible at:

**URL**: [http://localhost:3000/admin](http://localhost:3000/admin) (or `https://yourdomain.com/admin` in production)

### Admin Capabilities:
1. **Categories**: Create, edit, and reorder commercial categories with custom descriptions and cover images.
2. **Services**: Manage individual commercial services, add bulleted technical features, specify category links, and toggle visibility.
3. **Projects**: Add new commercial installations, assign locations (e.g. Mumbai, Pune, Thane), upload gallery images, attach native project videos, and mark projects as "Featured" on the homepage.
4. **Insights / Blog**: Publish technical articles, whitepapers, and guides regarding wind loads, facade safety, and acoustic glazing.
5. **Customer Inquiries**: Track incoming commercial leads, view project locations, client contact info, and update status (`new`, `responded`, `in_progress`, `closed`).
6. **Direct Media Uploads**: Drag-and-drop or select project images and videos directly within the edit modal; files are stored securely in Supabase Storage.

---

## 🚢 Deployment (Vercel / Cloudflare / Node)

This project is optimized for deployment on [Vercel](https://vercel.com):

1. Push your repository to GitHub.
2. Import the project in Vercel.
3. Configure the environment variables from your `.env` file in the Vercel project settings.
4. Deploy! Vercel will automatically build the Next.js App Router application and provide global CDN caching.

---

## 📄 License & Attribution

Designed and maintained for **Roop Glass Solutions**. All rights reserved.
