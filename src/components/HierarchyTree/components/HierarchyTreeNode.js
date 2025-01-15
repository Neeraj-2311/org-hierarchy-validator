const HierarchyNode = ({ node, connectedNodes, level }) => {
    const isConnectedTo = (nodeEmail) => {
        return connectedNodes.some(conn =>
            (conn.email === node?.email && conn.connectedTo.includes(nodeEmail)) || (conn.email === nodeEmail && conn.connectedTo.includes(node?.email))
        );
    };

    return (
        <div className="hierarchy-node">
            <div className="node-content">
                    <div className={`avatar ${node?.role === 'Root' ? 'avatar-root' :
                node?.role === 'Admin' ? 'avatar-admin' :
                    node?.role === 'Manager' ? 'avatar-manager' :
                        'avatar-default'}`}>
                        <span className="text-main">
                            {node?.role.charAt(0)}
                        </span>
                    </div>
                    <span className="text-main">{node?.fullName}</span>
            </div>
            {node?.role === 'Manager' && node?.children?.map(child => isConnectedTo(child.email) && (
                <div key={`connector-${child.email}`} className="manager-connector" />
            ))}
            {node?.children?.length > 0 && (
                <div className="vertical-connector" />
            )}
            {node?.children?.length > 0 && (
                <div className={`children-container ${level === 0 ? 'children-container-root' : 'children-container-other'}`}>
                    {node?.children.map((child, idx) => (
                        <HierarchyNode
                            key={child.email}
                            node={child}
                            connectedNodes={connectedNodes}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HierarchyNode