import React, {useState} from "react";

function UpdateBook(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const [updateFormData, setUpdateFormData] = useState(props)
    const rawUpdateFormData = {...updateFormData}
    
    const handleUpdateFormChange = (e) => {
        rawUpdateFormData.item[e.target.name] = e.target.value;
    };

    const [inputs, setInputs] = useState(props.inputs)

    const handleBlur = (e) => {
        validate(e);
    }

    const validate = (e) => {
        const currentInput = inputs.find((item) => item.name === e.target.name)
        const newCurrentInput = {...currentInput, isValid: currentInput.required && e.target.value.trim().length !== 0};
        const newInputs = inputs.map(item => (item.name === e.target.name) ? newCurrentInput : item);
        setInputs(newInputs);
    }

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
        setUpdateFormData(rawUpdateFormData);
        // props.handleUpdateBook(updateFormData);
        const requiredInputs = inputs.filter(item => item.required)

        const result = requiredInputs.every(input => input.isValid)

        return result? props.handleUpdateBook(updateFormData) : null
    };

    if (!isOpen) {
        return <button onClick={toggleModal}>Update</button>
    } else {
        return (
            <div className="modal">
                <form className="addNewForm" onSubmit={handleUpdateSubmit}>
                {inputs.map((input) => {
                return (
                    <div key={input.inputId}>
                        <label> 
                            {input.label}: 
                            <input 
                                name={input.name} 
                                type={input.type} 
                                defaultValue={props.item[input.name]} 
                                onChange={(e) => handleUpdateFormChange(e)}
                                onBlur={(e)=>handleBlur(e)}
                            />
                        </label>
                        <div className="errorMessage">{input.isValid ? null : `${input.label} is required`}</div>
                    </div>
                )
            })}
                    <input id="submit" type='submit'></input>
                </form>
                <button onClick={toggleModal}>Close</button>
            </div>  
        )
    };
};

export default UpdateBook;