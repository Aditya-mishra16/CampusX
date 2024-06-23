import React,{useContext, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import login from '../../images/logins/loginimage.jpg';
import { UserContext } from '../../App';


const Login = () => {

  const {state,dispatch} = useContext(UserContext);

    const navigate= useNavigate();
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    const loginUser= async (e)=>{
        e.preventDefault();

        const res = await fetch("/signin",{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        });

        const data= res.json();

        if(res.status===400 || !data){
            window.alert("Invalid Credentials");
        }else{
            dispatch({type:'USER',payload:true})
            window.alert("Login Successfull");
            navigate('/');
        }
       
    }

  return (
    <>
      <div className="flex min-h-screen justify-center items-center">
            <div className="sm:w-full sm:max-w-md">
            <div className='title pt-1 pb-4 text-center'>
            <h4 className='sub-title text-capitalize'>
              Login <span>Form</span>
            </h4>
          </div>
          <div className='row align-items-center'>
            <div className='c col-lg-6 col-12 mb-lg-0 mb-5'>
              <div className='left-side text-lg-start text-center'>
                <img className='img-fluid w-75' src={login} alt='Login' />
              </div>
            </div>
            <div className='c col-lg-6 col-12'>
              <div className='right-side'>
                <form method='POST' >
                    <div className='form-group c col-md-6 col-12 mb-3'>
                    <i className="fas fa-envelope"></i>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="off"
                            required
                            className="form-control py-2 px-3"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className='form-group c col-md-6 col-12 mb-3'>
                    <i className="fas fa-lock"></i>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="off"
                            required
                            className="form-control py-2 px-3"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <div className='form-group c col-md-6 col-12 mb-3'>
                    <input type="submit" name='submit' value="login" className='btn btn-outline-danger text-capitalize w-25 mx-auto' onClick={loginUser} />
                    </div>
                    <div className="signup-image">
                <p className="mt-4 text-sm text-gray-600 text-center">
                    Don't have an account? <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">SignUp</Link>
                </p>
                </div>
                </form>
                </div>
                </div>  
            </div>
            </div>
        </div>
    </>
  )
}

export default Login
