import { useState } from "react";
import styled from "styled-components";

export const HelpQuestion = styled.i`
  border: 1px solid black;
  border-radius: 50%;
  padding: 0.3rem 0.3rem;
  font-size: 10px;
  text-align: center;
`;

const MessageElmWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  & i {
    font-size: 20px;
  }

  & span {
    font-size: 10px;
  }
`;

export const MessageElm = ({ icon, text }) => {
  return (
    <MessageElmWrapper>
      <i className={icon} />
      <span>{text}</span>
    </MessageElmWrapper>
  );
};

export const AddPictureElm = styled.div`
  background-color: #282a36;
  color: white;
  display: flex;
  align-items: "center";
  padding: 0.5rem 1rem;
  border-radius: 10px;
  margin-right: 0.3rem;

  &:last-child {
    margin-right: 0;
  }

  & i {
    font-size: 14px;
    line-height: 1.5;
  }

  & span {
    margin-left: 0.5rem;
  }
`;

const AdvancedElmWrapper = styled.div`
  background-color: #282a36;
  padding: 0.5rem 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  border-bottom-left-radius: ${(props) => (props.isOpen ? 0 : "10px")};
  border-bottom-right-radius: ${(props) => (props.isOpen ? 0 : "10px")};
`;

const AdvancedInfoWrapper = styled.div`
  border: 1px solid black;
  padding: 1rem;
  border-top: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const AdvancedElm = ({ text, info }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <AdvancedElmWrapper isOpen={isOpen}>
        <div>{text}</div>
        <div onClick={() => setOpen(!isOpen)}>
          <i
            className={!isOpen ? "fas fa-chevron-down" : "fas fa-chevron-up"}
          ></i>
        </div>
      </AdvancedElmWrapper>
      {isOpen && <AdvancedInfoWrapper>{info}</AdvancedInfoWrapper>}
    </div>
  );
};
