import React from 'react';

function Header() {
    return (
        <header className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://via.placeholder.com/40"
                        alt="Logo"
                        className="w-10 h-10"
                    />
                </div>
                <div className="flex items-center space-x-8">
                    <a href="/" className="text-white text-lg font-semibold">Blog</a>
                   
                </div>
                <div className="flex items-center">
                    <img
                        src="https://via.placeholder.com/40"
                        alt="User"
                        className="w-10 h-10 rounded-full"
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;