# Signal Vector Labs customer site

This directory contains the public customer experience only. It introduces Signal Vector Labs' home and business services, shows conceptual integration walkthroughs, and helps a visitor prepare an inquiry. Internal sales packages, pricing, research files, credentials, and sales tools are maintained separately and are not included here.

## Stack

- Astro generates pre-rendered, search-readable service pages.
- React powers the interactive workflow demo and walkthrough planner.
- Tailwind CSS provides the responsive design system.
- A small Node.js server serves the static build and public sitemap/robots routes.

## Local development

Install Node.js 22.12 or later and dependencies, then run:

```sh
npm install
npm run dev
```

The Astro preview runs at `http://127.0.0.1:4173/`. Build and serve the static output with:

```sh
npm run build
npm start
```

## Public routes

- `/` — service introduction and interactive examples.
- `/services` — service directory.
- `/services/home-automation`
- `/services/access-control-security`
- `/services/av-lighting`
- `/services/network-design`
- `/services/business-integration`
- `/services/custom-automation`
- `/plan` — prepare a request for an in-person walkthrough or a guided call with a visual demo.

The walkthrough draft stays in the visitor's browser. Email opens their email client; the site does not submit a message or book an appointment. Demonstrations are conceptual and do not control live equipment.

## Content and search

`services.mjs` is the source for service descriptions and examples. `site-config.json` contains the business name, public domain and contact details. Astro pages include visible service content, unique metadata, canonical URLs, structured data, and crawlable links. The Node server publishes a sitemap only when a public `siteUrl` is configured.

Confirm public DNS and HTTPS before submitting the domain to search engines. Add the actual service area and genuine project examples before making location or experience claims.
