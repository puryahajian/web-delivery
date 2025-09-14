import React from 'react';

const getStatusText = (state) => {
    switch (state) {
        case 0: return 'در انتظار تایید';
        case 1: return 'در حال پرداخت';
        case 2: return 'در حال آماده‌سازی';
        case 3: return 'لغو شده';
        case 4: return 'ارسال شد';
        case 5: return 'در انتظار انتخاب راننده';
        case 8: return 'تحویل داده شد';
        default: return 'نامشخص';
    }
};

const getStatusColor = (state) => {
    switch (state) {
        case 0: return 'orange';
        case 1: return 'blue';
        case 2: return 'purple';
        case 3: return 'red';
        case 4: return 'lightgreen';
        case 5: return 'orange';
        case 8: return 'green';
        default: return 'grey';
    }
};

const OrderItem = ({
    orderCode,
    finalPrice,
    orderState,
    onClick,
    arrowIconColor = 'blue',
    backgroundColor = 'white',
    borderColor = '#E0E0E0',
    textColor = 'black',
    priceColor = 'blue',
    borderRadius = 16,
    padding = '8px',
    margin = '0 0 8px 0',
    trailingComponent,
    }) => {
    const containerStyle = {
        padding,
        margin,
        border: `1px solid ${borderColor}`,
        borderRadius,
        backgroundColor,
        cursor: 'pointer',
        userSelect: 'none',
        direction: 'rtl', // راست چین کردن کل container
    };

    const innerContainerStyle = {
        padding: 16,
        borderRadius: borderRadius - 4,
        backgroundColor: `${borderColor}1A`, // تقریبا 10% opacity
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const textStyle = (weight, size, color) => ({
        fontWeight: weight,
        fontSize: size,
        color: color || textColor,
    });

    return (
        <div style={containerStyle} onClick={onClick}>
            <div style={innerContainerStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={textStyle('bold', 14)}>سفارش : {orderCode}</span>
                <div style={{ height: 8 }} />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={textStyle(500, 14)}>المبلغ : </span>
                        <span style={{ ...textStyle('bold', 18, priceColor), marginLeft: 4 }}>
                        {finalPrice} تومان
                        </span>
                    </div>
                    <div style={{ height: 8 }} />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={textStyle(500, 14)}>وضعیت : </span>
                        <span style={{ ...textStyle(500, 16, getStatusColor(orderState)), marginLeft: 4 }}>
                            {getStatusText(orderState)}
                        </span>
                    </div>
                </div>
                <div>
                    {trailingComponent}
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
