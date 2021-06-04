import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import HomePage from './pages/Home.page'
import ProductPage from './pages/Product.page'
import './App.css';

function App() {
  return (
    <>
      <div className="container">
        <Router>
          <Route path={'/'} component={HomePage} exact />
            <Route path={'/product/:id'} component={ProductPage}/>
        </Router>
      </div>
    </>
  );
}

export default App;
