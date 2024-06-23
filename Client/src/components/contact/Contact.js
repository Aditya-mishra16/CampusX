import React, { useEffect, useState } from 'react';
import contact from '../../images/sections/contact.svg';
import './Contact.css';

const Contact = () => {
  const [userData, setUserData] = useState({ name: "", lname: "", email: "", message: "" });

  const userContact = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      console.log(data);
      setUserData({ ...userData, name: data.name, lname: data.lname, email: data.email });

      if (!res.status === 200) {
        const error = new Error(res.Error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const contactForm = async (e) => {
    e.preventDefault();

    const res = await fetch('/contact', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    const data = await res.json();

    if (!data) {
      console.log("message not send");
    } else {
      alert("Message Send");
      setUserData({ ...userData, message: "" });
    }
  }

  return (
    <div className='getintouch mb-5'>
      <div className='container'>
        <div className='title pt-1 pb-4 text-center'>
          <h4 className='sub-title text-capitalize'>
            contact <span>us</span>
          </h4>
        </div>
        <div className='row align-items-center'>
          <div className='c col-lg-6 col-12 mb-lg-0 mb-5'>
            <div className='left-side text-lg-start text-center'>
              <img className='img-fluid w-75' src={contact} alt='contact' />
            </div>
          </div>
          <div className='c col-lg-6 col-12'>
            <div className='right-side'>
              <form action="https://formspree.io/f/xqkrqvow" onSubmit={contactForm}>
                <div className='row'>
                  <div className='form-group c col-md-6 col-12 mb-3'>
                    <label htmlFor='first_name' className='mb-2 text-capitalize'>
                      first name
                    </label>
                    <input type='text' className='form-control py-2 px-3' id='first_name' name='name' value={userData.name ? userData.name.split(' ')[0] : ''} onChange={handleInputs} placeholder='First Name' required />
                  </div>
                  <div className='form-group c col-md-6 col-12 mb-3'>
                    <label htmlFor='last_name' className='mb-2 text-capitalize'>
                      last name
                    </label>
                    <input type='text' className='form-control py-2 px-3' id='last_name' name='lname' value={userData.lname} onChange={handleInputs} placeholder='Last Name' required />
                  </div>
                  <div className='form-group c col-12 mb-3'>
                    <label htmlFor='e-mail' className='mb-2 text-capitalize'>
                      Email
                    </label>
                    <input type='email' className='form-control py-2 px-3' id='e-mail' name='email' value={userData.email} onChange={handleInputs} placeholder='Email Address' required />
                  </div>
                  <div className='form-group c col-12 mb-4'>
                    <label htmlFor='textarea' className='mb-2 text-capitalize'>
                      write your message down here
                    </label>
                    <textarea className='form-control py-2 px-3' id='textarea' name='message' value={userData.message} onChange={handleInputs} rows='4'></textarea>
                  </div>
                  <button type='submit' className='btn btn-outline-danger text-capitalize w-25 mx-auto'>
                    send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
