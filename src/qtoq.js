import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddQuoteToCategory = () => {
    const [quotes, setQuotes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedQuoteId, setSelectedQuoteId] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const quotesResponse = await axios.get('http://3.129.71.134:8080/api/quotes');
                setQuotes(quotesResponse.data);

                const categoriesResponse = await axios.get('http://3.129.71.134:8080/category');
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://3.129.71.134:8080/api/quotes/${selectedQuoteId}/category/${selectedCategoryId}`);
            console.log('Quote added to category successfully');
            // You can add further actions here, like redirecting or showing a success message
        } catch (error) {
            console.error('There was an error adding the quote to the category!', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add Quote to Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Select Quote:</label>
                    <select className="form-control" value={selectedQuoteId} onChange={(e) => setSelectedQuoteId(e.target.value)}>
                        <option value="">Select a quote</option>
                        {quotes.map((quote) => (
                            <option key={quote.id} value={quote.id}>{quote.qtext} - {quote.author}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Select Category:</label>
                    <select className="form-control" value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
                        <option value="">Select a category</option>
                        {categories.map((category) => (
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
