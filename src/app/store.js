import { configureStore } from '@reduxjs/toolkit'
import musicListReducer from '../slices/musicListSlice'
import tokenReducer from '../slices/tokenSlice'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
const store = configureStore({
  reducer: {
    musicList: musicListReducer,
    token: tokenReducer,
  },
})
export default store