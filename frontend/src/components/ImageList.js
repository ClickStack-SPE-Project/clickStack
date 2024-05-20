import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import galleryInstance from './Services/galleryServices';
import { useParams } from 'react-router-dom';

const ImageList = ({ images,albumId }) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  }; 

  const handleDownload = () => {
    const link = document.createElement('a'); 
    link.href = selectedImage.link;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowModal(false);
  };

  const handleDelete = () => {
    setShowConfirmModal(true);
  };

  const confirmDelete = async() => {
    // Implement the delete functionality here
    await galleryInstance.deletePhoto(selectedImage,albumId);
    setShowConfirmModal(false);
    setShowModal(false);
    window.location.reload();
  };

  const handleClose = () => {
    setShowModal(false);
    setShowConfirmModal(false);
  };

  return (
    <div className="row">
      {images.map((image, index) => (
        <div className="col-md-4 mb-4" key={index}>
          <div className="card h-100">
            <img
              src={image.link}
              alt={`Image ${index}`}
              className="card-img-top img-fluid rounded"
              onClick={() => handleImageClick(image)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      ))}

      {/* Modal for image actions */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Image Actions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="danger" onClick={handleDelete} className="mr-2">
            Delete
          </Button>
          <Button variant="primary" onClick={handleDownload}>
            Download
          </Button>
        </Modal.Body>
      </Modal>

      {/* Confirmation Modal for delete */}
      <Modal show={showConfirmModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this image?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ImageList;
