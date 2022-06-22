import React, { Component } from "react";
import { bookData } from './data';



class App extends Component {

    state = {bookState: {bookData}}

    handleAddNew () {
        return (
            console.log("added new")
        )
    };

    handleDelete () {
        return (
            console.log('deleted')
        )
    }

    handleUpdate () {
        return (
            //console.log('updated')
            console.log(this.state)
        )
    }

    render() {
        return <div>
            <header>Logo</header>
            <input type='text' />
            <input type="submit" value="Search"/>
            <div className='bookCards'>
            {bookData.map((book) => {
                return (
                    <div className='bookCard' key={book.id}>
                        <img className='coverimg' src={ book.coverimg } ></img>
                        <div>Title: { book.title }</div>
                        <div>Author: { book.author }</div>
                        <div>Year: { book.year_written }</div>
                        <div>Edition: { book.edition }</div>
                        <button onClick={this.handleUpdate}>update</button>
                        <button onClick={this.handleDelete}>delete</button>                        
                    </div>
                )
            })}
            </div>
            <button onClick={ this.handleAddNew }>add new</button>
        </div>
        }
}

export default App;