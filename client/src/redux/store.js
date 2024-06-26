import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './User/userSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'
import watchlistReducer from './Watchlist/watchlistSlice'

const persistConfig ={
  key:'root',
  version:1,
  storage
}

const rootReducer = combineReducers({user:userReducer,watchlist:watchlistReducer})

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false
  })
})

export const persistor = persistStore(store)