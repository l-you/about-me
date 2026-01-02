# Personal Portfolio

A static portfolio website built with Next.js and Tailwind CSS. The site is exported as static HTML and served via a lightweight Rust server for minimal resource usage and fast response times.

## Tech Stack

- Next.js (static export)
- Tailwind CSS
- shadcn/ui
- TypeScript
- Bun
- Rust (production server)

## Configuration

Projects and technologies are configurable via `config/content.json`.

### Managing Technology Icons

Icons for the "Technologies & Tools" section should be obtained from official sources and added following the steps below.

#### Icon Sources

Official icon sources should be used to obtain SVG files:

- **[devicon.dev](https://devicon.dev)** - GitHub: [devicons/devicon](https://github.com/devicons/devicon)
  - Technology and programming language logos
  - Standardized SVG format

- **[simpleicons.org](https://simpleicons.org)** - GitHub: [simple-icons/simple-icons](https://github.com/simple-icons/simple-icons)
  - Brand and technology logos
  - Free SVG icons

#### Adding a New Technology

**Step 1: Obtain the Icon**

Icons should be fetched from [devicon.dev](https://devicon.dev) or [simpleicons.org](https://simpleicons.org). Plain/original variants should be preferred over colored versions for consistency.

**Step 2: Add the Icon File**

The SVG file should be placed in `/public/icons/` with a lowercase filename (e.g., `typescript.svg`, `nextjs.svg`). Icons should have a square aspect ratio for best display.

**Step 3: Register in Icon Map**

An entry should be added to the `iconMap` in `src/about-me/components/Icons.tsx`:

```typescript
const iconMap: Record<string, string> = {
  // ... existing entries
  yourtechnology: '/icons/yourtechnology.svg',
}
```

**Step 4: Add to Configuration**

The technology should be added to the appropriate category in `config/content.json`:

```json
{
  "name": "Your Technology",
  "icon": "yourtechnology"
}
```

**Available Categories:**
- `programmingLanguages` - TypeScript, Go, Rust, etc.
- `frontend` - React, Next.js, Tailwind CSS, etc.
- `backend` - Node.js, Symfony, GraphQL, etc.
- `infrastructure` - PostgreSQL, Docker, Nginx, etc.

#### File Naming Convention

- Lowercase only should be used
- Spaces should be replaced with hyphens
- Descriptive names matching the technology should be used
- Examples: `typescript.svg`, `tailwindcss.svg`, `nodejs.svg`

#### Icon Requirements

- **Format:** SVG (vector format)
- **Aspect Ratio:** Square (1:1) preferred
- **Size:** Icons are rendered at 16x16px
- **Style:** Simple, recognizable logos

## Development

```bash
bun dev
```

## Build

```bash
bun run build
```

Outputs static files to the `out` directory.

