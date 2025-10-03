import React, { useId, useState } from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Accordion.module.css';

/**
 * Individual accordion item.
 * - `title`: clickable header of the item.
 * - `content`: content that expands/collapses.
 */
export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

/**
 * Props for the `Accordion` component.
 * - `items`: list of items to render.
 * - `variant`: visual theme.
 * - `className`: additional CSS classes.
 */
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

/**
 * Accessible `Accordion` component with ARIA.
 * - Uses `aria-expanded`, `aria-controls` and `role="region"` for accessibility.
 * - Controls a single open item at a time.
 *
 * @returns `<div>` container with a list of expandable items.
 * @example
 * ```tsx
 * <Accordion
 *   variant="light"
 *   items={[{ title: 'Section 1', content: 'Content 1' }, { title: 'Section 2', content: 'Content 2' }]}
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

  // Toggle active index; if repeated, collapse
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
            // Expanded state and relation to panel
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
              // Region associated with item header
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