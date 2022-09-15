import React from "react";
import Loader from "react-loader-spinner";
import styled, { css } from "styled-components";

interface LoaderContainerProps {
  relative?: boolean;
}
const LoaderContainer = styled.div<LoaderContainerProps>`
  ${(props) =>
    !props.relative
      ? css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `
      : css`
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        `}
`;

const LoaderElement: React.FC<LoaderContainerProps> = ({ relative }) => {
  return (
    <LoaderContainer relative={relative}>
      <Loader type="Puff" color="var(--secondary)" height={100} width={100} />
    </LoaderContainer>
  );
};

export default LoaderElement;
