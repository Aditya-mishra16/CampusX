import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import hero from '../../../images/sections/hero.svg';

const Hero = () => {
    const [userData, setUserData] = useState({})

    const callHomePage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            console.log(data);
            setUserData(data);

            if (!res.status === 200) {
                const error = new Error(res.Error);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        callHomePage();
    }, []);

    return (
        <div className='hero py-5 mb-5'>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='c col-lg-6 col-12'>
                        <div className='left-side mb-lg-0 mb-5 text-lg-start text-center'>
                            <h3 className='title text-capitalize'>welcome to CampusX <span>{userData.name}</span> !</h3>
                            <p className='sub-title text-muted text-capitalize'>where your future begins</p>
                            <p className='desc pb-3'>
                                The CampusX has focused on the 3D modeling of a dispersed campus, with the dual purpose of creating virtual tours of the University's cultural heritage sites and developing a new website for the campus area. Through the utilization of various modalities and techniques, a prototype was successfully generated as an outcome of this initiative. After a thorough assessment, the most suitable techniques were selected for their informative value.
                            </p>
                            <div className='buttons'>
                                <Link className='btn btn-danger text-capitalize me-3 shadow' to='/about'>read more<i className="ms-2 fas fa-chevron-right"></i></Link>
                                <Link className='btn btn-outline-danger text-capitalize shadow' to='/contact'>get in touch<i className="ms-2 fas fa-envelope"></i></Link>
                            </div>
                        </div>
                    </div>

                    <div className='c col-lg-6 col-12'>
                        <div className='right-side text-lg-end text-center'>
                            <img className='w-75 img-fluid' src={hero} alt='hero' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
