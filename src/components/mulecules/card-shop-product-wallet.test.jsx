import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardShopProductWallet } from './card-shop-product-wallet.jsx';

describe('CardShopProductWallet', () => {
  const product = 'محصول تستی';
  const price = '100,000';

  test('renders product name and price', () => {
    render(<CardShopProductWallet product={product} price={price} />);
    expect(screen.getByText(product)).toBeInTheDocument();
    expect(screen.getByText(price)).toBeInTheDocument();
  });

  test('renders priceOffer when provided', () => {
    render(<CardShopProductWallet product={product} price={price} priceOffer={'120,000'} />);
    expect(screen.getByText('120,000')).toBeInTheDocument();
  });

  test('does not render priceOffer when not provided', () => {
    render(<CardShopProductWallet product={product} price={price} />);
    expect(screen.queryByText('120,000')).not.toBeInTheDocument();
  });

  test('clicking image triggers onClickCard', () => {
    const onClickCard = jest.fn();
    render(<CardShopProductWallet product={product} price={price} onClickCard={onClickCard} />);
    const img = screen.getByAltText(product);
    fireEvent.click(img);
    expect(onClickCard).toHaveBeenCalledTimes(1);
  });

  test('clicking product title triggers onClickCard', () => {
    const onClickCard = jest.fn();
    render(<CardShopProductWallet product={product} price={price} onClickCard={onClickCard} />);
    const title = screen.getByText(product);
    fireEvent.click(title);
    expect(onClickCard).toHaveBeenCalledTimes(1);
  });

  test('avatar button calls its onClick from config', () => {
    const onAvatarClick = jest.fn();
    render(
      <CardShopProductWallet
        product={product}
        price={price}
        avatarButtonConfig={{ onClick: onAvatarClick, icon: '🛒' }}
      />
    );
    const avatarBtn = screen.getByRole('button');
    fireEvent.click(avatarBtn);
    expect(onAvatarClick).toHaveBeenCalledTimes(1);
  });

  test('applies alt attribute from product name', () => {
    render(<CardShopProductWallet product={product} price={price} />);
    const img = screen.getByAltText(product);
    expect(img).toBeInTheDocument();
  });
});


