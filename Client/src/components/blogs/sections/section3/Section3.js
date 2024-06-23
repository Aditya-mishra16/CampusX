import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { section3 } from '../Data';
import '../Sections.css';

const Section3 = () => {
	const navigate = useNavigate();

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
    const displayBlogs = () => {
        return section3.map((item, index) => (
            <div className='c col-lg-4 col-md-6 col-12' key={index}>
            <div className='card mx-auto shadow-lg mb-5'>
                <img className="img-fluid mb-3" src={item.image.default} alt={`blog post ${index}`} />
                <div className='card-body p-4'>
                    <h5 className='card-img-top card-title mb-'>{item.title}</h5>
                    <p className='card-text mb-4'>{item.description}</p>
                    <div className='_footer d-flex flex-wrap justify-content-between align-items-center'>
                        <button className='btn btn-danger text-capitalize mb-3'>read more <i className='fas fa-chevron-right ms-2'></i></button>
                        <p className='date text-muted '>{item.publishedAt}</p>
                    </div>
                </div>
            </div>
        </div>
        
        ));
    };
    return (
        <div className='sections section3 py-5'>
            <div className='container'>
                <div className='_s row justify-content-start'>
                    {displayBlogs()}
                </div>
            </div>
        </div>
    );
};

export default Section3;
