import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    drawer: false,
    drawerMenuItemClicked: false,
    loggedIn: false,
    photoUrl: '',
    displayName: '',
    email: '',
    userId: '' 
  },
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateAppState: (state, action) => {
      state.value = action.payload;
    }
  },
})

export const { updateAppState } = appSlice.actions;

export const appState = (state) => state.app.value;

export default appSlice.reducer;