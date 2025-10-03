import React from 'react';
import styles from '@styles/Typography.module.css';

export interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  theme?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  children: React.ReactNode;
  className?: string;
}

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
  const Component = variant as keyof JSX.IntrinsicElements;
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