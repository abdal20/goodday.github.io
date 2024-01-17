import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    axios.get('http://3.129.71.134:8080/category')
      .then(response => {
        setCategories(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories.');
        setIsLoading(false);
      });
  }, []);

  const handleCategoryClick = (categoryId) => {
    setIsLoading(true);
    setSelectedCategory(categories.find(cat => cat.id === categoryId));
    axios.get(`http://3.129.71.134:8080/category/${categoryId}/quotes`)
      .then(response => {
        setQuotes(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(`Error fetching quotes for category ID ${categoryId}:`, error);
        setError('Failed to load quotes for this category.');
        setIsLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Categories</h1>
      {error && <p className="alert alert-danger">{error}</p>}
      {isLoading ? <div className="d-flex justify-content-center"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div> : (
        <div className="row">
          <div className="col-md-4">
            <ul className="list-group mb-4">
              {categories.map(category => (
                <li key={category.id} className="list-group-item list-group-item-action" onClick={() => handleCategoryClick(category.id)}>
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-8">
            {selectedCategory && (
              <div>
                <h2>Quotes in '{selectedCategory.name}'</h2>
                <ul className="list-group">
                  {quotes.map(quote => (
                    <li key={quote.id} className="list-group-item">{quote.qtext} - {quote.author}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
