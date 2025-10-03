import React, { useId, useState } from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Accordion.module.css';

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  variant = 'light',
  className,
  ...props
}) => {
  const instanceId = useId();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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