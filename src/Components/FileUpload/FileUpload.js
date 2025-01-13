import React, { useState } from 'react';
import Papa from 'papaparse';
import HierarchyService from '../../Services/HierarchyService';
import './FileUpload.css';

const FileUpload = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const [selectedError, setSelectedError] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const data = result.data;
          const validationErrors = HierarchyService.validateHierarchy(data);
          if (validationErrors.length > 0) {
            setErrors(validationErrors);
          } else {
            setErrors([]);
          }
        },
        error: (error) => {
          setErrorMessage('Error reading file: ' + error.message);
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  const handleErrorClick = (error) => {
    setSelectedError(error);
    setShowDialog(true);
  };

  return (
    <div className="upload-container">
      <div className="file-input-wrapper">
        <label htmlFor="file-upload" className="file-label">
          Upload CSV File
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          accept=".csv"
          className="file-input"
        />
      </div>

      {errorMessage && (
        <div className="error-alert">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {errors.length > 0 && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Row</th>
                <th>Email</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Reports To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {errors.map(({employee, error, row}, index) => (
                <tr key={index}>
                  <td>{row}</td>
                  <td>{employee.Email}</td>
                  <td>{employee.FullName}</td>
                  <td>{employee.ReportsTo || 'None'}</td>
                  <td>{employee.Role}</td>
                  <td>
                    <button 
                      onClick={() => handleErrorClick(error)}
                      className="error-button"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <span className="error-button-text">Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showDialog && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              onClick={() => setShowDialog(false)}
              className="close-button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h3 className="modal-title">Error Details</h3>
            <p className="modal-text">{selectedError}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;