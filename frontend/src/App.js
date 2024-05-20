import React from 'react';
import './App.css';
import  Login  from './components/Login';
import SignUp  from './components/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Gallery from './components/Gallery';
import AlbumDetail from './components/AlbumDetail'; 
import ImageUpload from './components/ImageUpload';
import Navbar from './components/Navbar';
import AddAlbum from './components/AddAlbum';
import EditAlbum from './components/EditAlbum';
import HomePage from './components/HomePage';
// import ImageUpload from './components/ImageUpload';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        {/* <ImageUpload isUploaded={false}/> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/albums" element={<Gallery />} />
          <Route path="/albums/:albumId" element={<AlbumDetail />} /> 
          <Route path="/add-album" element={<AddAlbum />} />
          <Route path="/edit-album/:albumId" element={<EditAlbum/>}/>
          <Route path="/image-upload/:albumId" element={<ImageUpload />}/>
        </Routes>
      </div>
      </Router>
  );
}

export default App;
