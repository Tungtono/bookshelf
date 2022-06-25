import React, {useState} from "react";
//import './src/index.css';


function Modal({item}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
        console.log(isOpen)
    };
    if (!isOpen) {
        return <button onClick={toggleModal}>Update</button>
    } else {
        return (
            <div className="modal">
                <form className="addNewForm" onSubmit={toggleModal}>
                    <label>Title<input id="title" type='text' name="title" defaultValue={item.title} /></label>
                    <label>Author<input id="author" type='text' name="author" defaultValue={item.author} ></input></label>
                    <label>Year written<input id="year_written" type='text' name="year_written" defaultValue={item.year_written}  /></label>
                    <label>Edition<input id="edition" type='text' name="edition" defaultValue={item.edition}  /></label>
                    <label>Cover Image URL<input id="coverimg" type='text' name="coverimg" defaultValue={item.coverimg}  /></label>
                    <input id="submit" type='submit'></input>
                </form>
                <button onClick={toggleModal}>Close</button>
            </div>  
        )
    };
};

export default Modal;