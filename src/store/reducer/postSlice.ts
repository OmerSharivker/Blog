import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';


// Define the Post type based on your API response structure
interface Post {
    _id: string;
    title: string;
    content: string;
    img: string;
    userName: string;
    numLikes: number;
    comments: number;
}

// Define the state type for the slice
interface PostState {
    posts: Post[]; 
    numLike: number;
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

export const setLike = createAsyncThunk(
    'posts/setLike',
    async (postId: string, { rejectWithValue, fulfillWithValue }) => {
        console.log(postId);
        try {
            const { data } = await api.put(`/posts/like/${postId}`, null, {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzNkY2VhMGUyNTBhYWRiMTI3YTE2NyIsImlhdCI6MTczNTY1MDMyNSwiZXhwIjoxNzM1NjUzOTI1fQ.cS6QVqplmpdX01_CTs0cHtw-EdEFH22t5R0tJrM_gUk"
                }
            });
            console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        numLike: 0,
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
            state.numLike = payload.getPosts.numLikes;
        })
        .addCase(setLike.fulfilled, (state, { payload }) => {
            state.numLike = payload.setLike.numLikes;
        })

    }

})

export const {messageClear} = postSlice.actions
export default postSlice.reducer