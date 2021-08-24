import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { reducer, initialState}  from '../reducer'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
const store = createStore(reducer, initialState)
//
import {
  setUser,
  setToken,
} from '../actions'

// 打印初始状态
console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
const unsubscribe = store.subscribe(() => console.log(store.getState()))

// 发起一系列 action
store.dispatch(setUser('Learn about actions'))
store.dispatch(setToken('Learn about reducers'))
// Safe to add dispatch to the dependencies array

// 停止监听 state 更新
// unsubscribe()
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
