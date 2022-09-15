import React from "react";
import styled from "styled-components";
import { Wrapper } from "components/UI/Wrapper";
import { Title } from "components/UI/Title";
import { Text } from "components/UI/Text";
import { Backdrop } from "components/Backdrop";

interface BgWrapperProps {
  bgUrl?: string;
}

const BgWrapper = styled.div<BgWrapperProps>`
  background: url(${(props) => props.bgUrl}) center center / cover;
  background-attachment: fixed;
  height: 600px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function OrderWebsite() {
  return (
    <React.Fragment>
      <BgWrapper bgUrl={`/hands.jpg`}>
        <Backdrop />
        <Title>
          <Text color="white">Order </Text>
          <Text color="var(--primary)">Website</Text>
        </Title>
      </BgWrapper>
      <Wrapper></Wrapper>
    </React.Fragment>
  );
}
