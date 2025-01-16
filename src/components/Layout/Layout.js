import React, { useState } from 'react';
import FileUpload from '../FileUpload/FileUpload';
import ErrorTable from '../ErrorTable/ErrorTable';
import { useFileValidation } from '../../hooks/useFileValidation';
import './Layout.css';
import HierarchyTree from '../HierarchyTree/HierarchyTree';
import ValidTable from '../ValidTable/ValidTable';

const Layout = () => {
  const {
    validationErrors,
    validEmployees,
    handleFileUpload,
    errorMessage
  } = useFileValidation();

  const [file, setFile] = useState(undefined)

  return (
    <div className="layout-container">

      <FileUpload
        onFileUpload={handleFileUpload}
        errorMessage={errorMessage}
        file={file}
        setFile={setFile}
      />

      {validEmployees.length > 0 && (
        <HierarchyTree employees={validEmployees} />
      )}
      
      {validationErrors.length > 0 && (
        <ErrorTable
          errors={validationErrors}
        />
      )}
      {validEmployees.length > 0 && (
        <ValidTable validRows={validEmployees}/>
      )}

    </div>
  );
};

export default Layout;