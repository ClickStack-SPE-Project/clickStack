import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ImageList from './ImageList';
import galleryInstance from './Services/galleryServices';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageUpload from './ImageUpload';
import './Gallery.css';

const AlbumDetail = () => {
  const { albumId } = useParams();
  const [selectedAlbum, setSelectedAlbum] = useState([]);
  const [isDialogActive, setDialogActive] = useState(false);
  const [errorAlbum,setErrorAlbum] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const albumData = await galleryInstance.getAllPhotos(albumId,setErrorAlbum);
        setSelectedAlbum(albumData);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, [albumId]);

  const onDelete = async () => {
    try {
      const result = await galleryInstance.deleteAlbum(albumId);
      if (result === 'Album Successfully Deleted') {
        navigate("/albums");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = () => {
    navigate(`/edit-album/${albumId}`);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center mb-0">Album: {albumId}</h2>
        {/* <div> */}
          <button className="btn btn-danger mr-2" onClick={onDelete}>Delete</button>
          <button className="btn btn-warning" onClick={onEdit}>Edit</button>
        {/* </div> */}
      </div>
      {errorAlbum==="" ?(
      <ImageList images={selectedAlbum} albumId={albumId}/>
      ):(<p>{errorAlbum}</p>)}
      <button className="btn btn-primary floating-add-button" onClick={() => setDialogActive(true)}>
        Add Photos
      </button>
      {isDialogActive && (
        <ImageUpload 
          isUploaded={reloadPage} 
          isDialogActive={isDialogActive} 
          setDialogActive={setDialogActive} 
        />
      )}
    </div>
  );
};

export default AlbumDetail;
