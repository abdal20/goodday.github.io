import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Quotes.css';
import Draggable from 'react-draggable'; // Import the Draggable component

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://3.129.71.134:8080/api/quotes';
    axios
      .get(apiUrl)
      .then((response) => setQuotes(response.data))
      .catch((error) => console.error('Error fetching quotes:', error));
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('Quote copied to clipboard!');
      })
      .catch((err) => {
        console.error('Error copying text to clipboard', err);
      });
  };

  return (
    <>
    

      <div className="container mt-5">
      

        <h1 className="text-center mb-4">Gooday Quotes</h1>

        <div className="row">
          {quotes.map((quote) => (
            
            <div key={quote.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow">
                <div className="card-body">

                  {/* Display the image */}
                  <img src={quote.img} alt="Quote Image" className="img-fluid mb-2" />

                  <h5 className="card-title">{quote.qtext}</h5>
                  <p className="card-text">
                    <strong>Category:</strong> {quote.category}
                  </p>
                  <p className="card-text">
                    <strong>Author:</strong> {quote.author}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => copyToClipboard(quote.qtext)}
                  >
                    Copy Quote
                    
                  </button>

                </div>
                
                
              </div>
              
            </div>

          ))}
          
        </div>

        <div className="d-flex justify-content-center mt-4">
          <Link to="/add" className="btn btn-success btn-lg">
            Add New Quote
          </Link>
        </div>
      </div>
    </>
  );
};

export default Quotes;
