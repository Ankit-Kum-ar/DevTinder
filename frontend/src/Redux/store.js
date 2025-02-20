import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice'
import feedSlice from './Slices/feedSlice'
import connectionSlice from './Slices/connectionSlice'
import requestSlice from './Slices/requestSlice'

const store = configureStore({
    reducer: {
        // Add the slice reducer here
        user: userSlice,
        feed: feedSlice,
        connections: connectionSlice,
        requests: requestSlice
    }
})

export default store;