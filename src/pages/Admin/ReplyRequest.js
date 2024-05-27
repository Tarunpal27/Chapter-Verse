import React, { useState } from 'react'
import axios from 'axios';
import './ReplyRequest.css'

function ReplyRequest({replyPopup}){

    const [reply , setReply] = useState({
        req_id: 0,
        approver_id: 0,
        request_status: "",
    })

    function handleChange(e){
        const value = e.target.value;
        setReply({
            ...reply,
            [e.target.name]: value
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        const replyData={
            req_id: reply.req_id,
            approver_id: reply.approver_id,
            request_status: reply.request_status
        }

        axios.post("http://localhost:8080/admin/reply-request", replyData , {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            console.log(response.status, response.data.token);
            alert("Reply sent successfully")
        })
    }
    return (
        <div className='ReplyRequest'>
            <div className='ReplyRequest-popup'>
                <form className='ReplyRequest-form' onSubmit={handleSubmit} >
                    <button className='close-btn' onClick={() => replyPopup(false)}>
                        <img src="https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png" style={{height:"20px"}} alt='cancel-icon'/>  
                    </button>
                    <h4>REPLY</h4>
                    <input type="number" placeholder="Request ID" name="req_id" value={reply.req_id} onChange={handleChange}/><br/>
                    <input type="number" placeholder="Approver ID" name="approver_id" value={reply.approver_id} onChange={handleChange}/><br/>
                    <input type="text" placeholder="Request Status" name="request_status" value={reply.request_status} onChange={handleChange}/><br/>
                    <button className='save-btn'>Send</button>
                    {/* <input class="save-btn" type="submit" value="Save" /> */}
                </form>
            </div>
        </div>
    )
}

export default ReplyRequest