import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Card.module.css';

/**
 * Props for the `Card` component.
 * Extremely customizable card with multiple options.
 * 
 * @example
 * ```tsx
 * <Card
 *   variant="dark"
 *   title="My Card"
 *   subtitle="Brief description"
 *   image="/image.jpg"
 *   footer={<Button>Action</Button>}
 *   withShadow
 *   hoverable
 * >
 *   Card content
 * </Card>
 * ```
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Main content of the card.
   */
  children: React.ReactNode;
  
  /**
   * Visual theme.
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  
  /**
   * Card title.
   */
  title?: string;
  
  /**
   * Subtitle or description.
   */
  subtitle?: string;
  
  /**
   * Image to display at the top.
   */
  image?: string | React.ReactNode;
  
  /**
   * Image height.
   * @default '200px'
   */
  imageHeight?: string;
  
  /**
   * Custom header (replaces title and subtitle).
   */
  header?: React.ReactNode;
  
  /**
   * Custom footer.
   */
  footer?: React.ReactNode;
  
  /**
   * Icon to display next to the title.
   */
  icon?: React.ReactNode;
  
  /**
   * Actions to display in the header (buttons, menus, etc.).
   */
  headerActions?: React.ReactNode;
  
  /**
   * Show shadow.
   */
  withShadow?: boolean;
  
  /**
   * Hover effect (elevation).
   */
  hoverable?: boolean;
  
  /**
   * Clickable card (cursor pointer).
   */
  clickable?: boolean;
  
  /**
   * Border color.
   */
  borderColor?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  
  /**
   * Content padding.
   * @default 'normal'
   */
  padding?: 'none' | 'small' | 'normal' | 'large';
  
  /**
   * Image orientation.
   * @default 'top'
   */
  imageOrientation?: 'top' | 'left' | 'right';
  
  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * Extremely customizable card component.
 * 
 * Features:
 * - Customizable header and footer
 * - Image with multiple orientations
 * - Icons and actions in the header
 * - Hover effects and shadows
 * - Semantic color borders
 * - Adjustable padding
 * - Fully responsive
 *
 * @returns Styled `<div>` container.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ 
  children,
  variant = 'light',
  title,
  subtitle,
  image,
  imageHeight = '200px',
  header,
  footer,
  icon,
  headerActions,
  withShadow = false,
  hoverable = false,
  clickable = false,
  borderColor,
  padding = 'normal',
  imageOrientation = 'top',
  className,
  ...props
}, ref) => {
  // Dynamic classes
  const cardClasses = [
    styles.card,
    styles[variant],
    styles[`padding-${padding}`],
    styles[`imagen-${imageOrientation}`],
    withShadow && styles.conSombra,
    hoverable && styles.hoverable,
    clickable && styles.clickeable,
    borderColor && styles[`borde-${borderColor}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={cardClasses} {...props}>
      {/* Image */}
      {image && (
        <div className={styles.imagenContainer} style={{ height: imageHeight }}>
          {typeof image === 'string' ? (
            <img src={image} alt="" className={styles.imagen} />
          ) : (
            image
          )}
        </div>
      )}
      
      {/* Custom header or default */}
      {(header || title || subtitle) && (
        <div className={styles.header}>
          {header ? (
            header
          ) : (
            <>
              <div className={styles.headerContent}>
                {icon && <div className={styles.icon}>{icon}</div>}
                <div className={styles.headerTexts}>
                  {title && (
                    <Typography variant="h3" theme={variant} className={styles.title}>
                      {title}
                    </Typography>
                  )}
                  {subtitle && (
                    <Typography variant="p" theme={variant} className={styles.subtitle}>
                      {subtitle}
                    </Typography>
                  )}
                </div>
              </div>
              {headerActions && (
                <div className={styles.headerActions}>
                  {headerActions}
                </div>
              )}
            </>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className={styles.content}>{children}</div>
      
      {/* Footer */}
      {footer && (
        <div className={styles.footer}>
          {footer}
        </div>
      )}
    </div>
  );
});
Card.displayName = 'Card';