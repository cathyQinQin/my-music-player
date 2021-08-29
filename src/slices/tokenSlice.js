import { createSlice } from '@reduxjs/toolkit'

// Define the initial state using that type
const initialState = {
    value: "",
    expired: true
}

export const token = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = action.payload
        },
        setTokenisExpired: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.expired = true
        },
        setTokenisNotExpired: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.expired = false
        },
    },
})

// Action creators are generated for each case reducer function
export const { setToken, setTokenisExpired, setTokenisNotExpired } = token.actions

export default token.reducer