# Personal Portfolio

A static portfolio website built with Next.js and Tailwind CSS. The site is exported as static HTML and served via a lightweight Rust server for minimal resource usage and fast response times.

## Tech Stack

- Next.js (static export)
- Tailwind CSS
- shadcn/ui
- TypeScript
- Bun
- Go (code generation)
- Rust (production server)

## Configuration

Projects and technologies are configurable via `config/content.json`. 
GitHub stars are being fetched during build time.

### Adding a Technology

Add to `config/content.json`:
```json
{ "name": "Your Technology", "icon": "yourtechnology" }
```

Run `task gen` to auto-fetch missing icons from [devicon.dev](https://devicon.dev) or [simpleicons.org](https://simpleicons.org), regenerate avatar-derived assets, and validate config.

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
task gen  # Generate + validate all artifacts
task validate  # Alias of generate
```
