// ------------------------------- Edit Button Component, to allow updating of item
const EditBtn = (props) => {
    return(
        <button onClick={props.itemBeingEdited} className="editBtn">Edit</button>
    );
};

export default EditBtn;