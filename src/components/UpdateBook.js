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

    const inputTemplate = props.template;

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
        setUpdateFormData(rawUpdateFormData);
        props.handleUpdateBook(updateFormData);
    };

    if (!isOpen) {
        return <button onClick={toggleModal}>Update</button>
    } else {
        return (
            <div className="modal">
                <form className="addNewForm" onSubmit={handleUpdateSubmit}>
                {inputTemplate.map((input) => {
                return (
                    <label key={input.inputId}>
                        {input.label} 
                        <input 
                            name={input.name} 
                            type={input.type} 
                            defaultValue={props.item[input.name]}
                            onChange={(e) => handleUpdateFormChange(e)}
                        />
                    </label>
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