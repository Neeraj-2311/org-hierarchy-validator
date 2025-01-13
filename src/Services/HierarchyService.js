const HierarchyService = {
    validateHierarchy: (data) => {
        const errors = [];
        
        const employeeMap = new Map(
            data.map(employee => [employee.Email, employee])
        );
        
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

        const findCircularReporting = (email, visited = new Set()) => {
            if (visited.has(email)) return true;
            visited.add(email);
            
            const employee = employeeMap.get(email);
            if (!employee || !employee.ReportsTo) return false;
            
            return findCircularReporting(employee.ReportsTo, visited);
        };

        data.forEach((employee, index) => {
            employee.rowIndex = index;
            const supervisorEmails = employee.ReportsTo ? employee.ReportsTo.split(';') : [];

            if (supervisorEmails.length > 1) {
                errors.push({
                    row: index + 1,
                    employee,
                    error: `Row ${index + 1} (${employee.Email}): ${employee.FullName} has multiple reporting lines (${supervisorEmails.join(', ')}), which is invalid.`
                });
                return; 
            }

            const supervisorEmail = supervisorEmails[0];
            const supervisor = supervisorEmail ? employeeMap.get(supervisorEmail) : null;

            if (supervisorEmail && findCircularReporting(employee.Email)) {
                errors.push({
                    row: index + 1,
                    employee,
                    error: `Row ${index + 1} (${employee.Email}): ${employee.FullName} has circular reporting. Cannot report back to a supervisor.`
                });
            }

            if (supervisorEmail && !supervisor && supervisorEmail !== 'Root') {
                errors.push({
                    row: index + 1,
                    employee,
                    error: `Row ${index + 1} (${employee.Email}): ${employee.FullName} has an invalid supervisor ${supervisorEmail}.`
                });
            }

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