import React, { useState, createContext, useContext, useEffect } from 'react';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

const DISCOUNT_CODES = {
    SAVE10: 0.10,
    SAVE20: 0.20,
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    // 🟢 هر بار که cart تغییر کرد، ذخیره کن
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (data) => {
        setCart(prev => {
            // پشتیبانی از هر دو حالت: data.id یا data.data.id
            const productId = data?.id ?? data?.data?.id;

            if (!productId) return prev; // اگر هیچ id نداشت، هیچی اضافه نکن

            const exist = prev.find(p => (p.data.id ?? p.data?.data?.id) === productId);

            if (exist) {
                // اگر محصول موجود بود، فقط تعداد رو افزایش بده
                return prev.map(p =>
                    (p.data.id ?? p.data?.data?.id) === productId
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
            }

            // محصول جدید
            return [...prev, { data, quantity: 1 }];
        });
    };

    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeFromCart(id);
        } else {
            setCart(prev => {
                const updatedCart = prev.map(p => {
                    if (p.data.id === id) {
                        return { ...p, quantity };
                    }
                    return p;
                });
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                return updatedCart;
            });
        }
    };

    const removeFromCart = (id) => {
        setCart(prev => {
            const updatedCart = prev.filter(p => p.data.id !== id);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const getTotal = () => {
        return cart.reduce((sum, item) => {
            const price =
                item?.data?.price ??
                item?.data?.data?.price ??
                item?.price ??
                0;
            return sum + price * item.quantity;
        }, 0);
    };

    const getFinalTotal = (discountAmount = 0, tax = 40000) => {
        return getTotal() + tax - discountAmount;
    };

    const applyDiscount = (code) => {
        const rate = DISCOUNT_CODES[code] || 0;
        return getTotal() * rate;
    };

    return (
        <CartContext.Provider
        value={{ cart, addToCart, updateQuantity, removeFromCart, applyDiscount, getTotal, getFinalTotal }}
        >
        {children}
        </CartContext.Provider>
    );
};
