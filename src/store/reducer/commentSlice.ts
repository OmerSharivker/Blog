import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';
import { getAccessToken } from '../../utils/authUtils';



interface Post {
    _id: string;
    title: string;
    content: string;
    img: string;
    userName: string;
    numLikes: number;
    comments: number;
    userImg: string;
    postImg: string;
}
interface Comments {
    _id: string;
    content: string;
    postId: string;
    img: string;
    userName: string;
    ownerId: string | null;
}


interface CommentState {
    posts: Post | null; 
    comments: Comments[];
    errorMessage: string; 
    successMessage: string; 
}




export const get_comments = createAsyncThunk(
    'comment/get_comments',
    async (postId: string, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = await getAccessToken();
            const response = await api.get(`/comment/get-all-comments/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return fulfillWithValue(response.data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const get_post = createAsyncThunk(
    'comment/get_post',
    async (postId: string, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await api.get(`/posts/${postId}` );
            return fulfillWithValue(response.data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


export const add_comment = createAsyncThunk(
    'comment/add_comment',
    async ({ postId, content }: { postId: string; content: string }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = await getAccessToken();
            const response = await api.post(`/comment`, { postId,content }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return fulfillWithValue(response.data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const update_comment = createAsyncThunk(
    'comment/update_comment',
    async ({ commentId, content }: { commentId: string; content: string }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = await getAccessToken();
            const response = await api.put(`/comment/${commentId}`, {content }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return fulfillWithValue(response.data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const delete_comment = createAsyncThunk(
    'comment/delete_comment',
    async ( commentId : { commentId: string }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = await getAccessToken();
            const response = await api.delete(`/comment/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return fulfillWithValue(response.data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const commentSlice = createSlice({
    name: 'comment',    
    initialState: {
        posts: {
            _id: '',
            title: '',
            content: '',
            img: '',
            userName: '',
            numLikes: 0,
            comments: 0,
            userImg: '',
            postImg: ''
        },
        comments: [],
        errorMessage : '',
        successMessage: '',
    } as CommentState,
    reducers : {
        messageClear : (state) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
   
    },
    extraReducers: (builder) => {
        builder
        .addCase(get_comments.fulfilled, (state, { payload }) => {
            state.comments = payload.allComments;
        })
        .addCase(get_post.fulfilled, (state, { payload }) => {
            state.posts = payload.post;
        })
        .addCase(add_comment.fulfilled, (state, { payload }) => {
            state.comments.push(payload);
            state.successMessage = "Comment added successfully"
         
        })
        .addCase(update_comment.fulfilled, (state, { payload }) => {
           
            state.successMessage = "comment updated successfully"
        })
        .addCase(delete_comment.fulfilled, (state) => {
                    state.successMessage = "Post deleted successfully";
                })
       .addCase(delete_comment.rejected, (state) => {
                    state.errorMessage = "Error deleting post";
                })
        

    }

})

export const {messageClear} = commentSlice.actions
export default commentSlice.reducer