const RenderDetails = (employee, level) => {
    return (
      <div className="details-container" style={{ marginLeft: level * 24 }}>
        <div className="detail-item">
          <span className="detail-label">Email:</span>
          <span>{employee.Email}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Reports to:</span>
          <span>{employee.ReportsTo || '-'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Role:</span>
          <span>{employee.Role}</span>
        </div>
      </div>
    );
};

export default RenderDetails