import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Header, SecureHeader } from '../modules/common/Header';
import Footer from '../modules/common/Footer';
import Home from '../modules/Home';
import NotFound from '../modules/common/NotFound';
import Signin from '../modules/Signin';
import Product from '../modules/product/Product';
import { useAppSelector } from '../stores/hooks';
import { appState } from '../stores/appSlice';

interface ProtectedRouteProps {
  element: JSX.Element;
  isAuthenticated: boolean;
}

const ProtectedRoute = ({ element, isAuthenticated }: ProtectedRouteProps) => {
  return isAuthenticated ? element : <Navigate to="/signin" />;
};

const Layout = ({ children, isAuthenticated }: { children: React.ReactNode, isAuthenticated: boolean }) => {
  const location = useLocation();
  const noHeaderPaths = ['/signin'];
  const noFooterPaths = ['/signin'];

  const showHeader = !noHeaderPaths.includes(location.pathname);
  const showFooter = !noFooterPaths.includes(location.pathname);

  return (
    <>
      {showHeader && (isAuthenticated ? <SecureHeader /> : <Header />)}
      {children}
      {showFooter && <Footer />}
    </>
  );
};


const App = () => {

  const { isAuthenticated } = useAppSelector(appState);

  return (
    <BrowserRouter>
      <Layout isAuthenticated={isAuthenticated}>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProtectedRoute element={<Product />} isAuthenticated={isAuthenticated} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
