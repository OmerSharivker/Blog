import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store/store';
import { getUserInfo } from '../store/reducer/userSlice';

function Header() {
    const navigate = useNavigate();
    const dispach = useDispatch<AppDispatch>();
    let userName = useSelector((state: any) => state.user.userName);
    let image = useSelector((state: any) => state.user.image);
    let sign = "Log Out";

    if(!userName){
        userName = 'Guest';
        sign = "Log In";
        
    }
    if(localStorage.getItem('accessToken') !== null){
        sign = "Log Out";
        // useEffect(() => {
        //     dispach(getUserInfo());
        // }, [dispach]);
    }
    if(!image){
        image = 'http://localhost:4000/image.png';
    }
    return (
        <header className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img
                        src='src/assets/images/blog.png'
                        alt="Logo"
                        className="w-10 h-10"
                    />
                </div>
                <div className="flex items-center space-x-8">
                    <a href="/" className="text-white text-lg font-semibold">Blog</a>
                   
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-white text-lg">{userName}</span>
                </div>
                <div className="flex items-center">
                    <img
                        src={image}
                        alt="User"
                        className="w-10 h-10 rounded-full"
                    />
                </div>
                <div className="flex items-center"></div>
                <div>
                    <button
                        onClick={async () => {
                            if(sign === "Log In"){
                                navigate('/login');
                            } else {
                                await logout(navigate);
                            }
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {sign}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;