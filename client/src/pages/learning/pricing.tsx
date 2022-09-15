import React, { useContext, useEffect } from "react";

import Card from "components/UI/Card";
import FlexBox from "components/UI/FlexBox";
import { Container, SecondaryButtonStyle, Spacer } from "components/UI";
import { Text } from "components/UI/Text";
import Collapsible from "react-collapsible";
import PublicContext from "contexts/PublicContext";
import styled from "styled-components";
import { Wrapper } from "components/UI/Wrapper";
import { Title } from "components/UI/Title";
import { useTranslation } from "react-i18next";
import Meta from "components/Meta";

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3rem;

  @media (${(props) => props.theme.tabletLandscape}) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media (${(props) => props.theme.tabletPortrait}) {
    grid-template-columns: 1fr;
  }
`;

const PricingCard = styled(Card)`
  & .pricing-details {
    flex-grow: 1;
    color: white;
    font-size: 18px;
    font-weight: normal;

    & .mdi {
      font-size: 25px;
    }
  }
`;

const PricingButton = styled(SecondaryButtonStyle)`
  color: white;
  border: 2px solid white;
  padding: 0.6rem;

  &:hover {
    color: var(--primary);
  }

  &:before {
    background: white;
  }
`;

const LearnMoreButton = styled(SecondaryButtonStyle)`
  color: #7b1fa2;
  border: 2px solid #7b1fa2;

  &:hover {
    color: white;
  }

  &:before {
    background: #7b1fa2;
  }
