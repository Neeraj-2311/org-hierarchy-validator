const buildHierarchyTree = (employees) => {
    const employeeMap = new Map();
    const managerConnections = new Map();
    const processedNodes = new Set()
    
    // First pass: Create nodes and track all connections
    employees.forEach(employee => {
        const email = employee.Email;
        
        // If node already exists, just update its connections
        if (employeeMap.has(email)) {
            if (employee.ReportsTo) {
                const connections = managerConnections.get(email) || new Set();
                connections.add(employee.ReportsTo);
                managerConnections.set(email, connections);
            }
        } else {
            // Create new node
            employeeMap.set(email, {
                email: employee.Email,
                fullName: employee.FullName,
                role: employee.Role,
                children: [],
                connections: new Set() // Store all connections
            });

            if (employee.ReportsTo) {
                const connections = managerConnections.get(email) || new Set();
                connections.add(employee.ReportsTo);
                managerConnections.set(email, connections);
            }
        }
    });

    // Second pass: Build relationships avoiding duplicates
    let root = null;
    employees.forEach(employee => {
        if (!processedNodes.has(employee.Email)) {
            const currentNode = employeeMap.get(employee.Email);
            
            if (!employee.ReportsTo) {
                root = currentNode;
            } else {
                // Handle all connections for this node
                const nodeConnections = managerConnections.get(employee.Email);
                if (nodeConnections) {
                    currentNode.connections = nodeConnections;
                    
                    // Add as child to the first reporting manager only
                    // to avoid duplicate nodes in the tree
                    const firstManager = employeeMap.get(Array.from(nodeConnections)[0]);
                    if (firstManager && !processedNodes.has(employee.Email)) {
                        firstManager.children.push(currentNode);
                    }
                } else {
                    // Single reporting line
                    const manager = employeeMap.get(employee.ReportsTo);
                    if (manager) {
                        manager.children.push(currentNode);
                    }
                }
            }
            processedNodes.add(employee.Email);
        }
    });

    // Third pass: Sort nodes to keep connected managers adjacent
    const sortManagersAdjacent = (node) => {
        if (!node.children || node.children.length === 0) return;

        // Sort children based on connections
        node.children.sort((a, b) => {
            const aConnections = managerConnections.get(a.email) || new Set();
            const bConnections = managerConnections.get(b.email) || new Set();
            
            // If they're connected to each other, keep them adjacent
            if (aConnections.has(b.email) || bConnections.has(a.email)) {
                return -1;
            }
            
            return 0;
        });

        // Recursively sort children
        node.children.forEach(sortManagersAdjacent);
    };

    if (root) {
        sortManagersAdjacent(root);
    }

    return {
        root,
        managerConnections: Array.from(managerConnections.entries())
            .map(([email, connections]) => ({
                email,
                connectedTo: Array.from(connections)
            }
        ))
    };
};

export default buildHierarchyTree