import React, { useState } from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Accordion.module.css';

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
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
          >
            <Typography variant="h3" theme={variant}>{item.title}</Typography>
            <Typography variant="span" className={styles.accordionIcon}>{activeIndex === index ? '−' : '+'}</Typography>
          </button>
          {activeIndex === index && (
            <div className={styles.accordionContent}>
              <Typography variant="p" theme={variant}>{item.content}</Typography>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};