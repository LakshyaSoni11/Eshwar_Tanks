import React from 'react';
import { useCart } from '../contexts/CartContext.jsx'; 
import { TrashIcon } from '@heroicons/react/24/outline';


const CartPage = () => {
    const { cartItems, removeItemFromCart, updateItemQuantity, clearCart, checkOut} = useCart();
    console.log("cart page data ",cartItems)
    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + parseFloat(item.price.replace('Rs ', '')) * item.quantity, 0).toFixed(2);
    };
    
    if (cartItems.length === 0) {
        return (
            <div className="max-w-4xl mx-auto py-16 md:py-24 px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-800">Your Cart is Empty</h2>
                <p className="mt-4 text-lg text-gray-600">Add some products to get started!</p>
            </div>
        );
    }
    
    return (
        <div className="max-w-4xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white rounded-2xl shadow-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-10">Your Shopping Cart</h1>

            <div className="space-y-8">
                {cartItems.map(item => (
                    <div key={`${item.productId}-${item.variantKey}`} className="flex items-center border-b pb-6 last:border-b-0 last:pb-0">
                        <img src={item.image} alt={item.productName} className="w-24 h-24 object-cover rounded-lg mr-6" />
                        <div className="flex-grow">
                            <h3 className="text-xl font-semibold text-gray-800">{item.productName} ({item.variantName})</h3>
                            <p className="text-gray-600 mt-1">{item.price} x {item.quantity}</p>
                            <div className="flex items-center mt-3">
                                <button
                                    onClick={() => updateItemQuantity(item.productId, item.variantKey, item.quantity - 1)}
                                    className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-100"
                                    >
                                    -
                                </button>
                                <span className="mx-3 text-lg font-medium">{item.quantity}</span>
                                <button
                                    onClick={() => updateItemQuantity(item.productId, item.variantKey, item.quantity + 1)}
                                    className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-100"
                                    >
                                    +
                                </button>
                                <button
                                    onClick={() => removeItemFromCart(item.productId, item.variantKey)}
                                    className="ml-auto text-red-500 hover:text-red-700"
                                    >
                                    <TrashIcon className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 ml-8">Rs {(parseFloat(item.price.replace('Rs ', '')) * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200 flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">Total:</h2>
                <p className="text-4xl font-extrabold text-gray-900">Rs {calculateTotal()}</p>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <button
                    onClick={clearCart}
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                    Clear Cart
                </button>
                <button onClick={checkOut} className="px-8 py-3 bg-[#005595] text-white rounded-lg font-semibold hover:bg-[#004477] transition-colors">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default CartPage;

