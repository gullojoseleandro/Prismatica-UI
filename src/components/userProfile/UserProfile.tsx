import React from 'react';
import { Button } from '@components/Button/Button';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/UserProfile.module.css';

/**
 * Props del componente `UserProfile`.
 * - `name`: nombre del usuario.
 * - `email`: correo del usuario.
 * - `avatar`: URL de imagen de avatar.
 * - `bio`: descripción breve del usuario.
 * - `variant`: tema visual.
 * - `className`: clases CSS adicionales.
 */
export interface UserProfileProps {
  /**
   * Nombre del usuario.
   */
  name: string;
  /**
   * Correo del usuario.
   */
  email: string;
  /**
   * URL de imagen de avatar.
   */
  avatar: string;
  /**
   * Descripción breve del usuario.
   */
  bio: string;
  /**
   * Tema visual.
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  /**
   * Clases CSS adicionales.
   */
  className?: string;
}

/**
 * Tarjeta de perfil de usuario con avatar, datos básicos y acciones.
 *
 * @example
 * ```tsx
 * <UserProfile
 *   name="Ada Lovelace"
 *   email="ada@example.com"
 *   avatar="/ada.png"
 *   bio="Pionera de la programación"
 * />
 * ```
 */
export const UserProfile: React.FC<UserProfileProps> = ({
  name,
  email,
  avatar,
  bio,
  variant = 'light',
  className,
  ...props
}) => {
  const profileClasses = [
    styles.userProfile,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={profileClasses} {...props}>
      <div className={styles.avatarContainer}>
        <img src={avatar} alt={name} className={styles.avatar} />
      </div>
      <Typography variant="h2" theme={variant} className={styles.name}>{name}</Typography>
      <Typography variant="p" theme={variant} className={styles.email}>{email}</Typography>
      <Typography variant="p" theme={variant} className={styles.bio}>{bio}</Typography>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <Typography variant="h4" theme={variant}>250</Typography>
          <Typography variant="span" theme={variant}>Posts</Typography>
        </div>
        <div className={styles.stat}>
          <Typography variant="h4" theme={variant}>12.4K</Typography>
          <Typography variant="span" theme={variant}>Followers</Typography>
        </div>
        <div className={styles.stat}>
          <Typography variant="h4" theme={variant}>1.3K</Typography>
          <Typography variant="span" theme={variant}>Following</Typography>
        </div>
      </div>
      <div className={styles.actions}>
        <Button variant={variant}>Edit Profile</Button>
        <Button variant={variant}>Follow</Button>
      </div>
    </div>
  );
};