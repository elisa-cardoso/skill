import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import api from '../services/SkillApi';
import ImageBanner from '../assets/6851481.jpg';

function Register() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('As senhas não coincidem!');
            return;
        }
        try {
            // faz o registro
            await api.post('/auth/register', { login, password });
            toast.success('Registro realizado com sucesso!');
            
        } catch (err) {
            console.error(err);
            toast.error('Erro ao realizar o registro.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const loginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="container-fluid vh-100 bg-white">
            <div className="row h-100">
                <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center text-white">
                    <img src={ImageBanner} alt="Login Concept" />
                </div>

                <div style={{ backgroundColor: '#adebb3' }} className="col-md-6 d-flex align-items-center justify-content-center">
                    <div className="w-75">
                        <h1 className="mb-4 dm-serif-display-regular">Register</h1>
                        <form onSubmit={handleRegister}>
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
                            <div className="mb-3 position-relative">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                                <input 
                                    type={showConfirmPassword ? 'text' : 'password'} 
                                    id="confirmPassword" 
                                    className="form-control" 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    required 
                                />
                                <button 
                                    type="button" 
                                    onClick={toggleConfirmPasswordVisibility} 
                                    className="btn position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent"
                                    style={{ zIndex: 1, marginTop: 15 }}
                                >
                                    {showConfirmPassword ? <MdVisibility /> : <MdVisibilityOff />}
                                </button>
                            </div>
                            <button type="submit" className="custom-login-button w-100" style={{ paddingTop: 10, paddingBottom: 10, marginTop: 20 }}>Register</button>
                            <button 
                                type="button" 
                                onClick={loginRedirect} 
                                className="btn btn-link w-100 mt-2"
                                style={{ color: 'black' }}
                            >
                                Já tem uma conta? Entre!
                            </button>
                            {error && <p className="text-danger mt-2">{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
