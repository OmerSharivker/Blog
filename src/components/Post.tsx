import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { delete_post, get_posts, setLike } from '../store/reducer/postSlice';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { local } from '../api/api';
import parse from 'html-react-parser';
import { FaEdit, FaHeart, FaRegCommentDots, FaTrashAlt } from 'react-icons/fa'; // Importing Font Awesome icons
import Pagination from './Pagination';
import Loader from './Loader';

const Post: React.FC = () => {
    const { posts,  totalPages,currentPage, loading } = useSelector((state: RootState) => state.posts);
    const { userId } = useSelector((state: RootState) => state.user);
    const [currentPagee, setCurrentPage] = useState(currentPage);
    const [postsPerPage] = useState(2);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLike = (postId: string) => {
        dispatch(setLike(postId));
    };
    const handleEdit = (postId: string) => {
        navigate(`/edit-post/${postId}`);
    };
    const handleDelete = (postId: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            dispatch(delete_post({
                postId,
                postData: null
            }));
        }
    };

    useEffect(() => {
        dispatch(get_posts({ page: currentPagee, limit: postsPerPage }));
    }, [dispatch, currentPagee, postsPerPage]);

    const currentPosts = posts
   


    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };
    return (
        <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
            {loading ? (
            <Loader />
            ) : (
            <>
                {currentPosts.map(post => (
                <div key={post._id} className="bg-white shadow-md rounded-lg overflow-hidden relative">
                    {post.ownerId === userId && (
                    <div className="absolute top-2 right-2 flex space-x-2">
                        <button
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                        onClick={() => post._id && handleEdit(post._id)}
                        >
                        <FaEdit />
                        </button>
                        <button
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                        onClick={() => post._id && handleDelete(post._id)}
                        >
                        <FaTrashAlt />
                        </button>
                    </div>
                    )}

                    {/* Post Image */}
                    {post.postImg && (
                    <div className="w-full h-48 bg-gray-200">
                        <img
                        src={`${local}${post.postImg}`}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        />
                    </div>
                    )}

                    {/* User Info */}
                    <div className="flex items-center p-4">
                    <img
                        src={`${local}${post.userImg}`} // Replace this with `post.userImage` if you have a user-specific image field
                        alt={post.userName}
                        className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"
                    />
                    <h2 className="ml-4 text-xl font-bold">{post.userName}</h2>
                    </div>

                    {/* Post Content */}
                    <div className="p-4">
                    {/* Styled Title */}
                    <p className="mt-2 text-gray-800 font-serif text-2xl font-bold tracking-wide leading-tight">
                        {post.title}
                    </p>
                    <div className="mt-4 text-gray-700">{parse(post.content)}</div>
                    </div>

                    {/* Post Footer */}
                    <div className="p-4 flex justify-between items-center border-t">
                    {/* Like Button */}
                    <button
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition"
                        onClick={() => post._id && handleLike(post._id)}
                    >
                        {post.likes.includes(userId) ? <FaHeart className="text-red-500" /> : <FaHeart className="text-gray-500" />}
                        <span className="text-gray-800 font-medium">{post.numLikes}</span>
                    </button>

                    {/* Comments Link */}
                    <Link
                        to={`/comments/${post._id}`}
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition"
                    >
                        <FaRegCommentDots /> {/* Comment Icon */}
                        <span className="text-gray-800 font-medium">{post.comments}</span>
                    </Link>
                    </div>
                </div>
                ))}
                <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                />
            </>
            )}
        </div>
    );
};

export default Post;

