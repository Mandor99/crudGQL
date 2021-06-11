import React, {useState} from 'react'
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../apolloAPI'
import {useQuery, useMutation} from '@apollo/client'

function AddBook() {
    const [bookName, setBookName] = useState('')
    const [bookGenre, setBookGenre] = useState('')
    const [authorId, setAuthorId] = useState('')
    const {loading, error, data} = useQuery(getAuthorsQuery)
    const [addBook, obj] = useMutation(addBookMutation)
    const getAuthors = () => {
        if(loading) { return (<option disabled>loading ...</option>)}
        if(data) {
            return data.authors.map((author) => (<option key={author.id} value={author.id}>{author.name}</option>))
        }
    }
    const handleInput = (setter) => (e) => setter(e.target.value)
    const handleSubmit = (e) => {
        e.preventDefault()
        addBook({
            variables: {name: bookName, genre: bookGenre, authorId: authorId},
            refetchQueries: [{query: getBooksQuery}]
        })
        console.log(obj);
        setBookName('')
        setBookGenre('')
        setAuthorId('')
    }
    return (
        <form id="add-book" name="addBook" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="">Book Name: </label>
                <input type="text" name="" id="" onChange={handleInput(setBookName)}/>
            </div>
            <div className="field">
                <label htmlFor="">Genre: </label>
                <input type="text" name="" id="" onChange={handleInput(setBookGenre)}/>
            </div>
            <div className="field">
                <label htmlFor="">Author: </label>
                <select name="author" id="" onChange={handleInput(setAuthorId)}>
                    <option>Select Author</option>
                    {getAuthors()}
                </select>
            </div>
            <button type="submit">+</button>
        </form>
    )
}

export default AddBook
