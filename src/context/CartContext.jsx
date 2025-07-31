// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initialize state with data from localStorage if available
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            return [];
        }
    });

    // Save to localStorage whenever cartItems changes
    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            console.log('Cart saved to localStorage:', cartItems);
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [cartItems]);

    const addItemToCart = (product, selectedVariantKey) => {
        const variantData = product.variants[selectedVariantKey];
        if (!variantData) {
            console.error("Invalid variant selected for product:", product.name, selectedVariantKey);
            toast.error("Invalid product variant.");
            return;
        }
        
        console.log("Adding product to cart:", product);

        // Generate ID if missing
        const productId = product.id || product.name.toLowerCase().replace(/\s+/g, '-');

        const itemToAdd = {
            productId: productId,
            productName: product.name,
            variantKey: selectedVariantKey,
            variantName: selectedVariantKey.charAt(0).toUpperCase() + selectedVariantKey.slice(1),
            price: variantData.price,
            quantity: 1,
            image: product.image,
        };

        console.log("Item to add:", itemToAdd);

        setCartItems(prevItems => {
            console.log("Previous cart items:", prevItems);
            
            const existingItemIndex = prevItems.findIndex(
                item => item.productId === itemToAdd.productId && item.variantKey === itemToAdd.variantKey
            );

            let newItems;
            if (existingItemIndex > -1) {
                // If item exists, increase quantity
                newItems = [...prevItems];
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    quantity: newItems[existingItemIndex].quantity + 1
                };
                toast.success(`Increased quantity of ${itemToAdd.productName} (${itemToAdd.variantName}) in cart!`);
            } else {
                // If item doesn't exist, add new item
                newItems = [...prevItems, itemToAdd];
                toast.success(`${itemToAdd.productName} (${itemToAdd.variantName}) added to cart!`);
            }
            
            console.log("New cart items:", newItems);
            return newItems;
        });
    };

    const removeItemFromCart = (productId, variantKey) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.filter(
                item => !(item.productId === productId && item.variantKey === variantKey)
            );
            toast.info(`Removed item from cart.`);
            return updatedItems;
        });
    };

    const updateItemQuantity = (productId, variantKey, newQuantity) => {
        if (newQuantity <= 0) {
            removeItemFromCart(productId, variantKey);
            return;
        }

        setCartItems(prevItems => {
            return prevItems.map(item =>
                (item.productId === productId && item.variantKey === variantKey)
                    ? { ...item, quantity: Math.max(1, newQuantity) }
                    : item
            );
        });
    };

    const clearCart = () => {
        setCartItems([]);
        toast.info("Cart cleared!");
    };

    const getCartItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Debug: Log cart items whenever they change
    useEffect(() => {
        console.log('Cart items updated:', cartItems);
        console.log('Cart item count:', getCartItemCount());
    }, [cartItems]);

    return (
        <CartContext.Provider value={{
            cartItems,
            addItemToCart,
            removeItemFromCart,
            updateItemQuantity,
            clearCart,
            getCartItemCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook for easier consumption
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};