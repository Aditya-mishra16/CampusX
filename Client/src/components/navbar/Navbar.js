import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { navbar_items } from './Data';
import { UserContext } from '../../App';

const Navbar = () => {
    const { state } = useContext(UserContext);
    const [isScrolled, setIsScrolled] = useState(false);

    const displayNavbarItems = () => {
        return navbar_items.map(item => {
            // Hide login and register when user is logged in (state is true)
            if (state) {
                if (item.name === 'login' || item.name === 'Signup') {
                    return null;
                }
            } else { // Hide logout when user is not logged in (state is false)
                if (item.name === 'logout') {
                    return null;
                }
            }

            return (
                <li className="nav-item me-lg-3 my-lg-0 my-2" key={Math.random()}>
                    <NavLink className="nav-link text-capitalize position-relative hover" to={`/${item.name === '' ? '' : item.name}`}>
                        <i className={`${item.icon} me-2`}></i>{item.name === '' ? 'home' : item.name}
                    </NavLink>
                </li>
            );
        });
    };

    const addShadow = () => {
        setIsScrolled(window.scrollY >= 80);
    };

    useEffect(() => {
        window.addEventListener('scroll', addShadow);
        document.addEventListener('DOMContentLoaded', addShadow);

        return () => {
            window.removeEventListener('scroll', addShadow);
            document.removeEventListener('DOMContentLoaded', addShadow);
        };
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg navbar-light text-dark fixed-top ${isScrolled ? "shadow-lg" : "shadow"}`}>
            <div className='container py-2'>
                <Link className="navbar-brand" to="/"><i className="fas fa-school me-2"></i><span>CampusX</span></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        {displayNavbarItems()}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

