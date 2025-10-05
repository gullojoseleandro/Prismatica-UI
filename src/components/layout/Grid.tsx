import React from 'react';
import styles from '@styles/Grid.module.css';

/**
 * Props for the `Grid` component.
 * Flexible and responsive grid system.
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
   * Number of columns.
   * @defaultValue 12
   */
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  
  /**
   * Space between elements.
   * @defaultValue 'normal'
   */
  gap?: 'none' | 'xs' | 'small' | 'normal' | 'large' | 'xl';
  
  /**
   * Horizontal alignment of items.
   */
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
  
  /**
   * Vertical alignment of items.
   */
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  
  /**
   * Automatic responsive grid (adapts columns based on screen).
   */
  responsive?: boolean;
  
  /**
   * Columns on mobile (< 768px).
   */
  colsMobile?: 1 | 2 | 3 | 4;
  
  /**
   * Columns on tablet (768px - 1024px).
   */
  colsTablet?: 1 | 2 | 3 | 4 | 5 | 6;
  
  /**
   * Additional CSS classes.
   */
  className?: string;
  
  /**
   * Grid content.
   */
  children: React.ReactNode;
}

/**
 * Flexible and responsive grid system.
 * 
 * Features:
 * - Up to 12 columns
 * - Customizable gap
 * - Flexible alignment
 * - Automatic responsive
 * - Breakpoint control
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
 * Props for the `GridItem` component.
 * Individual grid item with span control.
 */
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns the item spans.
   * @defaultValue 1
   */
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  
  /**
   * Number of rows the item spans.
   */
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6;
  
  /**
   * Starting column.
   */
  colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  
  /**
   * Starting row.
   */
  rowStart?: 1 | 2 | 3 | 4 | 5 | 6;
  
  /**
   * Additional CSS classes.
   */
  className?: string;
  
  /**
   * Item content.
   */
  children: React.ReactNode;
}

/**
 * Individual grid item with span control.
 * 
 * Allows controlling how many columns/rows an element occupies.
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
