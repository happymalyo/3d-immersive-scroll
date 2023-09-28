import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/Counter'
import zPositionReducer from './reducers/zPosition'

export default configureStore({
  reducer: {
    counter: counterReducer,
    position: zPositionReducer
  },
})