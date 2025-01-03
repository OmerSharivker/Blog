import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../utils/authUtils';
import { AppDispatch, RootState } from '../store/store';
import { getUserInfo, logoutUser } from '../store/reducer/userSlice';
import { local } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {userName} = useSelector((state: RootState) => state.user);
    let image = useSelector((state: RootState) => state.user.image);
    image = image ? `${local}${image}` : `${local}/image.png`;
    const isLogIn = !!localStorage.getItem('accessToken');

    useEffect(() => {
        if (isLogIn) {
            dispatch(getUserInfo());
        } else {
            dispatch(logoutUser());
        }
    }, [dispatch, isLogIn]);

    const sign = isLogIn ? "Log Out" : "Log In";

    return (
        <header className="bg-gray-800 p-4">
            <div className="container mx-auto flex items-center">
                {/* Left: Logo */}
                <div className="flex items-center w-1/4">
                    <img
                        src={`${local}/blog.png`}
                        alt="Logo"
                        className="w-10 h-10"
                    />
                </div>

                {/* Center: Blog Link */}
                <div className="flex-1 text-center">
                    <a href="/" className="text-white text-lg font-semibold">
                        Blog
                    </a>
                </div>

                {/* Right: User Info */}
                <div className="flex items-center justify-end w-1/4 space-x-4">
                <Link to="/profile" className="text-white text-lg">
                        {userName}
                    </Link>
                    <Link to="/profile">
                        <img
                            src={image}
                            alt="User"
                            className="w-10 h-10 rounded-full"
                        />
                    </Link>
                    <button
                        onClick={async () => {
                            if (sign === "Log In") {
                                navigate('/login');
                            } else {
                                await logout(navigate);
                            }
                        }}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-xl"
                    >
                        {sign}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;

