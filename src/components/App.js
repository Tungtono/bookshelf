import React, { useState } from "react";
import { bookData } from './data';


const App = () => {
    const [state, setState] = useState(bookData)
    const handleAddNew = () => {
        return (
            console.log("added new")
        )
    };

    const handleDelete = (bookId) => {
        return (
            console.log(`deleted ${bookId}`),
            setState(
                prevState => prevState.filter(el => el.id != bookId)
            )
        )
    };

    const handleUpdate = () => {
        return (
            console.log('updated')
        )
    };
    return <div>
        <header>Logo</header>
        <input type='text' />
        <input type="submit" value="Search"/>
        <div className='bookCards'>
        {state.map((book) => {
            return (
                <div className='bookCard' key={book.id}>
                    <img className='coverimg' src={ book.coverimg } ></img>
                    <div>Title: { book.title }</div>
                    <div>Author: { book.author }</div>
                    <div>Year: { book.year_written }</div>
                    <div>Edition: { book.edition }</div>
                    <button onClick={handleUpdate}>update</button>
                    <button onClick={e => handleDelete(book.id)}>delete</button>                        
                </div>
            )
        })}
        </div>
        <button onClick={handleAddNew}>add new</button>
    </div>
}

export default App;