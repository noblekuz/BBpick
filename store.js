import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './feature/basketSlice'
import restaurantReducer from './feature/RestaurantSlice'
import userReducer from './feature/UserSlice'

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer,
    user: userReducer
  },
})
