# مستندات فنی فروشگاه آنلاین ایرانی

## 📋 فهرست مطالب

1. [معماری پروژه](#معماری-پروژه)
2. [مدیریت State](#مدیریت-state)
3. [API Integration](#api-integration)
4. [کامپوننت‌ها](#کامپوننت‌ها)
5. [Routing](#routing)
6. [Styling](#styling)
7. [Performance](#performance)
8. [Security](#security)
9. [Testing](#testing)
10. [Deployment](#deployment)

## 🏗️ معماری پروژه

### ساختار کلی
پروژه از معماری **Component-Based Architecture** با الگوی **Atomic Design** استفاده می‌کند:

```
src/
├── components/          # لایه کامپوننت‌ها
├── pages/              # لایه صفحات
├── hooks/              # لایه منطق کسب‌وکار
├── context/            # لایه مدیریت state
├── lib/                # لایه کتابخانه‌ها
└── assets/             # لایه منابع
```

### الگوی Atomic Design

#### 1. Atoms (اتم‌ها)
کامپوننت‌های پایه و غیرقابل تقسیم:
- `button.jsx` - دکمه‌های مختلف
- `input.jsx` - فیلدهای ورودی
- `text.jsx` - متن‌های مختلف
- `title.jsx` - عناوین
- `loading.jsx` - نشانگر بارگذاری

#### 2. Molecules (مولکول‌ها)
ترکیبی از اتم‌ها:
- فرم‌ها
- کارت‌های محصول
- منوها
- جستجو

#### 3. Organisms (ارگانیسم‌ها)
ترکیبی از مولکول‌ها:
- هدر کامل
- فوتر
- لیست محصولات
- سبد خرید

#### 4. Templates (قالب‌ها)
ساختار کلی صفحات:
- `temp-header.jsx`
- `temp-footer.jsx`
- `temp-box-main.jsx`

## 🔄 مدیریت State

### 1. CartContext
مدیریت state سبد خرید با Context API:

```javascript
// src/context/CartContext.jsx
const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    
    const addToCart = (data) => {
        // منطق افزودن به سبد خرید
    };
    
    const removeFromCart = (id) => {
        // منطق حذف از سبد خرید
    };
    
    const getTotal = () => {
        // محاسبه قیمت کل
    };
    
    return (
        <CartContext.Provider value={{
            cart, addToCart, removeFromCart, getTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};
```

### 2. React Query
مدیریت state سرور:

```javascript
// src/hooks/use-get-product.jsx
import { useQuery } from '@tanstack/react-query';

const useGetProduct = (id) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProduct(id),
        staleTime: 5 * 60 * 1000, // 5 دقیقه
        cacheTime: 10 * 60 * 1000, // 10 دقیقه
    });
};
```

### 3. Local Storage
ذخیره‌سازی داده‌های محلی:

```javascript
// ذخیره سبد خرید
localStorage.setItem("cart", JSON.stringify(cart));

// بازیابی سبد خرید
const savedCart = localStorage.getItem("cart");
const cart = savedCart ? JSON.parse(savedCart) : [];
```

## 🔌 API Integration

### 1. Axios Interceptor
مدیریت درخواست‌های HTTP:

```javascript
// src/lib/interceptor.jsx
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('access');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // مدیریت خطای احراز هویت
        }
        return Promise.reject(error);
    }
);
```

### 2. Custom Hooks
Hooks سفارشی برای API calls:

```javascript
// src/hooks/use-get-product.jsx
export const useGetProduct = (id) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const response = await api.get(`/products/${id}`);
            return response.data;
        },
        enabled: !!id,
    });
};

// src/hooks/use-post-add-to-cart.jsx
export const useAddToCart = () => {
    return useMutation({
        mutationFn: async (productData) => {
            const response = await api.post('/cart/add', productData);
            return response.data;
        },
        onSuccess: (data) => {
            // به‌روزرسانی سبد خرید
            queryClient.invalidateQueries(['cart']);
        },
    });
};
```

## 🧩 کامپوننت‌ها

### 1. کامپوننت‌های پایه (Atoms)

#### Button Component
```javascript
// src/components/atoms/button.jsx
const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'md',
    disabled = false,
    onClick,
    className = '',
    ...props 
}) => {
    const baseClasses = 'rounded-lg font-medium transition-all duration-200';
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    };
    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };
    
    return (
        <button
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};
```

#### Input Component
```javascript
// src/components/atoms/input.jsx
const Input = ({ 
    label, 
    error, 
    type = 'text',
    ...props 
}) => {
    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`
                    w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500
                    ${error ? 'border-red-500' : 'border-gray-300'}
                `}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};
```

### 2. کامپوننت‌های ترکیبی (Molecules)

#### Product Card
```javascript
// src/components/mulecules/product-card.jsx
const ProductCard = ({ product, onAddToCart }) => {
    const { addToCart } = useCart();
    
    const handleAddToCart = () => {
        addToCart(product);
        onAddToCart?.();
    };
    
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">
                        {product.price.toLocaleString()} تومان
                    </span>
                    <Button onClick={handleAddToCart}>
                        افزودن به سبد
                    </Button>
                </div>
            </div>
        </div>
    );
};
```

### 3. کامپوننت‌های پیچیده (Organisms)

#### Header
```javascript
// src/components/template/temp-header.jsx
const TempHeader = ({ setModalLogOut }) => {
    const { data: profile } = useGetProfile();
    const { cart } = useCart();
    const navigate = useNavigate();
    
    return (
        <header className="fixed top-0 w-full bg-white shadow-md z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* لوگو */}
                    <Link to="/" className="flex items-center">
                        <img src="/logo.png" alt="Logo" className="h-8" />
                    </Link>
                    
                    {/* جستجو */}
                    <SearchBar />
                    
                    {/* منو کاربر */}
                    <div className="flex items-center space-x-4">
                        <CartIcon count={cart.length} />
                        <UserMenu profile={profile} onLogout={setModalLogOut} />
                    </div>
                </div>
            </div>
        </header>
    );
};
```

## 🛣️ Routing

### React Router Configuration
```javascript
// src/App.js
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <CartProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product-detail/:id" element={<ProductDetail />} />
                <Route path="/product-list/:categoryId" element={<ProductList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<Search />} />
                <Route path="/about-us" element={<AboutUs />} />
            </Routes>
        </CartProvider>
    );
}
```

### Protected Routes
```javascript
const ProtectedRoute = ({ children }) => {
    const token = Cookies.get('access');
    
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

// استفاده
<Route 
    path="/profile" 
    element={
        <ProtectedRoute>
            <Profile />
        </ProtectedRoute>
    } 
/>
```

## 🎨 Styling

### Tailwind CSS Configuration
```javascript
// tailwind.config.js
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eff6ff',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                },
                secondary: {
                    50: '#f8fafc',
                    500: '#64748b',
                    600: '#475569',
                }
            },
            fontFamily: {
                'iran-sans': ['IRANSans', 'sans-serif'],
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
            }
        },
    },
    plugins: [],
};
```

### Custom CSS Classes
```css
/* src/index.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@font-face {
    font-family: 'IRANSans';
    src: url('./assets/fonts/IRANSans.ttf') format('truetype');
}

/* کلاس‌های سفارشی */
@layer components {
    .btn-primary {
        @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors;
    }
    
    .card-shadow {
        @apply shadow-lg hover:shadow-xl transition-shadow duration-300;
    }
    
    .text-gradient {
        @apply bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent;
    }
}
```

## ⚡ Performance

### 1. Code Splitting
```javascript
// Lazy Loading برای صفحات
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/home'));
const ProductDetail = lazy(() => import('./pages/productId'));
const Cart = lazy(() => import('./pages/cart'));

function App() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product-detail/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </Suspense>
    );
}
```

### 2. Image Optimization
```javascript
// استفاده از lazy loading برای تصاویر
const LazyImage = ({ src, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    
    return (
        <div className={`relative ${className}`}>
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <img
                src={src}
                alt={alt}
                className={`transition-opacity duration-300 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
            />
        </div>
    );
};
```

### 3. Memoization
```javascript
// استفاده از React.memo برای بهینه‌سازی رندر
const ProductCard = React.memo(({ product, onAddToCart }) => {
    // کامپوننت
});

// استفاده از useMemo برای محاسبات پیچیده
const ProductList = ({ products, filters }) => {
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // منطق فیلتر
        });
    }, [products, filters]);
    
    return (
        <div>
            {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
```

## 🔒 Security

### 1. Authentication
```javascript
// مدیریت توکن‌ها
const useAuth = () => {
    const login = async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            const { access, refresh } = response.data;
            
            Cookies.set('access', access, { secure: true, sameSite: 'strict' });
            Cookies.set('refresh', refresh, { secure: true, sameSite: 'strict' });
            
            return response.data;
        } catch (error) {
            throw new Error('خطا در ورود');
        }
    };
    
    const logout = () => {
        Cookies.remove('access');
        Cookies.remove('refresh');
        // ریدایرکت به صفحه ورود
    };
    
    return { login, logout };
};
```

### 2. Input Validation
```javascript
// اعتبارسنجی فرم‌ها
const validateForm = (values) => {
    const errors = {};
    
    if (!values.email) {
        errors.email = 'ایمیل الزامی است';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'ایمیل معتبر نیست';
    }
    
    if (!values.password) {
        errors.password = 'رمز عبور الزامی است';
    } else if (values.password.length < 6) {
        errors.password = 'رمز عبور باید حداقل 6 کاراکتر باشد';
    }
    
    return errors;
};
```

### 3. XSS Protection
```javascript
// پاکسازی ورودی‌ها
import DOMPurify from 'dompurify';

const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
};

// استفاده در کامپوننت‌ها
const ProductDescription = ({ description }) => {
    const sanitizedDescription = sanitizeInput(description);
    
    return (
        <div 
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            className="prose max-w-none"
        />
    );
};
```

## 🧪 Testing

### 1. Unit Tests
```javascript
// src/components/atoms/__tests__/button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../button';

describe('Button Component', () => {
    test('renders button with correct text', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });
    
    test('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        
        fireEvent.click(screen.getByText('Click me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    
    test('applies correct variant classes', () => {
        render(<Button variant="danger">Delete</Button>);
        const button = screen.getByText('Delete');
        expect(button).toHaveClass('bg-red-600');
    });
});
```

### 2. Integration Tests
```javascript
// src/components/__tests__/product-card.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../../context/CartContext';
import ProductCard from '../mulecules/product-card';

const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 100000,
    image: '/test-image.jpg',
};

describe('ProductCard Integration', () => {
    test('adds product to cart when add to cart button is clicked', () => {
        render(
            <CartProvider>
                <ProductCard product={mockProduct} />
            </CartProvider>
        );
        
        fireEvent.click(screen.getByText('افزودن به سبد'));
        
        // بررسی اینکه محصول به سبد خرید اضافه شده
        // این تست نیاز به mock کردن localStorage دارد
    });
});
```

### 3. E2E Tests
```javascript
// cypress/integration/shopping-flow.spec.js
describe('Shopping Flow', () => {
    it('should complete a purchase flow', () => {
        // بازدید از صفحه اصلی
        cy.visit('/');
        
        // کلیک روی محصول
        cy.get('[data-testid="product-card"]').first().click();
        
        // افزودن به سبد خرید
        cy.get('[data-testid="add-to-cart"]').click();
        
        // رفتن به سبد خرید
        cy.get('[data-testid="cart-icon"]').click();
        
        // بررسی وجود محصول در سبد
        cy.get('[data-testid="cart-item"]').should('have.length', 1);
        
        // تکمیل خرید
        cy.get('[data-testid="checkout-button"]').click();
        
        // بررسی ریدایرکت به صفحه پرداخت
        cy.url().should('include', '/checkout');
    });
});
```

## 🚀 Deployment

### 1. Build Process
```bash
# ساخت نسخه تولید
npm run build

# بررسی فایل‌های تولید شده
ls -la build/
```

### 2. Environment Variables
```bash
# .env.production
REACT_APP_API_URL=https://api.iranishop.com
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
```

### 3. Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 4. Nginx Configuration
```nginx
# nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # React Router support
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 📊 Monitoring & Analytics

### 1. Error Tracking
```javascript
// src/lib/error-boundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // ارسال خطا به سرویس مانیتورینگ
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">
                            خطایی رخ داده است
                        </h1>
                        <button 
                            onClick={() => window.location.reload()}
                            className="btn-primary"
                        >
                            بارگذاری مجدد
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
```

### 2. Performance Monitoring
```javascript
// src/lib/performance.js
export const measurePerformance = (name, fn) => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    console.log(`${name} took ${end - start} milliseconds`);
    
    // ارسال به سرویس آنالیتیکس
    if (window.gtag) {
        window.gtag('event', 'performance', {
            event_category: 'timing',
            event_label: name,
            value: Math.round(end - start),
        });
    }
    
    return result;
};
```

---

**نویسنده**: تیم توسعه فروشگاه آنلاین ایرانی  
**آخرین به‌روزرسانی**: 2024  
**نسخه**: 1.0.0
