// ------------------------------------------Each Carousel Item 
// --------------------Import for EditBtn Component
import EditBtn from '../Buttons/EditBtn';
// --------------------Import for DeleteBtn component
import DeleteBtn from '../Buttons/DeleteBtn';

// -------------------- Props for edit, delete Functions, and single Item information
const CarouselItem = (props) => {
  // console.log('props.item', props.item);
  // console.log('props.item._id', props.item._id);
  // console.log('props.editItemId', props.editItemId);
  // console.log('props.editItemId === props.item._id', props.editItemId === props.item._id);
//---------------------------------------------VARIABLES
  const editingItem = props.editItemId === props.item._id;
  return (
    <>
      <div className="carouselItemContainer">
        <div className="carItemConTop">
          <h3 className='carItemTopTitle'>{props.item.name}</h3>
          <div className='carItemTopDetail1'>Rarity: {props.item.rarity}</div>
          <div className='carItemTopDetail2'>Base: {props.item.base}</div>
          <div className='carItemTopDetail3'>Category: {props.item.category}</div>
          <div className='carItemTopDetail4'>Attunement: {props.item.attunement === true ? 'Yes' : 'No'}</div>
        </div>
        <div className="carItemConBottom">
          <div className="carItemBottomDescription">Description: {props.item.description}</div>
        </div>
        {/* Conditionally render the edit and delete buttons, if they are null, then they will not render */}
        {props.editItem || props.deleteItem ? (
          <div className="carouselItemBtn">
            <EditBtn itemBeingEdited={() => props.setEditItemId(props.item._id)} />
            <DeleteBtn deleteItem={() => props.deleteItem(props.item)} />
          </div>
        ) : null}
      </div>
      {editingItem && (
        <div className="CarouselItemUpdateContainer">
          <h3 className="updateTitle">Here you can Update *almost ANYTHING</h3>
          <div className="updateSubTitle">Fill out the form below and click on the "Update" button</div>
          {/* ---------------------------------------------IMPORTANT------- method='PATCH' and method="PUT" will not work here, as they default to GET.  HTML form element does not support PATCH or PUT */}
          <form className="updateForm" onSubmit={(e) => props.editItem(props.item, e)}> {/* --------------------- This doens't work, specifying in function isntead // method='PATCH'*/}
            <label className="labelUpdateItemName">Name: <input maxLength="35" type="text" className="inputUpdateItemName" name="name" required /> </label> <br/>
            <label className="labelUpdateItemRarity">Rarity: <input maxLength="35" type="text" className="inputUpdateItemRarity" name="rarity" required /> </label> <br/>
            <label className="labelUpdateItemBase">Base: <input maxLength="35" type="text" className="inputUpdateItemBase" name="base" required /> </label> <br/>
            <label className="labelUpdateItemCategory">Category: <input maxLength="35" type="text" className="inputUpdateItemCategory" name="category" required /> </label> <br/>
            <div className="updateAttunementRadio">
              Does the Item Require Attunement? <br/>
              <label className="labelUpdateItemAttunement">True: <input maxLength="35" type="radio" className="inputUpdateItemAttunement" name="attunement" required value={true} /> </label>
              <label className="labelUpdateItemAttunement">False: <input maxLength="35" type="radio" className="inputUpdateItemAttunement" name="attunement" required value={false} /> </label>
            </div>
            <label className="labelUpdateItemDescription">Description: <br/>
              <textarea maxLength="500" type="text" className="inputUpdateItemDescription" name="description" required />
            </label>
            <br/>
            <button type="submit">Update Item</button>
          </form>
          <p className="updateDisclaimer">* Currently you are only able to update items.  Support for updating Creatures and Spells will come at a later time. </p>
        </div>
      )}
    </>
  );
};

export default CarouselItem;