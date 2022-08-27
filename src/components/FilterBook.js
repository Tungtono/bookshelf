import React, {useState} from "react";

const FilterBook = (props) => {

    const [searchValue, setSearchValue] = useState('')

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
        console.log(searchValue)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        props.handleSearch(searchValue)
    }

    return <div className='filter'>
        <form className="searchForm" onSubmit={handleSearchSubmit}>
            <input 
            onChange={(e) => handleSearchChange(e)}
            placeholder='Enter your search term'
            />
            <button>Search by title</button>
        </form>
    </div>
}

export default FilterBook;