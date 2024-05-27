import React, { useState , useEffect } from 'react'
import axios from 'axios'
import BookCard from '../../components/BookCard/BookCard';
import './GetBooks.css'

function GetBooks(){

    const [books, setBooks] = useState([{
        isbn: "",
        lid: 0,
        title: "",
        author: "",
        publisher: "",
        version: 0,
        totalcopies: 0,
        availablecopies: 0,
        bookimage: "",
    }])

    

    async function handleSubmit(){
        // e.preventDefault()
        await axios.get("http://localhost:8080/user/books")
        .then((response) => {
            // console.log(response.data);
            // const result = response.data;
            setBooks(response.data.data);
        })

        // console.log("Books are" , books)
    }

    useEffect(() => {
        handleSubmit()
    },[])

    // console.log("Books are" , books)
    return (
        <div className='GetBooks'>
                {
                    books.map((book)=>{
                        return (
                            <BookCard image={book.bookimage} name={book.title}/>
                        )
                    })
                }
        </div>
    )
}

export default GetBooks