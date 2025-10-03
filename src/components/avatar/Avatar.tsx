import React from 'react';
import styles from '@styles/Avatar.module.css';

/**
 * Props for the `Avatar` component.
 * Extremely customizable avatar with multiple options.
 *
 * @example
 * ```tsx
 * <Avatar
 *   src="/user.png"
 *   alt="John Doe"
 *   size="large"
 *   badge={<span>3</span>}
 *   status="online"
 *   shape="square"
 *   withBorder
 * />
 * ```
 */
export interface AvatarProps {
  /**
   * Image URL or initials as fallback.
   */
  src?: string;
  
  /**
   * Accessible alt text.
   */
  alt: string;
  
  /**
   * Avatar size.
   * @default 'medium'
   */
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xl';
  
  /**
   * Visual theme.
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  
  /**
   * Avatar shape.
   * @default 'circle'
   */
  shape?: 'circle' | 'square' | 'rounded';
  
  /**
   * Status indicator (online, offline, busy, away).
   */
  status?: 'online' | 'offline' | 'busy' | 'away';
  
  /**
   * Badge or notification to display.
   */
  badge?: React.ReactNode;
  
  /**
   * Badge position.
   * @default 'top-right'
   */
  badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  
  /**
   * Show border.
   */
  withBorder?: boolean;
  
  /**
   * Border color.
   */
  borderColor?: string;
  
  /**
   * Border thickness.
   * @default '2px'
   */
  borderWidth?: string;
  
  /**
   * Icon to display instead of image.
   */
  icon?: React.ReactNode;
  
  /**
   * Initials to display if no image.
   */
  initials?: string;
  
  /**
   * Callback on click.
   */
  onClick?: () => void;
  
  /**
   * Clickable avatar.
   */
  clickable?: boolean;
  
  /**
   * Avatar group (for stacking).
   */
  inGroup?: boolean;
  
  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * Extremely customizable avatar component.
 * 
 * Features:
 * - Multiple sizes and shapes
 * - Status indicators (online, offline, etc.)
 * - Fallback to initials or icon
 * - Customizable borders
 * - Clickable
 * - Stackable in groups
 * - Fully accessible
 * - Customizable background color
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'medium',
  variant = 'light',
  shape = 'circle',
  status,
  badge,
  badgePosition = 'top-right',
  withBorder = false,
  borderColor,
  borderWidth = '2px',
  icon,
  initials,
  onClick,
  clickable = false,
  inGroup = false,
  className,
  ...props
}) => {
  const [imageError, setImageError] = React.useState(false);
  
  // Generate initials from alt if not provided
  const getInitials = () => {
    if (initials) return initials;
    return alt
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  // Build dynamic classes
  const avatarClasses = [
    styles.avatar,
    styles[size],
    styles[variant],
    styles[shape],
    withBorder && styles.withBorder,
    (clickable || onClick) && styles.clickable,
    inGroup && styles.inGroup,
    className
  ].filter(Boolean).join(' ');
  
  const customStyles: React.CSSProperties = {};
  if (withBorder && borderColor) {
    customStyles.borderColor = borderColor;
    customStyles.borderWidth = borderWidth;
  }

  return (
    <div 
      className={avatarClasses} 
      onClick={onClick}
      style={customStyles}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {/* Avatar content */}
      {src && !imageError ? (
        <img 
          src={src} 
          alt={alt} 
          className={styles.avatarImage}
          onError={() => setImageError(true)}
        />
      ) : icon ? (
        <div className={styles.avatarIcon}>{icon}</div>
      ) : (
        <div className={styles.avatarInitials}>{getInitials()}</div>
      )}
      
      {/* Status indicator */}
      {status && (
        <span 
          className={`${styles.statusIndicator} ${styles[`status-${status}`]}`}
          aria-label={`Status: ${status}`}
        />
      )}
      
      {/* Badge */}
      {badge && (
        <span className={`${styles.badge} ${styles[`badge-${badgePosition}`]}`}>
          {badge}
        </span>
      )}
    </div>
  );
};