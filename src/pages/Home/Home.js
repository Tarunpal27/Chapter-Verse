import React from 'react'
// import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar.js';
import Showpiece from '../../components/Showpiece/Showpiece.js';

function Home({loggedIn , changeLoggedIn , getRole }){

  // console.log("Role is: ", role)
  return (
    <div className='Home'>
      {/* <Navbar loggedIn={loggedIn} changeLoggedIn={changeLoggedIn} getRole={getRole}/> */}

      <div className='home-text'>
        <h1>
          Get your favourite Books
        </h1>
      </div>

      <Showpiece />
    </div>
  )
}

export default Home;
