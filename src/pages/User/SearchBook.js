import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SearchBook.css'

function SearchBook({book , closeBook}){

    const [bookData, setBookData] = useState([]);
    const [gotBook, setGotBook] = useState(false)


    async function handleSubmit(){
        // e.preventDefault()

        await axios.get(`/user/onebook/${book.title}`).then(function (response) {
            console.log(response.data);
            setBookData(response.data.data);
            setGotBook(true);
          })
          .catch(function (error) {
            console.log(error);
            alert("No such book")
          });
    }

    useEffect(() => {
        handleSubmit();
    }, [])

    console.log("Book is",bookData)

    return (
        
        <div className='SearchBook'>
            {
                gotBook ? 
                <div className='BookPopup'>
                    <div className='BookDetails'>
                        <button className='closebook-btn' onClick={() => closeBook(false)}>
                            Close
                            {/* <img src="https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png" style={{height:"20px"}} alt='cancel-icon'/>   */}
                        </button>
                        <img className='BookImg' src={bookData.bookimage} />
                        <div className='BookContainer'>
                            <div className='BookInfo'>
                                <span><b>Title :</b> {bookData.title}</span><br/>
                                <span><b>ISBN :</b> {bookData.isbn}</span><br/>
                                <span><b>Author :</b> {bookData.author}</span><br/>
                                <span><b>Publisher :</b> {bookData.publisher}</span><br/>
                                <span><b>Version :</b> {bookData.version}</span><br/>
                                <span><b>Total Copies :</b> {bookData.totalcopies}</span><br/>
                                <span><b>Available Copier:</b> {bookData.availablecopies}</span><br/>
                            </div>
                            <button className='buy-btn'>Buy</button>
                        </div>
                    </div>
                </div> : null
            }       
        </div>
    )
}

export default SearchBook