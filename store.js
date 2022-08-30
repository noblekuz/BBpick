import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './feature/basketSlice'
import restaurantReducer from './feature/RestaurantSlice'

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer

  },
})
