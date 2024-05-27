import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css'

function Login({changeLoggedIn, loginPopup , getRole , getName }){

    const navigate = useNavigate();
    const [gotData, setGotData] = useState(false)

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })


    const [userData , setUserData] = useState({
        uid: 0,
        name: "",
        email: "",
        contact: 0,
        role: "",
        lid: 0,
        password: ""
    })

    function handleChange(e){
        const value = e.target.value;
        setLoginData({
            ...loginData,
            [e.target.name]: value
        });
    };

    async function handleClick(e){
        e.preventDefault()

        await axios.get(`http://localhost:8080/login/${loginData.email}`).then((response)=>{
            console.log(response.data);
            const result = response.data;
            setUserData(result);         
        });

        setGotData(true);

    };

    function verifyPassword(password,role){
        if(loginData.password!==password){
            alert("Wrong password");
        }

        else{
            getRole(userData.data.role);
            getName(userData.data.name);
            loginRouting(role);
            changeLoggedIn(true);
            loginPopup();
        }
    }

    function loginRouting(role){

        console.log("role" , role)
        // handleRole(role);
        if(role==="User"){
            navigate('/user');
            
        }
        else if(role==="Admin"){
            navigate('/admin')
        }

    }

    return (
        <div className="Login">

            <div className="Login-popup">
                
                <form className="Login-form">
                    <button className="close-btn" onClick={loginPopup}>
                        <img src="https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png" style={{height:"20px", right:"0px"}} alt="cancel-icon"/>
                    </button>
                    <h2 className="add-book-heading">Login</h2>
                    <input type="email" placeholder="Email" name="email" value={loginData.email} onChange={handleChange} /><br/>
                    {
                        gotData ? 
                        <div>
                            <input type="password" placeholder="Password" name="password" value={loginData.password} onChange={handleChange}  /> 
                            <button className="save-btn" onClick={() => verifyPassword(userData.data.password,userData.data.role)}>Next</button>
                        </div> :
                        <button className="save-btn" onClick={handleClick}>Next</button>
                    }
                </form>

            </div>
    
        </div>
    )
}

export default Login;