import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: [],
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        }
    }
});

export const { addFeed } = feedSlice.actions;

export default feedSlice.reducer;