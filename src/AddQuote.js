import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddQuote = ({ onAddQuote }) => {
  const [newQuote, setNewQuote] = useState({
    qtext: '',
    categoryIds: [],
    author: '',
    img: '',


  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://3.129.71.134:8080/category')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryIds") {
      const selectedCategoryIds = Array.from(e.target.selectedOptions, option => option.value);
      setNewQuote(prevState => ({ ...prevState, [name]: selectedCategoryIds }));
    } else {
      setNewQuote(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleAddQuote = () => {
    const apiUrl = 'http://3.129.71.134:8080/api/quotes/add';
    axios.post(apiUrl, newQuote)
      .then(response => {
        onAddQuote && onAddQuote(response.data);
        setNewQuote({ qtext: '', categoryIds: [], author: '', img: ""});
        toast.success('Quote added successfully!');
      })
      .catch(error => {
        console.error('Error adding quote:', error);
        toast.error('Error adding quote. Please try again.');
      });
  };

  return (
    
    <div className="container mt-5">
      <div className="card border-0 shadow">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Add a New Quote</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="qtext" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="qtext"
                name="qtext"
                value={newQuote.qtext}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="categoryIds" className="form-label">Category</label>
              <select
                multiple
                className="form-control"
                id="categoryIds"
                name="categoryIds"
                value={newQuote.categoryIds}
                onChange={handleInputChange}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                  
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={newQuote.author}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="img" className="form-label">Image</label>
              <input
                type="text"
                className="form-control"
                id="img"
                name="img"
                value={newQuote.img}
                onChange={handleInputChange}
              />
            </div>
            
            <button type="button" className="btn btn-primary" onClick={handleAddQuote}>
              Add Quote
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default AddQuote;
