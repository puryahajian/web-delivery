import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [orderData, setOrderData] = useState(null);

    return (
        <OrderContext.Provider value={{ orderData, setOrderData }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrder() {
    return useContext(OrderContext);
}