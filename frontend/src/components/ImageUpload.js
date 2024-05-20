import React, { useState } from 'react';
import './ImageUpload.css'; 
import { useNavigate, useParams } from 'react-router-dom';
import {BASE_URI} from "../utils";


const ImageUpload = ({ isUploaded, isDialogActive, setDialogActive }) => {
  const [selectedFile, setSelectedFile] = useState('');
  const { albumId } = useParams();
  const navigate = useNavigate();

  const save = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imageFile', selectedFile);

    fetch(`${BASE_URI}/photos/createPhoto/${albumId}`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accesstoken")
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setDialogActive(false);
          isUploaded(true);
          navigate(`/albums/${albumId}`);
        }
      })
      .catch((err) => console.log(err));
  };

  const cancel = () => {
    setDialogActive(false);
  };

  const onFileUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      {isDialogActive && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <h2>Upload Image</h2>
            <form onSubmit={save}>
              <div>
                <input type="file" onChange={onFileUpload} />
              </div>
              <div>
                <button type="submit" className="form-button-submit">
                  Save
                </button>
                <button type="button" onClick={cancel} className="form-button-cancel">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUpload;
