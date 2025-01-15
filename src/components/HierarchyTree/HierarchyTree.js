import { useState } from "react";
import { buildHierarchyTree } from "../../utils/buildHierarchyTree";
import './styles/HierarchyTree.css'

const HierarchyTree = ({ employees }) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set(['root']));
  const [expandedDetails, setExpandedDetails] = useState(new Set());

  return (
    <div className="hierarchy-container">
      <h2 className="app-title">Valid Hierarchy</h2>
      {buildHierarchyTree(
        employees,
        expandedNodes,
        setExpandedNodes,
        expandedDetails,
        setExpandedDetails
      )}
    </div>
  );
};

export default HierarchyTree;