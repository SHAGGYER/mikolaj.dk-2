import React from "react";
import styled from "styled-components";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  td {
    padding: 1rem;
    border: 1px solid black;
  }
`;

function VisitorView({ row }) {
  return (
    <div style={{ padding: "1rem" }}>
      <Table>
        <thead>
          <tr>
            <td>Page</td>
            <td>Count</td>
          </tr>
        </thead>
        <tbody>
          {row.visited_pages.map((visitor, index) => (
            <tr key={index}>
              <td>{visitor._id}</td>
              <td>{visitor.count}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default VisitorView;
