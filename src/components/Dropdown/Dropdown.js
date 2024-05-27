import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Dropdown.css'

function Dropdown({toggleVisibility , isVisible , changeLoggedIn , getRole , role , getName , name}){

    const navigate = useNavigate();

    function handleLogout(){
        // setLoggedIn(false);
        changeLoggedIn(false);
        getRole(null);
        getName("");
        toggleVisibility();
        navigate('/')

    }
    return (
        <div className='Dropdown'>
            {
                isVisible ? (
                    <ul className='drop-list'>
                        <span><b>Name:</b> {name}</span><br/>
                        <span><b>Role:</b> {role}</span><br/>
                        <button className='logout-btn' style={{width:"100px"}} onClick={handleLogout}>
                            Log Out
                        </button>
                    </ul>
                ) :
                null
            }
        </div>
    )
}

export default Dropdown