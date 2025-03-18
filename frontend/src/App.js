import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostPage from './pages/PostPage';
import MyPage from './pages/MyPage';
import UnAuthorizedErrorPage from './pages/UnAuthoraizedErrorPage';
import UserProfilePage from './pages/UserProfilePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/unauthorized" element={<UnAuthorizedErrorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/post' element={<PostPage />} />
        <Route path="/profile/:userId" element={<UserProfilePage />} />
        <Route path='/mypage' element={<MyPage />} />
      </Routes>
    </Router>
  );
};

export default App;