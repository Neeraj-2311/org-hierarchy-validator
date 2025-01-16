import './styles/ValidTable.css'

const ValidTable = ({ validRows }) => (
    <div className='valid-table'>
      <h2 className="component-title valid-title">Valid Rows</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Row</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Reports To</th>
            </tr>
          </thead>
          <tbody>
            {validRows.map((item, index) => (
              <tr key={`${item.rowIndex}-${index}`}>
                <td>{item.rowIndex+1}</td>
                <td>{item.Email}</td>
                <td>{item.FullName}</td>
                <td>{item.Role}</td>
                <td>{item.ReportsTo || 'None'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
);

export default ValidTable