import React from 'react';
import UploadError from './UploadError';

const FileUpload = ({ onFileUpload, errorMessage, file, setFile }) => {

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileUpload(e);
    }
  };

  const clearFile = () => {
    setFile(null);
  };

  return (
    <div className="upload-container">
      <div className="file-input-wrapper">
        {file ?
          <div className="file-info">
            <span>{file.name}</span>
            <button onClick={clearFile} className="clear-file-btn">
              Clear File
            </button>
          </div>
          :
          (<>
            <label htmlFor="file-upload" className="file-label">
              Upload CSV File
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
              accept=".csv"
              className="file-input"
            />
          </>
          )}
      </div>

      {errorMessage && (
        <UploadError error={errorMessage} />
      )}
    </div>
  );
};

export default FileUpload;
