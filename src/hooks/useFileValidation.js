import { useState } from 'react';
import Papa from 'papaparse';
import HierarchyService from '../Services/HierarchyService';

export const useFileValidation = () => {
  const [validationErrors, setValidationErrors] = useState([]);
  const [validEmployees, setValidEmployees] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (result) => {
        try {
          const errors = HierarchyService.validateHierarchy(result.data);
          setValidationErrors(errors);          
          if (errors.length === 0) {
            setValidEmployees(result.data);
          } else {
            const errorRows = new Set(errors.map(error => error.row));
            const validRows = result.data.filter(employee => !errorRows.has(employee.rowIndex+1));
            setValidEmployees(validRows);                        
          }
        } catch (error) {
          setErrorMessage(`Validation error: ${error.message}`);
          setValidationErrors([]);
          setValidEmployees([]);
        }
      },
      error: (error) => {
        setErrorMessage(`Error reading file: ${error.message}`);
        setValidationErrors([]);
        setValidEmployees([]);
      },
      header: true,
      skipEmptyLines: true,
    });
    event.target.value=""
  };

  return {
    validationErrors,
    validEmployees,
    handleFileUpload,
    errorMessage
  };
};