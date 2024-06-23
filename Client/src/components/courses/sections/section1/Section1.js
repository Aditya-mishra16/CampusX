import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
// import UnityComponent from '../../../3dmodel-main/model';
import { section1 } from './Data';
import './Section1.css';

const Section1 = () => {
	const navigate = useNavigate();

    const callHomePage = async () => {
        try {
            const res = await fetch('/courses', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            console.log(data);

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
    const displaySection1 = () => {
        return section1.map((item, index) => (
            <div className='c col-lg-4 col-md-6 col-12 mb-3' key={index}>
                <div className='card'>
                    <img className='card-img-top position-relative' src={item.image.default} alt='course' />
                    <div className='card-body py-3 px-4'>
                        <div className='top mb-2 d-flex flex-wrap justify-content-between'>
                            <h6 className='teacher text-capitalize mb-2'>{item.title}</h6>
                            <div className='stars'>
                                <i className='fas fa-star mx-1'></i>
                                <i className='fas fa-star mx-1'></i>
                                <i className='fas fa-star mx-1'></i>
                                <i className='fas fa-star mx-1'></i>
                            </div>
                        </div>
                        <p className='desc mb-4 ps-3'>
                            {item.description}
                        </p>
                        <div className='bottom d-flex flex-wrap justify-content-between align-items-center'>
                            <button className='btn btn-danger text-capitalize btn-sm mb-3' onClick={
                                ()=>{
                                    window.location.href = 'http://127.0.0.1:5500/index.html';
                                }
                            } >View 3D Model</button>
                            <h6 className='type text-capitalize text-muted'>{item.publishedAt}</h6>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className='s1 py-5'>
            <div className='container'>
                <div className='row'>{displaySection1()}</div>
            </div>
        </div>
    );
};

export default Section1;
