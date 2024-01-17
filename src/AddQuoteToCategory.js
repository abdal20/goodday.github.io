import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddQuoteToCategory = () => {
  const [categories, setCategories] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Fetch categories
    axios.get('http://3.129.71.134:8080/category')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    // Fetch quotes
    axios.get('http://3.129.71.134:8080/api/quotes')
      .then(response => setQuotes(response.data))
      .catch(error => console.error('Error fetching quotes:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory && selectedQuote) {
      axios.put(`http://3.129.71.134:8080/category/${selectedCategory}/quotes/${selectedQuote}`)
        .then(response => {
          alert('Quote added to category successfully.');
        })
        .catch(error => {
          console.error('Error adding quote to category:', error);
          alert('Error adding quote to category.');
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Quote to Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="quoteSelect" className="form-label">Select Quote</label>
          <select
            id="quoteSelect"
            className="form-select"
            value={selectedQuote}
            onChange={(e) => setSelectedQuote(e.target.value)}
          >
            <option value="">Choose a quote...</option>
            {quotes.map(quote => (
              <option key={quote.id} value={quote.id}>{quote.qtext}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="categorySelect" className="form-label">Select Category</label>
          <select
            id="categorySelect"
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Choose a category...</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Quote to Category</button>
      </form>
    </div>
  );
};

export default AddQuoteToCategory;
