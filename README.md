# Prismatik UI

Modern React component library. Designed to be simple, accessible, and easy to extend.

---

## Installation

Requirements:

- React 18+
- React DOM 18+

Install with npm:

```bash
npm install prismatik-ui
```

Import the compiled global styles:

```ts
import 'prismatik-ui/styles.css';
```

---

## Quick Start

```tsx
import { Button, Card, Input, Select, Modal, Tabs, Accordion, Navbar, Typography } from 'prismatik-ui';
import 'prismatik-ui/styles.css';

function App() {
  return (
    <Card title="Example" variant="light">
      <Typography variant="p">Content inside a card</Typography>
      <Button variant="dark" size="medium">Action</Button>
    </Card>
  );
}
```

Available variants (theme): `light`, `dark`, `holographic`, `transparent-light`, `transparent-dark`.

---

## Main Components

- **Button**: variants, sizes, and animations (`pulse`, `shake`, `glow`, `wave`).
- **Input** and **Select**: sizes (`small`, `medium`, `large`) and state (`default`, `error`, `warning`).
- **Card** and **ProductCard**: containers with title and content.
- **Modal**: accessible, closes with Escape and click outside.
- **Tabs**: ARIA roles, keyboard navigation (← → Home End).
- **Accordion**: ARIA (`aria-expanded`, `aria-controls`) and regions.
- **Navbar**: customizable actions on the right via `actions` prop.
- **Typography**: semantic typography (`h1`–`h6`, `p`, `span`).

All props accept `className` to extend styles.

---

## Accessibility

- **Accordion**: `aria-expanded`, `aria-controls`, `role="region"` and identifiable headings.
- **Tabs**: `role="tablist"/"tab"/"tabpanel"`, `aria-selected`, `aria-controls`, keyboard management.
- **Modal**: `role="dialog"`, `aria-modal`, `aria-labelledby`, closes with Escape and click outside.
- **Input/Select**: `aria-invalid` when `state="error"`.

---

## Local Development

Clone, install, and build:

```bash
npm install
npm run build
```

Relevant structure:

- `src/components/`: React components.
- `src/styles/`: CSS Modules for each component.
- `src/types/css.d.ts`: CSS Modules typing.

Scripts:

- `npm run build`: generates `dist/index.mjs`, `dist/index.cjs`, `dist/types/` and `dist/styles.css`.

---

## Publishing to npm

Make sure you're logged in (`npm login`).

```bash
# update version according to semver
npm version patch

# publish
npm publish --access public
```

Packaging notes:

- Dual package (ESM/CJS) with `exports` configured.
- Types included (`dist/types/index.d.ts`).
- Compiled styles in `dist/styles.css` (import in your app).

---

## Conventions

- TypeScript typed code, no confusing abbreviations.
- Components with `forwardRef` where applicable.
- Consistent API with `variant`, sizes, and `className`.
- Focused on simplicity, readability, and maintainability.

---

## License

MIT
