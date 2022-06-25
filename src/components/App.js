import React, { useState } from "react";
import { bookData } from './data';
import {nanoid} from 'nanoid';
import Modal  from "./Modal";
const App = () => {
    const [state, setState] = useState(bookData)
    const [addFormData, setAddFormData] = useState({
        title: "",
        author:'',
        year_written:'',
        edition:'',
        coverimg:''
    })


    const handleDelete = (bookId) => {
        return (
            alert(`deleted the book number ${bookId}`),
            setState(
                prevState => prevState.filter(el => el.id !== bookId)
            )
        )
    };

    const handleAddNewChange = ( e ) => {
        const newFormData = {...addFormData};
        newFormData[e.target.name] = e.target.value;
        setAddFormData(newFormData);

    };

    const handleAddNew = (e) => {
        alert('added a new book');
        e.preventDefault();
        
        const newBook = {
            id: nanoid(),
            title: addFormData.title,
            author: addFormData.author,
            year_written: addFormData.year_written,
            edition: addFormData.edition,
            coverimg: addFormData.coverimg
        }
        const newBooks = [...state, newBook]
        setState(newBooks)
    };

    // const [updateFormData, setUpdateFormData] = useState({
    //     id: '',
    //     title: "",
    //     author:'',
    //     year_written:'',
    //     edition:'',
    //     coverimg:''
    // })
    // const handleUpdateChange = ( e ) => {
    //     const updatedFormData = {};
    //     updatedFormData[e.target.name] = e.target.value;
    //     setUpdateFormData(updatedFormData);
    // }
    // const handleUpdateBook = (e) => {
    //     e.preventDefault();
    //     const newState = [...state, updateFormData];
    //     setState(newState)
    // }

    return <div>
        <header>Logo</header>
        <input type='text' />
        <input type="submit" value="Search" />
        <div className='bookCards'>
            {state.map((book) => {
                return (
                    <div className='bookCard' key={book.id}>
                        <img className='coverimg' alt="cover" src={book.coverimg} ></img>
                        <div>Title: {book.title}</div>
                        <div>Author: {book.author}</div>
                        <div>Year: {book.year_written}</div>
                        <div>Edition: {book.edition}</div>
                        <Modal item={book}></Modal>
                        <button onClick={e => handleDelete(book.id)}>delete</button>
                    </div>
                )
            })}
        </div>
        <form className="addNewForm" onSubmit={(e) => handleAddNew(e)}>
            <label >Title<input id="title" type='text' name="title" onChange={(e) => handleAddNewChange( e)} placeholder='The adventures of Joe' /></label>
            <label >Author<input id="author" type='text' name="author" onChange={(e) => handleAddNewChange( e)} placeholder='Joe Nguyen'></input></label>
            <label >Year written<input id="year_written" type='text' name="year_written" onChange={(e) => handleAddNewChange( e)} placeholder='2022' /></label>
            <label >Edition<input id="edition" type='text' name="edition" onChange={(e) => handleAddNewChange( e)} placeholder='1st' /></label>
            <label >Cover Image URL<input id="coverimg" type='text' name="coverimg" onChange={(e) => handleAddNewChange( e)} placeholder='https://warnercnr.colostate.edu/wp-content/uploads/sites/2/2017/04/shutterstock_428626417.jpg' /></label>
            <input id="submit" type='submit'></input>
        </form>
    </div>
};



export default App;