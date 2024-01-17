// EditQuotes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EditQuotes = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    // Fetch the list of quotes from your API
    axios.get('http://3.129.71.134:8080/api/quotes')
      .then(response => {
        setQuotes(response.data);
      })
      .catch(error => {
        console.error('Error fetching quotes:', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Edit Quotes</h1>
      <div className="row">
        {quotes.map(quote => (
          <div key={quote.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow">
              <div className="card-body">
                <h5 className="card-title">{quote.qtext}</h5>
                <p className="card-text"><strong>Category:</strong> {quote.category}</p>
                <p className="card-text"><strong>Author:</strong> {quote.author}</p>
                <Link to={`/edit/${quote.id}`} className="btn btn-primary">
                  Edit Quote
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditQuotes;
