import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index'; 

const CardHome = ({ cards }) => {
    return (
        <div style={{ marginBottom: '8rem', marginTop: '8rem' }} className="row">
            {cards.map((card, index) => (
                <div className="col-sm-6" key={index}>
                    <div className="card custom-card">
                        <div className="card-body custom-card-body">
                            <h5 className="card-title">
                                <span className="me-3">{card.icon}</span>{card.title}
                            </h5>
                            <p className="card-text">{card.text}</p>
                            <a href={card.link} className="btn custom-card-button">{card.buttonText}</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardHome;
