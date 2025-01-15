import React from 'react';

export const TreeNode = ({ node }) => (
  <div className="tree-node">
    <div className="node-content">
      <div className="node-avatar">
        <span className={`avatar-${node.role.toLowerCase()}`}></span>
      </div>
      <div className="node-info">
        <span className="name">{node.fullName}</span>
        <span className="role">{node.role}</span>
        <span className="email">{node.email}</span>
      </div>
    </div>
    {node.children?.length > 0 && (
      <div className="node-children">
        {node.children.map((child, index) => (
          <TreeNode key={`${child.email}-${index}`} node={child} />
        ))}
      </div>
    )}
  </div>
);