import React, { useState } from 'react';
import FileUpload from '../FileUpload/FileUpload';
import { useFileValidation } from '../../hooks/useFileValidation';
import './Layout.css';
import HierarchyTree from '../HierarchyTree/HierarchyTree';
import EmployeeTable from '../EmployeeTable/EmployeeTable';

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
        <EmployeeTable
          data={validationErrors}
          isValid={false}
          title={"Invalid Rows"}
        />
      )}
      {validEmployees.length > 0 && (
        <EmployeeTable 
          data={validEmployees}
          isValid={true}
          title={"Valid Rows"}
        />
      )}

    </div>
  );
};

export default Layout;