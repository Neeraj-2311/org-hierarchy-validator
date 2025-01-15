import React from 'react';

const ExpandIcon = ({ expanded }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    className={`expand-icon ${expanded ? 'expanded' : ''}`}
  >
    <path 
      d="M6 12l4-4-4-4" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

export default React.memo(ExpandIcon);