import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blog'

const bloglistSlice = createSlice({
  name : 'blogs',
  initialState : [],
  reducers : {
    setBloglist(state,action) {
      return action.payload
    },
    appendBloglist(state,action) {
      return state.concat(action.payload)
    },
    updateBloglist(state,action) {
      return state.map(blogList => blogList.id !== action.payload.id ? blogList : action.payload)
    }
  }
})

export const { setBloglist,appendBloglist,updateBloglist } = bloglistSlice.actions
export default bloglistSlice.reducer

export const initializeBlogList = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBloglist(blogs))
  }
}

export const createBlogList = (blogList) => {
  return async (dispatch) => {
    const newBlogList = await blogService.createRecord(blogList)
    dispatch(appendBloglist(newBlogList))
  }
}