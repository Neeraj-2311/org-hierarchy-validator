import React from 'react';
import './styles/HierarchyTree.css';
import buildHierarchyTree from '../../utils/hierarchyUtils';
import HierarchyNode from './components/HierarchyTreeNode'

const HierarchyVisualization = ({ employees }) => {
    
    const { root, managerConnections } = buildHierarchyTree(employees);

    return (
        <div className="hierarchy-visualization-container">
            <div className="inner-hierarchy-container">
                <HierarchyNode
                    node={root}
                    connectedNodes={managerConnections}
                    level={0}
                />
            </div>
        </div>
    );
};

export default HierarchyVisualization;