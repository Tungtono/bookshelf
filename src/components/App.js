import React, { useEffect, useState } from "react";
import UpdateBook  from "./UpdateBook";
import AddNewBook from "./AddNewBook";
import FilterBook from "./FilterBook";


const App = () => {
    const [state, setState] = useState([])
    const baseUrl = "https://book-server-api.vercel.app"

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
            label: 'Cover Image URL',
            type: 'url',
            placeholder: 'https://purewows3.imgix.net/images/articles/2021_01/funny_books_arcenaux.png',
            required: true,
            isValid: true,
            isTouched: false
        }
    ]

    const fetchData = () => {
        fetch(`${baseUrl}/books`)
        .then(res => res.json())
        .then((actualData) => setState(actualData))
        .catch((err) => err)
    } 

    useEffect(fetchData, [])

    const handleDelete = (bookId) => {
        fetch(`${baseUrl}/books/${bookId}`, {
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
        fetch(`${baseUrl}/books`, {
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
        fetch(`${baseUrl}/books/${updateFormData.item.id}`, {
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
        fetch(`${baseUrl}/books/search/${searchValue}`)
        .then(res => res.json())
        .then((actualData) => setState(actualData))
        .catch((err) => err)
    }

    const refreshPage = () => {
        window.location.reload();
    }

    return <div className="main">
        <header onClick={refreshPage}>The Greatest Bookshelf</header>
        <FilterBook handleSearch={handleSearch}/>
        <div className='bookCards'>
            {state.map((book) => {
                return (
                    <div className='bookCard' key={book.id}>
                        <img className='coverImg' alt="cover" src={book.coverimg} ></img>
                        <div className="bookDetails">
                            <div>Title: {book.title}</div>
                            <div>Author: {book.author}</div>
                            <div>Year: {book.year_written}</div>
                            <div>Edition: {book.edition}</div>
                            <div>Price: ${book.price}</div>
                        </div>
                        <div className="actionControl">
                            <UpdateBook 
                                item={book}
                                inputs={inputs}
                                handleUpdateBook={handleUpdateBook}
                            />
                            <button style={{background: 'red'}} onClick={e => {if(window.confirm(`Really delete this book? Can't undo tho`)){handleDelete(book.id)}}}>Delete</button>
                        </div>
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