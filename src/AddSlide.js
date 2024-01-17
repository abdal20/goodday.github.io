import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddSlide = ({ onAddSlide }) => {
  const [AddSlide, setNewSlide] = useState({
    url: '',
    title: '',
    caption: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewSlide({ ...AddSlide, [name]: value });
  };

  const handleAddNewSlide = () => {
    const apiUrl = 'http://3.129.71.134/api/slide/add';
    axios.post(apiUrl, AddSlide)
      .then(response => {
        onAddSlide && onAddSlide(response.data);
        setNewSlide({ url: '', title: '', caption: '' });
        toast.success('Slide added successfully!');
      })
      .catch(error => {
        console.error('Error adding slide:', error);
        toast.error('Error adding slide. Please try again.');
      });
  };

  return (
    <div className="container mt-5">
      <div className="card border-0 shadow">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Add a New Slide</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="url" className="form-label">URL</label>
              <input
                type="text"
                className="form-control"
                id="url"
                name="url"
                value={AddSlide.url}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={AddSlide.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="caption" className="form-label">Caption</label>
              <input
                type="text"
                className="form-control"
                id="caption"
                name="caption"
                value={AddSlide.caption}
                onChange={handleInputChange}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleAddNewSlide}>
              Add Slide
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default AddSlide;
