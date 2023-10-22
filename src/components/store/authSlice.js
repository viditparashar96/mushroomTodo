import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status:false,
  userData:null
}

export const authslice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state , action) => {
        state.status = true;
        state.userData=action.payload;
    },
    logout: (state , action) => {
        state.status = false;
        state.userData=null;
    },

  },
})

// Action creators are generated for each case reducer function
export const { login,logout } = authslice.actions

export default authslice.reducer