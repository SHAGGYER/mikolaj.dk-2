import styled from "styled-components";

export const Width = styled.div`
  width: ${(props) => (props.amount ? props.amount + "%" : "100%")};
`;
