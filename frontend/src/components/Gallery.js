import React, { useEffect, useState } from 'react';
import Album from './Album';
import galleryInstance from './Services/galleryServices';
import { Link } from 'react-router-dom';
import './Gallery.css';
const Gallery = () => {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const albumData = await galleryInstance.getAllAlbums();
        setAlbums(albumData);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const handleAlbumClick = (albumId) => {
    setSelectedAlbum(albumId); // Update selectedAlbum state with the clicked albumId
  };

  return (
    <div className="gallery-container">
      {albums.length > 0 ? (
      <ul className="album-list mt">
         {albums.map(album => (
            <li key={album.name}>
              <Album albumName={album.name} albumId={album.name} onClick={() => handleAlbumClick(album.name)} />
            </li>
          ))}
      </ul>
      ) : (
        <p>No albums available</p>
      )}
      <Link to="/add-album" className="btn btn-primary floating-add-button">Add Album</Link>
    </div>
  );
};

export default Gallery;
