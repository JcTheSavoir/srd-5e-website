// ---------------------------- Delete Button Component to allow deleting the item
const DeleteBtn = ({deleteItem}) => (
    <button onClick={deleteItem} className="deleteBtn">Delete</button>
);

export default DeleteBtn;