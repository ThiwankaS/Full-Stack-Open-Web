import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blog'
import { setNotification } from './notificationReducer'

const bloglistSlice = createSlice({
  name : 'blogs',
  initialState : [],
  reducers : {
    setBloglistState(state,action) {
      return action.payload
    },
    appendBloglistState(state,action) {
      return state.concat(action.payload)
    },
    updateBloglistState(state,action) {
      return state.map(blog => blog.id !== action.payload.id ? blog : action.payload)
    },
    removeBlogListState(state,action) {
      return state.filter(blog => blog !== action.payload.id)
    }
  }
})

export const { setBloglistState,appendBloglistState,updateBloglistState,removeBlogListState } = bloglistSlice.actions
export default bloglistSlice.reducer

export const initializeBlogList = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBloglistState(blogs))
  }
}

export const createBlogList = (recordToCreate) => {
  return async (dispatch) => {
    const newBlogList = await blogService.createRecord(recordToCreate)
    dispatch(appendBloglistState(newBlogList))
  }
}

export const deleteBlogList = (recordToDelete) => {
  return async (dispatch) => {
    await blogService.deleteRecord(recordToDelete)
    dispatch(removeBlogListState(recordToDelete))
  }
}

export const updateBlogList = (recordToUpdate) => {
  return async (dispatch) => {
    const updatedList = await blogService.updateRecord(recordToUpdate)
    dispatch(updateBloglistState(updatedList))
  }
}

export const addCommentToBlogList = (recordToUpdate) => {
  return async (dispatch) => {
    const updatedList = await blogService.addComment(recordToUpdate)
    dispatch(updateBloglistState(updatedList))
  }
}