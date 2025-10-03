import React from 'react';
import styles from '@styles/Avatar.module.css';

/**
 * Componente `Avatar`.
 * Muestra una imagen de usuario con tamaños y variantes de tema.
 *
 * Props:
 * - `src`: URL de la imagen.
 * - `alt`: texto alternativo accesible.
 * - `size`: tamaño visual (`small` | `medium` | `large`).
 * - `variant`: tema visual (`light` | `dark` | `holographic` | `transparent-*`).
 * - `className`: clases CSS adicionales.
 *
 * Accesibilidad:
 * - Usa `alt` para describir la imagen a lectores de pantalla.
 *
 * @example
 * ```tsx
 * <Avatar src="/user.png" alt="Foto de perfil" size="large" variant="dark" />
 * ```
 */
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
  // Construcción de clases dinámicas para tema y tamaño
  const avatarClasses = [
    styles.avatar,
    styles[size],
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    // Contenedor estilizado; la imagen interna tiene su propia clase
    <div className={avatarClasses} {...props}>
      {/* Imagen con texto alternativo accesible */}
      <img src={src} alt={alt} className={styles.avatarImage} />
    </div>
  );
};