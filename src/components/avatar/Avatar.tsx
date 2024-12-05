import React from 'react';
import styles from '@styles/Avatar.module.css';

export interface AvatarProps {
  src: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'medium',
  variant = 'light',
  className,
  ...props
}) => {
  const avatarClasses = [
    styles.avatar,
    styles[size],
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={avatarClasses} {...props}>
      <img src={src} alt={alt} className={styles.avatarImage} />
    </div>
  );
};