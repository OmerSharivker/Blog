
function Footer() {
    return (
        <footer className="py-3 px-2 mt-auto bg-gray-800 w-full">
            <div className="max-w-sm mx-auto text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {'Made with ❤️ by omer and shlomi'}
                    <a className="text-blue-600 hover:underline" href=""/>
                 </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {'Copyright © '}
                    <a className="text-blue-600 hover:underline" href="https://omer-sharivker.netlify.app/">
                        Omer & Shlomi
                    </a>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </p>
            </div>
        </footer>
    );
}

export default Footer;