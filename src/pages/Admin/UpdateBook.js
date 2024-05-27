import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpdateBook.css'

function UpdateBook({updateBookPopup}){
    
    const navigate = useNavigate();

    const [book, setBook] = useState({
       isbn: "",
       lid: 0,
       title: "",
       author: "",
       publisher: "",
       version: 0,
       totalcopies: 0,
       availablecopies: 0,
       bookimage: ""
    });
    
    function handleChange(e){
        const value = e.target.value
        setBook({
           ...book,
           [e.target.name]: value
        });
    }
    
    function handleSubmit(e){
        e.preventDefault()
        const bookData = {
            isbn: book.isbn,
            lid: book.lid,
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            version: book.version,
            totalcopies: book.totalcopies,
            availablecopies: book.availablecopies,
            bookimage: book.bookimage
        };

        axios.patch("http://localhost:8080/admin/updatebook",bookData,{
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }).then((response)=>{
            console.log(response.status, response.data.token);
            alert("Book updated successfully");
        })
        .catch(function (error) {
            console.log(error);
            alert("Please fill all the rows")
        });

        navigate('/admin');
    }
    return (
        <div className='UpdateBook'>
            <div className='UpdateBook-popup'>
                <form className='UpdateBook-form' onSubmit={handleSubmit}>
                    <button className='close-btn' onClick={() => updateBookPopup(false)}>
                        <img src="https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png" style={{height:"20px", left:"0"}} alt='cancel-icon'/>
                    </button>
                    <h4 className="add-book-heading">UPDATE BOOK</h4>
                    <input type="text" placeholder="ISBN" name="isbn" value={book.isbn} onChange={handleChange}/><br/>
                    <input type="number" placeholder="LID" name="lid" value={book.lid} onChange={handleChange}/><br/>
                    <input type="text" placeholder="Title" name="title" value={book.title} onChange={handleChange}/><br/>
                    <input type="text" placeholder="Author" name="author" value={book.author} onChange={handleChange}/><br/>
                    <input type="text" placeholder="Publisher" name="publisher" value={book.publisher} onChange={handleChange}/><br/>
                    <input type="number" placeholder="Version" name="version" value={book.version} onChange={handleChange}/><br/>
                    <input type="number" placeholder="Total Copies" name="totalcopies" value={book.totalcopies} onChange={handleChange}/><br/>
                    <input type="number" placeholder="Available Copies" name="availablecopies" value={book.availablecopies} onChange={handleChange}/><br/>
                    <input type="text" placeholder="Image URL" name="bookimage" value={book.bookimage} onChange={handleChange}/><br/>
                    <input className="save-btn" type="submit" value="Save" />
                </form>
            </div>
        </div>
    )
}

export default UpdateBook