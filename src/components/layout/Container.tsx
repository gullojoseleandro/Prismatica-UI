import React from 'react';
import styles from '@styles/Container.module.css';

/**
 * Props for the `Container` component.
 * Responsive container with predefined max widths.
 * 
 * @example
 * ```tsx
 * <Container maxWidth="lg" centered>
 *   <h1>Content</h1>
 * </Container>
 * ```
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Container content.
   */
  children: React.ReactNode;
  
  /**
   * Maximum width of the container.
   * @defaultValue 'lg'
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  
  /**
   * Center horizontally.
   * @defaultValue true
   */
  centered?: boolean;
  
  /**
   * Fluid container (no max-width).
   */
  fluid?: boolean;
  
  /**
   * Horizontal padding.
   * @defaultValue 'normal'
   */
  padding?: 'none' | 'small' | 'normal' | 'large';
  
  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * Responsive container with predefined max widths.
 * 
 * Features:
 * - 7 predefined max widths (xs, sm, md, lg, xl, 2xl, full)
 * - Automatic centering
 * - Customizable padding
 * - Fluid mode without max-width
 * - Compatible with all breakpoints
 * 
 * Breakpoints:
 * - xs: 480px
 * - sm: 640px
 * - md: 768px
 * - lg: 1024px
 * - xl: 1280px
 * - 2xl: 1536px
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(({  children,
  maxWidth = 'lg',
  centered = true,
  fluid = false,
  padding = 'normal',
  className,
  ...props
}, ref) => {
  const containerClasses = [
    styles.container,
    !fluid && styles[`maxWidth-${maxWidth}`],
    centered && styles.centrado,
    fluid && styles.fluido,
    styles[`padding-${padding}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={containerClasses} {...props}>
      {children}
    </div>
  );
});

Container.displayName = 'Container';
