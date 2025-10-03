import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

/**
 * Tarjeta contenedora con título opcional y variantes de estilo.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ 
  title,
  children,
  variant = 'light',
  className,
  ...props
}, ref) => {
  const cardClasses = [
    styles.card,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={cardClasses} {...props}>
      {title && (
        <Typography variant="h2" theme={variant} className={styles.title}>
          {title}
        </Typography>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
});
Card.displayName = 'Card';