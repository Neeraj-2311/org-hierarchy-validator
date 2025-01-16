import React, { useState } from 'react';
import ErrorButton from './components/ErrorButton';
import ErrorDialog from './components/ErrorDialog';
import './styles/ErrorTable.css'

const ErrorTable = ({ errors }) => {

  const [selectedError, setSelectedError] = useState(null);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleErrorClick = (error) => {
    setSelectedError(error);
    setShowErrorDialog(true);
  };

  return (

    <div>
      <h2 className="component-title error-title">Invalid Rows</h2>
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
            {errors.map(({ employee, error, row }, index) => (
              <tr key={`${row}-${index}`}>
                <td>{row}</td>
                <td>{employee.Email}</td>
                <td>{employee.FullName}</td>
                <td>{employee.Role}</td>
                <td>{employee.ReportsTo || 'None'}</td>
                <td>
                  <ErrorButton
                    onClick={() => handleErrorClick(error)}
                    label="Details"
                  />
                </td>
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

export default ErrorTable