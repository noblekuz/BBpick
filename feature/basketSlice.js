import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let newBasket = [...state.items];

      if (index >=0){
        newBasket.splice(index, 1)
      }else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) since you no make any order for that`
        )
      }
      state.items = newBasket;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions

export const selectedBasketItem = (state) => state.basket.items

export const selectedBasketItemWithId = (state, id) => 
          state.basket.items.filter ((item)  => item.id === id);

export const selectedBasketTotal = (state) => state.basket.items.reduce(
          (total, item)=>total += item.price ,0)

export default basketSlice.reducer