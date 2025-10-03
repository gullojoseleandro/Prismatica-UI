import React from 'react';
import styles from '@styles/Spacer.module.css';

/**
 * Props for the `Spacer` component.
 * Flexible space between elements.
 * 
 * @example
 * ```tsx
 * <Spacer size="large" />
 * <Spacer size="20px" />
 * <Spacer axis="horizontal" />
 * ```
 */
export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Space size.
   * Can be a preset or a custom value.
   * @default 'normal'
   */
  size?: 'xs' | 'small' | 'normal' | 'large' | 'xl' | '2xl' | string | number;
  
  /**
   * Space axis.
   * @default 'vertical'
   */
  axis?: 'vertical' | 'horizontal';
  
  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * Spacer - Flexible space between elements.
 * 
 * Features:
 * - Size presets (xs, small, normal, large, xl, 2xl)
 * - Custom sizes
 * - Vertical or horizontal axis
 * - Useful for flexible layouts
 */
export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(({
  size = 'normal',
  axis = 'vertical',
  className,
  style,
  ...props
}, ref) => {
  const presets = ['xs', 'small', 'normal', 'large', 'xl', '2xl'];
  const isPreset = typeof size === 'string' && presets.includes(size);
  
  const spacerClasses = [
    styles.spacer,
    styles[axis],
    isPreset && styles[`size-${size}`],
    className
  ].filter(Boolean).join(' ');

  const customStyle: React.CSSProperties = {};
  
  if (!isPreset) {
    const sizeValue = typeof size === 'number' ? `${size}px` : size;
    if (axis === 'vertical') {
      customStyle.height = sizeValue;
    } else {
      customStyle.width = sizeValue;
    }
  }

  return (
    <div
      ref={ref}
      className={spacerClasses}
      style={{ ...customStyle, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
});

Spacer.displayName = 'Spacer';
