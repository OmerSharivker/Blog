import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';
import { getAccessToken } from '../../utils/authUtils';


// Define the Post type based on your API response structure
interface Post {
    _id: string | null;
    title: string;
    content: string;
    img: string;
    userName: string;
    numLikes: number | null;
    comments: number | null;
    userImg: string | null;
    postImg: string | null;
    ownerId: string | null;
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
            const token = await getAccessToken();
            const { data } = await api.put(`/posts/like/${postId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);



export const create_post = createAsyncThunk(
    'posts/create_post',
    async (postData: Post, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = await getAccessToken();
            const { data } = await api.post('/posts', postData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


interface UpdatePostParams {
    postData: Post | null;
    postId: string | null;
}

export const update_post = createAsyncThunk(
    'posts/update_post',
    async ({ postData, postId }: UpdatePostParams, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = await getAccessToken();
            const { data } = await api.put(`/posts/${postId}`, postData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


export const delete_post = createAsyncThunk(
    'posts/update_post',
    async ( postId : UpdatePostParams, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = await getAccessToken();
            const { data } = await api.delete(`/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
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
        
            if (post) {
                post.numLikes = payload.post.numLikes;
            }
            state.successMessage = payload.message;
        })
        .addCase(create_post.rejected, (state) => {
            state.errorMessage = "Error creating post";
        })
        // .addCase(update_post.rejected, (state) => {
        //     state.errorMessage = "Error creating post";
        // })
        .addCase(delete_post.fulfilled, (state) => {
            state.successMessage = "Post deleted successfully";
        })
        .addCase(delete_post.rejected, (state) => {
            state.errorMessage = "Error deleting post";
        })
    }

})

export const {messageClear} = postSlice.actions
export default postSlice.reducer