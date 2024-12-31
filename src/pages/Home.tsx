import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Post from '../components/Post';
import { async } from '../../node_modules/sucrase/dist/transformers/CJSImportTransformer';
import { useSelector } from 'react-redux';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const handleCreatePost = () => {
        navigate('/create-post');
    };
 

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            <main className="flex-grow p-4 flex flex-col items-center">
                <button
                    onClick={handleCreatePost}
                    className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                >
                    Create Post
                </button>
                <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 flex justify-center">
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-2xl">
                            <Post />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;