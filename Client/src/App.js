import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Landing from './components/landing/Landing';
import About from './components/about/About';
import Blogs from './components/blogs/Blogs';
import Sb from './components/scrollbtn/Sb';
import Colleges from './components/courses/Courses';
import Contact from './components/contact/Contact';
import Notfound from './components/notfound/Notfound';
import Prediction from './components/prediction/prediction';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Logout from './components/logout/logout';
import { initialState,reducer } from './reducer/UseReducer';


export const UserContext = createContext();
const App = () => {
  const [state, dispatch]=useReducer(reducer, initialState)

  return (

    <UserContext.Provider value={{state,dispatch}}>
    <Router>
      <>
        <Sb />
        <div className="_navbar">
          <Navbar />
        </div>

        <div className="_body">
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/OpenSchool" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs/*" element={<Blogs />} />
            <Route path="/colleges/*" element={<Colleges />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>

        <div className="_footer">
          <Footer />
        </div>
      </>
    </Router>
    </UserContext.Provider>
  );
};

export default App;
