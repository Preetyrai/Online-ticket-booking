import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
name:"user",
initialState: {
userDetails : null
},
reducers: {
    userEntryAction : (state, action) => {
        state.userDetails = action.payload
    },
    removeUserAction : (state)=> {
        state.userDetails = null
    }
}
});


export const {userEntryAction, removeUserAction} = userSlice.actions;
 export default userSlice.reducer;