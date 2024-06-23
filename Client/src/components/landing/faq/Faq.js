import React from 'react';
import './Faq.css';
import { faq_items } from './Data';

const Faq = () => {
	
    const displayAccordionItems = () => {
        return faq_items.map(item => (
            <div className="accordion-item" key={Math.random()}>
                <h2 className="accordion-header" id={item.id_one}>
                    <button className="accordion-button text-capitalize" type="button" data-bs-toggle="collapse" data-bs-target={item.data_bs_target} aria-expanded="true" aria-controls={item.aria_controls}>{item.title}</button>
                </h2>
                <div id={item.id_two} className={`accordion-collapse collapse ${item.show ? 'show' : ''}`} aria-labelledby={item.aria_labelledby} data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong className='text-danger'>The CampusX is the</strong> 3D modeling of a dispersed campus, with the dual purpose of creating virtual tours of the University's cultural heritage sites and developing a new website for the campus area. Through the utilization of various modalities and techniques, a prototype was successfully generated as an outcome of this initiative.
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <section className='faq py-5' id='faq'>
            <div className='container'>
                <div className='title py-5 text-md-start text-center'>
                    <h4 className='sub-title text-capitalize'>frequently asked <span>questions</span></h4>
                </div>

                <div className="accordion shadow-lg" id="accordionExample">
                    {displayAccordionItems()}
                </div>
            </div>
        </section>
    );
};

export default Faq;
