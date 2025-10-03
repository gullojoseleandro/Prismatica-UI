import React from 'react';
import styles from '@styles/Typography.module.css';

/**
 * Props for the `Typography` component.
 * - `variant`: HTML tag to render (text semantics).
 * - `theme`: visual theme applied via CSS styles.
 * - `children`: text content or React nodes to display.
 * - `className`: additional CSS classes.
 */
export interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  theme?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  children: React.ReactNode;
  className?: string;
}

/**
 * Alias that explicitly restricts the tags supported by `Typography`.
 * This prevents TypeScript from inferring a broader set (e.g. SVG),
 * which can cause errors in the spread of `props`.
 */
type TypographyTags = TypographyProps['variant'];

/**
 * Semantic typography component.
 * - variant defines the HTML tag to render.
 * - theme applies thematic styles.
 * - forwardRef for focus/measurement integrations.
 */
export const Typography = React.forwardRef<HTMLElement, TypographyProps & React.HTMLAttributes<HTMLElement>>(({ 
  variant,
  theme = 'light',
  children,
  className,
  ...props
}, ref) => {
  // Restrict the dynamic component type to supported HTML tags
  // to avoid inferences to SVG types and type errors in `{...props}`.
  const Component = variant as TypographyTags;
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