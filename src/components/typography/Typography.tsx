import React from 'react';
import styles from '@styles/Typography.module.css';

/**
 * Propiedades del componente `Typography`.
 * - `variant`: etiqueta HTML que se renderiza (semántica de texto).
 * - `theme`: tema visual aplicado mediante estilos CSS.
 * - `children`: contenido textual o nodos React a mostrar.
 * - `className`: clases CSS adicionales.
 */
export interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  theme?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  children: React.ReactNode;
  className?: string;
}

/**
 * Alias que restringe explícitamente las etiquetas soportadas por `Typography`.
 * Esto evita que TypeScript infiera un conjunto más amplio (p. ej. SVG),
 * lo cual puede provocar errores en el spread de `props`.
 */
type EtiquetasTipografia = TypographyProps['variant'];

/**
 * Componente de tipografía semántica.
 * - variant define la etiqueta HTML a renderizar.
 * - theme aplica estilos temáticos.
 * - forwardRef para integraciones con foco/mediciones.
 */
export const Typography = React.forwardRef<HTMLElement, TypographyProps & React.HTMLAttributes<HTMLElement>>(({ 
  variant,
  theme = 'light',
  children,
  className,
  ...props
}, ref) => {
  // Restringimos el tipo del componente dinámico a las etiquetas HTML soportadas
  // para evitar inferencias hacia tipos SVG y errores de tipos en `{...props}`.
  const Component = variant as EtiquetasTipografia;
  const typographyClasses = [
    styles.typography,
    styles[variant],
    styles[theme],
    className
  ].filter(Boolean).join(' ');

  return (
    <Component ref={ref as any} className={typographyClasses} {...props}>
      {children}
    </Component>
  );
});
Typography.displayName = 'Typography';