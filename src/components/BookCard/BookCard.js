import React from 'react'
import './BookCard.css'

function BookCard({image , name}){
    return (
        <div className='BookCard'>
            <img className='book-img' src={image} />
            <span className='book-title'>{name}</span>
        </div>
    )
}

export default BookCard