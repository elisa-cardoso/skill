import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // Importa o toast
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import api from '../services/SkillApi';
import ImageBanner from '../assets/6851481.jpg';
import Header from '../components/Header';

function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const savedLogin = localStorage.getItem('savedLogin');
        const savedPassword = localStorage.getItem('savedPassword');
        if (savedLogin && savedPassword) {
            setLogin(savedLogin);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { login, password });
            const { token } = response.data;
            localStorage.setItem('jwtToken', token);

            if (rememberMe) {
                localStorage.setItem('savedLogin', login);
                localStorage.setItem('savedPassword', password);
            } else {
                localStorage.removeItem('savedLogin');
                localStorage.removeItem('savedPassword');
            }

            toast.success('Login feito com sucesso!');
            navigate('/home');

        } catch (err) {
            console.error(err);
            toast.error('Credenciais Invalidas. Tente novamente.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const registerRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="container-fluid vh-100 bg-white">
        
            <div className="row h-100">
                <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center text-white">
                    <img src={ImageBanner} alt="Login Concept" />
                </div>

                <div style={{ backgroundColor: '#adebb3' }} className="col-md-6 d-flex align-items-center justify-content-center">
                    <div className="w-75">
                        <h1 className="mb-4 dm-serif-display-regular">Login</h1>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="login" className="form-label">Login:</label>
                                <input
                                    type="text"
                                    id="login"
                                    className="form-control"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3 position-relative">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="btn position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent"
                                    style={{ zIndex: 1, marginTop: 15 }}
                                >
                                    {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                                </button>
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    className="form-check-input"
                                    checked={rememberMe}
                                    onChange={handleRememberMeChange}
                                />
                                <label htmlFor="rememberMe" className="form-check-label">Lembre-me</label>
                            </div>
                            <button style={{ paddingTop: 10, paddingBottom: 10 }} type="submit" className="custom-login-button w-100">Login</button>
                            <button
                                style={{ color: 'black' }}
                                type="button"
                                onClick={registerRedirect}
                                className="btn btn-link w-100 mt-2"
                            >
                                Não possui uma conta? Cadastre-se agora!
                            </button>
                            {error && <p className="text-danger mt-2">{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
