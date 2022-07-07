import React, { useEffect, useState } from "react";
import UpdateBook  from "./UpdateBook";
import AddNewBook from "./AddNewBook";
import FilterBook from "./FilterBook";


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

    const fetchData = () => {
        fetch('https://book-server-api.herokuapp.com/books')
        .then(res => res.json())
        .then((actualData) => setState(actualData))
        .catch((err) => err)
    } 

    useEffect(fetchData, [])

    const handleDelete = (bookId) => {
        fetch(`https://book-server-api.herokuapp.com/books/${bookId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
              },
        })
        // .then(res => res.json())
        .then(fetchData)
        .catch((err) => err)
    };

    const handleAddNew = (newBook) => {
        fetch(`https://book-server-api.herokuapp.com/books`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
              },
            body: JSON.stringify(newBook)
        })
        .then(fetchData)
        .catch((err) => err)
    };

    const handleUpdateBook = (updateFormData) => {
        fetch(`https://book-server-api.herokuapp.com/books/${updateFormData.item.id}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
              },
            body: JSON.stringify(updateFormData.item)
        })
        .then(fetchData)
        .catch((err) => err)
    }

    const handleSearch = (searchValue) => {
        fetch(`https://book-server-api.herokuapp.com/books/search/${searchValue}`)
        .then(res => res.json())
        .then((actualData) => setState(actualData))
        .catch((err) => err)
    }

    return <div>
        <header>Logo</header>
        <FilterBook handleSearch={handleSearch}/>
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
                            inputs={inputs}
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