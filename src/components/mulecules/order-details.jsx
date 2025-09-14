import React from 'react';

const OrderDetailsContent = ({ order, styleMedium, styleMediumOff, styleBold }) => {
    // معادل فانکشن‌های Dart
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

    const getPaymentMethodText = (method) => {
        switch (method) {
            case 1: return 'آنلاین';
            case 2: return 'نقدی';
            default: return 'نامشخص';
        }
    };

    const getDeliveryMethodText = (method) => {
        switch (method) {
            case 1: return 'راننده تحویل';
            case 2: return 'پست';
            default: return 'نامشخص';
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} - ${d.getHours()}:${d.getMinutes()}`;
    };

    // رندر سطرهای اطلاعات
    const InfoRow = ({ title, value, isAddress }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isAddress ? 'flex-start' : 'center', marginBottom: 8 }}>
        <div style={styleMedium}>{title}</div>
        <div style={{ flex: 3, ... (isAddress ? styleBold : {}) , direction: 'ltr' }}>
            {value}
        </div>
        </div>
    );

    // کارت اطلاعات سفارش
    const OrderInfoCard = () => (
        <div style={{ marginBottom: 16 }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={styleBold}>وضعیت سفارش</div>
        <div style={{
            backgroundColor: getStatusColor(order.state),
            color: 'white',
            borderRadius: 16,
            padding: '4px 12px',
            fontWeight: 'bold',
            minWidth: 80,
            textAlign: 'center'
            }}>
            {getStatusText(order.state)}
            </div>
        </div>
        <div style={{height: 16}} />
        <InfoRow title="تاریخ ثبت سفارش" value={formatDate(order.createdAt)} />
        <InfoRow title="کد سفارش" value={order.orderCode} />
        <InfoRow title="تعداد آیتم‌ها" value={order.items.length.toString()} />
        <InfoRow title="مبلغ کل" value={`${order.finalPrice} تومان`} />
        {order.discount > 0 && <InfoRow title="تخفیف" value={`${order.discount} تومان`} />}
        </div>
    );

    // کارت آیتم سفارش
    const OrderItemCard = ({ item }) => (
        <div style={{
        marginBottom: 8,
        padding: 8,
        border: '1px solid rgba(128,128,128,0.6)',
        borderRadius: 16,
        backgroundColor: 'white',
        boxSizing: 'border-box'
        }}>
        <div style={{
            padding: 8,
            borderRadius: 14,
            backgroundColor: 'rgba(128,128,128,0.1)',
            display: 'flex',
            alignItems: 'center',
        }}>
            <img
            src={item.product.image}
            alt={item.product.name}
            style={{ width: 100, height: 100, borderRadius: 8, objectFit: 'cover' }}
            onError={(e) => e.target.src = 'https://via.placeholder.com/80?text=No+Image'}
            />
            <div style={{ marginLeft: 16, flex: 1 }}>
            <div style={styleBold}>{item.product.name}</div>
            <div style={{ marginTop: 4, ...styleMedium }}>تعداد: {item.quantity}</div>
            <div style={{ marginTop: 4, ...styleMedium }}>قیمت واحد: {item.product.price} تومان</div>
            {item.product.discountPercentage > 0 && (
                <div style={{ marginTop: 4, ...styleMediumOff }}>
                {item.product.discountPercentage}% تخفیف
                </div>
            )}
            </div>
        </div>
        </div>
    );

    // کارت پرداخت و آدرس
    const PaymentAndAddressCard = () => (
        <div style={{
        padding: 16,
        borderRadius: 16,
        backgroundColor: 'rgba(128,128,128,0.1)',
        boxSizing: 'border-box',
        marginBottom: 16,
        }}>
        <div style={styleBold}>اطلاعات پرداخت</div>
        <div style={{ height: 16 }} />
        <InfoRow title="روش پرداخت : " value={getPaymentMethodText(order.paymentMethod)} />
        <InfoRow title="زمان پرداخت : " value={order.paymentTime ? formatDate(order.paymentTime) : 'پرداخت نشده'} />

        <div style={{ height: 16 }} />
        <hr style={{ margin: '16px -16px', borderColor: 'rgba(0,0,0,0.12)' }} />
        <div style={{ height: 16 }} />

        <div style={styleBold}>اطلاعات ارسال</div>
        <div style={{ height: 16 }} />
        <InfoRow title="روش ارسال : " value={getDeliveryMethodText(order.deliveryMethod)} />
        <InfoRow title="زمان تحویل : " value={order.deliveredTime ? formatDate(order.deliveredTime) : 'تحویل داده نشده'} />
        <InfoRow title="آدرس : " value={order.deliveryAddress} isAddress />
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <OrderInfoCard />
            <hr style={{ width: '100%', margin: '16px 0', borderColor: 'rgba(0,0,0,0.12)' }} />
            <PaymentAndAddressCard />
            <hr style={{ width: '100%', margin: '16px 0', borderColor: 'rgba(0,0,0,0.12)' }} />
            <div style={styleBold}>آیتم‌های سفارش</div>
            <div style={{ height: 16 }} />
            {order.items.map((item, index) => (
                <OrderItemCard key={index} item={item} />
            ))}
        </div>
    );
};

export default OrderDetailsContent;
