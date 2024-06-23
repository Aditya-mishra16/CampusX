import React, { useState, useEffect } from 'react';
import './Sb.css';

const Sb = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    const checkScroll = () => {
        setIsScrolled(window.scrollY >= 200);
    };

    const handleClick = () => {
        window.scroll(0, 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScroll);
        document.addEventListener('DOMContentLoaded', checkScroll);

        return () => {
            window.removeEventListener('scroll', checkScroll);
            document.removeEventListener('DOMContentLoaded', checkScroll);
        };
    }, []);

    return (
        <button className={`btn btn-danger rounded-circle btn-sm position-fixed ${isScrolled ? 'd-block' : 'd-none'}`} id='btn-up' onClick={handleClick}>
            <i className="fas fa-arrow-up"></i>
        </button>
    );
};

export default Sb;
