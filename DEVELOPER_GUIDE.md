# راهنمای توسعه‌دهنده - فروشگاه آنلاین ایرانی

## 📋 فهرست مطالب

1. [شروع کار](#شروع-کار)
2. [استانداردهای کدنویسی](#استانداردهای-کدنویسی)
3. [ساختار کامپوننت‌ها](#ساختار-کامپوننت‌ها)
4. [مدیریت State](#مدیریت-state)
5. [API Integration](#api-integration)
6. [Styling Guidelines](#styling-guidelines)
7. [Testing](#testing)
8. [Debugging](#debugging)

## 🚀 شروع کار

### پیش‌نیازها
- Node.js (نسخه 16 یا بالاتر)
- npm یا yarn
- Git

### نصب پروژه
```bash
git clone [repository-url]
cd web-iranishop
npm install
npm start
```

## 📝 استانداردهای کدنویسی

### نام‌گذاری
```javascript
// کامپوننت‌ها - PascalCase
const ProductCard = () => {};

// توابع و متغیرها - camelCase
const getUserProfile = () => {};
const productList = [];

// ثابت‌ها - UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
```

### ساختار کامپوننت
```javascript
// 1. Imports
import React, { useState, useEffect } from 'react';

// 2. Custom Hooks
import { useGetProduct } from '../hooks/use-get-product';

// 3. Components
import Button from '../atoms/button';

const ProductCard = ({ product, onAddToCart }) => {
    // 1. State
    const [isLoading, setIsLoading] = useState(false);
    
    // 2. Event Handlers
    const handleAddToCart = async () => {
        setIsLoading(true);
        try {
            await onAddToCart(product);
        } catch (error) {
            console.error('خطا:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    // 3. Render
    return (
        <div className="product-card">
            <h3>{product.name}</h3>
            <Button onClick={handleAddToCart} disabled={isLoading}>
                {isLoading ? 'در حال افزودن...' : 'افزودن به سبد'}
            </Button>
        </div>
    );
};
```

## 🧩 ساختار کامپوننت‌ها

### Atoms (اتم‌ها)
```javascript
// src/components/atoms/button.jsx
const Button = ({ 
    children, 
    variant = 'primary', 
    disabled = false,
    onClick,
    className = '' 
}) => {
    const baseClasses = 'rounded-lg font-medium transition-all duration-200';
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    };
    
    return (
        <button
            className={`${baseClasses} ${variants[variant]} ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
```

### Molecules (مولکول‌ها)
```javascript
// src/components/mulecules/search-bar.jsx
const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجو..."
                className="w-full px-4 py-2 border rounded-lg"
            />
        </form>
    );
};
```

## 🔄 مدیریت State

### Context API
```javascript
// src/context/CartContext.jsx
const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    
    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };
    
    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
```

### React Query
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
```

## 🔌 API Integration

### Axios Configuration
```javascript
// src/lib/api.js
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const token = Cookies.get('access');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // مدیریت خطای احراز هویت
            Cookies.remove('access');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
```

## 🎨 Styling Guidelines

### Tailwind CSS
```javascript
// کلاس‌های پرکاربرد
const commonClasses = {
    container: 'max-w-7xl mx-auto px-4',
    card: 'bg-white rounded-lg shadow-md p-6',
    button: 'px-4 py-2 rounded-lg font-medium',
    heading: 'text-2xl font-bold text-gray-900',
    body: 'text-base text-gray-700',
};
```

### Responsive Design
```javascript
const ProductGrid = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
```

## 🧪 Testing

### Unit Tests
```javascript
// src/components/atoms/__tests__/button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../button';

describe('Button Component', () => {
    test('renders with correct text', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });
    
    test('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        
        fireEvent.click(screen.getByText('Click me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
```

## 🐛 Debugging

### Console Logging
```javascript
// src/lib/logger.js
export const logger = {
    log: (...args) => {
        if (process.env.NODE_ENV === 'development') {
            console.log('[LOG]', ...args);
        }
    },
    error: (...args) => {
        console.error('[ERROR]', ...args);
    },
};
```

### Error Boundaries
```javascript
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    
    componentDidCatch(error, errorInfo) {
        console.error('Error caught:', error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">
                        خطایی رخ داده است
                    </h1>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        بارگذاری مجدد
                    </button>
                </div>
            );
        }
        
        return this.props.children;
    }
}
```

---

**نویسنده**: تیم توسعه فروشگاه آنلاین ایرانی  
**آخرین به‌روزرسانی**: 2024
