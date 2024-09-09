import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleRectVisible, toggleRectVisible2 } from "../../Shared/Redux/Featuries/ageSize/ageSize";
import BasketContainer from "../../Shared/Components/Client/BasketItem/BasketContainer";
import styles from './medicines.module.css'; // Assuming you have a CSS module for styling

export default function ProductsDetail() {
    const dispatch = useDispatch();
    const [isBasketOpen, setIsBasketOpen] = useState(false); // State to control basket visibility

    // Function to toggle the basket's visibility
    const handleAddToBasketClick = () => {
        setIsBasketOpen(!isBasketOpen);
    };

    return (
        <div className="relative h-auto w-auto">
            {/* Your existing content */}
            
            <div className="flex justify-around">
                {/* Add to Basket Button */}
                <button className={styles.buyButton} onClick={handleAddToBasketClick}>
                    {isBasketOpen ? 'Close Basket' : 'Add to Basket'}
                </button>

                {/* Conditionally render BasketContainer when isBasketOpen is true */}
                {isBasketOpen && (
                    <div className="basket-container">
                        <BasketContainer />
                    </div>
                )}
            </div>

            {/* Your existing content */}
        </div>
    );
}
