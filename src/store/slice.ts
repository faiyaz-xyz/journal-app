import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: {
    user: null,
  },
  reducers: {
    loggedUser: (state, actions) => {
        state.user = actions.payload
        localStorage.setItem("userData", JSON.stringify(actions.payload))
    }
  },
})

export const { loggedUser } = authSlice.actions

export default authSlice.reducer