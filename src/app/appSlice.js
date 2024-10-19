import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    drawerHome: false,
    drawerHomeMenuItemClicked: false,
    drawer: false,
    drawerMenuItemClicked: false,
    loggedIn: false,
    userId: '',
    email: '',
    admin: false,
    photoUrl: '',
    displayName: '',
    activeSubscriptions: '',
    freeTrial: false,
    checkOut: '',
    credit: ''
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