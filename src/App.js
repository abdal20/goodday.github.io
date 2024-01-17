// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Quotes from './Quotes';
import AddQuote from './AddQuote';
import Categories from './Categories';
import AddQuoteToCategory from './qtoq';
import EditQuote from './EditQuote';
import EditQuotes from './EditQuotes'; // Import the EditQuotes component
import MyNav from './MyNav';
import Slids from './slideshow';
import AddSlide from './AddSlide';




import loveq from './loveq';

const App = () => {
  return (
    <Router>
      <div>
  
      <MyNav />
     <br></br>
      <Slids />

        <Routes>
          <Route path="/" element={<Quotes />} />
          <Route path="/add" element={<AddQuote />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/loveq" component={Quotes} />
          <Route path="/qtoq" element={<AddQuoteToCategory/>} />
          <Route path="/edit/:id" element={<EditQuote />} /> {/* Individual quote edit route */}
          <Route path="/edit/" element={<EditQuotes />} /> {/* Individual quote edit route */}
          <Route path="/addslide" element={<AddSlide />} />



        </Routes>
      </div>
    </Router>
  );
};

export default App;
