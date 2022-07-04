import React, { useEffect, useState } from "react";
import UpdateBook  from "./UpdateBook";
import AddNewBook from "./AddNewBook";


const App = () => {
    const [state, setState] = useState([])

    const inputs = [
        {
            inputId: 'title',
            name: 'title',
            label: 'Title',
            type: 'text',
            placeholder: `Joe's adventures`,
            required: true,
            isValid: true,
            isTouched: false
        },
        {
            inputId: 'author',
            name: 'author',
            label: 'Author',
            type: 'text',
            placeholder: 'Joey',
            required: true,
            isValid: true,
            isTouched: false
        },
        {
            inputId: 'year_written',
            name: 'year_written',
            label: 'Year written',
            type: 'number',
            placeholder: '2022',
            required: true,
            isValid: true,
            isTouched: false
        },
        {
            inputId: 'edition',
            name: 'edition',
            label: 'Edition',
            type: 'text',
            placeholder: '1st',
            required: true,
            isValid: true,
            isTouched: false
        },
        {
            inputId: 'price',
            name: 'price',
            label: 'Price',
            type: 'number',
            placeholder: '1000',
            required: true,
            isValid: true,
            isTouched: false
        },
        {
            inputId: 'coverimg',
            name: 'coverimg',
            label: 'Cover Image',
            type: 'url',
            placeholder: 'https://purewows3.imgix.net/images/articles/2021_01/funny_books_arcenaux.png',
            required: true,
            isValid: true,
            isTouched: false
        }
    ]

    useEffect(() => {
        fetch('http://localhost:5000/books')
        .then(res => res.json())
        .then((actualData) => setState(actualData))
        .catch((err) => err)
    }, [state])

    const handleDelete = (bookId) => {
        fetch(`http://localhost:5000/books/${bookId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
              },
        })
        // .then(res => res.json())
        .then((actualData) => alert(`deleted book number ${bookId}`))
        .catch((err) => err)
    };

    const handleAddNew = (newBook) => {
        fetch(`http://localhost:5000/books`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
              },
            body: JSON.stringify(newBook)
        })
        .then((actualData) => alert(`added book number ${newBook.id}`))
        .catch((err) => err)
    };

    const handleUpdateBook = (updateFormData) => {
        fetch(`http://localhost:5000/books/${updateFormData.item.id}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
              },
            body: JSON.stringify(updateFormData.item)
        })
        .then((actualData) => alert(`updated book number ${updateFormData.item.id}`))
        .catch((err) => err)
    }

    return <div>
        <header>Logo</header>
        <div className='bookCards'>
            {state.map((book) => {
                return (
                    <div className='bookCard' key={book.id}>
                        <img className='coverimg' alt="cover" src={book.coverimg} ></img>
                        <div>Title: {book.title}</div>
                        <div>Author: {book.author}</div>
                        <div>Year: {book.year_written}</div>
                        <div>Edition: {book.edition}</div>
                        <div>Price: ${book.price}</div>
                        <UpdateBook 
                            item={book}
                            template={inputs}
                            handleUpdateBook={handleUpdateBook}
                        />
                        <button onClick={e => handleDelete(book.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
        <AddNewBook 
            inputs={inputs} 
            handleAddNew={handleAddNew} 
        />
    </div>
};

export default App;