import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fontawesome'
import Header from './Header';
import Footer from './Footer';


const routing = (
  <Router>
    <div className="Main">
      <Header />
      <App />
      <div className="Spacer"></div>
      <Footer />
    </div>
  </Router>
);


ReactDOM.render(routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
