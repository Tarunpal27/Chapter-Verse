import React from 'react'
import './Error.css'

function Error(){
    return (
        <div className='Error'>
            <div className='Error-img'>
                <img src='https://i.gifer.com/DKke.gif' style={{height:"120px"}} />
            </div>
            <div className='Error-text'>
                <h1 className='Error-heading'>Oops!</h1>
                <span>We guess you are not allowed here.<b> Go back</b></span>
            </div>
        </div>
    )
}

export default Error