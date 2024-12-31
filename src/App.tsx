import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Comments from './pages/Comments';
import CreatePost from './pages/CreatePost';
import Register from './pages/Register';
import Login from './pages/Login';
import Loader from './components/Loader';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
      // Simulate a server request
      setTimeout(() => {
          setLoading(false);
      }, 2000);
  }, []);

  if (loading) {
      return <Loader />;
  }





  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/comments/:postId" element={<Comments />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer />
    </Router>
    );
};

export default App;