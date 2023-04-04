
import './App.css';

import React  from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ListCountry from './components/ListCountry/ListCountry';
import CountryDetails from './components/CountryDetails/CountryDetails';
import PageNotFound from './components/PageNotFound/PageNotFound';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListCountry />} />
        <Route path="/countries/:name" element={<CountryDetails />} />    
        <Route path="*" element={<PageNotFound />} />   
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
