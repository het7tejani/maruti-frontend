import React, { useState, useEffect, useContext } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';
import ShoppingCart from './components/ShoppingCart';
import Chatbot from './components/Chatbot';
import QuickViewModal from './components/QuickViewModal';
import { AuthContext } from './context/AuthContext';
import { useCart } from './context/CartContext';
import { useQuickView } from './context/QuickViewContext';
import { ToastContainer } from './components/Toast';

// Page Components
import HomePage from './pages/HomePage';
import RingsPage from './pages/RingsPage';
import EarringsPage from './pages/EarringsPage';
import BraceletPage from './pages/BraceletPage';
import MangalsutraPage from './pages/MangalsutraPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import WishlistPage from './pages/WishlistPage';
import ShopTheLookPage from './pages/ShopTheLookPage';
import LookDetailsPage from './pages/LookDetailsPage';
import AdminPage from './pages/AdminPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import NewsletterSignup from './components/NewsletterSignup';

const App = () => {
    const [location, setLocation] = useState(window.location.pathname + window.location.search);
    const { user } = useContext(AuthContext);
    const { isCartOpen } = useCart();
    const { quickViewProductId } = useQuickView();

    useEffect(() => {
        const handlePopState = () => {
            setLocation(window.location.pathname + window.location.search);
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    useEffect(() => {
        if (isCartOpen || quickViewProductId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isCartOpen, quickViewProductId]);

    const navigate = (path) => {
        window.history.pushState({}, '', path);
        setLocation(path);
        window.scrollTo(0, 0);
    };

    const handleViewProduct = (productId) => {
        navigate(`/products/${productId}`);
    };
    
    const handleViewLook = (lookId) => {
        navigate(`/looks/${lookId}`);
    };

    const renderPage = () => {
        const url = new URL(window.location.origin + location);
        const path = url.pathname;
        
        if (path.startsWith('/products/')) {
            const productId = path.split('/')[2];
            return <ProductDetailsPage productId={productId} navigate={navigate} />;
        }
        
        if (path.startsWith('/looks/')) {
            const lookId = path.split('/')[2];
            return <LookDetailsPage lookId={lookId} onViewProduct={handleViewProduct} />;
        }
        
        if (path.startsWith('/order/')) {
            const orderId = path.split('/')[2];
            return <OrderDetailsPage orderId={orderId} navigate={navigate} />;
        }

        switch (path) {
            case '/rings':
                return <RingsPage onViewProduct={handleViewProduct} />;

            case '/earrings':
                return <EarringsPage onViewProduct={handleViewProduct} />;

            case '/bracelet':
                return <BraceletPage onViewProduct={handleViewProduct} />;

            case '/mangalsutra':
                return <MangalsutraPage onViewProduct={handleViewProduct} />;

            case '/shop-the-look':
                return <ShopTheLookPage onViewLook={handleViewLook} />;

            case '/checkout':
                return user 
                    ? <CheckoutPage navigate={navigate} /> 
                    : <LoginPage navigate={navigate} redirectTo="/checkout" />;

            case '/login':
                const redirectTo = url.searchParams.get('redirectTo');
                return <LoginPage navigate={navigate} redirectTo={redirectTo} />;

            case '/register':
                return <RegisterPage navigate={navigate} />;

            case '/profile':
                return user 
                    ? <ProfilePage navigate={navigate} /> 
                    : <LoginPage navigate={navigate} redirectTo="/profile" />;

            case '/search':
                return <SearchPage onViewProduct={handleViewProduct} navigate={navigate} location={location} />;

            case '/wishlist':
                return <WishlistPage onViewProduct={handleViewProduct} navigate={navigate} />;

            case '/admin':
                return user && user.role === 'admin' 
                    ? <AdminPage navigate={navigate} /> 
                    : <HomePage onViewProduct={handleViewProduct} navigate={navigate} />;

            case '/':
            default:
                return <HomePage onViewProduct={handleViewProduct} navigate={navigate} />;
        }
    };

    const getPageNameFromPath = (path) => {
        const page = path.split('?')[0];

        if (page.startsWith('/products/')) return 'Product';
        if (page.startsWith('/looks/')) return 'Shop the Look';
        if (page.startsWith('/order/')) return 'Order Details';
        if (page.startsWith('/admin')) return 'Admin';
        if (page === '/') return 'Home';

        const pageName = page.startsWith('/') ? page.substring(1) : page;

        const validPages = [
            'rings',
            'earrings',
            'bracelet',
            'mangalsutra',
            'shop-the-look',
            'checkout',
            'login',
            'register',
            'profile',
            'search',
            'wishlist'
        ];

        if (validPages.includes(pageName)) {
            return pageName
                .replace(/-/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());
        }

        return 'Home';
    };

    const currentPage = getPageNameFromPath(location);

    return (
        <div className={`app ${isCartOpen || quickViewProductId ? 'modal-is-open' : ''} ${location.startsWith('/looks/') ? 'look-details-page' : ''}`}>

            <AnnouncementBar />

            <Header 
                currentPage={currentPage} 
                navigate={navigate} 
            />

            <main>
                {renderPage()}
            </main>

            <NewsletterSignup navigate={navigate} />

            <Footer navigate={navigate} />

            <ShoppingCart navigate={navigate} />

            <Chatbot navigate={navigate} />

            <QuickViewModal navigate={navigate} />

            <ToastContainer />

        </div>
    );
};

export default App;