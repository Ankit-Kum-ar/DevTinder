import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice'

const store = configureStore({
    reducer: {
        // Add the slice reducer here
        user: userSlice,
    }
})

export default store;