import React from 'react';
import './Leaders.css';
import { leaders } from './Data';

const Leaders = () => {

    const displayLeaders = () => {
        return leaders.map((item, index) => (
            <div className='leader p-4 shadow mb-3 mx-2' key={index}>
                <h6 className='name text-capitalize mb-4'>{item.name}</h6>
                <p className='desc text-capitalize mb-4 px-3'>{item.desc}</p>
                <div className='leader-footer d-flex align-items-center'>
                    <img className='rounded-circle shadow' alt='leader' src={item.avatar.default} />
                    <div className='profile-names ms-3'>
                        <h6 className='skill my-1'>{item.skills}</h6>
                        <h6 className='nickname text-capitalize m-0 text-muted'>@{item.nickname}</h6>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className='leaders py-5 mb-5'>
            <div className='container'>
                <div className='title py-5 text-md-start text-center'>
                    <h4 className='sub-title text-capitalize'>CampusX <span>leaders</span></h4>
                </div>
                <div className='_b d-flex justify-content-center flex-wrap'>
                    {displayLeaders()}
                </div>
            </div>
        </div>
    );
};

export default Leaders;
