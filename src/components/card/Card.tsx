import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Card.module.css';

/**
 * Props del componente `Card`.
 * Tarjeta extremadamente personalizable con múltiples opciones.
 * 
 * @example
 * ```tsx
 * <Card
 *   variant="dark"
 *   titulo="Mi Tarjeta"
 *   subtitulo="Descripción breve"
 *   imagen="/imagen.jpg"
 *   footer={<Button>Acción</Button>}
 *   conSombra
 *   hoverable
 * >
 *   Contenido de la tarjeta
 * </Card>
 * ```
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Contenido principal de la tarjeta.
   */
  children: React.ReactNode;
  
  /**
   * Tema visual.
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  
  /**
   * Título del card.
   */
  titulo?: string;
  
  /**
   * Subtítulo o descripción.
   */
  subtitulo?: string;
  
  /**
   * Imagen a mostrar en la parte superior.
   */
  imagen?: string | React.ReactNode;
  
  /**
   * Altura de la imagen.
   * @default '200px'
   */
  alturaImagen?: string;
  
  /**
   * Header personalizado (reemplaza título y subtítulo).
   */
  header?: React.ReactNode;
  
  /**
   * Footer personalizado.
   */
  footer?: React.ReactNode;
  
  /**
   * Icono a mostrar junto al título.
   */
  icono?: React.ReactNode;
  
  /**
   * Acciones a mostrar en el header (botones, menús, etc.).
   */
  accionesHeader?: React.ReactNode;
  
  /**
   * Mostrar sombra.
   */
  conSombra?: boolean;
  
  /**
   * Efecto hover (elevación).
   */
  hoverable?: boolean;
  
  /**
   * Card clickeable (cursor pointer).
   */
  clickeable?: boolean;
  
  /**
   * Borde de color.
   */
  colorBorde?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  
  /**
   * Padding del contenido.
   * @default 'normal'
   */
  padding?: 'none' | 'small' | 'normal' | 'large';
  
  /**
   * Orientación de la imagen.
   * @default 'top'
   */
  orientacionImagen?: 'top' | 'left' | 'right';
  
  /**
   * Clases CSS adicionales.
   */
  className?: string;
}

/**
 * Tarjeta extremadamente personalizable.
 * 
 * Características:
 * - Header y footer personalizables
 * - Imagen con múltiples orientaciones
 * - Iconos y acciones en el header
 * - Efectos hover y sombras
 * - Bordes de colores semánticos
 * - Padding ajustable
 * - Totalmente responsive
 *
 * @returns Contenedor `<div>` estilizado.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ 
  children,
  variant = 'light',
  titulo,
  subtitulo,
  imagen,
  alturaImagen = '200px',
  header,
  footer,
  icono,
  accionesHeader,
  conSombra = false,
  hoverable = false,
  clickeable = false,
  colorBorde,
  padding = 'normal',
  orientacionImagen = 'top',
  className,
  ...props
}, ref) => {
  // Clases dinámicas
  const cardClasses = [
    styles.card,
    styles[variant],
    styles[`padding-${padding}`],
    styles[`imagen-${orientacionImagen}`],
    conSombra && styles.conSombra,
    hoverable && styles.hoverable,
    clickeable && styles.clickeable,
    colorBorde && styles[`borde-${colorBorde}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={cardClasses} {...props}>
      {/* Imagen */}
      {imagen && (
        <div className={styles.imagenContainer} style={{ height: alturaImagen }}>
          {typeof imagen === 'string' ? (
            <img src={imagen} alt="" className={styles.imagen} />
          ) : (
            imagen
          )}
        </div>
      )}
      
      {/* Header personalizado o por defecto */}
      {(header || titulo || subtitulo) && (
        <div className={styles.header}>
          {header ? (
            header
          ) : (
            <>
              <div className={styles.headerContenido}>
                {icono && <div className={styles.icono}>{icono}</div>}
                <div className={styles.headerTextos}>
                  {titulo && (
                    <Typography variant="h3" theme={variant} className={styles.titulo}>
                      {titulo}
                    </Typography>
                  )}
                  {subtitulo && (
                    <Typography variant="p" theme={variant} className={styles.subtitulo}>
                      {subtitulo}
                    </Typography>
                  )}
                </div>
              </div>
              {accionesHeader && (
                <div className={styles.accionesHeader}>
                  {accionesHeader}
                </div>
              )}
            </>
          )}
        </div>
      )}
      
      {/* Contenido */}
      <div className={styles.contenido}>{children}</div>
      
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