import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { create_post } from '../store/reducer/postSlice';
import { toast } from 'react-toastify';
import api from '../api/api';
import { getAccessToken } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState<File | null>(null); // File input for post image
    const [loading, setLoading] = useState(false);
    const [userName] = useState('John Doe'); // Replace with actual user info from state
    const [profileImage] = useState('/path/to/profile.jpg'); // Replace with actual profile image
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (value: string) => {
        setContent(value);
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!title || !content || !photo) {
            toast.error('Please fill in all fields and upload a photo');
            return;
        }

        setLoading(true);
        try {
            // Upload the photo
            const formData = new FormData();
            formData.append('photo', photo);
            const token = await getAccessToken();
            const photoResponse = await api.post('/posts/upload', formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });
            const photoUrl = photoResponse.data.url;
            const postData = {
                title,
                content,
                img: photoUrl,
                userName,
                userImage: profileImage,
                _id : null,
                numLikes : 0,
                comments : 0,
                postImg : null,
                userImg : null
            };

            // Create the post
            dispatch(create_post(postData));
        } catch (error) {
            console.error('Error creating post:', error);
            // Display a toast notification for error
            toast.error('Failed to create the post');
        } finally {
            toast.success('Post created successfully!');
            navigate('/');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            <main className="flex-grow p-4 flex justify-center items-center">
                <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create a New Post</h2>
                    <div className="mb-6 flex items-center gap-4">
                        <img src={profileImage} alt={userName} className="w-12 h-12 rounded-full" />
                        <p className="text-lg font-bold text-gray-700">{userName}</p>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter the title"
                        />
                    </div>
                    <div className="mb-6">
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
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                            Upload Photo
                        </label>
                        <input
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="w-full"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CreatePost;
