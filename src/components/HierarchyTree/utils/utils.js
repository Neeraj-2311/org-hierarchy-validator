export const ToggleNode = (email, event, setExpandedNodes) => {
    event.stopPropagation();
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(email)) {
        newSet.delete(email);
      } else {
        newSet.add(email);
      }
      return newSet;
    });
};

export const ToggleDetails = (email, event, setExpandedDetails) => {
    event.stopPropagation();
    setExpandedDetails(prev => {
      const newSet = new Set(prev);
      if (newSet.has(email)) {
        newSet.delete(email);
      } else {
        newSet.add(email);
      }
      return newSet;
    });
};