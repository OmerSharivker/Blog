// filepath: /Users/omersharivker/dev/front_blog/src/pages/Profile.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setName, setImage } from '../store/reducer/userSlice';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Post from '../components/Post';

const Profile: React.FC = () => {
    const dispatch = useDispatch();
    const userName = useSelector((state: RootState) => state.user.name);
    const userImage = useSelector((state: RootState) => state.user.image);
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(userName);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    };

    const handleNameSubmit = () => {
        dispatch(setName(newName));
        toast.success('Username updated successfully!');
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setNewName(userName);
        setIsEditing(false);
    };

    const handleImageChange = () => {
        // Logic to change the user image
        console.log('Change user image');
        toast.info('User image change functionality is not implemented yet.');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-4 flex justify-center">
                <div className="flex flex-col md:flex-row w-full max-w-5xl">
                    <div className="md:w-1/3 flex flex-col items-center md:items-end mb-8 md:mb-0">
                        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                            <h2 className="text-2xl font-bold mb-4">{userName}</h2>
                            <div className="relative mb-4">
                                <img
                                    src={userImage}
                                    alt="User"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                                />
                                <button
                                    onClick={handleImageChange}
                                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15.232 5.232l3.536 3.536M9 13h3l7-7a2.828 2.828 0 10-4-4l-7 7v3zm0 0L3 21h3l3-3z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            {isEditing ? (
                                <div className="w-full">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                                        Change Name
                                    </label>
                                    <input
                                        id="userName"
                                        type="text"
                                        value={newName}
                                        onChange={handleNameChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your name"
                                    />
                                    <div className="flex justify-between mt-2">
                                        <button
                                            onClick={handleNameSubmit}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                >
                                    Edit Name
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="md:w-2/3 md:ml-4">
                        <h2 className="text-xl font-bold mb-4">User Posts</h2>
                        <Post />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;