// --------------------------------------- Carousel Component for use in multiple places
import { useState } from 'react';
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
        // if statement to ensure carousel doesn't continue when theres no other items to display
        if (carouselIndex < props.items.length - numberOfItems ) {
            setCarouselIndex(carouselIndex + 1);    
        };
    };
    //-------------- Function for navigation button
    const prevItem = () => {
        // if statement to ensure carousel doesn't continue left when there are no other items to display
        if (carouselIndex > 0) {
            setCarouselIndex(carouselIndex - 1);
        };
    };
    return (
        <div className="carouselContainer">
            <NavigationBtn buttonName="<" navigation={prevItem} />
            <div className="carouselConContents">
                {props.items.slice(carouselIndex, carouselIndex + numberOfItems).map(item => (
                    <CarouselItem 
                        key={item._id} 
                        item={item} 
                        editItem={props.editItem} 
                        editItemId={props.editItemId} 
                        setEditItemId={props.setEditItemId} 
                        deleteItem={props.deleteItem}
                    />
                ))}
            </div>
            <NavigationBtn buttonName=">" navigation={nextItem} />
        </div>
    );
};

export default Carousel;