import React, { useContext } from "react";
import styled from "styled-components";
import { Container, PrimaryLink, SecondaryButton, Spacer } from "../UI";
import { Wrapper } from "../UI/Wrapper";
import { useTranslation } from "react-i18next";
import { Text } from "components/UI/Text";
import PublicContext from "contexts/PublicContext";
import { Subtitle } from "components/UI/Subtitle";

const ContentContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  width: 100%;
  margin: 0 auto 0;
  justify-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0;
    padding: 0;
  }
`;

const Image = styled.img`
  width: 100%;

  border-radius: 10px;
  object-fit: cover;
  height: 100%;
  max-height: 500px;

  @media screen and (max-width: 900px) {
    grid-row: 2;
    width: 400px;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Content = styled.article`
  width: 100%;

  & h2 span {
    color: var(--primary);
  }
`;

const Alert = styled.div`
  background-color: var(--primary);
  color: white;
  border-radius: 10px;
  margin-bottom: 1rem;
  width: 100%;

  & aside {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap: 1rem;

    & p {
      padding: 0.75rem 1rem;
      font-weight: 400;
      font-size: 1.1rem;
      line-height: 1.2;
    }

    & p span {
      color: black;
    }

    & article {
      background-color: var(--orange-primary);
      padding: 1rem;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      display: flex;
      align-items: center;
    }

    & i {
      font-size: 30px;
      line-height: 0.8;
      position: relative;
      top: 3px;
    }
  }
`;

const Card = styled.div`
  border-radius: 10px;
  padding: 1rem;
  position: relative;
  z-index: 0;

  & h3 {
    font-family: Bitrate, sans-serif !important;
    font-size: 1.7rem;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 1rem;
  }

  & ul {
    padding-top: 1rem;
    padding-left: 1rem;

    & li {
      margin-bottom: 1rem;
    }

    & li h4 {
      font-family: Bitrate, sans-serif !important;
      letter-spacing: 2px;
      font-size: 1.3rem;
    }

    & li p {
      font-weight: 400;
      line-height: 1.2;
    }

    & li:last-child {
      margin-bottom: 0;
    }
  }

  @media (max-width: 900px) {
    margin-bottom: 2rem;
  }
`;

const CVButton = styled.a`
  font-family: Bitrate, sans-serif !important;
  display: inline-block;
  text-decoration: none;
  background-color: var(--primary);
  border: none;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  margin-top: 0.5rem;
  letter-spacing: 1px;

  &:hover {
    transform: translateX(10px);
    opacity: 0.5;
  }
`;

export default function Hire() {
  const { t } = useTranslation("home");

  const { appSettings, redirect } = useContext(PublicContext);

  return (
    <Wrapper>
      <Container>
        <ContentContainer>
          <Image
            src={
              appSettings?.homepageHireImage
                ? import.meta.env.VITE_API_URL + appSettings?.homepageHireImage
                : import.meta.env.VITE_API_URL + "/uploads/remote_work.png"
            }
            alt="remote work"
          />
          <Content>
            <Subtitle>
              Can I be <Text color="var(--primary)">hired?</Text>
            </Subtitle>
            {!appSettings?.availableForWork && (
              <Alert>
                <aside>
                  <p>
                    Right now I am NOT available for work in a company or
                    freelance. Exception is my online 1-on-1 education.
                  </p>
                  <article>
                    <i className="mdi mdi-shield-alert"></i>
                  </article>
                </aside>
              </Alert>
            )}

            <Card>
              <h3>I wish to work as/for...</h3>
              <ul>
                <li>
                  <h4>Freelancer</h4>
                  <p>{t("work_bullet1_desc")}</p>
                </li>
                <li>
                  <h4>{t("work_bullet2")}</h4>
                  <p>{t("work_bullet2_desc")}</p>
                  <Spacer bottom="0.5rem" />
                  <PrimaryLink
                    mini
                    href={
                      import.meta.env.VITE_API_URL + "/uploads/static/cv.pdf"
                    }
                    target="_blank"
                  >
                    {t("work_bullet2_btn")}
                  </PrimaryLink>
                </li>
                <li>
                  <h4>Teacher</h4>
                  <p>{t("work_bullet3_desc")}</p>
                  <Spacer bottom="0.5rem" />
                  <SecondaryButton mini onClick={() => redirect("/learning")}>
                    Check it out
                  </SecondaryButton>
                </li>
              </ul>
            </Card>
          </Content>
        </ContentContainer>
      </Container>
    </Wrapper>
  );
}
