import React, { useState } from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Tabs.module.css';

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  variant = 'light',
  className,
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabsClasses = [
    styles.tabs,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={tabsClasses} {...props}>
      <div className={styles.tabList}>
        {items.map((item, index) => (
          <button
            key={index}
            className={`${styles.tabButton} ${activeIndex === index ? styles.active : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <Typography variant="span" theme={variant}>{item.label}</Typography>
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        <Typography variant="p" theme={variant}>{items[activeIndex].content}</Typography>
      </div>
    </div>
  );
};