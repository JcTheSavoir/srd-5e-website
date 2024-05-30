// ------------------------------- Edit Button Component, to allow updating of item
const EditBtn = (props) => {
    // console.log(props.itemBeingEdited)
    return(
        <button onClick={props.itemBeingEdited} className="editBtn">Edit</button>
    )
}

export default EditBtn;