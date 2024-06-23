import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom
import Hero from './hero/Hero';
import Materials from './materials/Materials';
import Sub from './subscription/Sub';
import Stats from './stats/Stats';
import Tes from './testimonials/Tes';
import Faq from './faq/Faq';
import Rs from './recentblogs/Rs';

const Landing = () => {

    return (
        <>
            <Hero />
            <Materials />
            <Sub />
            <Stats />
            <Rs />
            <Tes />
            <Faq />
        </>
    );
};

export default Landing;
