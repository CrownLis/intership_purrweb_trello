import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../../Types/types";

type UserSliceType = {
    user: UserType | null
}

const initialState:UserSliceType = {
    user: null
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
setUser(state,action:PayloadAction<UserType>) {
    state.user = action.payload
}
    }
})

export default userSlice

export const {setUser} = userSlice.actions