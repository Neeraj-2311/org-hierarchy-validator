import React, { useState } from 'react';
import ErrorButton from './components/ErrorButton';
import ErrorDialog from './components/ErrorDialog';
import './styles/EmployeeTable.css'

const EmployeeTable = ({ data, isValid, title }) => {

  const [selectedError, setSelectedError] = useState(null);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleErrorClick = (error) => {
    setSelectedError(error);
    setShowErrorDialog(true);
  };

  return (

    <div>
      <h2 className="component-title table-title">{title}</h2>
      <div className="table-container">
        <table className={`data-table ${isValid && 'valid'}`}>
          <thead>
            <tr>
              <th>Row</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Reports To</th>
              {!isValid && <th>Status</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => (
              <tr key={`${isValid ? employee?.rowIndex : employee?.row}-${index}`}>
                <td>{isValid ? employee?.rowIndex+1 : employee?.row}</td>
                <td>{isValid ? employee?.Email : employee?.employee?.Email}</td>
                <td>{isValid ? employee?.FullName : employee?.employee?.FullName}</td>
                <td>{isValid ? employee?.Role : employee?.employee?.Role}</td>
                <td>{(isValid ? employee?.ReportsTo : employee?.employee?.ReportsTo) || 'None'}</td>
                {!isValid && <td>
                  <ErrorButton
                    onClick={() => handleErrorClick(employee?.error)}
                    label="Details"
                  />
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <ErrorDialog
        error={selectedError}
        isOpen={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
      />
    </div>
  )
};

export default EmployeeTable