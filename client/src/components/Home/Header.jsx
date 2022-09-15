import React from "react";
import styled from "styled-components";
import {Wrapper} from "../UI/Wrapper";
import {useTranslation} from "react-i18next";
import {Container} from "../UI";

const Image = styled.img`
  width: 500px;
  height: 500px;
  object-fit: cover;
  border-radius: 50%;
`;

const ContentContainer = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  @media (${(props) => props.theme.tabletLandscape}) {
    & ${Image} {
      width: 400px;
      height: 400px;
    }
  }

  @media (${(props) => props.theme.tabletPortrait}) {
    & ${Image} {
      width: 300px;
      height: 300px;
    }
  }

  @media (${(props) => props.theme.mobile}) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }
`;

const Content = styled.article`
  & h1 {
    font-size: 46px;
    line-height: 1;
    margin-bottom: 2rem;
  }

  & h1 span {
    color: var(--primary);
  }

  & h2 {
    font-size: 30px;
    font-weight: normal;
    line-height: 1;
    margin-bottom: 2rem;
  }

  & h2 span {
    color: var(--primary);
  }
`;

const ReadMore = styled.a`
  color: white;
  border-radius: 10px;
  border: none;
  font-size: 17px;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease-in-out;
  background-color: var(--primary);
  display: inline-block;
  text-decoration: none;

  &:hover {
    transform: translateY(10px);
    opacity: 0.5;
  }

  & i {
    margin-right: 1rem;
  }
`;

export default function Header() {
    const {t} = useTranslation("home");
    return (
        <Wrapper>
            <Container>
                <ContentContainer>
                    <Image src="/mikolaj19.jpg" alt="mikolaj"/>
                    <Content>
                        <h1>
                            {t("welcome_to_my")} <span>platform</span>
                        </h1>
                        <h2>
                            {t("my_name_is")} <span>Mikolaj</span>, {t("i_develop_software")}
                        </h2>
                        <ReadMore href="#about-platform">
                            <i className="fas fa-arrow-down"></i>
                            <span>{t("learn_more")}</span>
                        </ReadMore>
                    </Content>
                </ContentContainer>
            </Container>
        </Wrapper>
    );
}
