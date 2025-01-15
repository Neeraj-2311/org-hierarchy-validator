import ExpandButton from "./ExpandButton"
import { ToggleDetails } from '../utils/utils'

const TreeNode = ({node, level, children, setExpandedDetails, setExpandedNodes, isExpanded}) => {
    return (
        <div
            className="tree-node"
            onClick={(e) => ToggleDetails(node.Email, e, setExpandedDetails)}
            >
            <div className="indent-container">
                {Array(level).fill().map((_, i) => (
                    <div key={i} className="indent-guide" />
                ))}
                {children?.length > 0 && <ExpandButton 
                    node={node} 
                    setExpandedNodes={setExpandedNodes} 
                    isExpanded={isExpanded}
                />}
            </div>
            <div className="node-content">
                {node.FullName}
                <span className={`role-badge ${node.Role.toLowerCase()}`}>
                    {node.Role}
                </span>
            </div>
        </div>
    )
}

export default TreeNode