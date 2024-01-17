import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const EditQuote = () => {
  const { id } = useParams();
  const [quote, setQuote] = useState({});
  const [editedQuote, setEditedQuote] = useState({
    qtext: '',
    category: '',
    author: '',
    img: '', // Add the image field
});

  useEffect(() => {
    // Fetch the details of the quote with the specified id
    axios.get(`http://3.129.71.134:8080/api/quotes/${id}`)
      .then(response => {
        setQuote(response.data);
        // Initialize the edited quote with the fetched data
        setEditedQuote(response.data);
      })
      .catch(error => {
        console.error(`Error fetching quote ${id}:`, error);
      });
  }, [id]);

  const handleEdit = () => {
    axios
      .put(`http://3.129.71.134:8080/api/quotes/${id}`, editedQuote)
      .then((response) => {
        // Handle successful edit, show a success toast message
        toast.success('Quote edited successfully!');
        console.log('Quote edited successfully:', response.data);
      })
      .catch((error) => {
        // Handle error, show an error toast message
        toast.error('Error editing quote. Please try again.');
        console.error('Error editing quote:', error);
      });
  };
  const handleChange = (e) => {
    // Update the edited quote state as the user makes changes
    const { name, value } = e.target;
    setEditedQuote({
      ...editedQuote,
      [name]: value,
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Edit Quote</h1>
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">{quote.qtext}</h5>
          <p className="card-text"><strong>Category:</strong> {quote.category}</p>
          <p className="card-text"><strong>Author:</strong> {quote.author}</p>
          <p className="card-text"><strong>img:</strong> {quote.img}</p>
          {/* Implement edit form */}
          <form>
            <div className="form-group">
              <label htmlFor="qtext">Quote Text:</label>
              <input
                type="text"
                className="form-control"
                id="qtext"
                name="qtext"
                value={editedQuote.qtext}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={editedQuote.category}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author:</label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={editedQuote.author}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="img">Image URL:</label>
              <input
                type="text"
                className="form-control"
                id="img"
                name="img"
                value={editedQuote.img}
                onChange={handleChange}
              />
            </div>
          </form>
          <button className="btn btn-primary" onClick={handleEdit}>
            Save
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default EditQuote;
