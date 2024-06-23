import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import register from '../../images/registers/regist.jpg';

const Signup = () => {
    const navigate= useNavigate();
    const [user,setUser]=useState({
        name: "", email: "", phone: "", password: "", cpassword: ""
    });

    let name, value;
    const handleInputs=(e)=>{
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
    }

    const PostData = async (e)=>{
        e.preventDefault();
    
        const { name, email, phone, password, cpassword } = user;
    
        try {
            const res = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    password,
                    cpassword
                })
            });
            
            const data = await res.json();
    
            if (!res.ok) {
                throw new Error(data.message || 'Failed to register');
            }
    
            window.alert("Registration Successful");
            console.log("Registration Successful");
            navigate('/login');
        } catch (error) {
            console.error('Error registering user:', error.message);
            window.alert("Failed to register. Please try again.");
        }
    }

  return (
    <>
    <div className="flex min-h-screen justify-center items-center">
            <div className="sm:w-full sm:max-w-md">
            <div className='title pt-1 pb-4 text-center'>
            <h4 className='sub-title text-capitalize'>
              Registration <span>Form</span>
            </h4>
          </div>
          <div className='row align-items-center'>
            <div className='c col-lg-6 col-12 mb-lg-0 mb-5'>
              <div className='left-side text-lg-start text-center'>
                <img className='img-fluid w-75' src={register} alt='Register' />
              </div>
            </div>
            <div className='c col-lg-6 col-12'>
              <div className='right-side'>
                <form method="POST" >
                    <div className='form-group c col-md-6 col-12 mb-3'>
                    <span className="text-gray-400 ml-2">
                        <i className="fas fa-user"></i>
                        </span>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder='Enter Username'
                            required
                            className="form-control py-1 px-3 "
                            value={user.name}
                            onChange={handleInputs}
                        />
                    </div>
                    <div className='form-group c col-md-6 col-12 mb-3'>
                    <span className="text-gray-400 ml-2">
                    <i className="fas fa-envelope"></i>
                        </span>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder='Enter Valid email address'
                            autoComplete="off"
                            required
                            className="form-control py-1 px-3"
                            value={user.email}
                            onChange={handleInputs}
                        />
                    </div>
                    <div className='form-group c col-md-6 col-12 mb-3'>
                    <span className="text-gray-400 ml-2">
                    <i className="fas fa-phone"></i>
                        </span>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone </label>
                        <input
                            id="phone"
                            name="phone"
                            placeholder='Enter 10 Digit Number'
                            type="tel"
                            required
                            className="form-control py-1 px-3"
                            value={user.phone}
                            onChange={handleInputs}
                        />
                    </div>
                    <div className='form-group c col-md-6 col-12 mb-3'>
                    <span className="text-gray-400 ml-2">
                    <i className="fas fa-lock"></i>
                        </span>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="off"
                            placeholder='Minimum 8 characters'
                            required
                            className="form-control py-1 px-3"
                            value={user.password}
                            onChange={handleInputs}
                        />
                    </div>
                    <div className='form-group c col-md-6 col-12 mb-3'>
                    <span className="text-gray-400 ml-2">
                    <i className="fas fa-lock"></i>
                        </span>
                        <label htmlFor="confirm Password" className="block text-sm font-medium text-gray-700">Confirm Password </label>
                        <input
                            id="cpassword"
                            name="cpassword"
                            type="password"
                            placeholder='Minimum 8 characters'
                            autoComplete="off"
                            required
                            className="form-control py-1 px-3"
                            value={user.confirmPassword}
                            onChange={handleInputs}
                        />
                    </div>
                    <div className='form-group c col-md-6 col-12 mb-3'>
                    <input type="submit" name='submit' value="Register" className='btn btn-outline-danger text-capitalize w-25 mx-auto' onClick={PostData} />
                    </div>
                    <div className="signup-image">
                <p className="mt-4 text-sm text-gray-600 text-center">
                    Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Login</Link>
                </p>
                </div>
                </form>
                </div>
                </div>
                
            </div>
            </div>
        </div>
        </>
);
  };
export default Signup
