import React, { useState } from 'react'
// import {Link} from 'react-router-dom'
import './Adminpage.css'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
// import Dropdown from '../../components/Dropdown/Dropdown'
import Error from '../Error/Error'


function Adminpage({loggedIn , changeLoggedIn , role , getRole }){

    const [ reqImg, setReqImg ] = useState(false);

    function handleReqImg(data){
        setReqImg(data);
    }

    // setLoggedIn(true);
    // console.log()
    return (
        <div className='Adminpage'>
            {
                role === "Admin" ?
                <div>
                    {/* <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} getRole={getRole}/> */}
                    {/* <Navbar loggedIn={loggedIn} changeLoggedIn={changeLoggedIn} getRole={getRole}/> */}
                    <div className='admin-body'> 
                        <Sidebar handleReqImg={handleReqImg} role={role}/>
                        <div className='admin-background'>
                            <img src='https://st2.depositphotos.com/1518767/12563/i/450/depositphotos_125637760-stock-photo-wooden-table-with-library-background.jpg' style={{width:"1500px",height:"846px", opacity:"0.9"}} alt='admin background'/>
                        </div>
                    </div>
                    {/* <Dropdown /> */}
                </div> : <Error />
            }
        </div>
    )
}

export default Adminpage
