import React from 'react';
import styles from '@styles/Avatar.module.css';

/**
 * Props del componente `Avatar`.
 * Avatar extremadamente personalizable con múltiples opciones.
 *
 * @example
 * ```tsx
 * <Avatar
 *   src="/user.png"
 *   alt="Juan Pérez"
 *   size="large"
 *   badge={<span>3</span>}
 *   status="online"
 *   forma="square"
 *   conBorde
 * />
 * ```
 */
export interface AvatarProps {
  /**
   * URL de la imagen o iniciales como fallback.
   */
  src?: string;
  
  /**
   * Texto alternativo accesible.
   */
  alt: string;
  
  /**
   * Tamaño del avatar.
   * @default 'medium'
   */
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xl';
  
  /**
   * Tema visual.
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  
  /**
   * Forma del avatar.
   * @default 'circle'
   */
  forma?: 'circle' | 'square' | 'rounded';
  
  /**
   * Indicador de estado (online, offline, busy, away).
   */
  status?: 'online' | 'offline' | 'busy' | 'away';
  
  /**
   * Badge o notificación a mostrar.
   */
  badge?: React.ReactNode;
  
  /**
   * Posición del badge.
   * @default 'top-right'
   */
  posicionBadge?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  
  /**
   * Mostrar borde.
   */
  conBorde?: boolean;
  
  /**
   * Color del borde.
   */
  colorBorde?: string;
  
  /**
   * Grosor del borde.
   * @default '2px'
   */
  grosorBorde?: string;
  
  /**
   * Icono a mostrar en lugar de imagen.
   */
  icono?: React.ReactNode;
  
  /**
   * Iniciales a mostrar si no hay imagen.
   */
  iniciales?: string;
  
  /**
   * Callback al hacer click.
   */
  onClick?: () => void;
  
  /**
   * Avatar clickeable.
   */
  clickeable?: boolean;
  
  /**
   * Grupo de avatares (para apilar).
   */
  enGrupo?: boolean;
  
  /**
   * Clases CSS adicionales.
   */
  className?: string;
}

/**
 * Avatar extremadamente personalizable.
 * 
 * Características:
 * - Múltiples tamaños y formas
 * - Indicadores de estado (online, offline, etc.)
 * - Badges personalizables
 * - Fallback a iniciales o icono
 * - Bordes personalizables
 * - Clickeable
 * - Apilable en grupos
 * - Totalmente accesible
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'medium',
  variant = 'light',
  forma = 'circle',
  status,
  badge,
  posicionBadge = 'top-right',
  conBorde = false,
  colorBorde,
  grosorBorde = '2px',
  icono,
  iniciales,
  onClick,
  clickeable = false,
  enGrupo = false,
  className,
  ...props
}) => {
  const [imagenError, setImagenError] = React.useState(false);
  
  // Generar iniciales desde alt si no se proporcionan
  const obtenerIniciales = () => {
    if (iniciales) return iniciales;
    return alt
      .split(' ')
      .map(palabra => palabra[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  // Construcción de clases dinámicas
  const avatarClasses = [
    styles.avatar,
    styles[size],
    styles[variant],
    styles[forma],
    conBorde && styles.conBorde,
    (clickeable || onClick) && styles.clickeable,
    enGrupo && styles.enGrupo,
    className
  ].filter(Boolean).join(' ');
  
  const estilosPersonalizados: React.CSSProperties = {};
  if (conBorde && colorBorde) {
    estilosPersonalizados.borderColor = colorBorde;
    estilosPersonalizados.borderWidth = grosorBorde;
  }

  return (
    <div 
      className={avatarClasses} 
      onClick={onClick}
      style={estilosPersonalizados}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {/* Contenido del avatar */}
      {src && !imagenError ? (
        <img 
          src={src} 
          alt={alt} 
          className={styles.avatarImage}
          onError={() => setImagenError(true)}
        />
      ) : icono ? (
        <div className={styles.avatarIcono}>{icono}</div>
      ) : (
        <div className={styles.avatarIniciales}>{obtenerIniciales()}</div>
      )}
      
      {/* Indicador de estado */}
      {status && (
        <span 
          className={`${styles.statusIndicator} ${styles[`status-${status}`]}`}
          aria-label={`Estado: ${status}`}
        />
      )}
      
      {/* Badge */}
      {badge && (
        <span className={`${styles.badge} ${styles[`badge-${posicionBadge}`]}`}>
          {badge}
        </span>
      )}
    </div>
  );
};