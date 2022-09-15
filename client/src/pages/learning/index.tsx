import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import FlexBox from "components/UI/FlexBox";
import Flexbox from "components/UI/FlexBox";
import { Container, Spacer } from "components/UI";
import { Text } from "components/UI/Text";
import PublicContext from "contexts/PublicContext";
import Rating from "components/UI/Rating";
import { Wrapper } from "components/UI/Wrapper";
import { Title } from "components/UI/Title";
import { useTranslation } from "react-i18next";
import { Image } from "components/UI/Image";
import Meta from "components/Meta";

interface ContentWrapperProps {
  desktopMaxWidth?: string;
}

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 2rem;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContentWrapper = styled.div<ContentWrapperProps>`
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: center;
  gap: 3rem;

  @media screen and (max-width: ${(props) =>
      props.desktopMaxWidth ?? "900px"}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const WhyChooseMeFlexbox = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  & h2 {
    font-family: Bitrate, sans-serif !important;
    font-size: 1.65rem;
    font-weight: normal;
    letter-spacing: 1px;
  }

  @media (${(props) => props.theme.tabletPortrait}) {
    flex-direction: column-reverse;
    gap: 3rem;
  }
`;

const TestimonialsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;

  @media (${(props) => props.theme.tabletPortrait}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (${(props) => props.theme.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Testimonial = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;

  & img {
    width: 70px;
    height: 70px;
    object-fit: contain;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  & i {
    font-size: 24px;
    color: var(--cta);
  }
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: contain;

  @media (max-width: 900px) {
    width: auto;
    align-self: start;
    height: 350px;
  }

  @media (max-width: 600px) {
    height: 100%;
    width: 100%;
  }
`;

const TechImage = styled.img`
  width: 75px;
  height: 75px;
  object-fit: contain;
  filter: grayscale(100%);
`;

const Check = styled.i`
  font-size: 30px;
  color: var(--green);
`;

const testimonials = [
  {
    name: "Jesper Vig Troelsen",
    text: `Jeg kan klart anbefale Mikolaj hvis du skal have udviklet en hjemmeside med komplicerede løsninger.`,
    rating: 5,
    image: "/jesper.jpg",
  },
  {
    name: "Benjamin Fidelman",
    text: `Gennem sit arbejde viste Mikolaj stor professionalisme og potentiale han er i besiddelse af.`,
    rating: 5,
    image: "/benjamin.jpg",
  },
  {
    name: "Mohman Parvez",
    text: `Hvis man ikke er så erfaren igen, så er det dejligt, at få en til at se ens kode og komme med nogle kommentarer.`,
    rating: 4,
    image: "/mohman.jpg",
  },
];

export default function Learning() {
  const { t } = useTranslation("one_on_one_intro");
  const { setMeta, redirect, isMobile } = useContext(PublicContext);

  useEffect(() => {
    setMeta({
      title: "1-on-1 Introduction",
      description: "Hey, you came all this way, might as well drop a line!",
      keywords: "Coding School, Coding Education, 1-on-1, Introduction",
    });
  }, []);

  const TestimonialElm = ({ testimonial }) => {
    return (
      <Testimonial>
        <Rating rating={testimonial.rating} />
        <Spacer bottom="1rem" />

        <h3>{testimonial.name}</h3>
        <Spacer bottom="1rem" />

        <FlexBox alignItems="center" gap="1rem" justifyContent="space-between">
          <img
            alt="testimonial"
            src={import.meta.env.VITE_API_URL + "/uploads/" + testimonial.image}
          />
          <p>“{testimonial.text}”</p>
        </FlexBox>
      </Testimonial>
    );
  };

  return (
    <React.Fragment>
      <Wrapper>
        <Container>
          <HeaderWrapper>
            <div style={{ position: "relative", zIndex: 0 }}>
              {!isMobile && (
                <React.Fragment>
                  <FlexBox alignItems="center">
                    <i
                      style={{ fontSize: "1.3rem" }}
                      className="mdi mdi-arrow-right-bold"
                    />
                    <Spacer right="0.5rem" />
                    <Text size="18px">{t("subtitle")}</Text>
                  </FlexBox>
                  <Spacer bottom="1rem" />
                </React.Fragment>
              )}

              <Title left={!isMobile}>
                Learn to <Text color="var(--primary)">make</Text> websites
              </Title>
              <Spacer bottom="2rem" />

              <Text size="20px" style={{ lineHeight: 1.75 }}>
                {t("desc")}
              </Text>
            </div>
            <HeaderImage
              src={
                import.meta.env.VITE_API_URL +
                "/uploads" +
                "/mikolaj_cartoon3.jpg"
              }
            />
          </HeaderWrapper>
        </Container>
        {/*      <YoutubeEmbed embedId="B52gf5IbQT0" />*/}
        <Container padding="4rem 3rem 6rem 1rem">
          <ContentWrapper
            style={{
              backgroundColor: "white",
              padding: "1rem",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.2)",
            }}
          >
            <Text size="2.2rem" style={{ fontFamily: "Bitrate" }} mobileCenter>
              {t("technologies")}
            </Text>
            <FlexBox gap="1rem" alignItems="center" wrap="wrap">
              <TechImage
                src={import.meta.env.VITE_API_URL + "/uploads" + "/html5.svg"}
              />
              <TechImage
                src={import.meta.env.VITE_API_URL + "/uploads" + "/css3.svg"}
              />
              <TechImage
                src={import.meta.env.VITE_API_URL + "/uploads" + "/js.svg"}
              />
              <TechImage
                src={import.meta.env.VITE_API_URL + "/uploads" + "/react.svg"}
              />
              <TechImage
                src={import.meta.env.VITE_API_URL + "/uploads" + "/vue.svg"}
              />
            </FlexBox>
          </ContentWrapper>
        </Container>
      </Wrapper>

      <Wrapper white>
        <Container>
          <WhyChooseMeFlexbox>
            <FlexBox gap="0.5rem" direction="column" alignItems="flex-start">
              <FlexBox
                gap="1rem"
                alignItems="center"
                wrap="nowrap"
                justifyContent="flex-start"
                manualMobile
              >
                <Check className="mdi mdi-check-bold" />
                <div>
                  <h2>5+ Years of experience</h2>
                  <p>
                    I have lots of experience that you can benefit from and
                    create your own coding path
                  </p>
                </div>
              </FlexBox>
              <Spacer bottom="1rem" />
              <FlexBox
                gap="1rem"
                alignItems="center"
                wrap="nowrap"
                justifyContent="flex-start"
                manualMobile
              >
                <Check className="mdi mdi-check-bold" />
                <div>
                  <h2>I respect your time</h2>
                  <p>{t("why_choose_me_bullet2_desc")}</p>
                </div>
              </FlexBox>
              <Spacer bottom="1rem" />

              <FlexBox
                gap="1rem"
                alignItems="center"
                wrap="nowrap"
                justifyContent="flex-start"
                manualMobile
              >
                <Check className="mdi mdi-check-bold" />
                <div>
                  <h2>My teaching is awesome</h2>
                  <p>
                    You will enjoy working with me on your learning journey.
                  </p>
                </div>
              </FlexBox>
            </FlexBox>
            <Flexbox direction="column" width="50%" gap="1rem">
              <Text
                size="3rem"
                style={{ fontFamily: "Bitrate", letterSpacing: "2px" }}
                tabletSize="2.5rem"
                mobileSize="2rem"
                mobileCenter
              >
                {t("why_choose_me_title")}
              </Text>
              <Image
                tabletHidden
                height="300px"
                fit="contain"
                src={
                  import.meta.env.VITE_API_URL + "/uploads" + "/mikolaj12.jpg"
                }
              />
            </Flexbox>
          </WhyChooseMeFlexbox>
        </Container>
      </Wrapper>

      <Wrapper>
        <Spacer bottom="2rem" />
        <Container>
          <Text
            block
            margin="0 0 1.5rem"
            style={{ fontFamily: "Bitrate", letterSpacing: "2px" }}
            size="3rem"
            tabletSize="2.5rem"
            mobileSize="2rem"
            mobileCenter
          >
            {t("what_customers_say")}
          </Text>

          <TestimonialsWrapper>
            {testimonials.map((testimonial, index) => (
              <TestimonialElm testimonial={testimonial} key={index} />
            ))}
          </TestimonialsWrapper>
        </Container>
      </Wrapper>
      <Wrapper>
        <Container>
          <Text
            block
            margin="0 0 1.5rem"
            style={{ fontFamily: "Bitrate", letterSpacing: "2px" }}
            size="3rem"
            tabletSize="2.5rem"
            mobileSize="2rem"
            mobileCenter
          >
            Trusted by companies
          </Text>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr" }}>
            <div>
              <img
                style={{ width: "100%" }}
                src={
                  import.meta.env.VITE_API_URL + "/uploads" + "/getclients.jpg"
                }
              />
            </div>
            <div>
              <img
                style={{ width: "100%" }}
                src={
                  import.meta.env.VITE_API_URL + "/uploads" + "/g4metime.png"
                }
              />
            </div>
            <div>
              <img
                style={{ width: "100%" }}
                src={import.meta.env.VITE_API_URL + "/uploads" + "/dsrack.jpg"}
              />
            </div>
          </div>
        </Container>
      </Wrapper>
    </React.Fragment>
  );
}
