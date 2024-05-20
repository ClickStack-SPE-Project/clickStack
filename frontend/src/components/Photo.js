import React from 'react';

const Photo = ({ photo }) => {
  return (
    <div className="photo" draggable>
      <img src={photo} alt="Photo of Users" />
    </div>
  );
};

export default Photo;
