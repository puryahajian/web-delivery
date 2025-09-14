import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import ProductId from './pages/productId';
import { useEffect, useState } from 'react';
import ProductList from './pages/product-list';
import Cart from './pages/cart';
import Profile from './pages/profile';
import Login from './pages/login';
import { CartProvider } from './context/CartContext';
import AboutUs from './pages/about-us';
import Search from './pages/search';
import ScrollToTop from './lib/scroll-to-top';
import ModalGeneral from './components/mulecules/modal-general';
import Cookies from "js-cookie";
import ActiveOrderMobile from './pages/active-order-mobile';
import TempMenuBottomMobile from './components/template/temp-menu-bottom-mobile';


function App() {
  const location = useLocation();
  const [modalLogOut, setModalLogOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 480px)');

    const applyBackground = () => {
      if (mq.matches) {
        document.body.style.backgroundColor = 'white';
      } else {
        if (location.pathname === '/' || location.pathname === '/login') {
          document.body.style.backgroundColor = 'white';
        } else {
          document.body.style.backgroundColor = '#E6E6E6';
        }
      }
    };

    applyBackground();
    mq.addEventListener('change', applyBackground);

    return () => {
      mq.removeEventListener('change', applyBackground);
      document.body.style.backgroundColor = '';
    };
  }, [location.pathname]);

  const handleSuccess = () => {
    Cookies.remove('access');
    Cookies.remove('refresh');
    navigate('/login')
    setModalLogOut(false);
  }
  return (
    <div className="App">
      <CartProvider>
        <Routes>
          <Route path='/' element={<Home setModalLogOut={setModalLogOut} />} />
          <Route path='/product-detail/:id' element={<ProductId />} />
          <Route path='/product-list/:id' element={<ProductList />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/active-order' element={<ActiveOrderMobile />} />
          <Route path='/search' element={<Search />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <TempMenuBottomMobile />

        {/* modal logout */}
        <ModalGeneral
          close={() => setModalLogOut(false)}
          isOpen={modalLogOut}
          handleClose={() => setModalLogOut(false)}
          onSuccess={handleSuccess}
          Title="هل تريد الخروج؟"
          textAccept="خروج"
          classBtns={`grid grid-cols-2 gap-2`}
        >
        </ModalGeneral>

        <ScrollToTop />
      </CartProvider>

    </div>
  );
}

export default App;
