import React, { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { create_post } from '../store/reducer/postSlice';
import { toast } from 'react-toastify';
import api, { local } from '../api/api';
import { getAccessToken } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';  


const CreatePost: React.FC = () => {
    interface CroppedArea {
        x: number;
        y: number;
        width: number;
        height: number;
      }
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string>("");
    const [croppedArea, setCroppedArea] = useState<CroppedArea>({ x: 0, y: 0, width: 0, height: 0 });
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [loading, setLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false); // AI loading state
    const { userName, image } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            toast.error('You must log in to access this page.');
            navigate('/login');
        }
    }, [navigate]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (value: string) => {
        setContent(value);
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const generateContent = async () => {
        if (!title.trim()) {
            toast.error('Please enter a title to generate content');
            return;
        }

        setAiLoading(true);

        try {
            const response = await api.post('/posts/ai', { title });
            const generatedContent = response.data.content.trim()
            if (generatedContent) {
                setContent(generatedContent);
                toast.success('Content generated successfully!');
            } else {
                toast.error('Failed to generate content. Try again.');
            }
        } catch (error) {
            console.error('Error generating content:', error);
            toast.error('Failed to generate content. Try again.');
        } finally {
            setAiLoading(false);
        }
    };

    const onCropComplete = useCallback((croppedArea :CroppedArea,croppedAreaPixels: CroppedArea) => {
        setCroppedArea(croppedArea);
        setCroppedArea(croppedAreaPixels);
    }, []);

    const handleSaveCroppedImage = async () => {
        if (!photo || !croppedArea) return;

        try {
            const croppedImage = await getCroppedImg(photoPreview, croppedArea);
            setPhoto(croppedImage);
            setPhotoPreview(URL.createObjectURL(croppedImage));
            setZoom(1);
        } catch (error) {
            console.error('Error cropping image:', error);
            toast.error('Failed to crop image. Try again.');
        }
    };


    const handleSubmit = async () => {
        if (!title || !content || !photo) {
            toast.error('Please fill in all fields and upload a photo');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('photo', photo);
            const token = await getAccessToken();
            const photoResponse = await api.post('/posts/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            const photoUrl = photoResponse.data.url;

            const postData = {
                title,
                content,
                img: photoUrl,
                userName,
                userImage: image,
                _id: null,
                numLikes: 0,
                comments: 0,
                postImg: null,
                userImg: null,
                ownerId: null,
                likes: [],
                createdAt: new Date().toISOString(),
            };

            dispatch(create_post(postData));
        } catch (error) {
            console.error('Error creating post:', error);
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
                        <img src={`${local}${image}`} alt={userName} className="w-12 h-12 rounded-full" />
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
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-gray-700 text-sm font-bold" htmlFor="content">
                            Content
                        </label>
                        <button
                            onClick={generateContent}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-xl"
                            disabled={aiLoading}
                        >
                            {/* Two stars */}
                            <FaStar className="text-yellow-300" />
                            <span>{aiLoading ? 'Generating...' : 'Generate a post based on your title'}</span>
                            <FaStar className="text-yellow-300" />
                        </button>
                    </div>
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
                          {photoPreview && (
                            <div className="mt-4 relative w-full h-64 bg-gray-200">
                                <Cropper
                                    image={photoPreview}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={7 / 2}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                />
                                <button
                                    onClick={handleSaveCroppedImage}
                                    className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                >
                                    Save Cropped Image
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-xl"
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
