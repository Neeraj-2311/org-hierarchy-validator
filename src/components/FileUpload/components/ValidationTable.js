import React from 'react';
import ErrorButton from './ErrorButton';

export const ValidationTable = ({ errors, onErrorClick }) => (
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
          <tr key={`${row}-${index}`}>
            <td>{row}</td>
            <td>{employee.Email}</td>
            <td>{employee.FullName}</td>
            <td>{employee.Role}</td>
            <td>{employee.ReportsTo || 'None'}</td>
            <td>
              <ErrorButton 
                onClick={() => onErrorClick(error)}
                label="Details"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);