`;

const HOURLY_RATE = 135;

export default function LearningPricing() {
  const { t } = useTranslation("one_on_one_pricing");
  const { setMeta, redirect } = useContext(PublicContext);

  useEffect(() => {
    setMeta({
      title: "1-on-1 Pricing",
      description: "Hey, you came all this way, might as well drop a line!",
      keywords: "Coding School, Coding Education, 1-on-1, Pricing",
    });
  }, []);

  return (
    <React.Fragment>
      <Meta
        title="1-on-1 Prices"
        description="Effective and affordable code training."
        url="/learning/pricing"
      />

      <Wrapper>
        <Container>
          <Title>
            1-on-1 <Text color="var(--primary)">Pricing</Text>
          </Title>
          <ContentWrapper>
            <PricingCard
              padding="2rem 2rem"
              color="var(--green)"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Text
                center
                color="white"
                style={{ fontFamily: "Bitrate" }}
                size="2.1em"
              >
                FRONTEND
              </Text>
              <Spacer bottom="0.5rem" />
              <FlexBox alignItems="center" justifyContent="center" gap="0.5rem">
                <Text color="white" size="40px">
                  DKK {HOURLY_RATE}
                </Text>
                <Text color="white" size="18px">
                  /{t("hour")}
                </Text>
              </FlexBox>
              <Spacer bottom="2rem" />

              <div className="pricing-details">
                <FlexBox
                  alignItems="center"
                  justifyContent="flex-start"
                  manualMobile
                >
                  <i className="mdi mdi-check" />
                  <Spacer right="1rem" />
                  <Text color="white">{t("frontend_bullet1")}</Text>
                </FlexBox>
                <Spacer bottom="0.5rem" />
                <FlexBox
                  alignItems="center"
                  justifyContent="flex-start"
                  manualMobile
                >
                  <i className="mdi mdi-check" />

                  <Spacer right="1rem" />
                  <Text color="white">{t("frontend_bullet2")}</Text>
                </FlexBox>
                <Spacer bottom="0.5rem" />

                <FlexBox
                  alignItems="center"
                  justifyContent="flex-start"
                  manualMobile
                >
                  <i className="mdi mdi-check" />

                  <Spacer right="1rem" />
                  <Text color="white">Responsive design</Text>
                </FlexBox>
                <Spacer bottom="0.5rem" />

                <FlexBox
                  alignItems="center"
                  justifyContent="flex-start"
                  manualMobile
                >
                  <i className="mdi mdi-check" />

                  <Spacer right="1rem" />
                  <Text color="white">{t("frontend_bullet3")}</Text>
                </FlexBox>
                <Spacer bottom="0.5rem" />

                <FlexBox
                  alignItems="center"
                  justifyContent="flex-start"
                  manualMobile
                >
                  <i className="mdi mdi-check" />

                  <Spacer right="1rem" />
                  <Text color="white">{t("frontend_bullet4")}</Text>
                </FlexBox>
              </div>
              <Spacer bottom="2rem" />

              <PricingButton
                hoverColor="black"
                onClick={() => redirect("/learning/order")}
              >
                {t("order")}
              </PricingButton>
              <Spacer bottom="0.5rem" />
            </PricingCard>
            <PricingCard
              padding="2rem 2rem"
              color="var(--blue)"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Text
                center
                color="white"
                style={{ fontFamily: "Bitrate" }}
                size="2.1em"
              >
                BACKEND
              </Text>
              <Spacer bottom="0.5rem" />
              <FlexBox alignItems="center" justifyContent="center" gap="0.5rem">
                <Text color="white" size="40px">
                  DKK {HOURLY_RATE}
                </Text>
                <Text color="white" size="18px">
                  /{t("hour")}
                </Text>
              </FlexBox>

              <Spacer bottom="2rem" />
              <div className="pricing-details">
                <FlexBox
                  alignItems="center"
                  justifyContent="flex-start"
                  manualMobile
                >
                  <i className="mdi mdi-check" />

                  <Spacer right="1rem" />
                  <Text color="white">{t("backend_bullet1")}</Text>
                </FlexBox>
                <Spacer bottom="0.5rem" />
                <FlexBox
                  alignItems="center"
                  justifyContent="flex-start"
                  manualMobile
                >
                  <i className="mdi mdi-check" />

                  <Spacer right="1rem" />
                  <Text color="white">{t("backend_bullet2")}</Text>
                </FlexBox>
                <Spacer bottom="0.5rem" />

                <FlexBox
                  alignItems="center"
                  justifyContent="flex-start"
                  manualMobile
                >
                  <i className="mdi mdi-check" />

                  <Spacer right="1rem" />
                  <Text color="white">{t("backend_bullet3")}</Text>
                </FlexBox>
                <Spacer bottom="0.5rem" />

                <FlexBox
                  alignItems="center"
                  justifyContent="flex-start"
                  manualMobile
                >
                  <i className="mdi mdi-check" />

                  <Spacer right="1rem" />
                  <Text color="white">{t("backend_bullet4")}</Text>
                </FlexBox>
                <Spacer bottom="0.5rem" />

                <FlexBox
                  alignItems="center"
                  justifyContent="flex-start"
                  manualMobile
                >
                  <i className="mdi mdi-check" />

                  <Spacer right="1rem" />
                  <Text color="white">{t("backend_bullet5")}</Text>
                </FlexBox>
              </div>
              <Spacer bottom="2rem" />

              <PricingButton
                hoverColor="black"
                onClick={() => redirect("/learning/order")}
              >
                {t("order")}
              </PricingButton>
              <Spacer bottom="0.5rem" />
            </PricingCard>
            <PricingCard
              padding="2rem 2rem"
              color="var(--pink-primary)"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Text
                center
                color="white"
                style={{ fontFamily: "Bitrate" }}
                size="2.1em"
              >
                DEVOPS
              </Text>
              <Spacer bottom="0.5rem" />
              <FlexBox alignItems="center" justifyContent="center" gap="0.5rem">
                <Text color="white" size="40px">
                  DKK {HOURLY_RATE}
                </Text>
                <Text color="white" size="18px">
                  /{t("hour")}
                </Text>
              </FlexBox>
              <Spacer bottom="2rem" />

              <div className="pricing-details">
                <FlexBox
                  alignItems="center"
                  justifyContent="flex-start"
                  manualMobile
                >
                  <i className="mdi mdi-check" />

                  <Spacer right="1rem" />
                  <Text color="white">{t("devops_bullet1")}</Text>
                </FlexBox>
                <Spacer bottom="0.5rem" />
                <FlexBox
                  alignItems="center"
                  justifyContent="flex-start"
                  manualMobile
                >
                  <i className="mdi mdi-check" />

                  <Spacer right="1rem" />
                  <Text color="white">{t("devops_bullet2")}</Text>
                </FlexBox>
                <Spacer bottom="0.5rem" />

                <FlexBox
                  alignItems="center"
                  justifyContent="flex-start"
                  manualMobile
                >
                  <i className="mdi mdi-check" />

                  <Spacer right="1rem" />
                  <Text color="white">{t("devops_bullet3")}</Text>
                </FlexBox>
                <Spacer bottom="0.5rem" />

                <FlexBox
                  alignItems="center"
                  justifyContent="flex-start"
                  manualMobile
                >
                  <i className="mdi mdi-check" />

                  <Spacer right="1rem" />
                  <Text color="white">{t("devops_bullet4")}</Text>
                </FlexBox>
                <Spacer bottom="0.5rem" />

                <FlexBox
                  alignItems="center"
                  justifyContent="flex-start"
                  manualMobile
                >
                  <i className="mdi mdi-check" />

                  <Spacer right="1rem" />
                  <Text color="white">{t("devops_bullet5")}</Text>
                </FlexBox>
              </div>
              <Spacer bottom="2rem" />

              <PricingButton
                hoverColor="black"
                onClick={() => redirect("/learning/order")}
              >
                {t("order")}
              </PricingButton>
              <Spacer bottom="0.5rem" />
            </PricingCard>
          </ContentWrapper>

          <Spacer bottom="5rem" />
          <Text style={{ fontFamily: "Bitrate" }} size="4rem">
            FAQ
          </Text>
          <Spacer bottom="1rem"></Spacer>
          <div style={{ maxWidth: 720 }}>
            <Collapsible trigger={t("faq1_title")}>
              <Text
                style={{
                  backgroundColor: "white",
                  padding: "1rem",
                  marginLeft: "1rem",
                  marginBottom: "0.5rem",
                }}
                block
              >
                {t("faq1_desc")}
              </Text>
            </Collapsible>
            <Spacer bottom="0.5rem" />
            <Collapsible trigger={t("faq2_title")}>
              <Text
                style={{
                  backgroundColor: "white",
                  padding: "1rem",
                  marginLeft: "1rem",
                  marginBottom: "0.5rem",
                }}
                block
              >
                {t("faq2_desc")}
              </Text>
            </Collapsible>
            <Spacer bottom="0.5rem" />
            <Collapsible trigger={t("faq3_title")}>
              <Text
                style={{
                  backgroundColor: "white",
                  padding: "1rem",
                  marginLeft: "1rem",
                  marginBottom: "0.5rem",
                }}
                block
              >
                {t("faq3_desc")}
              </Text>
            </Collapsible>
            <Spacer bottom="0.5rem" />
            <Collapsible trigger={t("faq4_title")}>
              <Text
                style={{
                  backgroundColor: "white",
                  padding: "1rem",
                  marginLeft: "1rem",
                  marginBottom: "0.5rem",
                }}
                block
              >
                {t("faq4_desc")}
              </Text>
            </Collapsible>
            <Spacer bottom="0.5rem" />
            <Collapsible trigger={t("faq5_title")}>
              <Text
                style={{
                  backgroundColor: "white",
                  padding: "1rem",
                  marginLeft: "1rem",
                  marginBottom: "0.5rem",
                }}
                block
              >
                {t("faq5_desc")}
              </Text>
            </Collapsible>
          </div>
          <Spacer bottom="3rem" />
        </Container>
      </Wrapper>
    </React.Fragment>
  );
}
