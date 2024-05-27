import React, { useState } from 'react'
import axios from 'axios';
import './IssueRequest.css'

function IssueRequest({requestPopup}){

    const [request , setRequest] = useState({
        isbn: "",
        reader_id: 0,
        request_type: "",
    })

    function handleChange(e){
        const value = e.target.value;
        setRequest({
            ...request,
            [e.target.name]: value
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        const reqData = {
            isbn: request.isbn,
            reader_id: request.reader_id,
            request_type: request.request_type
        }

        axios.post("http://localhost:8080/user/send-request", reqData , {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            console.log(response.status, response.data.token);
            alert("Request sent successfully")
        })

    }

    return (
        <div className='IssueRequest'>
            <div className='IssueRequest-popup'>
                <form className='IssueRequest-form' onSubmit={handleSubmit} >
                    <button className='close-btn' onClick={() => requestPopup(false)}>
                        <img src="https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png" style={{height:"20px"}} alt='cancel-icon'/>  
                    </button>
                    <h4 class="add-book-heading">Send a Request</h4>
                    <input type="text" placeholder="ISBN" name="isbn" value={request.isbn} onChange={handleChange}/><br/>
                    <input type="number" placeholder="ReaderID" name="reader_id" value={request.reader_id} onChange={handleChange}/><br/>
                    <input type="text" placeholder="Request Type" name="request_type" value={request.request_type} onChange={handleChange}/><br/>
                    <button className='save-btn'>Send</button>
                    {/* <input class="save-btn" type="submit" value="Save" /> */}
                </form>
            </div>
        </div>
    )
}

export default IssueRequest