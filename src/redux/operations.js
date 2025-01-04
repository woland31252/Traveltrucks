import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";



export const fetchAllCampers = createAsyncThunk(
  "campers/fetchAllCampers",
  async (limitApi,pageApi, thunkApi) => {
    try {
      const response = await axios.get("/campers", {
        params: {
          limit: limitApi,
          page: pageApi,
        },
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchCamperId = createAsyncThunk(
  "campers/fetchCamperId",
  async (id, thunkApi) => {
    try {
      const response = await axios.get(`/campers/${id}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
