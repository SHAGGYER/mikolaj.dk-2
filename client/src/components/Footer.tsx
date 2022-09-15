import React, {useContext} from "react";
import {Container} from "./UI";
import styled, {keyframes} from "styled-components";
import {Text} from "./UI/Text";
import PublicContext from "contexts/PublicContext";


const FooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 6rem;
  padding: 1.5rem 2rem;

  @media (max-width: 600px) {
    padding: 1rem;
    height: 6rem;
  }
`;

const SomeContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;

  @media (${(props) => props.theme.mobile}) {
    gap: 1rem;

    h4 {
      text-align: center;
      width: 100%;
    }
  }
`;

const IconsContainer = styled.article`
  display: flex;
  gap: 1.5rem;

  & i {
    font-size: 50px;
    cursor: pointer;
  }

  & i:hover {
    color: #ccc;
  }

  @media (${(props) => props.theme.mobile}) {
    width: 100%;
    justify-content: center;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  & section {
    display: flex;
    gap: 5rem;
    flex-wrap: wrap;

    & article h3 {
      margin-bottom: 0.75rem;
    }

    & article ul {
      list-style: none;
      padding-left: 0;
    }

    & article li {
      cursor: pointer;
      margin-bottom: 0.5rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (${(props) => props.theme.mobile}) {
    justify-content: center;

    & section {
      gap: 2rem;
      justify-content: flex-start;
    }

    & section article {
      width: 180px;
    }

    & aside {
      display: none;
    }
  }
`;

const LogoStyle = styled.img`
  width: 200px;
  height: 200px;
`;

export default function Footer() {
    const {redirect} = useContext(
        PublicContext
    );

    return (
        <React.Fragment>
            <FooterWrapper>
                <SomeContainer>
                    <div>
                        <h4>
                            {new Date().getFullYear()} Copyright Mikolaj Marciniak. All rights reserved.
                        </h4>
                    </div>
                    <IconsContainer>
                        <i
                            onClick={() =>
                                redirect("https://www.linkedin.com/in/mikolajmarciniak/", true)
                            }
                            className="mdi mdi-linkedin"
                        />
                        <i
                            onClick={() =>
                                redirect("https://www.facebook.com/1991Miko/", true)
                            }
                            className="mdi mdi-facebook"
                        />
                        <i
                            onClick={() => redirect("https://github.com/miko1991", true)}
                            className="mdi mdi-github"
                        />
                        <i
                            onClick={() =>
                                redirect(
                                    "https://www.youtube.com/channel/UCYRV3vmAKt1rxxZiDcQXd9A",
                                    true
                                )
                            }
                            className="mdi mdi-youtube"
                        />
                    </IconsContainer>
                </SomeContainer>
            </FooterWrapper>
        </React.Fragment>
    );
}
