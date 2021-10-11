
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import AnecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'


const reducer = combineReducers({
  anecdotes: AnecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools())

export default store