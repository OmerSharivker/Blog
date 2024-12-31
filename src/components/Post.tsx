import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get_posts, setLike } from '../store/reducer/postSlice';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';

// interface PostProps {}

const Post: React.FC = () => {

    const { posts } = useSelector((state: RootState) => state.posts);
        const dispatch = useDispatch<AppDispatch>();
        
        useEffect(()=>{
            dispatch(get_posts())
        },[])

        


    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl">
            {posts.map((p,i) => (
                <div key={i} className="bg-white shadow-md rounded-lg overflow-hidden relative">
                    <button className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                    <div className="flex items-center p-4">
                        <img src={p.img} alt={p.userName} className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0" />
                        <h2 className="ml-4 text-xl font-bold">{p.userName}</h2>
                    </div>
                    <div className="p-4">
                        <p className="mt-2 text-gray-600">{p.title}</p>
                        <p className="mt-4 text-gray-800">{p.content}</p>
                    </div>
                    <div className="p-4 flex justify-between items-center border-t">
                        <button 
                            className="text-blue-500" 
                            onClick={() => dispatch(setLike(p._id))}
                        >
                            ({p.numLikes}) Like
                        </button>
                        <Link to="/comments" className="text-blue-500">({p.comments}) Comments</Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Post;
