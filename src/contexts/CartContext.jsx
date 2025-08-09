// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/firebase'; // Make sure this path is correct
import { collection, serverTimestamp, setDoc, doc } from 'firebase/firestore';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // To wait for auth check

    // Firebase Auth listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);
    useEffect(() => {
        if (user) {
            try {
                const savedCart = localStorage.getItem(`cartItems_${user.uid}`);
                setCartItems(savedCart ? JSON.parse(savedCart) : []);
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        } else {
            setCartItems([]);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            try {
                localStorage.setItem(`cartItems_${user.uid}`, JSON.stringify(cartItems));
            } catch (error) {
                console.error('Error saving cart to localStorage:', error);
            }
        }
    }, [cartItems, user]);

    const checkOut = async () => {
        if (!user) {
            toast.error("You must be login to view your cart. Please login to continue");
            return;
        }
        if (cartItems.length == 0) {
            toast.message("Please add Items here");
        }
        try {
            const orderId = `ORD-${new Date().getFullYear()}-${Date.now()}`;
            const userOrderRef = collection(db, "users", user.uid, "Orders")

            await setDoc(doc(userOrderRef, orderId), {
                orderId: orderId,
                items: cartItems,
                totalAmount: cartItems.reduce((sum, item) => sum + parseFloat(item.price.replace('Rs ', '')) * item.quantity, 0).toFixed(2),
                createdAt: serverTimestamp()
            });
            toast.success("Your Order has been placed Successfully.")
            clearCart()

        } catch (error) {
            toast.error("Error placing order please try again later", error);
            console.error("failed to place order", error)

        }
    }

    const addItemToCart = (product, selectedVariantKey) => {
        if (!user) {
            toast.error("You must be logged in to add items to the cart.");
            return;
        }

        const variantData = product.variants[selectedVariantKey];
        if (!variantData) {
            toast.error("Invalid product variant.");
            return;
        }

        const productId = product.id || product.name.toLowerCase().replace(/\s+/g, '-');

        const itemToAdd = {
            productId,
            productName: product.name,
            variantKey: selectedVariantKey,
            variantName: selectedVariantKey.charAt(0).toUpperCase() + selectedVariantKey.slice(1),
            price: variantData.price,
            quantity: 1,
            image: product.image,
        };

        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                item => item.productId === productId && item.variantKey === selectedVariantKey
            );

            let newItems;
            if (existingItemIndex > -1) {
                newItems = [...prevItems];
                newItems[existingItemIndex].quantity += 1;
                toast.success(`Increased quantity of ${itemToAdd.productName} (${itemToAdd.variantName})`);
            } else {
                newItems = [...prevItems, itemToAdd];
                toast.success(`${itemToAdd.productName} (${itemToAdd.variantName}) added to cart!`);
            }

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

    if (loading) {
        return <p>Loading cart...</p>; // or a spinner
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            addItemToCart,
            removeItemFromCart,
            updateItemQuantity,
            clearCart,
            checkOut,
            getCartItemCount,
            user
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
