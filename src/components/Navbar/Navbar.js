import React, { useState } from 'react'
import './Navbar.css'
import Login from '../../pages/Home/Login'
import SignUp from '../../pages/Home/SignUp'
import Dropdown from '../Dropdown/Dropdown'

function Navbar({loggedIn , changeLoggedIn, getRole , role , getName , name}){

    const [loginForm , setLoginForm] = useState(false);
    const [signupForm , setSignupForm] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    function loginPopup () {
        setLoginForm(!loginForm);
    };

    function signupPopup () {
        setSignupForm(!signupForm);
    };  

    // function handleLoginBtn(data){
    //     setLoggedIn(data);
    // }

    function toggleVisibility(){
        setIsVisible(!isVisible);
    }
    
    console.log("Logged In???",loggedIn);

    return (
        <div className='Navbar'>
            <div className='libName'>
                <img src='Chapter&Verse.png' style={{height:"35px" , margin:"auto 10px"}} />
                <span style={{margin: "auto"}}>Chapter & Verse</span>
            </div>
            {
                loggedIn ?
                <div className='user-icon'>
                    <button className='user-btn' onClick={toggleVisibility}>
                        <img src='https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg' style={{height:"35px", marginRight:"15px"}} alt='User'/>
                    </button>
                    <Dropdown toggleVisibility={toggleVisibility} isVisible={isVisible} changeLoggedIn={changeLoggedIn} getRole={getRole} role={role} getName={getName} name={name}/>
                </div> :
                <div className='login-signup-btns'>
                    <div>
                        <button className='login-btn' onClick={loginPopup}>
                            Login
                        </button>
                        {
                            loginForm ? <Login changeLoggedIn={changeLoggedIn} loginPopup={loginPopup} getRole={getRole} getName={getName}/> : null
                        }
                    </div>
                    
                    <div>
                        <button className='signup-btn' onClick={signupPopup}>
                            Signup
                        </button>
                        {
                            signupForm ? <SignUp signupPopup={signupPopup} /> : null
                        }
                    </div>
                    
                </div>
            }

        </div>
    )
}

export default Navbar

            {/* <div className='login-signup-btns'>
                <Link to="/login">
                    <button className='login-btn' onClick={loginPopup}>
                        Login
                    </button>
                    {
                        loginForm ? <Login loginPopup={loginPopup} /> : null
                    }
                </Link>
                <Link to="/signup">
                    <button className='signup-btn' onClick={signupPopup}>
                        Signup
                    </button>
                    {
                        signupForm ? <SignUp signupPopup={signupPopup} /> : null
                    }
                </Link>
            </div>

            <div className='user-icon'>
                <img src='https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg'/>
            </div> */}