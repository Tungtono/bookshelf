import React, {useState} from "react";
import {nanoid} from 'nanoid';

const AddNewBook = (props) => {

    const [addFormData, setAddFormData] = useState({
        title: "",
        author:'',
        year_written:'',
        edition:'',
        price:'',
        coverimg:''
    });

    const [inputs, setInputs] = useState(props.inputs)

    const handleAddNewChange = ( e ) => {
        const newFormData = {...addFormData};
        newFormData[e.target.name] = e.target.value;
        setAddFormData(newFormData);
    };

    const handleBlur = (e) => {
        validate(e);
    }

    const validate = (e) => {
        const currentInput = inputs.find((item) => item.name === e.target.name)
        const newCurrentInput = {...currentInput, isValid: currentInput.required && e.target.value.trim().length !== 0, isTouched: true};
        const newInputs = inputs.map(item => (item.name === e.target.name) ? newCurrentInput : item);
        setInputs(newInputs);
    }

    const handleAddNewSubmit = (e) => {
        e.preventDefault();
        
        const newBook = {
            id: nanoid(),
            title: addFormData.title,
            author: addFormData.author,
            year_written: addFormData.year_written,
            edition: addFormData.edition,
            price: addFormData.price,
            coverimg: addFormData.coverimg
        };

        const requiredInputs = inputs.filter(item => item.required)

        const result = requiredInputs.every(input => input.isTouched && input.isValid)

        return result? props.handleAddNew(newBook) : null
    };

    return (
        <form className="addNewForm" onSubmit={(e) => handleAddNewSubmit(e)}>
            {inputs.map((input) => {
                return (
                    <div key={input.inputId}>
                        <label> 
                            {input.label}: 
                            <input 
                                name={input.name} 
                                type={input.type} 
                                placeholder={input.placeholder} 
                                onChange={(e) => handleAddNewChange(e)}
                                onBlur={(e)=>handleBlur(e)}
                            />
                        </label>
                        <div className="errorMessage">{input.isValid ? null : `${input.label} is required`}</div>
                    </div>
                )
            })}
            <button id="submit" type='submit'>Add New Book</button>
        </form>
    )
};

export default AddNewBook;
