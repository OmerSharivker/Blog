import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';



interface Post {
    _id: string;
    title: string;
    content: string;
    img: string;
    userName: string;
    numLikes: number;
    comments: number;
}
interface Comments {
    _id: string;
    content: string;
    postId: string;
    img: string;
    userName: string;
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
            const response = await api.get(`/comment/get-all-comments/${postId}`, {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzQxNzI5MWYwYTQ0M2ZlMDc3OGU4MSIsImlhdCI6MTczNTY2MTM2NSwiZXhwIjoxNzM1NjY0OTY1fQ.PkYGBZP0LMHdDnrChdh5TefuUnQFs4WbsZLGymtRWDw"
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
            const response = await api.post(`/comment`, { postId,content }, {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzQxNzI5MWYwYTQ0M2ZlMDc3OGU4MSIsImlhdCI6MTczNTY2MjY3NywiZXhwIjoxNzM1NjY2Mjc3fQ.l0rafYalzL4ZN_Dy6mAdFnd9lSEZ5kv-hKRVX4TBUUA"
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
            comments: 0
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
        

    }

})

export const {messageClear} = commentSlice.actions
export default commentSlice.reducer