import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddBook.css'

function AddBook({addBookPopup}){

    // const navigate = useNavigate();

    const [book, setBook] = useState({
        isbn: "",
        // lid: 0,
        title: "",
        author: "",
        publisher: "",
        version: 0,
        totalcopies: 0,
        availablecopies: 0,
        bookimage: ""
    });

    function handleChange(e){
        const value = e.target.value;
        setBook({
            ...book,
            [e.target.name]: value
        });
    };

    function handleSubmit(e){
        e.preventDefault()
        const bookData = {
            isbn: book.isbn,
            // lid: book.lid,
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            version: book.version,
            totalcopies: book.totalcopies,
            availablecopies: book.availablecopies,
            bookimage: book.bookimage
        };

        axios.post("http://localhost:8080/admin/add-book",bookData,{
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }).then((response)=>{
            console.log(response.status, response.data.token);
            alert("Book added successfully")
        })
        .catch(function (error) {
            console.log(error);
            alert("Please add all details")
          });
        // navigate('/admin');
    }

    return (
        <div className='AddBook'>

            <div className='AddBook-popup'>
                <form className='AddBook-form' onSubmit={handleSubmit} >
                    <button className='close-btn' onClick={() => addBookPopup(false)}>
                        <img src="https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png" style={{height:"20px"}} alt='cancel-icon'/>  
                    </button>
                    <h4 className="add-book-heading">ADD BOOKS</h4>
                    <input type="text" placeholder="ISBN" name="isbn" value={book.isbn} onChange={handleChange} /><br/> 
                    {/* <input type="number" placeholder="Lib ID" name="lid" value={book.lid} onChange={handleChange}/><br/>  */}
                    <input type="text" placeholder="title" name="title" value={book.title} onChange={handleChange} /><br/> 
                    <input type="text" placeholder="author" name="author" value={book.author} onChange={handleChange} /><br/> 
                    <input type="text" placeholder="publisher" name="publisher" value={book.publisher} onChange={handleChange} /><br/> 
                    <input type="number" placeholder="version" name="version" value={book.version} onChange={handleChange} /><br/> 
                    <input type="number" placeholder="total copies" name="totalcopies" value={book.totalcopies} onChange={handleChange} /><br/> 
                    <input type="number" placeholder="available copies" name="availablecopies" value={book.availablecopies} onChange={handleChange} /><br/> 
                    <input type="text" placeholder="Image URL" name="bookimage" value={book.bookimage} onChange={handleChange} /><br/> 
                    <button className='save-btn'>Save</button>
                    {/* <input className="save-btn" type="submit" value="Save" /> */}
                </form>
            </div>
        </div>
    )
}

export default AddBook