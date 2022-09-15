import { Backdrop } from "components/Backdrop";
import { Button, Container, PrimaryButton } from "components/UI";
import Flexbox from "components/UI/FlexBox";
import { Icon } from "components/UI/Icon";
import { Text } from "components/UI/Text";
import { Wrapper } from "components/UI/Wrapper";
import PublicContext from "contexts/PublicContext";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { Title } from "components/UI/Title";
import { Subtitle } from "components/UI/Subtitle";

const ContentContainer = styled.div`
  display: flex;
  gap: 6rem;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 1100px) {
    gap: 4rem;
  }

  @media (${(props) => props.theme.tabletPortrait}) {
    gap: 2rem;
  }

  @media (max-width: 600px) {
    gap: 4rem;
    height: 100%;
  }
`;

const IntroductionContent = styled(Flexbox)`
  @media (min-width: 1100px) {
    margin-bottom: -2rem;
  }

  height: 100%;
`;

const Stat = styled.div`
  background-color: #eee;
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 150px;
  opacity: 0;
  font-size: 18px;
  letter-spacing: 2px;

  & h2 {
    font-size: 1.75rem;
    font-weight: lighter;
    line-height: 1;
    margin-bottom: 0.5rem;
  }
`;

interface Props {}

export const Header2 = (props: Props) => {
  const { appSettings, isMobile } = useContext(PublicContext);

  useEffect(() => {
    const timeline = gsap.timeline();
    timeline.fromTo(
      ".stat",
      { opacity: 0, duration: 1 },
      { opacity: 0.85, stagger: 0.25 }
    );
  }, []);

  const handleLearnMore = () => {
    const aboutMeSlider = document.getElementById("about-platform");
    aboutMeSlider.scrollIntoView({
      behavior: "smooth",
    });
  };

  const redirectToYoutube = () => {
    window.open(
      "https://www.youtube.com/channel/UCYRV3vmAKt1rxxZiDcQXd9A",
      "_blank"
    );
  };

  return (
    <Wrapper
      image={import.meta.env.VITE_API_URL + appSettings?.homepageHeaderImage}
      style={{ height: isMobile && "calc(100vh - 50px)" }}
    >
      <Backdrop />
      <Container padding="7rem 0" style={{ padding: !isMobile && "7rem 3rem" }}>
        <ContentContainer>
          {!isMobile && (
            <Flexbox
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              wrap="wrap"
              gap="2rem"
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "repeat(2, 1fr)"
                    : "repeat(4, 1fr)",
                  gap: "1rem",
                  width: isMobile ? "100%" : "auto",
                  fontFamily: "Gilroy-Light",
                }}
              >
                <Stat
                  className="stat"
                  style={{ color: "var(--purple-primary)" }}
                >
                  <h2>5+</h2>
                  Years of
                  <br /> Experience
                </Stat>
                <Stat className="stat" style={{ color: "var(--blue-primary)" }}>
                  <h2>12+</h2>
                  Learnt
                  <br /> Technologies
                </Stat>
                <Stat className="stat" style={{ color: "var(--primary)" }}>
                  <h2>300k+</h2>
                  Lines of
                  <br /> Code
                </Stat>
                <Stat className="stat" style={{ color: "var(--red-primary)" }}>
                  <h2>{appSettings?.youtubeViews / 1000}k+</h2>
                  YouTube
                  <br /> Views
                </Stat>
              </div>
              <Flexbox gap="0.5rem" wrap="wrap">
                <Text size="20px" color="white">
                  Check me out on{" "}
                </Text>
                <Button
                  color="var(--red-primary)"
                  hoverColor="var(--red-dark)"
                  onClick={redirectToYoutube}
                  mini
                >
                  <Flexbox gap="0.35rem" wrap="nowrap" alignItems="center">
                    <Icon
                      color="var(--white)"
                      size="26px"
                      className="mdi mdi-youtube"
                    />
                    <span>Youtube</span>
                  </Flexbox>
                </Button>
              </Flexbox>
            </Flexbox>
          )}

          <IntroductionContent
            direction="column"
            gap={isMobile ? "1rem" : "2rem"}
            alignItems={isMobile ? "flex-start" : "flex-start"}
            width="100%"
          >
            <div>
              <Title
                style={{
                  color: "white",
                  fontFamily: "Gilroy-Light",
                  wordSpacing: 5,
                }}
                left
              >
                MIKOLAJ MARCINIAK
              </Title>
              <Subtitle style={{ letterSpacing: "6px", fontSize: "3.5rem" }}>
                <Text
                  style={{ fontFamily: "Gilroy-Light" }}
                  block
                  color="white"
                  tabletSize="3rem"
                  size={isMobile ? "2rem" : "3.7rem"}
                >
                  <Text color="var(--primary)">WEB</Text> DEVELOPER
                </Text>
              </Subtitle>
            </div>

            <Flexbox
              style={{ width: "100%" }}
              gap={!isMobile ? "2rem" : "3rem"}
              justifyContent="space-between"
            >
              <Flexbox
                gap={isMobile ? "1rem" : "1rem"}
                wrap="wrap"
                direction="column"
                alignItems="flex-start"
              >
                <Flexbox
                  gap="0.5rem"
                  wrap="nowrap"
                  justifyContent="flex-start"
                  manualMobile
                >
                  <Icon
                    color="var(--primary)"
                    size="30px"
                    className="mdi mdi-shield-check"
                  />
                  <Text
                    size="1.2rem"
                    mobileSize="16px"
                    color="white"
                    style={{ letterSpacing: "2px" }}
                  >
                    I am currently
                    {!appSettings?.availableForWork && (
                      <Text color="var(--primary)"> not</Text>
                    )}
                    <Text color="var(--primary)"> available</Text> for work
                  </Text>
                </Flexbox>

                <Flexbox
                  gap="0.5rem"
                  wrap="nowrap"
                  justifyContent="flex-start"
                  manualMobile
                >
                  <Icon
                    color="var(--primary)"
                    size="30px"
                    className="mdi mdi-globe-model"
                  />
                  <Text
                    size="1.2rem"
                    mobileSize="16px"
                    color="white"
                    style={{ letterSpacing: "2px" }}
                  >
                    I speak Polish, Danish and English
                  </Text>
                </Flexbox>
              </Flexbox>
            </Flexbox>
          </IntroductionContent>

          <Flexbox
            justifyContent={isMobile ? "center" : "flex-start"}
            width="100%"
            style={{
              zIndex: 0,
              flex: isMobile && 1,
              alignItems: isMobile && "flex-end",
            }}
          >
            <PrimaryButton onClick={() => handleLearnMore()}>
              START HERE...
            </PrimaryButton>
          </Flexbox>
        </ContentContainer>
      </Container>
    </Wrapper>
  );
};
