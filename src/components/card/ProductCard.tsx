import React from 'react';
import { Card } from '@components/card/Card';
import { Button } from '@components/Button/Button';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/ProductCard.module.css';

/**
 * Props del componente `ProductCard`.
 * - `name`: nombre del producto.
 * - `description`: descripción del producto.
 * - `price`: precio numérico (se formatea con 2 decimales).
 * - `image`: URL de imagen del producto.
 * - `variant`: tema visual.
 * - `className`: clases CSS adicionales.
 * - `onAddToCart`: callback al presionar "Add to Cart".
 */
export interface ProductCardProps {
  /**
   * Nombre del producto.
   */
  name: string;
  /**
   * Descripción del producto.
   */
  description: string;
  /**
   * Precio numérico (se formatea con 2 decimales).
   */
  price: number;
  /**
   * URL de imagen del producto.
   */
  image: string;
  /**
   * Tema visual.
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  /**
   * Clases CSS adicionales.
   */
  className?: string;
  /**
   * Callback al presionar "Add to Cart".
   */
  onAddToCart: () => void;
}

/**
 * Tarjeta de producto con imagen, nombre, descripción, precio y acción.
 *
 * @example
 * ```tsx
 * <ProductCard
 *   name="Producto"
 *   description="Descripción corta"
 *   price={19.99}
 *   image="/img.png"
 *   onAddToCart={() => console.log('cart')}
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
  onAddToCart,
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
        <Button variant={variant} onClick={onAddToCart} className={styles.addToCartButton}>
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};