import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCampers, fetchCamperId } from "../operations";


const camperInitlState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const sliceCamper = createSlice({
  name: "camper",
  initialState: camperInitlState,
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllCampers.pending, handlePending)
      .addCase(fetchAllCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllCampers.rejected, handleError)
      .addCase(fetchCamperId.pending, handlePending)
      .addCase(fetchCamperId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.id = action.payload.id;
      })
      .addCase(fetchCamperId.rejected, handleError),
});

export default sliceCamper.reducer;
