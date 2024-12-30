import React from 'react';


function Footer() {
    return (
        <footer className="py-3 px-2 mt-auto bg-gray-200 dark:bg-gray-800 fixed bottom-0 w-full">
            <div className="max-w-sm mx-auto text-center">
                <p className="text-base">
                    My sticky footer can be found here.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {'Copyright © '}
                    <a className="text-blue-600 hover:underline" href="https://yourwebsite.com/">
                        Your Website
                    </a>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </p>
            </div>
        </footer>
    );
}

export default Footer;