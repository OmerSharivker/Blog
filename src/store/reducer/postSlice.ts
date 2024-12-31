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
    errorMessage: string; 
    successMessage: string; 
}


export const get_posts = createAsyncThunk(
    'posts/get_posts',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.get('/posts')
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const setLike = createAsyncThunk(
    'posts/setLike',
    async (postId: string, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/posts/like/${postId}`, null, {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzNkYjMxNTQ2ZWFkMTdhMzc0NjNjYiIsImlhdCI6MTczNTY1NTA5MiwiZXhwIjoxNzM1NjU4NjkyfQ.IzdI5wCf0LwuKKm9p1p9yuJCYqVKk9fZ6CtL6qwS9Yk"
                }
            });
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
        .addCase(setLike.fulfilled, (state, { payload }) => {
            const post = state.posts.find(post => post._id === payload.post._id);
            console.log(post);
            if (post) {
                post.numLikes = payload.post.numLikes;
            }
            state.successMessage = payload.message;
        })
        

    }

})

export const {messageClear} = postSlice.actions
export default postSlice.reducer