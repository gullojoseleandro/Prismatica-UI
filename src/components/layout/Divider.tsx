import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Divider.module.css';

/**
 * Props for the `Divider` component.
 * Visual separator between sections.
 * 
 * @example
 * ```tsx
 * <Divider />
 * <Divider orientation="vertical" />
 * <Divider text="OR" />
 * ```
 */
export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Divider orientation.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Text to display in the divider.
   */
  text?: string;
  
  /**
   * Text alignment.
   * @default 'center'
   */
  textAlign?: 'left' | 'center' | 'right';
  
  /**
   * Divider thickness.
   * @default 'thin'
   */
  thickness?: 'thin' | 'medium' | 'thick';
  
  /**
   * Divider style.
   * @default 'solid'
   */
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  
  /**
   * Visual theme.
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'primary' | 'secondary';
  
  /**
   * Vertical spacing (horizontal only).
   * @default 'normal'
   */
  spacing?: 'none' | 'small' | 'normal' | 'large';
  
  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * Divider - Visual separator between sections.
 * 
 * Features:
 * - Horizontal and vertical orientation
 * - Optional text
 * - Multiple styles (solid, dashed, dotted)
 * - Customizable thickness
 * - Adjustable spacing
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>((
  {
    orientation = 'horizontal',
    text,
    textAlign = 'center',
    thickness = 'thin',
    lineStyle = 'solid',
    variant = 'light',
    spacing = 'normal',
    className,
    ...props
  },
  ref
) => {
  const dividerClasses = [
    styles.divider,
    styles[orientation],
    styles[`style-${lineStyle}`],
    styles[variant],
    styles[`spacing-${spacing}`],
    text && styles.withText,
    text && styles[`text-${textAlign}`],
    className
  ].filter(Boolean).join(' ');

  if (text) {
    return (
      <div ref={ref} className={dividerClasses} role="separator" {...props}>
        <span className={styles.line}></span>
        <Typography variant="span" className={styles.textContent}>
          {text}
        </Typography>
        <span className={styles.line}></span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={dividerClasses}
      role="separator"
      aria-orientation={orientation}
      {...props}
    />
  );
});

Divider.displayName = 'Divider';
