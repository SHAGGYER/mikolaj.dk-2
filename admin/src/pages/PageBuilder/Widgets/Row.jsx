import React, { useEffect, useState } from "react";
import { CustomDialog } from "react-st-modal";
import MediaExplorer from "../../../components/MediaExplorer";
import Button from "../../../components/Button";
import styled from "styled-components";
import { EditStyle } from "../EditStyle";

function Row({ html, onUpdateValue }) {
  const [display, setDisplay] = useState("flex");
  const [width, setWidth] = useState("100%");
  const [gap, setGap] = useState("0");
  const [justifyContent, setJustifyContent] = useState("");
  const [paddingTop, setPaddingTop] = useState("");

  const saveValue = () => {
    const style = {
      display,
      width,
      gap,
      justifyContent,
      paddingTop,
    };

    onUpdateValue({ style });
  };

  return (
    <div>
      <h2>Row</h2>
      <div>
        <EditStyle>
          <span>Padding Top</span>
          <input
            value={paddingTop}
            onChange={(e) => setPaddingTop(e.target.value)}
          />
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
        <EditStyle>
          <span>Justify Content</span>
          <select
            value={justifyContent}
            onChange={(e) => setJustifyContent(e.target.value)}
          >
            <option value=""></option>
            <option value="center">Center</option>
            <option value="space-between">Space Between</option>
          </select>
        </EditStyle>
      </div>
      <Button onClick={saveValue}>Save</Button>
    </div>
  );
}

export default Row;
