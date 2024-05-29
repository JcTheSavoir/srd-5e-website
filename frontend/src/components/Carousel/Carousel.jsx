// --------------------------------------- Carousel Component for use in multiple places
import { useState, useEffect } from 'react';
// ---------------------Import for CarouselItem
import CarouselItem from './CarouselItem';
// ---------------------Import for the navigation button
import NavigationBtn from '../Buttons/NavigationBtn';

// ------------- Props for delete, edit functions and items
const Carousel = (props) => { //items, editItem, deleteItem
// ----------------------------------------------------------HOOKS    
    // ----------------State for keeping track of the index for carousel item
    const [carouselIndex, setCarouselIndex] = useState(0);

// ---------------------------------------------------------VARIABLES
    // -------------How many carousel items to display at once. ---may need changed for mobile/tablet views. Look into using CSS to 
    // handle this (media query/overflow property?), or see if react provides a built in option for cases like these {note added to notes.html}
    const numberOfItems = 3;
    
//-------------------------------------------------------------FUNCTIONS
    // ------------------ function for navigation button
    const nextItem = () => {
        setCarouselIndex(carouselIndex + 1);
    };
    //-------------- Function for navigation button
    const prevItem = () => {
        setCarouselIndex(carouselIndex - 1);
    };

    // console.log(props.items, props.editItem, props.deleteItem)

    return (
        <div className="carouselContainer">
            <NavigationBtn buttonName="<" navigation={prevItem} />
            <div className="carouselConContents">
                {props.items.slice(carouselIndex, carouselIndex + numberOfItems).map(item => (
                    <CarouselItem key={item._id} item={item} editItem={props.editItem} editItemId={props.editItemId} setEditItemId={props.setEditItemId} deleteItem={props.deleteItem}/>
                ))}
            </div>
            <NavigationBtn buttonName=">" navigation={nextItem} />
        </div>
    );
};

export default Carousel;