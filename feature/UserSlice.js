import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedInUser: {
    user:null,
    userSetting:null,
    userDetails:null
  },
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser : (state, action) => {
        state.loggedInUser = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = UserSlice.actions

export const theUser = (state) => state.user

export default UserSlice.reducer