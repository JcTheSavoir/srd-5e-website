// ----------------------------------------------------------------Create new rpg content
// ---------------------------Import for the useState hook
import { useState } from "react";
// ---------------------------Import to use Link for page navigation if needed
import { Link } from "react-router-dom";

const Create5E = () => {
// ----------------------------------------------------------------HOOKS
  // --------------------------State for handling error creating items
  const [errorNewItem, setErrorNewItem] = useState("");

// --------------------------------------------------------------Functions
  // ------------------ Function to create new item {similar to the createUser function for the login page}
  const createItem = async (e) => {
    e.preventDefault();
    //set errorNewItem to remove previous errors if they exist
    setErrorNewItem("");    
  // Trying out the "FormData" option offered in react to change how data is collected for creating a new item
        // After trying it out and doing more research, this method is incomplete because of how the 
        // backend needs to be structured.  Still will keep this in mind for the future as it has potential and seems to 
        // "flow" better in my opinion.
    //-------------VV---- set variable to the data inside the form
    const itemForm = e.target;
    // ------------VV---- creates a new object with the data (itemForm) from the form
    const formData = new FormData(itemForm);
      // ----VV----- Still needed because of how backend is setup, if the below comment is implemented, then this will no longer be needed
    const newItem = Object.fromEntries(formData.entries());    
    
    try {
      const res = await fetch('/backend/items/create', {
        //-------------Uses the method specified in the <form> element
        method: itemForm.method,
        headers: {
          'Content-Type': 'application/json'
        },
          // ------VV------
          // body: formData,
          // Directly call the contents of the form from the new object.
          // BUT, this requires changes to the backend and possibly adding middleware (one I found was call Multer).  
          // Will skip this for now, but good to know as it might be helpful with allowing users to submit files in form fields
        body: JSON.stringify(newItem),
        // Credentials needed as the Uitem schema expects the id of the user
        credentials: "include",
      });
      if (!res.ok) {
        const errorCaught = await res.json();
        throw new Error(errorCaught.message || "Unknown error");
      } else {
        const data = await res.json();
        // ----------------- Resets the form so more items can be created
        itemForm.reset()
      };

    } catch (error) {
      console.error('Issue creating new item', error)
      setErrorNewItem(error.message);
    };
  };
  
  return (
    <div className="create5EComponentContainer">
      <h2 className="create5ETitle">Here you can Create *almost ANYTHING</h2>
      <div className="create5ESubTitle">Fille out the form below and click on the "create" button</div>
      {/* if there is an error when createing the new item, the user will get see this message*/}
      {errorNewItem && <div className="errorSignup">{errorNewItem}</div>}
      <form className="create5EForm" onSubmit={createItem} method="POST">
        <label className="labelCreateItemName">Name: <input maxLength="35" type="text" className="inputCreateItemName" name="name" required /> </label> <br/>
        <label className="labelCreateItemRarity">Rarity: <input maxLength="35" type="text" className="inputCreateItemRarity" name="rarity" required /> </label> <br/>
        <label className="labelCreateItemBase">Base: <input maxLength="35" type="text" className="inputCreateItemBase" name="base" required /> </label> <br/>
        <label className="labelCreateItemCategory">Category: <input maxLength="35" type="text" className="inputCreateItemCategory" name="category" required /> </label> <br/>
        <div className="create5EAttunementRadio">
          Does the Item Require Attunement? <br/>
          <label className="labelCreateItemAttunement">True: <input maxLength="35" type="radio" className="inputCreateItemAttunement" name="attunement" required value={true} /> </label>
          <label className="labelCreateItemAttunement">False: <input maxLength="35" type="radio" className="inputCreateItemAttunement" name="attunement" required value={false} /> </label>
        </div>
        <label className="labelCreateItemDescription">Description: <br/>
          <textarea maxLength="500" type="text" className="inputCreateItemDescription" name="description" required />
        </label>
        <br/>
        <button type="submit">Create Item</button>
      </form>
      <p className="create5EDisclaimer">* Currently you are only able to create items.  Support for creating Creatures and Spells will come at a later time. </p>
    </div>
  );
};
export default Create5E