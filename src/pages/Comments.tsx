import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Comments: React.FC = () => {
    const post = {
        author: 'Author Name',
        content: 'This is the content of the post.',
        image: 'https://via.placeholder.com/150',
    };

    const comments = [
        { id: 1, author: 'Commenter 1', content: 'This is the first comment.' },
        { id: 2, author: 'Commenter 2', content: 'This is the second comment.' },
        // Add more comments as needed
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-4">
                <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                            <h2 className="ml-4 text-xl font-bold">{post.author}</h2>
                        </div>
                        <p className="mt-2 text-gray-600">{post.content}</p>
                        {post.image && <img src={post.image} alt={post.author} className="w-full h-48 object-cover mt-4" />}
                    </div>
                </div>
                <div className="max-w-2xl mx-auto mt-4">
                    <h3 className="text-lg font-semibold mb-2">Comments</h3>
                    <div className="space-y-4">
                        {comments.map(comment => (
                            <div key={comment.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                                    <h4 className="ml-3 text-md font-semibold">{comment.author}</h4>
                                </div>
                                <p className="mt-2 text-gray-600">{comment.content}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <h4 className="text-md font-semibold mb-2">Add a Comment</h4>
                        <div className="flex">
                            <input
                                type="text"
                                className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Write a comment..."
                            />
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">Add</button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Comments;