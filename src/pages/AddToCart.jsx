import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { addToCart, decreaseQuantity, increaseQuantity } from '../Redux/hiveSlice';

const AddToCart = ({ item, className, AddToCartStyle }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.hive); // Changed from products to cartItems
  const [cartProduct, setCartProduct] = useState(null);

  useEffect(() => {
    const existingProduct = cartItems?.find((product) => product._id === item._id);
    setCartProduct(existingProduct);
  }, [item, cartItems]);

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart`);
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(item._id));
    toast.success(`Increased quantity of ${item.name}`);
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(item._id));
    toast.info(`Decreased quantity of ${item.name}`);
  };

  return (
    <div className={twMerge(className)}>
      {cartProduct ? (
        <div className='w-full h-full flex items-center self-center gap-2'>
          <button
            disabled={cartProduct.quantity === 1}
            onClick={handleDecreaseQuantity}
            className='w-6 h-6 border inline-flex items-center cursor-pointer hover:bg-gray-800 hover:text-white duration-150 justify-center border-gray-400 disabled:text-gray-400 disabled:border-gray-200 disabled:hover:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-400'
          >
            <HiOutlineMinus className='text-sm' />
          </button>
          <p className='text-base font-semibold w-6 text-center'>{cartProduct.quantity}</p>
          <button
            onClick={handleIncreaseQuantity}
            className='w-6 h-6 border inline-flex items-center cursor-pointer hover:bg-gray-800 hover:text-white duration-150 justify-center border-gray-400'
          >
            <HiOutlinePlus className='text-sm' />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className={twMerge(
            'w-full text-black uppercase bg-neutral-300 text-sm font-semibold py-2 mt-2 hover:text-white hover:bg-black cursor-pointer duration-700 p-2',
            AddToCartStyle
          )}
        >
          Add To Cart
        </button>
      )}
    </div>
  );
};

export default AddToCart;