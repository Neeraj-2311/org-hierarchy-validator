import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import { ValidationTable } from './components/ValidationTable';
import ErrorDialog from './components/ErrorDialog'
import { useFileValidation } from '../../hooks/useFileValidation';
import './styles/FileUpload.css';
import HierarchyTree from '../HierarchyTree/HierarchyTree';

const FileUploadContainer = () => {
  const {
    validationErrors,
    validEmployees,
    handleFileUpload,
    errorMessage
  } = useFileValidation();

  const [selectedError, setSelectedError] = useState(null);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [file, setFile] = useState(undefined)

  const handleErrorClick = (error) => {
    setSelectedError(error);
    setShowErrorDialog(true);
  };

  return (
    <div className="upload-container">
      <FileUpload
        onFileUpload={handleFileUpload}
        errorMessage={errorMessage}
        file={file}
        setFile={setFile}
      />
      
      {validationErrors.length > 0 && (
        <ValidationTable 
          errors={validationErrors}
          onErrorClick={handleErrorClick}
        />
      )}

      {validEmployees.length > 0 && (
        <HierarchyTree employees={validEmployees} />
      )}

      <ErrorDialog
        error={selectedError}
        isOpen={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
      />
    </div>
  );
};

export default FileUploadContainer;