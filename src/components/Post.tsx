import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get_posts, setLike } from '../store/reducer/postSlice';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';

const Post: React.FC = () => {
    const { posts } = useSelector((state: RootState) => state.posts);
    const dispatch = useDispatch<AppDispatch>();

    const handleLike = (postId: string) => {
        dispatch(setLike(postId));
    };

    useEffect(() => {
        dispatch(get_posts());
    }, [dispatch]);

    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl">
            {posts.map(post => (
                <div key={post._id} className="bg-white shadow-md rounded-lg overflow-hidden relative">
                    <button className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                    
                    {/* Post Image */}
                    {post.img && (
                        <div className="w-full h-48 bg-gray-200">
                            <img
                                src={post.img}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* User Info */}
                    <div className="flex items-center p-4">
                        <img
                            src={post.img} // Replace this with `post.userImage` if you have a user-specific image field
                            alt={post.userName}
                            className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"
                        />
                        <h2 className="ml-4 text-xl font-bold">{post.userName}</h2>
                    </div>

                    {/* Post Content */}
                    <div className="p-4">
                        <p className="mt-2 text-gray-600 font-semibold">{post.title}</p>
                        <p className="mt-4 text-gray-800">{post.content}</p>
                    </div>

                    {/* Post Footer */}
                    <div className="p-4 flex justify-between items-center border-t">
                        <button
                            className="text-blue-500"
                            onClick={() => handleLike(post._id)}
                        >
                            ({post.numLikes}) Like
                        </button>
                        <Link to={`/comments/${post._id}`} className="text-blue-500">
                            ({post.comments}) Comments
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Post;