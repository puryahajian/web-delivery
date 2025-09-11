import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardShopProductWallet2 } from './cart-shop-product-wallet2.jsx';

describe('CardShopProductWallet2', () => {
    const product = 'محصول کیف 2';
    const price = '200,000';

    test('renders product name, price and image alt', () => {
        render(<CardShopProductWallet2 product={product} price={price} />);
        expect(screen.getByText(product)).toBeInTheDocument();
        expect(screen.getByText(price)).toBeInTheDocument();
        expect(screen.getByAltText(product)).toBeInTheDocument();
    });

    test('clicking card triggers onTapCard', () => {
        const onTapCard = jest.fn();
        render(<CardShopProductWallet2 product={product} price={price} onTapCard={onTapCard} />);
        fireEvent.click(screen.getByAltText(product));
        expect(onTapCard).toHaveBeenCalled();
    });

    test('clicking title triggers provided onClick', () => {
        const onClick = jest.fn();
        render(<CardShopProductWallet2 product={product} price={price} onClick={onClick} />);
        fireEvent.click(screen.getByText(product));
        expect(onClick).toHaveBeenCalled();
    });

    test('when check=false shows only remove button block', () => {
        render(<CardShopProductWallet2 product={product} price={price} check={false} />);
        // There is exactly one control area rendered (the right side single button)
        // We can assert by counting elements with the icon default ❄ shown once
        expect(screen.getAllByText('❄').length).toBe(1);
    });

    test('when check=true shows remove, number and add controls', () => {
        render(
            <CardShopProductWallet2
                product={product}
                price={price}
                check={true}
                numberProduct={3}
            />
        );
        expect(screen.getByText('3')).toBeInTheDocument();
        // default icon rendered twice for remove and add
        expect(screen.getAllByText('❄').length).toBe(2);
    });

    test('avatar buttons call their onTap handlers', () => {
        const onRemove = jest.fn();
        const onAdd = jest.fn();
        render(
            <CardShopProductWallet2
                product={product}
                price={price}
                check={true}
                avatarButtonConfigRemove={{ onTap: onRemove, icon: '−' }}
                avatarButtonConfigAdd={{ onTap: onAdd, icon: '+' }}
            />
        );
        const minusBtn = screen.getByText('−');
        const plusBtn = screen.getByText('+');
        fireEvent.click(minusBtn);
        fireEvent.click(plusBtn);
        expect(onRemove).toHaveBeenCalled();
        expect(onAdd).toHaveBeenCalled();
    });
});
