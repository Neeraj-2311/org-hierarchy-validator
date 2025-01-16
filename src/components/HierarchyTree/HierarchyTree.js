import { useState } from "react";
import { buildHierarchyTree } from "../../utils/buildHierarchyTree";
import './styles/HierarchyTree.css'

const HierarchyTree = ({ employees }) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set(['root']));
  const [expandedDetails, setExpandedDetails] = useState(new Set());

  return (
    <div>
      <h2 className="component-title tree-title">Valid Hierarchy</h2>
      <div className="tree-container">
        {buildHierarchyTree(
          employees,
          expandedNodes,
          setExpandedNodes,
          expandedDetails,
          setExpandedDetails
        )}
      </div>
    </div>
  );
};

export default HierarchyTree;