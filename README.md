# Prismatik UI

Librería moderna de componentes React. Diseñada para ser simple, accesible y fácil de extender.

---

## Instalación

Requisitos:

- React 18
- React DOM 18

Instala con npm:

```bash
npm install prismatik-ui
```

Importa los estilos globales compilados:

```ts
import 'prismatik-ui/styles.css';
```

---

## Uso rápido

```tsx
import { Button, Card, Input, Select, Modal, Tabs, Accordion, Navbar, Typography } from 'prismatik-ui';
import 'prismatik-ui/styles.css';

function App() {
  return (
    <Card title="Ejemplo" variant="light">
      <Typography variant="p">Contenido dentro de una tarjeta</Typography>
      <Button variant="dark" size="medium">Acción</Button>
    </Card>
  );
}
```

Variantes disponibles (theme): `light`, `dark`, `holographic`, `transparent-light`, `transparent-dark`.

---

## Componentes principales

- Button: variantes, tamaños y animaciones (`pulse`, `shake`, `glow`, `wave`).
- Input y Select: tamaños (`small`, `medium`, `large`) y estado (`default`, `error`, `warning`).
- Card y ProductCard: contenedores con título y contenido.
- Modal: accesible, cierre con Escape y click fuera.
- Tabs: roles ARIA, navegación con teclado (← → Home End).
- Accordion: ARIA (`aria-expanded`, `aria-controls`) y regiones.
- Navbar: acciones personalizables a la derecha via prop `acciones`.
- Typography: tipografías semánticas (`h1`–`h6`, `p`, `span`).

Todas las props aceptan `className` para extender estilos.

---

## Accesibilidad

- Accordion: `aria-expanded`, `aria-controls`, `role="region"` y encabezados identificables.
- Tabs: `role="tablist"/"tab"/"tabpanel"`, `aria-selected`, `aria-controls`, gestión de teclado.
- Modal: `role="dialog"`, `aria-modal`, `aria-labelledby`, cierre con Escape y click fuera.
- Input/Select: `aria-invalid` cuando `state="error"`.

---

## Desarrollo local

Clonar, instalar y construir:

```bash
npm install
npm run build
```

Estructura relevante:

- `src/components/`: componentes React.
- `src/styles/`: CSS Modules de cada componente.
- `src/types/css.d.ts`: tipado de CSS Modules.

Scripts:

- `npm run build`: genera `dist/index.mjs`, `dist/index.cjs`, `dist/types/` y `dist/styles.css`.

---

## Publicación en npm

Asegúrate de tener sesión iniciada (`npm login`).

```bash
# actualizar versión según semver
npm version patch

# publicar
npm publish --access public
```

Notas de empaquetado:

- Dual package (ESM/CJS) con `exports` configurado.
- Tipos incluidos (`dist/types/index.d.ts`).
- Estilos compilados en `dist/styles.css` (importar en la app).

---

## Convenciones

- Código tipado con TypeScript, sin abreviaciones confusas.
- Componentes con `forwardRef` donde aplica.
- API consistente con `variant`, tamaños y `className`.
- Enfocado en simplicidad, legibilidad y mantenibilidad.

---

## Licencia

MIT
