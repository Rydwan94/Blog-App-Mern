import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import themeReducer from '../features/theme/themeSlice'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'


const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch