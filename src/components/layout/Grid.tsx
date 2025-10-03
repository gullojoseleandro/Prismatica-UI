import React from 'react';
import styles from '@styles/Grid.module.css';

/**
 * Props del componente `Grid`.
 * Sistema de grid flexible y responsive.
 * 
 * @example
 * ```tsx
 * <Grid cols={3} gap="large" responsive>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 * ```
 */
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Número de columnas.
   * @default 12
   */
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  
  /**
   * Espacio entre elementos.
   * @default 'normal'
   */
  gap?: 'none' | 'xs' | 'small' | 'normal' | 'large' | 'xl';
  
  /**
   * Alineación horizontal de los items.
   */
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
  
  /**
   * Alineación vertical de los items.
   */
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  
  /**
   * Grid responsive automático (adapta columnas según pantalla).
   */
  responsive?: boolean;
  
  /**
   * Columnas en móvil (< 768px).
   */
  colsMobile?: 1 | 2 | 3 | 4;
  
  /**
   * Columnas en tablet (768px - 1024px).
   */
  colsTablet?: 1 | 2 | 3 | 4 | 5 | 6;
  
  /**
   * Clases CSS adicionales.
   */
  className?: string;
  
  /**
   * Contenido del grid.
   */
  children: React.ReactNode;
}

/**
 * Sistema de grid flexible y responsive.
 * 
 * Características:
 * - Hasta 12 columnas
 * - Gap personalizable
 * - Alineación flexible
 * - Responsive automático
 * - Control por breakpoint
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(({
  cols = 12,
  gap = 'normal',
  justifyItems,
  alignItems,
  responsive = false,
  colsMobile,
  colsTablet,
  className,
  children,
  style,
  ...props
}, ref) => {
  const gridClasses = [
    styles.grid,
    styles[`cols-${cols}`],
    styles[`gap-${gap}`],
    justifyItems && styles[`justify-${justifyItems}`],
    alignItems && styles[`align-${alignItems}`],
    responsive && styles.responsive,
    colsMobile && styles[`mobile-${colsMobile}`],
    colsTablet && styles[`tablet-${colsTablet}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={gridClasses} style={style} {...props}>
      {children}
    </div>
  );
});

Grid.displayName = 'Grid';

/**
 * Props del componente `GridItem`.
 * Item individual del grid con control de span.
 */
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Número de columnas que ocupa el item.
   * @default 1
   */
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  
  /**
   * Número de filas que ocupa el item.
   */
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6;
  
  /**
   * Columna de inicio.
   */
  colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  
  /**
   * Fila de inicio.
   */
  rowStart?: 1 | 2 | 3 | 4 | 5 | 6;
  
  /**
   * Clases CSS adicionales.
   */
  className?: string;
  
  /**
   * Contenido del item.
   */
  children: React.ReactNode;
}

/**
 * Item individual del grid con control de span.
 * 
 * Permite controlar cuántas columnas/filas ocupa un elemento.
 */
export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(({
  colSpan = 1,
  rowSpan,
  colStart,
  rowStart,
  className,
  children,
  style,
  ...props
}, ref) => {
  const itemClasses = [
    styles.gridItem,
    colSpan && styles[`colSpan-${colSpan}`],
    rowSpan && styles[`rowSpan-${rowSpan}`],
    colStart && styles[`colStart-${colStart}`],
    rowStart && styles[`rowStart-${rowStart}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={itemClasses} style={style} {...props}>
      {children}
    </div>
  );
});

GridItem.displayName = 'GridItem';
