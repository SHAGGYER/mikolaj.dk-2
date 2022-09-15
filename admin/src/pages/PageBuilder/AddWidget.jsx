import React from "react";
import { WIDGET } from "../../../../client-common/PageBuilder/common";
import styled from "styled-components";

const Wrapper = styled.div`
  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;

    li {
      border: 1px solid #ccc;
      padding: 0.5rem;
      text-align: center;
      cursor: pointer;

      &:hover {
        background-color: #eee;
      }
    }
  }
`;

function AddWidget({ onFinish, only }) {
  return (
    <Wrapper>
      <ul>
        {(only && only.includes(WIDGET.PICTURE)) || !only ? (
          <li onClick={() => onFinish(WIDGET.PICTURE)}>Picture</li>
        ) : null}
        {(only && only.includes(WIDGET.RICH_TEXT)) || !only ? (
          <li onClick={() => onFinish(WIDGET.RICH_TEXT)}>Rich Text</li>
        ) : null}
        <li onClick={() => onFinish(WIDGET.ROW)}>Row</li>
      </ul>
    </Wrapper>
  );
}

export default AddWidget;
