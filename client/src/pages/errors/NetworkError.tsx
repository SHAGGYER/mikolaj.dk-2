import { Container, Spacer } from "components/UI";
import Alert from "components/UI/Alert";
import { Title } from "components/UI/Title";
import { Wrapper } from "components/UI/Wrapper";
import FlexBox from "components/UI/FlexBox";
import React from "react";
import { Text } from "components/UI/Text";

interface Props {}

const NetworkError = (props: Props) => {
  return (
    <Wrapper>
      <Container>
        <Title>Network Error</Title>
        <div>
          <Text center size="2.8rem" block>
            Oh, noes!
          </Text>
          <Spacer bottom="0.75rem" />
          <Text block center size="1.3rem">
            Some error has occurred. Try again later.
          </Text>
        </div>
      </Container>
    </Wrapper>
  );
};

export default NetworkError;
