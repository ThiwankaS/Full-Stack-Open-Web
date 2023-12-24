import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    type : 'default',
    content : 'default',
    visibility : false
}

const notificationSlice = createSlice({
    name : 'notification',
    initialState,
    reducers : {
        setNotification (state,action) {
            return action.payload
        }
    }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer