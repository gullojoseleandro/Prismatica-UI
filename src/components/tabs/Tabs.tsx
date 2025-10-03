import React, { useId, useState } from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Tabs.module.css';

/**
 * Ítem individual de pestaña.
 * - `label`: texto del tab.
 * - `content`: contenido asociado al tab.
 */
export interface TabItem {
  label: string;
  content: React.ReactNode;
}

/**
 * Props del componente `Tabs`.
 * - `items`: lista de pestañas a mostrar.
 * - `variant`: tema visual.
 * - `className`: clases CSS adicionales.
 */
export interface TabsProps {
  items: TabItem[];
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

/**
 * Componente de pestañas accesible con soporte de teclado.
 * - Usa roles ARIA: `tablist`, `tab`, `tabpanel`.
 * - Teclas soportadas: Flechas, Home, End.
 *
 * @example
 * ```tsx
 * <Tabs items={[{label:'Uno', content:'A'},{label:'Dos', content:'B'}]} />
 * ```
 */
export const Tabs: React.FC<TabsProps> = ({
  items,
  variant = 'light',
  className,
  ...props
}) => {
  const instanceId = useId();
  const [activeIndex, setActiveIndex] = useState(0);

  // Navegación por teclado entre pestañas
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const lastIndex = items.length - 1;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1 > lastIndex ? 0 : prev + 1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 < 0 ? lastIndex : prev - 1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveIndex(lastIndex);
    }
  };

  const tabsClasses = [
    styles.tabs,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={tabsClasses} {...props}>
      <div
        className={styles.tabList}
        role="tablist"
        aria-label="Tabs"
        onKeyDown={onKeyDown}
      >
        {items.map((item, index) => (
          <button
            key={index}
            className={`${styles.tabButton} ${activeIndex === index ? styles.active : ''}`}
            onClick={() => setActiveIndex(index)}
            role="tab"
            id={`tab-${index}-${instanceId}`}
            aria-selected={activeIndex === index}
            aria-controls={`tabpanel-${index}-${instanceId}`}
            tabIndex={activeIndex === index ? 0 : -1}
          >
            <Typography variant="span" theme={variant}>{item.label}</Typography>
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          className={styles.tabContent}
          role="tabpanel"
          id={`tabpanel-${index}-${instanceId}`}
          aria-labelledby={`tab-${index}-${instanceId}`}
          hidden={activeIndex !== index}
        >
          <Typography variant="p" theme={variant}>{item.content}</Typography>
        </div>
      ))}
    </div>
  );
};