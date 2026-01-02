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

### Adding a Technology

Add to `config/content.json`:
```json
{ "name": "Your Technology", "icon": "yourtechnology" }
```

Run `bun run generate:icons` to auto-fetch missing icons from [devicon.dev](https://devicon.dev) or [simpleicons.org](https://simpleicons.org).

Categories are configurable.

## Development

```bash
bun dev
```

## Build

```bash
bun run build
```

## Validate

```bash
bun run validate          # Validate config and icons
bun run validate:content  # Config validation only
bun run generate:icons    # Icon generation only
```

