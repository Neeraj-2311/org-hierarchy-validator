import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';

const App = () => {
  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1 className="app-title">Organization Hierarchy Validator</h1>
        <Layout />
      </div>
    </div>
  );
};

export default App;