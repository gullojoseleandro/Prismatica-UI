import React from 'react';
import { Button } from '@components/Button/Button';
import { Typography } from '@components/typography/Typography';
import { Card } from '@components/card/Card';
import styles from '@styles/ProductCard.module.css';

/**
 * Props for the `ProductCard` component.
 * - `name`: product name.
 * - `description`: product description.
 * - `price`: numeric price (formatted with 2 decimals).
 * - `image`: product image URL.
 * - `onBuy`: callback when pressing the buy button.
 * - `variant`: visual theme.
 * - `className`: additional CSS classes.
 */
export interface ProductCardProps {
  /**
   * Product name.
   */
  name: string;
  /**
   * Product description.
   */
  description: string;
  /**
   * Numeric price (formatted with 2 decimals).
   */
  price: number;
  /**
   * Product image URL.
   */
  image: string;
  /**
   * Visual theme.
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Callback when pressing "Buy".
   */
  onBuy: () => void;
}

/**
 * Product card with image, name, description, price, and action.
 *
 * @example
 * ```tsx
 * <ProductCard
 *   name="Laptop"
 *   description="High-performance portable computer"
 *   price={1299.99}
 *   image="/laptop.jpg"
 *   onBuy={() => alert('Buy')}
 * />
 * ```
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  price,
  image,
  variant = 'light',
  className,
  onBuy,
  ...props
}) => {
  const cardClasses = [
    styles.productCard,
    styles[variant],
    variant.startsWith('transparent') ? styles.transparent : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Card variant={variant} className={cardClasses} {...props}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <Typography variant="h3" theme={variant} className={styles.name}>{name}</Typography>
        <Typography variant="p" theme={variant} className={styles.description}>{description}</Typography>
        <Typography variant="h4" theme={variant} className={styles.price}>${price.toFixed(2)}</Typography>
        <Button variant={variant} onClick={onBuy} className={styles.addToCartButton}>
          Buy Now
        </Button>
      </div>
    </Card>
  );
};