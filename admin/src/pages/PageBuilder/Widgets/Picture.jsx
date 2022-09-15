import React, { useEffect, useState } from "react";
import { CustomDialog } from "react-st-modal";
import MediaExplorer from "../../../components/MediaExplorer";
import Button from "../../../components/Button";
import styled from "styled-components";
import { EditStyle } from "../EditStyle";

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

function Picture({ html, onUpdateValue }) {
  const [img, setImg] = useState(html ? html : "");
  const [width, setWidth] = useState("100%");
  const [height, setHeight] = useState("100%");
  const [objectFit, setObjectFit] = useState("cover");

  const openMediaExplorerDialog = async () => {
    await CustomDialog(<MediaExplorer onSelect={(img) => setImg(img)} />);
  };

  const saveValue = () => {
    const style = {
      width,
      height,
      objectFit,
    };

    const value = img;

    onUpdateValue({ value, style });
  };

  return (
    <div>
      <h2>Picture</h2>
      <Button onClick={openMediaExplorerDialog}>Choose Image</Button>
      {img && <Image src={import.meta.env.VITE_API_URL + img} />}
      <div>
        <EditStyle>
          <span>Width</span>
          <input
            type="text"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </EditStyle>
        <EditStyle>
          <span>Height</span>
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </EditStyle>
        <EditStyle>
          <span>Object Fit</span>
          <input
            type="text"
            value={objectFit}
            onChange={(e) => setObjectFit(e.target.value)}
          />
        </EditStyle>
      </div>
      <Button onClick={saveValue}>Save</Button>
    </div>
  );
}

export default Picture;
