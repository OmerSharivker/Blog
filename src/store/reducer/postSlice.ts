import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';


// Define the Post type based on your API response structure
interface Post {
    id: number;
    title: string;
    content: string;
}

// Define the state type for the slice
interface PostState {
    posts: Post[]; 
    errorMessage: string; 
    successMessage: string; 
}


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
    name: 'posts',
    initialState: {
        posts: [],
        errorMessage : '',
        successMessage: '',
    } as PostState,
    reducers : {
        messageClear : (state) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
   
    },
    extraReducers: (builder) => {
        builder
        .addCase(get_posts.fulfilled, (state, { payload }) => {
            state.posts = payload.getPosts;
        })

    }

})

export const {messageClear} = postSlice.actions
export default postSlice.reducer