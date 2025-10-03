import React, { useId, useState } from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Accordion.module.css';

/**
 * Ítem individual del acordeón.
 * - `title`: encabezado clickable del ítem.
 * - `content`: contenido que se expande/colapsa.
 */
export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

/**
 * Props del componente `Accordion`.
 * - `items`: lista de ítems a renderizar.
 * - `variant`: tema visual.
 * - `className`: clases CSS extra.
 */
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

/**
 * Componente `Accordion` accesible con ARIA.
 * - Usa `aria-expanded`, `aria-controls` y `role="region"` para accesibilidad.
 * - Controla un único ítem abierto a la vez.
 *
 * @returns Contenedor `<div>` con una lista de ítems expandibles.
 * @example
 * ```tsx
 * <Accordion
 *   variant="light"
 *   items={[{ title: 'Sección 1', content: 'Contenido 1' }, { title: 'Sección 2', content: 'Contenido 2' }]}
 * />
 * ```
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  variant = 'light',
  className,
  ...props
}) => {
  const instanceId = useId();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Alterna el índice activo; si se repite, colapsa
  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const accordionClasses = [
    styles.accordion,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={accordionClasses} {...props}>
      {items.map((item, index) => (
        <div key={index} className={styles.accordionItem}>
          <button
            className={`${styles.accordionHeader} ${activeIndex === index ? styles.active : ''}`}
            onClick={() => toggleItem(index)}
            // Estado expandido y relación con el panel
            aria-expanded={activeIndex === index}
            aria-controls={`accordion-panel-${index}-${instanceId}`}
            id={`accordion-header-${index}-${instanceId}`}
          >
            <Typography variant="h3" theme={variant}>{item.title}</Typography>
            <Typography variant="span" className={styles.accordionIcon} aria-hidden>
              {activeIndex === index ? '−' : '+'}
            </Typography>
          </button>
          {activeIndex === index && (
            <div
              className={styles.accordionContent}
              id={`accordion-panel-${index}-${instanceId}`}
              // Región asociada al encabezado del ítem
              role="region"
              aria-labelledby={`accordion-header-${index}-${instanceId}`}
            >
              <Typography variant="p" theme={variant}>{item.content}</Typography>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};