import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import { EditStyle } from "./EditStyle";

function EditColumn({ column, onColumnEdited }) {
  const [padding, setPadding] = useState("1rem");
  const [display, setDisplay] = useState("flex");
  const [width, setWidth] = useState("100%");
  const [gap, setGap] = useState("0");

  const handleColumnEdited = () => {
    const style = {
      padding,
      display,
      width,
      gap,
    };

    onColumnEdited({ style });
  };

  return (
    <div>
      <h2>Edit Column</h2>
      <div style={{ marginBottom: "1rem" }}>
        <EditStyle>
          <span>Padding</span>
          <input value={padding} onChange={(e) => setPadding(e.target.value)} />
        </EditStyle>
        <EditStyle>
          <span>Display</span>
          <input value={display} onChange={(e) => setDisplay(e.target.value)} />
        </EditStyle>
        <EditStyle>
          <span>Width</span>
          <input value={width} onChange={(e) => setWidth(e.target.value)} />
        </EditStyle>
        <EditStyle>
          <span>Gap</span>
          <input value={gap} onChange={(e) => setGap(e.target.value)} />
        </EditStyle>
      </div>

      <Button onClick={handleColumnEdited}>Save</Button>
    </div>
  );
}

export default EditColumn;
