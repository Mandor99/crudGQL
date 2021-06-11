import React, {useState} from 'react'
import {useQuery} from '@apollo/client'
import {getBooksQuery} from '../apolloAPI'
import BookDetails from './BookDetails'

function BookList() {
    const {loading, error, data} = useQuery(getBooksQuery)
    const [bookId, setBookId] = useState('')
    const getBooks = () => {
        if(loading) {return (<div>loading ...</div>)}
        if(data) {
                return data.books.map((book) => (
                        <li key={book.id} onClick={(e) => setBookId(book.id)}>{book.name}</li>
                ))
        }
    }
    return (
        <div>
            <ul id="book-list">
                {getBooks()}
            </ul>
            <BookDetails bookId={bookId}/>
        </div>
    )
    
}

export default BookList
