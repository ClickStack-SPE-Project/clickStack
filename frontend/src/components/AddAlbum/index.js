import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import addAlbumInstance from './onSubmit';
const AddAlbum = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", description: "" });
  const [error,setError] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    
    try {
      await addAlbumInstance.addAlbum(data,setError);
      if (error === '') 
      {navigate('/albums'); 
      window.location.reload();}
    } catch (error) {
      console.log(error);
    }
    
  }
  return (
    <div className='background' >
      <div className='center-box'>
          <h2>Add Album</h2>
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

export default AddAlbum;
