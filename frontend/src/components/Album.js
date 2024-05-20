import React from 'react';
import { Link } from 'react-router-dom';
import PhotoAlbumIcon from '../Resources/gallery.png';

const Album = ({ albumName, albumId, onClick }) => {
  return (
    <div className="album" onClick={onClick}>
      <Link to={`/albums/${albumId}`}>
        <img src={PhotoAlbumIcon} alt='Album Icon' />
      </Link>
      <h2>{albumName}</h2>
    </div>
  );
};

export default Album;
