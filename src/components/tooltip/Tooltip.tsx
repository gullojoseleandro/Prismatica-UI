import React, { useState } from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Tooltip.module.css';

/**
 * Props for the `Tooltip` component.
 * - `content`: text to display inside the tooltip.
 * - `position`: relative position (top, right, bottom, left).
 * - `variant`: visual theme (light, dark, holographic).
 * - `children`: element that triggers the tooltip on hover.
 * - `className`: additional CSS classes.
 */
export interface TooltipProps {
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  variant?: 'light' | 'dark' | 'holographic';
  children: React.ReactNode;
  className?: string;
}

/**
 * Simple tooltip based on mouse events.
 *
 * @example
 * ```tsx
 * <Tooltip content="Information" position="top">
 *   <button>Hover</button>
 * </Tooltip>
 * ```
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  variant = 'light',
  children,
  className,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const tooltipClasses = [
    styles.tooltip,
    styles[variant],
    styles[position],
    isVisible && styles.visible,
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={styles.tooltipWrapper}
      // Show/hide tooltip based on interaction
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      {...props}
    >
      {children}
      <div className={tooltipClasses}>
        <Typography variant="span" theme={variant}>
          {content}
        </Typography>
      </div>
    </div>
  );
};

