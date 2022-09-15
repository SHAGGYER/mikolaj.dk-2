import React from "react";
import { Slide } from "react-slideshow-image";
import styled from "styled-components";
import "react-slideshow-image/dist/styles.css";
import { Container, Spacer } from "../UI";
import { Wrapper } from "../UI/Wrapper";
import { Title } from "../UI/Title";
import { useTranslation } from "react-i18next";
import { Text } from "components/UI/Text";

const MainWrapper = styled.article`
  display: flex;
  gap: 1rem;
  max-height: max-content;

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  width: 50%;

  & aside {
    column-count: 2;
    column-gap: 1rem;
    margin-top: 1rem;
  }

  & h3 {
    font-size: 2rem;
    font-family: Bitrate, sans-serif !important;
    letter-spacing: 2px;
  }

  & p {
    line-height: 1.6;
    font-size: 18px;
  }

  @media screen and (max-width: 900px) {
    width: 100%;

    & aside {
      column-count: 1;
    }
  }
`;

const RightColumn = styled.div`
  width: 50%;
  column-count: 2;
  column-gap: 1rem;

  & h3 {
    font-size: 2rem;
    font-family: Bitrate, sans-serif !important;
    letter-spacing: 2px;
  }

  & p {
    line-height: 1.6;
    font-size: 18px;
  }

  @media screen and (max-width: 900px) {
    column-count: 1;
    width: 100%;
  }
`;

const SliderItem = styled.div`
  & img {
    height: 500px;
    width: 100%;
    object-fit: cover;

    @media (${(props) => props.theme.mobile}) {
      height: 350px;
    }
  }
`;

export default function Slider() {
  const { t } = useTranslation("about");
  return (
    <Wrapper>
      <Container id="about-me-slider">
        <Title>
          My <Text color="var(--primary)">Story</Text>
        </Title>
        <Spacer bottom="2rem" />
        <MainWrapper>
          <LeftColumn>
            <Slide autoplay={true}>
              <SliderItem>
                <img alt="mikolaj" src="/client/src/public/mikolaj17.jpg" />
              </SliderItem>
              <SliderItem>
                <img alt="mikolaj" src="/client/src/public/mikolaj6.jpg" />
              </SliderItem>
              <SliderItem>
                <img alt="mikolaj" src="/client/src/public/mikolaj5.jpg" />
              </SliderItem>
            </Slide>
            <aside>
              <h3>{t("about_subtitle1")}</h3>

              <p>{t("about_text1")}</p>
            </aside>
          </LeftColumn>
          <RightColumn>
            <h3>{t("about_subtitle2")}</h3>
            <p>{t("about_text2")}</p>

            <Spacer bottom="1.5rem" />
            <h3>{t("about_subtitle3")}</h3>
            <p>{t("about_text3")}</p>

            <Spacer bottom="1.5rem" />
            <h3>{t("about_subtitle4")}</h3>
            <p>{t("about_text4")}</p>

            <Spacer bottom="1.5rem" />
            <h3>{t("about_subtitle5")}</h3>
            <p>{t("about_text5")}</p>
          </RightColumn>
        </MainWrapper>
      </Container>
      <Spacer bottom="2rem" />
    </Wrapper>
  );
}
