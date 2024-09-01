import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

const Banner = ({ title, subtitle, text, buttonText, buttonLink }) => {
    return (
        <div style={{ marginTop: '4rem', padding: '6rem' }} className="jumbotron jumbotron-fluid banner-container">
            <div className="container banner-content">
                <h1 className="display-4 dm-serif-display-regular">{title}</h1>
                <p className="lead">{subtitle}</p>
                <hr className="my-4" />
                <p>{text}</p>
                <p className="lead">
                    <a className="btn btn-custom btn-lg" href={buttonLink} role="button">
                        {buttonText}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Banner;
