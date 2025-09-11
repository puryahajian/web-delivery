# مستندات API - فروشگاه آنلاین ایرانی

## 📋 فهرست مطالب

1. [معرفی API](#معرفی-api)
2. [احراز هویت](#احراز-هویت)
3. [محصولات](#محصولات)
4. [سبد خرید](#سبد-خرید)
5. [کاربران](#کاربران)
6. [سفارشات](#سفارشات)
7. [جستجو](#جستجو)
8. [خطاها](#خطاها)

## 🌐 معرفی API

### Base URL
```
https://api.iranishop.com/v1
```

### Headers
```javascript
{
    "Content-Type": "application/json",
    "Authorization": "Bearer {access_token}",
    "Accept-Language": "fa-IR"
}
```

### Response Format
```javascript
{
    "success": true,
    "data": {
        // داده‌های پاسخ
    },
    "message": "عملیات با موفقیت انجام شد",
    "timestamp": "2024-01-15T10:30:00Z"
}
```

## 🔐 احراز هویت

### ورود با شماره موبایل
```http
POST /auth/login
```

**Request Body:**
```javascript
{
    "phone": "09123456789"
}
```

**Response:**
```javascript
{
    "success": true,
    "data": {
        "message": "کد تایید ارسال شد",
        "expires_in": 120 // ثانیه
    }
}
```

### تایید OTP
```http
POST /auth/verify
```

**Request Body:**
```javascript
{
    "phone": "09123456789",
    "otp": "123456"
}
```

**Response:**
```javascript
{
    "success": true,
    "data": {
        "user": {
            "id": 1,
            "name": "احمد محمدی",
            "phone": "09123456789",
            "email": "ahmad@example.com"
        },
        "tokens": {
            "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
    }
}
```

### تمدید توکن
```http
POST /auth/refresh
```

**Request Body:**
```javascript
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```javascript
{
    "success": true,
    "data": {
        "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

### خروج
```http
POST /auth/logout
```

**Headers:**
```javascript
{
    "Authorization": "Bearer {access_token}"
}
```

**Response:**
```javascript
{
    "success": true,
    "message": "خروج موفقیت‌آمیز"
}
```

## 📦 محصولات

### دریافت لیست محصولات
```http
GET /products
```

**Query Parameters:**
- `page` (number): شماره صفحه (پیش‌فرض: 1)
- `limit` (number): تعداد در هر صفحه (پیش‌فرض: 20)
- `category_id` (number): شناسه دسته‌بندی
- `search` (string): جستجو در نام محصول
- `min_price` (number): حداقل قیمت
- `max_price` (number): حداکثر قیمت
- `sort` (string): مرتب‌سازی (price_asc, price_desc, name_asc, name_desc)

**Response:**
```javascript
{
    "success": true,
    "data": {
        "products": [
            {
                "id": 1,
                "name": "لپ‌تاپ اپل مک‌بوک پرو",
                "description": "لپ‌تاپ قدرتمند اپل با پردازنده M2",
                "price": 85000000,
                "discount_price": 80000000,
                "discount_percent": 6,
                "image": "https://example.com/laptop.jpg",
                "images": [
                    "https://example.com/laptop1.jpg",
                    "https://example.com/laptop2.jpg"
                ],
                "category": {
                    "id": 1,
                    "name": "لپ‌تاپ"
                },
                "brand": {
                    "id": 1,
                    "name": "اپل"
                },
                "stock": 10,
                "rating": 4.5,
                "review_count": 25,
                "created_at": "2024-01-15T10:30:00Z"
            }
        ],
        "pagination": {
            "current_page": 1,
            "total_pages": 5,
            "total_items": 100,
            "per_page": 20
        }
    }
}
```

### دریافت جزئیات محصول
```http
GET /products/{id}
```

**Response:**
```javascript
{
    "success": true,
    "data": {
        "id": 1,
        "name": "لپ‌تاپ اپل مک‌بوک پرو",
        "description": "لپ‌تاپ قدرتمند اپل با پردازنده M2",
        "long_description": "توضیحات کامل محصول...",
        "price": 85000000,
        "discount_price": 80000000,
        "discount_percent": 6,
        "image": "https://example.com/laptop.jpg",
        "images": [
            "https://example.com/laptop1.jpg",
            "https://example.com/laptop2.jpg"
        ],
        "category": {
            "id": 1,
            "name": "لپ‌تاپ"
        },
        "brand": {
            "id": 1,
            "name": "اپل"
        },
        "specifications": {
            "پردازنده": "M2",
            "رم": "16GB",
            "هارد": "512GB SSD"
        },
        "stock": 10,
        "rating": 4.5,
        "review_count": 25,
        "reviews": [
            {
                "id": 1,
                "user_name": "علی احمدی",
                "rating": 5,
                "comment": "محصول عالی و با کیفیت",
                "created_at": "2024-01-10T15:30:00Z"
            }
        ],
        "related_products": [
            // محصولات مشابه
        ],
        "created_at": "2024-01-15T10:30:00Z"
    }
}
```

### دریافت دسته‌بندی‌ها
```http
GET /categories
```

**Response:**
```javascript
{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "لپ‌تاپ",
            "slug": "laptop",
            "image": "https://example.com/laptop-category.jpg",
            "product_count": 50,
            "children": [
                {
                    "id": 2,
                    "name": "لپ‌تاپ گیمینگ",
                    "slug": "gaming-laptop",
                    "product_count": 20
                }
            ]
        }
    ]
}
```

### دریافت برندها
```http
GET /brands
```

**Response:**
```javascript
{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "اپل",
            "logo": "https://example.com/apple-logo.png",
            "product_count": 15
        }
    ]
}
```

## 🛒 سبد خرید

### دریافت سبد خرید
```http
GET /cart
```

**Headers:**
```javascript
{
    "Authorization": "Bearer {access_token}"
}
```

**Response:**
```javascript
{
    "success": true,
    "data": {
        "items": [
            {
                "id": 1,
                "product": {
                    "id": 1,
                    "name": "لپ‌تاپ اپل مک‌بوک پرو",
                    "price": 85000000,
                    "discount_price": 80000000,
                    "image": "https://example.com/laptop.jpg"
                },
                "quantity": 2,
                "total_price": 160000000
            }
        ],
        "summary": {
            "subtotal": 160000000,
            "discount": 10000000,
            "shipping": 50000,
            "tax": 8000000,
            "total": 168050000
        }
    }
}
```

### افزودن به سبد خرید
```http
POST /cart/add
```

**Headers:**
```javascript
{
    "Authorization": "Bearer {access_token}"
}
```

**Request Body:**
```javascript
{
    "product_id": 1,
    "quantity": 2
}
```

**Response:**
```javascript
{
    "success": true,
    "data": {
        "message": "محصول به سبد خرید اضافه شد",
        "cart_count": 3
    }
}
```

### به‌روزرسانی تعداد
```http
PUT /cart/update
```

**Headers:**
```javascript
{
    "Authorization": "Bearer {access_token}"
}
```

**Request Body:**
```javascript
{
    "item_id": 1,
    "quantity": 3
}
```

### حذف از سبد خرید
```http
DELETE /cart/remove/{item_id}
```

**Headers:**
```javascript
{
    "Authorization": "Bearer {access_token}"
}
```

### پاک کردن سبد خرید
```http
DELETE /cart/clear
```

**Headers:**
```javascript
{
    "Authorization": "Bearer {access_token}"
}
```

## 👤 کاربران

### دریافت پروفایل کاربر
```http
GET /profile
```

**Headers:**
```javascript
{
    "Authorization": "Bearer {access_token}"
}
```

**Response:**
```javascript
{
    "success": true,
    "data": {
        "id": 1,
        "name": "احمد محمدی",
        "phone": "09123456789",
        "email": "ahmad@example.com",
        "avatar": "https://example.com/avatar.jpg",
        "addresses": [
            {
                "id": 1,
                "title": "خانه",
                "address": "تهران، خیابان ولیعصر",
                "postal_code": "1234567890",
                "phone": "09123456789",
                "is_default": true
            }
        ],
        "created_at": "2024-01-01T10:00:00Z"
    }
}
```

### به‌روزرسانی پروفایل
```http
PUT /profile
```

**Headers:**
```javascript
{
    "Authorization": "Bearer {access_token}"
}
```

**Request Body:**
```javascript
{
    "name": "احمد محمدی",
    "email": "ahmad@example.com"
}
```

### افزودن آدرس
```http
POST /profile/addresses
```

**Headers:**
```javascript
{
    "Authorization": "Bearer {access_token}"
}
```

**Request Body:**
```javascript
{
    "title": "دفتر کار",
    "address": "تهران، خیابان انقلاب",
    "postal_code": "1234567890",
    "phone": "09123456789",
    "is_default": false
}
```

### حذف آدرس
```http
DELETE /profile/addresses/{address_id}
```

**Headers:**
```javascript
{
    "Authorization": "Bearer {access_token}"
}
```

## 📋 سفارشات

### ایجاد سفارش
```http
POST /orders
```

**Headers:**
```javascript
{
    "Authorization": "Bearer {access_token}"
}
```

**Request Body:**
```javascript
{
    "address_id": 1,
    "payment_method": "online", // online, cash
    "discount_code": "SAVE10", // اختیاری
    "note": "لطفاً در ساعت کاری تحویل دهید"
}
```

**Response:**
```javascript
{
    "success": true,
    "data": {
        "order": {
            "id": 1,
            "order_number": "ORD-2024-001",
            "status": "pending",
            "total": 168050000,
            "payment_url": "https://payment.example.com/pay/123",
            "created_at": "2024-01-15T10:30:00Z"
        }
    }
}
```

### دریافت لیست سفارشات
```http
GET /orders
```

**Headers:**
```javascript
{
    "Authorization": "Bearer {access_token}"
}
```

**Query Parameters:**
- `page` (number): شماره صفحه
- `limit` (number): تعداد در هر صفحه
- `status` (string): وضعیت سفارش

**Response:**
```javascript
{
    "success": true,
    "data": {
        "orders": [
            {
                "id": 1,
                "order_number": "ORD-2024-001",
                "status": "delivered",
                "total": 168050000,
                "items_count": 2,
                "created_at": "2024-01-15T10:30:00Z",
                "delivered_at": "2024-01-16T14:00:00Z"
            }
        ],
        "pagination": {
            "current_page": 1,
            "total_pages": 3,
            "total_items": 25
        }
    }
}
```

### دریافت جزئیات سفارش
```http
GET /orders/{order_id}
```

**Headers:**
```javascript
{
    "Authorization": "Bearer {access_token}"
}
```

**Response:**
```javascript
{
    "success": true,
    "data": {
        "id": 1,
        "order_number": "ORD-2024-001",
        "status": "delivered",
        "items": [
            {
                "id": 1,
                "product": {
                    "id": 1,
                    "name": "لپ‌تاپ اپل مک‌بوک پرو",
                    "image": "https://example.com/laptop.jpg"
                },
                "quantity": 2,
                "price": 80000000,
                "total": 160000000
            }
        ],
        "summary": {
            "subtotal": 160000000,
            "discount": 10000000,
            "shipping": 50000,
            "tax": 8000000,
            "total": 168050000
        },
        "shipping_address": {
            "title": "خانه",
            "address": "تهران، خیابان ولیعصر",
            "phone": "09123456789"
        },
        "timeline": [
            {
                "status": "pending",
                "title": "سفارش ثبت شد",
                "description": "سفارش شما با موفقیت ثبت شد",
                "date": "2024-01-15T10:30:00Z"
            },
            {
                "status": "processing",
                "title": "در حال پردازش",
                "description": "سفارش شما در حال آماده‌سازی است",
                "date": "2024-01-15T11:00:00Z"
            },
            {
                "status": "shipped",
                "title": "ارسال شد",
                "description": "سفارش شما ارسال شد",
                "date": "2024-01-16T09:00:00Z"
            },
            {
                "status": "delivered",
                "title": "تحویل شد",
                "description": "سفارش شما تحویل شد",
                "date": "2024-01-16T14:00:00Z"
            }
        ],
        "created_at": "2024-01-15T10:30:00Z"
    }
}
```

### لغو سفارش
```http
POST /orders/{order_id}/cancel
```

**Headers:**
```javascript
{
    "Authorization": "Bearer {access_token}"
}
```

**Request Body:**
```javascript
{
    "reason": "تغییر تصمیم"
}
```

## 🔍 جستجو

### جستجوی محصولات
```http
GET /search
```

**Query Parameters:**
- `q` (string): عبارت جستجو
- `category_id` (number): فیلتر بر اساس دسته‌بندی
- `brand_id` (number): فیلتر بر اساس برند
- `min_price` (number): حداقل قیمت
- `max_price` (number): حداکثر قیمت
- `sort` (string): مرتب‌سازی
- `page` (number): شماره صفحه

**Response:**
```javascript
{
    "success": true,
    "data": {
        "products": [
            // محصولات جستجو شده
        ],
        "filters": {
            "categories": [
                {
                    "id": 1,
                    "name": "لپ‌تاپ",
                    "count": 15
                }
            ],
            "brands": [
                {
                    "id": 1,
                    "name": "اپل",
                    "count": 8
                }
            ],
            "price_range": {
                "min": 1000000,
                "max": 100000000
            }
        },
        "pagination": {
            "current_page": 1,
            "total_pages": 3,
            "total_items": 45
        }
    }
}
```

### جستجوی پیشنهادی
```http
GET /search/suggestions
```

**Query Parameters:**
- `q` (string): عبارت جستجو

**Response:**
```javascript
{
    "success": true,
    "data": [
        "لپ‌تاپ اپل",
        "لپ‌تاپ گیمینگ",
        "لپ‌تاپ دانشجویی"
    ]
}
```

## ❌ خطاها

### کدهای خطا
```javascript
{
    "success": false,
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "داده‌های ارسالی نامعتبر است",
        "details": {
            "phone": ["شماره موبایل معتبر نیست"],
            "otp": ["کد تایید الزامی است"]
        }
    }
}
```

### کدهای خطای رایج

| کد | توضیح |
|---|---|
| `UNAUTHORIZED` | احراز هویت ناموفق |
| `FORBIDDEN` | دسترسی غیرمجاز |
| `NOT_FOUND` | منبع مورد نظر یافت نشد |
| `VALIDATION_ERROR` | خطا در اعتبارسنجی داده‌ها |
| `RATE_LIMIT_EXCEEDED` | تعداد درخواست‌ها بیش از حد مجاز |
| `INTERNAL_SERVER_ERROR` | خطای داخلی سرور |

### مثال خطا
```javascript
// خطای 400 - Bad Request
{
    "success": false,
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "داده‌های ارسالی نامعتبر است",
        "details": {
            "phone": ["شماره موبایل معتبر نیست"]
        }
    }
}

// خطای 401 - Unauthorized
{
    "success": false,
    "error": {
        "code": "UNAUTHORIZED",
        "message": "توکن احراز هویت نامعتبر است"
    }
}

// خطای 404 - Not Found
{
    "success": false,
    "error": {
        "code": "NOT_FOUND",
        "message": "محصول مورد نظر یافت نشد"
    }
}

// خطای 500 - Internal Server Error
{
    "success": false,
    "error": {
        "code": "INTERNAL_SERVER_ERROR",
        "message": "خطای داخلی سرور"
    }
}
```

## 📊 Rate Limiting

### محدودیت‌های درخواست
- **عمومی**: 100 درخواست در دقیقه
- **احراز هویت**: 5 درخواست در دقیقه
- **جستجو**: 30 درخواست در دقیقه

### Headers پاسخ
```javascript
{
    "X-RateLimit-Limit": "100",
    "X-RateLimit-Remaining": "95",
    "X-RateLimit-Reset": "1642234567"
}
```

## 🔧 Webhooks

### رویدادهای پشتیبانی شده
- `order.created` - سفارش جدید ایجاد شد
- `order.updated` - سفارش به‌روزرسانی شد
- `order.cancelled` - سفارش لغو شد
- `payment.succeeded` - پرداخت موفق
- `payment.failed` - پرداخت ناموفق

### مثال Webhook
```javascript
{
    "event": "order.created",
    "data": {
        "order_id": 1,
        "order_number": "ORD-2024-001",
        "total": 168050000,
        "created_at": "2024-01-15T10:30:00Z"
    },
    "timestamp": "2024-01-15T10:30:00Z"
}
```

---

**نویسنده**: تیم توسعه فروشگاه آنلاین ایرانی  
**آخرین به‌روزرسانی**: 2024  
**نسخه API**: v1
