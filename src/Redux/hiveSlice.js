import { createSlice } from "@reduxjs/toolkit";
import { fetchProduct } from "./FetchProduct.js";
// import AddToCart from "../pages/AddToCart";
const initialState = {
    products: [], 
    cartItems: [],
    loading: false,
    error: null,
  };

export const hiveSlice = createSlice({
    name:'hive',
    initialState,
    reducers: {
        addToCart: (state, action) => {
          const existingItem = state.cartItems.find(
            (item) => item._id === action.payload._id
          );
          
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            state.cartItems.push({ ...action.payload, quantity: 1 });
          }
          console.log("Updated Cart:", state.cartItems);
        },
        increaseQuantity: (state, action) => {
          const existingProduct = state.cartItems.find(
            (item) => item._id === action.payload
          );
          if (existingProduct) {
            existingProduct.quantity++;
          }
        },
        decreaseQuantity: (state, action) => {
          const existingProduct = state.cartItems.find(
            (item) => item._id === action.payload
          );
          if (existingProduct) {
            existingProduct.quantity = Math.max(1, existingProduct.quantity - 1);
          }
        },
        deleteProduct: (state, action) => {
          state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
        },
        resetCart: (state) => {
          state.cartItems = [];
        },
      },
    extraReducers: (builder) => {
        builder
          .addCase(fetchProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload; // Or state.cart.products if using nested structure
          })
          .addCase(fetchProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Something went wrong";
          });
      }
      
})


export const { addToCart ,increaseQuantity,decreaseQuantity,deleteProduct,resetCart} = hiveSlice.actions;
export default hiveSlice.reducer;