import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './DeleteBook.css'

function DeleteBook({deleteBookPopup}){

    // const navigate = useNavigate();

    const [data, setData] = useState({
        isbn: ""
    })

    function handleChange(e){
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };

    function handleSubmit(e){
        e.preventDefault()
        const bookData = {
            isbn: data.isbn
        }
        axios.post("http://localhost:8080/admin/deleteOneBook",bookData,{
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }).then((response)=>{
            console.log(response.status, response.data.token);
            alert("Book deleted successfully")
        })
        .catch(function (error) {
            console.log(error);
            alert("Please mention the book ISBN")
        });

        // navigate('/admin')
    }

    return (
        <div className='DeleteBook'>
            <div className='DeleteBook-popup'>
                <form className='DeleteBook-form' onSubmit={handleSubmit}>
                    <button className='close-btn' onClick={() => deleteBookPopup(false)}>
                        <img src="https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png" style={{height:"20px", left:"0"}} alt='cross-icon'/>
                    </button>
                    <h4 className="add-book-heading">DELETE BOOK</h4>
                    <input type="text" placeholder="isbn" name="isbn" value={data.isbn} onChange={handleChange} /><br/>
                    <input className="save-btn" type="submit" value="Save" />
                </form>
            </div>
        </div>
    )
}

export default DeleteBook