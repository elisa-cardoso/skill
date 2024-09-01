import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Logout() {
    const navigate = useNavigate();
    const [hasLoggedOut, setHasLoggedOut] = useState(false);

    useEffect(() => {
        if (hasLoggedOut) return;

        localStorage.removeItem('jwtToken'); // Remove o token de autenticação do localStorage
        toast.success('Você foi desconectado do sistema!');
        setHasLoggedOut(true);
        navigate('/login');

    }, [hasLoggedOut, navigate]);

    return <div>Você está sendo desconectado...</div>;
}

export default Logout;
