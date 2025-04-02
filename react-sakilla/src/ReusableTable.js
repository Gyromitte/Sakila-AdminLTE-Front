import React from "react";

const ReusableTable = ({ headers, data, actions }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            {actions && actions.length > 0 && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex}>{item[header] || '-'}</td>
              ))}
              {actions && actions.length > 0 && (
                <td>
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      className={`btn btn-sm ${action.label === "Eliminar" ? "btn-danger" : "btn-primary"} me-2`}
                      onClick={() => action.onClick(item)}
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
