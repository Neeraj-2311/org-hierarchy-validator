import React from 'react';
import FileUploadContainer from './components/FileUpload/FileUploadContainer';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1 className="app-title">Organization Hierarchy Validator</h1>
        <FileUploadContainer />
      </div>
    </div>
  );
};

export default App;