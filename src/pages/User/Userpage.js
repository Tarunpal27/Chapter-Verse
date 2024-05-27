import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar';
import './Userpage.css'
import Error from '../Error/Error';

function Userpage({ loggedIn , changeLoggedIn , role , getRole}){

    // setLoggedIn(true);
    return (
        <div className='Userpage'>
            {
                role === "User" ?
                <div>
                    {/* <Navbar loggedIn={loggedIn}/> */}
                    {/* <Navbar loggedIn={loggedIn} changeLoggedIn={changeLoggedIn} getRole={getRole}/> */}

                    <div className='user-body'> 
                        <Sidebar role={role}/>
                        <div className='admin-background'>
                            <img src='https://c4.wallpaperflare.com/wallpaper/148/392/948/1920x1080-px-books-interior-design-interiors-knowledge-library-shelves-anime-pokemon-hd-art-wallpaper-preview.jpg' style={{width:"1500px",height:"846px", opacity:"0.9"}}/>
                        </div>
                    </div>
                    {/* <Dropdown /> */}
                </div> : 
                <Error />
            }
        </div>
    )
}

export default Userpage