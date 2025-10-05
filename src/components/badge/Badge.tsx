import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Badge.module.css';

/**
 * Props for the `Badge` component.
 * Label to display information or status.
 * 
 * @example
 * ```tsx
 * <Badge color="success">Active</Badge>
 * <Badge color="danger" dot>3</Badge>
 * <Badge variant="outline">New</Badge>
 * ```
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Badge content.
   */
  children: React.ReactNode;

  /**
   * Badge color.
   * @defaultValue 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';

  /**
   * Badge variant.
   * @defaultValue 'solid'
   */
  variant?: 'solid' | 'outline' | 'subtle';

  /**
   * Badge size.
   * @defaultValue 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Badge shape.
   * @defaultValue 'rounded'
   */
  shape?: 'rounded' | 'pill' | 'square';

  /**
   * Show dot indicator.
   */
  dot?: boolean;

  /**
   * Icon to display.
   */
  icon?: React.ReactNode;

  /**
   * Icon position.
   * @defaultValue 'left'
   */
  iconPosition?: 'left' | 'right';

  /**
   * Make the badge clickable.
   */
  clickable?: boolean;

  /**
   * Callback on click.
   */
  onClick?: () => void;

  /**
   * Show close button.
   */
  removable?: boolean;

  /**
   * Callback on remove.
   */
  onRemove?: () => void;

  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * Badge - Label to display information or status.
 * 
 * Features:
 * - 7 semantic colors
 * - 3 variants (solid, outline, subtle)
 * - 3 sizes
 * - Customizable shapes
 * - Dot indicator
 * - Icons
 * - Removable
 * - Clickable
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({
  children,
  color = 'primary',
  variant = 'solid',
  size = 'medium',
  shape = 'rounded',
  dot = false,
  icon,
  iconPosition = 'left',
  clickable = false,
  onClick,
  removable = false,
  onRemove,
  className,
  ...props
}, ref) => {
  const badgeClasses = [
    styles.badge,
    styles[`color-${color}`],
    styles[variant],
    styles[size],
    styles[shape],
    (clickable || onClick) && styles.clickable,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (onClick) {
      onClick();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <span
      ref={ref}
      className={badgeClasses}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {dot && <span className={styles.dot} />}
      {icon && iconPosition === 'left' && (
        <span className={styles.icon}>{icon}</span>
      )}
      <Typography variant="span" className={styles.text}>
        {children}
      </Typography>
      {icon && iconPosition === 'right' && (
        <span className={styles.icon}>{icon}</span>
      )}
      {removable && (
        <button
          className={styles.removeButton}
          onClick={handleRemove}
          aria-label="Remove"
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}
    </span>
  );
});

Badge.displayName = 'Badge';
