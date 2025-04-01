import React from "react";

const ReusableTable = ({ headers, data, actions }) => {
  return (
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(item).map((value, colIndex) => (
              <td key={colIndex}>{value}</td>
            ))}
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReusableTable;
