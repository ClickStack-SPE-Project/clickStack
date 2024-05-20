import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import editAlbumInstance from './services';

const EditAlbum = () => {
  const navigate = useNavigate();
  const { albumId } = useParams();
  const [data, setData] = useState({ name: "", description: "" });
  const [updateError,setUpdateError] = useState();
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        await editAlbumInstance.getAlbum(albumId,setData);
        console.log(data);
      } catch (error) {
        console.error('Error fetching album:', error);
      }
    };

    fetchAlbum();
  }, [albumId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    
    try {
      await editAlbumInstance.editAlbum(albumId,data,setUpdateError);
      if (updateError === "") 
      navigate('/albums'); 
    //   window.location.reload();
    } catch (error) {
      console.log(error);
    }
    
  }
  return (
    <div className='background' >
      <div className='center-box'>
          <h2>Edit Album</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={data.name} onChange={handleChange}/>
            </div> 
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input type="text" id="description" name="description" value={data.description} onChange={handleChange}/>
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
          </form>
          
        </div>
      </div>
  )
}

export default EditAlbum;
