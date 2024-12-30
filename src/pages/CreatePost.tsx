import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (value: string) => {
        setContent(value);
    };

    const handleSubmit = () => {
        // Handle the form submission
        console.log('Title:', title);
        console.log('Content:', content);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-4 flex justify-center items-center">
                <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter the title"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                            Content
                        </label>
                        <ReactQuill
                            value={content}
                            onChange={handleContentChange}
                            className="bg-white"
                            theme="snow"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CreatePost;