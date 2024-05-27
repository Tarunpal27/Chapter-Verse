import React, {useState} from 'react'
import axios from "axios";
import './SignUp.css'

function SignUp({signupPopup}){

    const [data, setData] = useState({
        uid: 0,
        name: "",
        email: "",
        contact: 0,
        role: "",
        // lid: 0,
        password: ""
    });


    function handleChange(e){
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };

    function handleSubmit(e){
        e.preventDefault();
        const userData = {
            uid: data.uid,
            name: data.name,
            email: data.email,
            contact: data.contact,
            role: data.role,
            // lid: data.lid,
            password: data.password
        };

        axios.post("http://localhost:8080/signup",userData,{
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }).then((response)=>{
            console.log(response.status, response.data.token);
            alert("User added successfully")
        })
        .catch(function (error) {
            console.log(error);
            alert("Please enter valid credentials")
        });

        signupPopup(false);
    };

    return (
        <div className="SignUp">
            
            <div className='Signup-popup'>

                <form className='Signup-form'>
                    <button className='close-btn' onClick={signupPopup}>
                        {/* <span>x</span> */}
                        <img src="https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png" style={{height:"20px", left:"0"}} alt="cancel-icon"/>
                    </button>
                    <h4 className="add-book-heading">Sign Up</h4>
                    {/* <input type="number" placeholder="User ID" name="uid" value={data.uid} onChange={handleChange} /><br/> */}
                    <input type="text" placeholder="Name" name="name" value={data.name} onChange={handleChange}/><br/>
                    <input type="email" placeholder="Email" name="email" value={data.email} onChange={handleChange}/><br/>
                    <input type="number" placeholder="Contact No." name="contact" value={data.contact} onChange={handleChange}/><br/>
                    <input type="text" placeholder="Role" name="role" value={data.role} onChange={handleChange}/><br/>
                    {/*<input type="number" placeholder="LibID" name="lid" value={data.lid} onChange={handleChange}/><br/>*/}
                    <input type="password" placeholder="Enter Password" name="password" value={data.password} onChange={handleChange}/><br/>
                    <button className='save-btn' onClick={handleSubmit}>Save</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;