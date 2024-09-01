import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import '../index';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p className="mb-0">&copy; {new Date().getFullYear()} Teste técnico para a empresa Neki desenvolvido por Elisa Pessamilio.</p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <a href="https://www.facebook.com" className="text-white me-3" aria-label="Facebook">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="https://twitter.com" className="text-white me-3" aria-label="Twitter">
                            <FaTwitter size={20} />
                        </a>
                        <a href="https://www.instagram.com" className="text-white me-3" aria-label="Instagram">
                            <FaInstagram size={20} />
                        </a>
                        <a href="https://www.linkedin.com" className="text-white" aria-label="LinkedIn">
                            <FaLinkedinIn size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
