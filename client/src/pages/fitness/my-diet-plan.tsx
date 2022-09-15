import { Container, Spacer } from "components/UI";
import Card from "components/UI/Card";
import Flexbox from "components/UI/FlexBox";
import { Text } from "components/UI/Text";
import { Title } from "components/UI/Title";
import { Wrapper } from "components/UI/Wrapper";
import React from "react";
import styled from "styled-components";

export default function () {
  return (
    <React.Fragment>
      <Wrapper>
        <Container>
          <Title>My Diet Plan</Title>
          <Flexbox gap="1rem" wrap="wrap" alignItems="flex-start">
            <Card minHeight="200px" width="200px">
              <Flexbox direction="column" gap="0.5rem" alignItems="flex-start">
                <Text size="20px">Breakfast</Text>
                <Text size="12px" color="#bebebe">
                  09:30 AM
                </Text>
                <Text>
                  <ul>
                    <li>Toast/Oatmeal with milk</li>
                  </ul>
                </Text>
              </Flexbox>
            </Card>

            <Card minHeight="200px" width="200px">
              <Flexbox direction="column" gap="0.5rem" alignItems="flex-start">
                <Text size="20px">Lunch</Text>
                <Text size="12px" color="#bebebe">
                  12:30 PM
                </Text>
                <Text>
                  <ul>
                    <li>200g Brown Rice</li>
                    <li>150g Chicken Breast</li>
                    <li>100g Cooked Mixed Veggies</li>
                    <li>60g Broccoli Sauce</li>
                  </ul>
                </Text>
              </Flexbox>
            </Card>

            <Card minHeight="200px" width="200px">
              <Flexbox direction="column" gap="0.5rem" alignItems="flex-start">
                <Text size="20px">Snack</Text>
                <Text size="12px" color="#bebebe">
                  03:00 PM
                </Text>
                <Text>
                  <ul>
                    <li>
                      Protein Shake <br />
                      with milk
                    </li>
                  </ul>
                </Text>
              </Flexbox>
            </Card>

            <Card minHeight="200px" width="200px">
              <Flexbox direction="column" gap="0.5rem" alignItems="flex-start">
                <Text size="20px">Lunch</Text>
                <Text size="12px" color="#bebebe">
                  06:30 PM
                </Text>
                <Text>
                  <ul>
                    <li>200g Cooked Potatoes with skin</li>
                    <li>150g Ground Beef 4-7% fat</li>
                    <li>100g Cooked Mixed Veggies</li>
                    <li>60g Broccoli Sauce</li>
                  </ul>
                </Text>
              </Flexbox>
            </Card>

            <Card minHeight="200px" width="200px">
              <Flexbox direction="column" gap="0.5rem" alignItems="flex-start">
                <Text size="20px">Supper</Text>
                <Text size="12px" color="#bebebe">
                  09:00 PM
                </Text>
                <Text>
                  <ul>
                    <li>
                      Whole-grain toast with light cheese and a piece of big
                      salami
                    </li>
                  </ul>
                </Text>
              </Flexbox>
            </Card>
          </Flexbox>
        </Container>
      </Wrapper>
    </React.Fragment>
  );
}
