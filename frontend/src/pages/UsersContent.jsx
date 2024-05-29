// ------------------------------------------------------------------------ show off the users created content (possibly for all user created content in the future)
import { useState, useEffect } from "react";
// ----------------import the carousel component
import Carousel from "../components/Carousel/Carousel";
// ----------------import the Link component
import { Link } from "react-router-dom";


const UsersContent = () => {
// ------------------------------------------------------------------HOOKS
  //--------------------------Hold State for current users items
  const [userItems, setUserItems] = useState([]);
  //--------------------------Hold state for all items from all users
  const [allItems, setAllItems] = useState([]);
  //-------------------------Hold State for error messages returned by response 
  const [errorItems, setErrorItems] = useState("");
  //-------------------------Hold state for which item is currently being edited (only one at a time)
  const [editItemId, setEditItemId] = useState(null);
  //-------------------------useEffect to trigger search for current user and all items
  useEffect(() => {
    getItems();
    getAllItems();
  }, []);

//------------------------------------------------------------------FUNCTIONS
  //------------------Function for getting items created by the user
  const getItems = async () => {
    setErrorItems("")
    try {
      const res = await fetch ('/backend/items/user-items', {
        method: "GET",
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error ("Failed to find user Items")
      };
      const data = await res.json();
      // console.log("Current User Items:", data);
      setUserItems(data);
    } catch (error) {
      setErrorItems(error.message);
    }
  };
  //------------------Function for getting all items created by all users
  const getAllItems = async() => {
    setErrorItems("")
    try {
      const res = await fetch ('/backend/items/all-items', {
        method: "GET",
        //no need for credentials as these won't be edited 
      });
      if (!res.ok) {
        throw new Error ("Failed to find All Users Items")
      };
      const data = await res.json();
      // console.log("All Items:", data);
      setAllItems(data);
    } catch (error) {
      setErrorItems(error.message);
    }
  };
  // ------------------Function for editing items made by the user
  const editItem = async (item, e) => {
    e.preventDefault();
    setErrorItems("");

    const itemForm = e.target;
    const formData = new FormData(itemForm);
    const updatedItem = Object.fromEntries(formData.entries());
    updatedItem.itemId = item._id;

    try {
      const res = await fetch('/backend/items/update', {
        method: itemForm.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
        credentials: 'include',
      });
      if (!res.ok) {
        const errorCaught = await res.json();
        throw new Error(errorCaught.message || "Unknown error");
      };
      await getItems();
      await getAllItems();
      console.log("EDIT ITEM, before setEditItemID")
      setEditItemId(null);
      console.log("EDIT ITEM, after setEditItemID")
    } catch (error) {
      setErrorItems(error.message);
    }
  };
  // ------------------Function for deleting items made by the user
  const deleteItem = async (item) => {
    setErrorItems("");
    try {
      const res = await fetch ('/backend/items/delete', {
        method: "DELETE",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({itemId: item._id}),
        credentials: 'include',
      });
      if (!res.ok) {
        const errorCaught = await res.json();
        throw new Error( errorCaught.message || "Unknown error");
      } else {
        await getItems();
        await getAllItems();
        console.log("Item deleted successfully")
      };
    } catch (error) { 
      console.error('Issue deleting this item', error);
      setErrorItems(error.message);
    };
  };

  return (
    <div className="userContentContainer">
      {errorItems && <div className="errorSignup">{errorItems}</div>}
      {/* If allitems is empty (which would mean that userItems is as well), send user to the creation screen */}
      {allItems.length === 0 ? (
        <>
          <div className="contentContainerTitle">Looks like you haven't added any items yet (Or anyone else!), feel free to follow the below portal to create some magic!</div>
          <Link to='/create'>
            <div className="contentContainerLink">Portal to Creation</div>
          </Link>
        </>
      ) : userItems.length === 0 ? (
        <>
          <div className="contentContainerTitle">Looks like you haven't added any items yet (But others have!), feel free to join them by following the portal below!</div>
          <Link to='/create'>
            <div className="contentContainerLink">Portal to Creation</div>
          </Link>
        </>
      ) : (
        <>
          <Carousel editItem={null} deleteItem={null} items={allItems} />
          <Carousel editItem={editItem} editItemId={editItemId} setEditItemId={setEditItemId} deleteItem={deleteItem} items={userItems} />
        </>
      )}
    </div>
  );
};
export default UsersContent