import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userDetailsSlice = createSlice({
  name : 'users',
  initialState : [],
  reducers : {
    setUserDetailsState(state,action){
      return action.payload
    }
  }
})

export const initializeUserDetails = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUserDetailsState(users))
  }
}

export default userDetailsSlice.reducer
export const { setUserDetailsState } = userDetailsSlice.actions