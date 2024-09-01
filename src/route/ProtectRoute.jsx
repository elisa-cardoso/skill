// src/route/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ element: Element, ...rest }) => {
    const token = localStorage.getItem('jwtToken');
    
    if (!token) {
        // Se não estiver autenticado, redirecione para a página de login
        return <Navigate to="/login" replace />;
    }

    // Renderize o componente protegido se estiver autenticado
    return <Element {...rest} />;
};

export default ProtectRoute;
