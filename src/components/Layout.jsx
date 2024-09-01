import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import VLibrasWidget from './VLibrasWidget';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
  const location = useLocation();
  
  // Define as rotas onde o Header não deve ser exibido
  const noHeaderRoutes = ['/login', '/register'];

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container">
        {!noHeaderRoutes.includes(location.pathname) && <Header />}
        <main>
        <ToastContainer />
        <VLibrasWidget />
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
