import React from 'react';
import RenderDetails from '../components/HierarchyTree/components/RenderDetails';
import TreeNode from '../components/HierarchyTree/components/TreeNode';

export const buildHierarchyTree = (employees, expandedNodes, setExpandedNodes, expandedDetails, setExpandedDetails) => {
    const emailToChildren = new Map();
    const root = employees.find(emp => emp.Role === 'Root');

    employees.forEach(emp => {
        if (!emailToChildren.has(emp.ReportsTo)) {
            emailToChildren.set(emp.ReportsTo, []);
        }
        emailToChildren.get(emp.ReportsTo).push(emp);
    });

    const renderNode = (node, level = 0) => {
        if (!node) return null;

        const children = emailToChildren.get(node.Email) || [];
        const isExpanded = expandedNodes.has(node.Email);
        const isDetailsExpanded = expandedDetails.has(node.Email);

        return (
            <div key={node.Email} className="tree-item">
                
                <TreeNode 
                    node={node} 
                    isExpanded={isExpanded} 
                    setExpandedNodes={setExpandedNodes} 
                    setExpandedDetails={setExpandedDetails}
                    level={level}
                    children={children}
                />

                {isDetailsExpanded && RenderDetails(node, level + 1)}

                {isExpanded && children.map(child => renderNode(child, level + 1))}
            </div>
        );
    };

    return root ? renderNode(root) : null;
};