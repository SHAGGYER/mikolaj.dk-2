import React from "react";
import styled from "styled-components";

const TableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;

  td {
    padding: 1rem;
    border: 1px solid #2a4365;
  }
`;

function Table({ columns, items }) {
  return (
    <TableStyled>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <td key={index}>{col}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>{item[colIndex]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableStyled>
  );
}

export default Table;
