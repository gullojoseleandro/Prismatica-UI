import React from 'react';
import styles from '@styles/Typography.module.css';

export interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  theme?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  children: React.ReactNode;
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  variant,
  theme = 'light',
  children,
  className,
  ...props
}) => {
  const Component = variant;
  const typographyClasses = [
    styles.typography,
    styles[variant],
    styles[theme],
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={typographyClasses} {...props}>
      {children}
    </Component>
  );
};