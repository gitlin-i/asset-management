import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Assets } from '../domain/Domain'

// Define a type for the slice state


// Define the initial state using that type
const initialState: Assets = {
  stocks: [],
  cash: [],
  coins: [],
}

export const assetsSlice = createSlice({
  name: 'assets',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.example.value

export default counterSlice.reducer