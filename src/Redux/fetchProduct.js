import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk(
  'hive/fetchProduct',
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching products from API...");
      const res = await axios.get("http://localhost:5000/api/admin/getProducts");
      
      console.log("API Response from redux fetchProduct:", res.data);
      
      // Check for successful status (2xx range)
      if (res.status >= 200 && res.status < 300) {
        console.log("Products data:", res.data);
        return res.data;
      } else {
        throw new Error(`Request failed with status ${res.status}`);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // Return error message with rejectWithValue
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);