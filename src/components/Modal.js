import React, {useState} from "react";
//import './src/index.css';


function Modal(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
        console.log(updateFormData)
        console.log(rawUpdateFormData)
    };
    const [updateFormData, setUpdateFormData] = useState(props)
    const rawUpdateFormData = {...updateFormData}
    
    const handleUpdateFormChange = (e) => {
        rawUpdateFormData.item[e.target.name] = e.target.value;
        console.log(rawUpdateFormData)
    };

    const handleUpdateSubmit = (e) => {
        alert('updated the book');
        e.preventDefault();
        setIsOpen(!isOpen);
        setUpdateFormData(rawUpdateFormData);
        props.handleUpdateBook(updateFormData);
        console.log(updateFormData)
    };

    if (!isOpen) {
        return <button onClick={toggleModal}>Update</button>
    } else {
        return (
            <div className="modal">
                <form className="addNewForm" onSubmit={handleUpdateSubmit}>
                    <label>Title<input id="title" type='text' name="title" onChange={(e) => {handleUpdateFormChange(e)}} defaultValue={props.item.title} /></label>
                    <label>Author<input id="author" type='text' name="author" onChange={(e) => {handleUpdateFormChange(e)}} defaultValue={props.item.author} ></input></label>
                    <label>Year written<input id="year_written" type='text' name="year_written" onChange={(e) => {handleUpdateFormChange(e)}} defaultValue={props.item.year_written}  /></label>
                    <label>Edition<input id="edition" type='text' name="edition" onChange={(e) => {handleUpdateFormChange(e)}} defaultValue={props.item.edition}  /></label>
                    <label>Cover Image URL<input id="coverimg" type='text' name="coverimg" onChange={(e) => {handleUpdateFormChange(e)}} defaultValue={props.item.coverimg}  /></label>
                    <input id="submit" type='submit'></input>
                </form>
                <button onClick={toggleModal}>Close</button>
            </div>  
        )
    };
};

export default Modal;