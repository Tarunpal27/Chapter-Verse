import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import './Sidebar.css'
import AddBook from '../../pages/Admin/AddBook';
import DeleteBook from '../../pages/Admin/DeleteBook';
import UpdateBook from '../../pages/Admin/UpdateBook';
import SearchBook from '../../pages/User/SearchBook';
import GetBooks from '../../pages/User/GetBooks';
import IssueRequest from '../../pages/User/IssueRequest';
import ReplyRequest from '../../pages/Admin/ReplyRequest';
import GetRequest from '../../pages/Admin/GetRequest';

function Sidebar({role}){

    const [addBookForm , setAddBookForm] = useState(false);
    const [deleteBookForm , setDeleteBookForm] = useState(false);
    const [updateBookForm , setUpdateBookForm] = useState(false);
    const [requestForm , setRequestForm] = useState(false);
    const [replyForm , setReplyForm] = useState(false);
    const [getReqs , setGetReqs] =useState(false);
    const [allBooks , setAllBooks] = useState(false);
    const [getBook, setGetBook] = useState(false)

    const [book, setBook] = useState({
        title: ""
    });

    function handleChange(e){
        const value = e.target.value;
        setBook({
            ...book,
            [e.target.name]: value
        });
    };

    function addBookPopup(data){
        setAddBookForm(data);
    }

    function deleteBookPopup(data){
        setDeleteBookForm(data);
    }

    function updateBookPopup(data){
        setUpdateBookForm(data);
    }

    function requestPopup(data){
        setRequestForm(data);
    }

    function replyPopup(data){
        setReplyForm(data);
    }

    function closeBook(data){
        setGetBook(data);
    }

    function reqPopup(data){
        setGetReqs(data)
    }

    // function searchBookPopup(data){
    //     setSearchBookForm(data)
    // }

    console.log(getBook)

    return (
        <div className='Sidebar'>
            {
                role === "Admin" ? 
                <div className='admin-sidebar'>

                    <button className='link-style' style={{textDecoration:"none", fontSize:"large"}} onClick={() => setAddBookForm(true)}>
                        Add Book
                    </button>
                    {
                        addBookForm ? <AddBook addBookPopup={addBookPopup}/> : null
                    }

                    <button className='link-style' style={{textDecoration:"none", fontSize:"large"}} onClick={() => setDeleteBookForm(true)}>
                        Delete Book
                    </button>
                    {
                        deleteBookForm ? <DeleteBook deleteBookPopup={deleteBookPopup}/> : null
                    }

                    <button className='link-style' style={{textDecoration:"none", fontSize:"large"}} onClick={() => setUpdateBookForm(true)}>
                        Update Book
                    </button>
                    {
                        updateBookForm ? <UpdateBook updateBookPopup={updateBookPopup}/> : null
                    }

                    <button className='link-style' style={{textDecoration:"none", fontSize:"large"}} onClick={() => setGetReqs(!getReqs)}>
                        Check requests
                    </button>
                    {
                        getReqs ? <GetRequest reqPopup={reqPopup}/> : null
                    }
                    

                    <button className='link-style' style={{textDecoration:"none", fontSize:"large"}} onClick={()=> setReplyForm(true)}>
                        Reply requests
                    </button> 
                    {
                        replyForm ? <ReplyRequest replyPopup={replyPopup} /> : null
                    }
                </div> :
                <div className='user-sidebar'>
                    {/* <Link className='link-style' to="/user/books" style={{textDecoration:"none", fontSize:"large"}} >
                        All Books
                    </Link> */}
                    <div className='searchBar'>
                        <input className='search-box' placeholder='Search Book' name='title' value={book.title} onChange={handleChange}/>
                        <button className='search-btn' onClick={() => setGetBook(true)}>
                            <img className='search-icon' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBK8nEC2m8qJCNHy-1B0nN1z0Ub74VzEsXNA&usqp=CAU' />
                        </button>
                    </div>
                    {
                        getBook ? <SearchBook book={book} closeBook={closeBook} /> : null
                    }

                    <button className='link-style' style={{textDecoration:"none", fontSize:"large"}} onClick={()=> setAllBooks(!allBooks)}>
                        All Books
                    </button>
                    {
                        allBooks ? <GetBooks /> : null
                    }

                    <button className='link-style' style={{textDecoration:"none", fontSize:"large"}} onClick={() => setRequestForm(true)}>
                        Raise Issue
                    </button>
                    {
                        requestForm ? <IssueRequest requestPopup={requestPopup}/> : null
                    }
                </div>
            }
                
            
        </div>
    )
}
export default Sidebar