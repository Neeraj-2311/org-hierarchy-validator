const HierarchyService = {
    validateHierarchy: (data) => {
        const errors = [];
        
        // Create employee map for O(1) lookups
        const employeeMap = new Map(
            data.map(employee => [employee.Email, employee])
        );
        
        // Create role validation rules map
        const roleValidationRules = {
            'Admin': {
                validSupervisor: (supervisor) => supervisor === 'Root',
                errorMessage: (employee, supervisor) => 
                    `Row ${employee.rowIndex + 1} (${employee.Email}): ${employee.FullName} is an Admin but reports to ${supervisor}, not Root.`
            },
            'Manager': {
                validSupervisor: (supervisor) => 
                    supervisor && (supervisor.Role === 'Admin' || supervisor.Role === 'Manager'),
                errorMessage: (employee, supervisorEmail) => 
                    `Row ${employee.rowIndex + 1} (${employee.Email}): ${employee.FullName} is a Manager but reports to ${
                        employeeMap.get(supervisorEmail)?.FullName || 'an invalid user'
                    }, not an Admin or another Manager.`
            },
            'Caller': {
                validSupervisor: (supervisor) => supervisor && supervisor.Role === 'Manager',
                errorMessage: (employee, supervisorEmail) => 
                    `Row ${employee.rowIndex + 1} (${employee.Email}): ${employee.FullName} is a Caller but reports to ${
                        employeeMap.get(supervisorEmail)?.FullName || 'an invalid user'
                    }, not a Manager.`
            }
        };

        // Helper function to check circular reporting
        const findCircularReporting = (email, visited = new Set()) => {
            if (visited.has(email)) return true;
            visited.add(email);
            
            const employee = employeeMap.get(email);
            if (!employee || !employee.ReportsTo) return false;
            
            return findCircularReporting(employee.ReportsTo, visited);
        };

        // Validate each employee
        data.forEach((employee, index) => {
            // Add row index to employee for error messages
            employee.rowIndex = index;
            const supervisorEmails = employee.ReportsTo ? employee.ReportsTo.split(';') : [];

            // Check for multiple reporting lines
            if (supervisorEmails.length > 1) {
                errors.push({
                    row: index + 1,
                    employee,
                    error: `Row ${index + 1} (${employee.Email}): ${employee.FullName} has multiple reporting lines (${supervisorEmails.join(', ')}), which is invalid.`
                });
                return; // Skip other validations if multiple supervisors found
            }

            const supervisorEmail = supervisorEmails[0];
            const supervisor = supervisorEmail ? employeeMap.get(supervisorEmail) : null;

            // Check for circular reporting
            if (supervisorEmail && findCircularReporting(employee.Email)) {
                errors.push({
                    row: index + 1,
                    employee,
                    error: `Row ${index + 1} (${employee.Email}): ${employee.FullName} has circular reporting. Cannot report back to a supervisor.`
                });
            }

            // Check for invalid supervisor
            if (supervisorEmail && !supervisor && supervisorEmail !== 'Root') {
                errors.push({
                    row: index + 1,
                    employee,
                    error: `Row ${index + 1} (${employee.Email}): ${employee.FullName} has an invalid supervisor ${supervisorEmail}.`
                });
            }

            // Validate role-based reporting structure
            const roleRules = roleValidationRules[employee.Role];
            if (roleRules && !roleRules.validSupervisor(supervisorEmail === 'Root' ? 'Root' : supervisor)) {
                errors.push({
                    row: index + 1,
                    employee,
                    error: roleRules.errorMessage(employee, supervisorEmail)
                });
            }
        });

        return errors;
    }
};

export default HierarchyService;

// const HierarchyService = {
//     validateHierarchy: (data) => {
//         const errors = [];

//         const checkForCircularReporting = (employee, data, visitedEmails) => {
//             if (visitedEmails.includes(employee.Email)) {
//                 return true;
//             }

//             visitedEmails.push(employee.Email);
//             const supervisor = data.find((e) => e.Email === employee.ReportsTo);
//             if (supervisor) {
//                 return checkForCircularReporting(supervisor, data, visitedEmails);
//             }
//             return false;
//         };

//         data.forEach((employee, index) => {
//             const { Email, FullName, Role, ReportsTo } = employee;
//             const supervisorEmails = ReportsTo ? ReportsTo.split(';') : [];
//             const supervisor = data.find((e) => e.Email === supervisorEmails[0]);

//             if (ReportsTo && checkForCircularReporting(employee, data, [])) {
//                 errors.push({row: index+1, employee, error: `Row ${index + 1} (${Email}): ${FullName} has circular reporting. Cannot report back to a supervisor.`});
//             }

//             if (Role === 'Admin' && ReportsTo !== 'Root') {
//                 errors.push({row: index+1, employee, error: `Row ${index + 1} (${Email}): ${FullName} is an Admin but reports to ${ReportsTo}, not Root.`});
//             }

//             if (Role === 'Manager' && (supervisor?.Role !== 'Admin' && supervisor?.Role !== 'Manager')) {
//                 errors.push({row: index+1, employee, error: `Row ${index + 1} (${Email}): ${FullName} is a Manager but reports to ${supervisor ? supervisor.FullName : 'an invalid user'}, not an Admin or another Manager.`});
//             }

//             if (Role === 'Caller' && supervisor?.Role !== 'Manager') {
//                 errors.push({row: index+1, employee, error: `Row ${index + 1} (${Email}): ${FullName} is a Caller but reports to ${supervisor ? supervisor.FullName : 'an invalid user'}, not a Manager.`});
//             }

//             if (supervisorEmails.length > 1) {
//                 errors.push({row: index+1, employee, error: `Row ${index + 1} (${Email}): ${FullName} has multiple reporting lines (${supervisorEmails.join(', ')}), which is invalid.`});
//             }

//             supervisorEmails.forEach((email, i) => {
//                 if (email && !data.some((e) => e.Email === email)) {
//                     errors.push({row: index+1, employee, error: `Row ${index + 1} (${Email}): ${FullName} has an invalid supervisor ${email}.`});
//                 }
//             });
//         });

//         return errors;
//     },
// };

// export default HierarchyService;