import { configureStore } from '@reduxjs/toolkit'
import exampleSlice from '../slice/exampleSlice'
import assetsSlice from '../slice/assetsSlice'

export const store = configureStore({
  reducer: {
    example: exampleSlice,
    assets : assetsSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch