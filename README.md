# Website Template

A simple, modern website template built with Next.js 16, React 19, TypeScript, and Tailwind CSS. This template includes a contact form with email functionality using Resend.

## Features

- ⚡ **Next.js 16** with App Router
- ⚛️ **React 19** for modern UI
- 🎨 **Tailwind CSS** for styling
- 📧 **Contact Form** with Resend email integration
- 🛡️ **Bot Protection** using BotId
- 📱 **Responsive Design** - works on all devices
- 🎯 **TypeScript** for type safety
- 🚀 **Vercel Analytics** and Speed Insights included
- 🎨 **shadcn/ui** components

## Tech Stack

- **Framework**: Next.js 16.0.3
- **React**: 19.2.0
- **TypeScript**: 5.9.3
- **Styling**: Tailwind CSS 3.4.18
- **UI Components**: shadcn/ui (Radix UI)
- **Email**: Resend 6.5.2
- **Bot Protection**: BotId
- **Analytics**: Vercel Analytics & Speed Insights

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Copy this template directory to your project location
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Resend API Key (get from https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Email Configuration
SMTP_FROM=noreply@yourdomain.com
SMTP_TO=your-email@example.com

# Site URL (for sitemap and robots.txt)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

## Customization

### Update Metadata

Edit `app/layout.tsx` to update:
- Site title
- Description
- Open Graph tags
- Twitter card metadata

### Customize Styling

- Colors: Edit CSS variables in `app/globals.css`
- Tailwind config: Modify `tailwind.config.ts`
- Component styles: Update individual component files

### Update Content

- **Hero Section**: Edit `components/HeroSection.tsx`
- **Contact Form**: Edit `components/ContactFormSection.tsx`
- **Footer**: Edit `components/Footer.tsx`

### Add More Pages

Create new files in the `app` directory:
- `app/about/page.tsx` for an About page
- `app/services/page.tsx` for a Services page
- etc.

## Project Structure

```
website-template/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── robots.ts            # Robots.txt
│   └── sitemap.ts           # Sitemap
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── ContactFormSection.tsx
│   ├── Footer.tsx
│   └── HeroSection.tsx
├── lib/
│   ├── actions/
│   │   └── contact.ts       # Contact form server action
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
├── .env.local              # Environment variables (create this)
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## Email Setup

This template uses [Resend](https://resend.com) for sending emails. To set up:

1. Sign up for a Resend account
2. Get your API key from the dashboard
3. Add it to `.env.local` as `RESEND_API_KEY`
4. Configure `SMTP_FROM` (must be a verified domain in Resend)
5. Set `SMTP_TO` to the email address where you want to receive form submissions

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The template is optimized for Vercel deployment and includes Analytics and Speed Insights.

### Deploy to Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render
- etc.

## License

This template is free to use for personal and commercial projects.

## Support

For issues or questions, please refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

