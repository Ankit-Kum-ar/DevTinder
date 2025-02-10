import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice'
import feedSlice from './Slices/feedSlice'

const store = configureStore({
    reducer: {
        // Add the slice reducer here
        user: userSlice,
        feed: feedSlice
    }
})

export default store;