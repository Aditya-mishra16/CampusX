import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import collegeImage from '../prediction/college.svg';

const Prediction = () => {
	const navigate = useNavigate();
    const [userData, setUserData] = useState({})

    const callHomePage = async () => {
        try {
            const res = await fetch('/blogs', {
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
            navigate('/login');
        }
    };

    useEffect(() => {
        callHomePage();
    }, []);
    return (
        <div className='hero py-2 mb-5'>
            <div className='container'>
                <div className='title pt-1 pb-5 text-center'>
                    <h4 className='sub-title text-capitalize'>Prediction <span>System</span></h4>
                </div>
                <div className='row align-items-center'>
                    <div className='c col-lg-6 col-12'>
                        <div className='left-side mb-lg-0 mb-5 text-lg-start text-center'>
                            <h5 className='title text-capitalize mb-3'>Weolcome to the College Prediction System <span>{userData.name}</span></h5>
                            <p className='desc mb-lg-4 mb-5'>The CampusX Provides the platform to predict the list of colleges based on the user grades. It can predict Universities as well as foreign-based university </p>
                        </div>
                    </div>
                    <div className='c col-lg-6 col-12'>
                        <div className='right-side text-lg-end text-center'>
                            <img className='w-75 img-fluid mb-5' src={collegeImage} alt='prediction' />
                            <div className='mx-auto dc text-center'>
                                <Link className='cources text-capitalize' to='http://localhost:5000'><b>Predict Here</b> <i className='fas fa-arrow-right ms-2'></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Prediction;
