import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';



export const get_posts = createAsyncThunk(
    'posts/get_posts',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.get('/posts')
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        post: {},
        errorMessage : '',
        successMessage: '',
    },
    reducers : {
        messageClear : (state) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
   
    },
    extraReducers: (builder) => {
        builder
        .addCase(get_posts.fulfilled, (state, { payload }) => {
            state.posts = payload.posts;
        })

    }

})

export const {messageClear} = postSlice.actions
export default postSlice.reducer