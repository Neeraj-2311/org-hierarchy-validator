import React from 'react';
import FileUpload from './Components/FileUpload/FileUpload';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1 className="app-title">Organization Hierarchy Validator</h1>
        <FileUpload />
      </div>
    </div>
  );
};

export default App;