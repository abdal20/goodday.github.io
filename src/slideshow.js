import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import './Quotes.css';
import './slide.css';

function Slids() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://3.129.71.134:8080/api/slide')
      .then(response => {
        setSlides(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching slide data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading slides.</p>;

  return (
    <Carousel className="slide-custom">
      {slides.map(slide => (
        <Carousel.Item key={slide.id}>
          <img src={slide.url} alt={slide.title} />
          <Carousel.Caption>
            <h3>{slide.title}</h3>
            <p>{slide.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slids;
