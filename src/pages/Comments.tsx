import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { get_comments, get_post, add_comment, messageClear } from '../store/reducer/commentSlice';
import { AppDispatch, RootState } from '../store/store';
import { toast } from 'react-toastify';
import { local } from '../api/api';

const Comments: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { posts, comments, errorMessage, successMessage } = useSelector((state: RootState) => state.comments);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if (postId) {
            dispatch(get_post(postId));
            dispatch(get_comments(postId));
        }
    }, [dispatch, postId]);

    const handleAddComment = () => {
        if (postId && newComment.trim()) {
            dispatch(add_comment({ postId, content: newComment }));
            setNewComment('');
        }
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
    }, [successMessage, dispatch]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-4">
                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden relative">
                    <div className="flex items-center p-4">
                        {posts && (
                            <>
                                <img src={posts.userImg} alt={posts.userName} className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0" />
                                <h2 className="ml-4 text-xl font-bold">{posts.userName}</h2>
                            </>
                        )}
                    </div>
                    {posts && posts.postImg && (
                        <div className="w-full h-48 bg-gray-200">
                            <img
                                src={`${local}${posts.postImg}`}
                                alt={posts.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <div className="p-4">
                        {posts && (
                            <>
                                <p className="mt-2 text-gray-600">{posts.title}</p>
                                <div
                                    className="mt-4 text-gray-800"
                                    dangerouslySetInnerHTML={{ __html: posts.content }}
                                />
                            </>
                        )}
                    </div>
                </div>
                <div className="max-w-2xl mx-auto mt-4">
                    <h3 className="text-lg font-semibold mb-2">Comments</h3>
                    <div className="space-y-4">
                        {comments.map(comment => (
                            <div key={comment._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                                    <h4 className="ml-3 text-md font-semibold">{comment.userName}</h4>
                                </div>
                                <p className="mt-2 text-gray-600">{comment.content}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Add a comment..."
                        />
                        <button
                            onClick={handleAddComment}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Add Comment
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Comments;