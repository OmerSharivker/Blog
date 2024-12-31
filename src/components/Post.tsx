import React from 'react';
import { Link } from 'react-router-dom';

// interface PostProps {}

const Post: React.FC = () => {

    const posts = [
        {
            id: 1,
            author: 'Author 1',
            content: 'This is the content of the first post.',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            author: 'Author 2',
            content: 'This is the content of the second post.',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 3,
            author: 'Author 3',
            content: 'This is the content of the second post.',
            image: 'https://via.placeholder.com/150',
        },
        // Add more posts as needed
    ];

    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl">
            {posts.map(post => (
                <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden relative">
                    <button className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                    <div className="flex items-center p-4">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                        <h2 className="ml-4 text-xl font-bold">{post.author}</h2>
                    </div>
                    <div className="p-4">
                        <p className="mt-2 text-gray-600">{post.content}</p>
                        {post.image && <img src={post.image} alt={post.author} className="w-full h-48 object-cover mt-4" />}
                    </div>
                    <div className="p-4 flex justify-between items-center border-t">
                        <button className="text-blue-500">Like</button>
                        <Link to="/comments" className="text-blue-500">Comments</Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Post;
