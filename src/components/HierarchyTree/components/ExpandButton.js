import ExpandIcon from "./ExpandIcon"
import { ToggleNode } from "../utils/utils"

const ExpandButton = ({node, setExpandedNodes, isExpanded}) => {
    return (
        <button aria-label="expand"
            className="expand-button"
            onClick={(e) => ToggleNode(node.Email, e, setExpandedNodes)}
        >
            <ExpandIcon expanded={isExpanded} />
        </button>
    )
}

export default ExpandButton