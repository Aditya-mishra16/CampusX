import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Pagination from '../pagination/Pagination';
// import mymodel from '../../../3dmodel-main';
import Section1 from './sections/section1/Section1';
import Section2 from './sections/section2/Section2';
import './Courses.css';

const Colleges = () => {
    const [array] = useState([
        {
            path: '/colleges/',
            number: 1
        },
        {
            path: '/colleges/section2',
            number: 2
        }
    ]);

    return (
        <>
            <div className='container'>
                <div className='title py-3 text-center'>
                    <h4 className='sub-title text-capitalize'>Browse <span>3D Campus View</span></h4>
                </div>
            </div>
            <Pagination array={array} />
            <Routes>
                <Route exact path='/' element={<Section1 />} />
                <Route exact path='/section2' element={<Section2 />} />
            </Routes>
            <Pagination array={array} />
        </>
    );
}

export default Colleges;
