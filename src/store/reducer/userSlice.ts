import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface UserState {
    name: string;
    image: string;
}

const initialState: UserState = {
    name: 'User Name',
    image: 'path_to_user_image',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setImage: (state, action: PayloadAction<string>) => {
            state.image = action.payload;
        },
    },
});

export const { setName, setImage } = userSlice.actions;
export default userSlice.reducer;