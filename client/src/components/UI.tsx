import PublicContext from "contexts/PublicContext";
import { useContext } from "react";
import styled from "styled-components";

/*const SecondaryButtonStyle = styled.button`
  color: var(--secondary);
  border: 2px solid var(--secondary);
  padding: 0.5rem 1rem;
  font-size: 18px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;*/

interface SecondaryButtonProps {
  primaryColor?: string;
  hoverColor?: string;
  textColor?: string;
  mini?: boolean;
}

export const SecondaryButtonStyle = styled.button<SecondaryButtonProps>`
  color: ${(props) =>
    props.textColor ?? props.primaryColor ?? "var(--primary)"};
  border: 2px solid ${(props) => props.primaryColor ?? "var(--primary)"};
  background: none;
  padding: ${(props) => (props.mini ? "7px 15px 6px" : "14px 20px 14px")};
  font-size: ${(props) => (props.mini ? "18px" : "24px")};
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.5s;
  position: relative;
  overflow: hidden;
  letter-spacing: 2px;
  font-family: Bitrate, sans-serif !important;

  &:hover:not([disabled]) {
    color: ${(props) => props.hoverColor ?? "white"};
  }

  &:before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    background: ${(props) => props.primaryColor ?? "var(--primary)"};
    z-index: -1;
    border-radius: 0 0 50% 50%;
    transition: all 0.5s;
  }

  &:not(:disabled):hover:before {
    height: 190%;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PrimaryLink = styled.a<SecondaryButtonProps>`
  color: ${(props) =>
    props.textColor ?? props.primaryColor ?? "var(--primary)"};
  border: 2px solid ${(props) => props.primaryColor ?? "var(--primary)"};
  background: none;
  padding: ${(props) => (props.mini ? "7px 15px 4px" : "14px 20px 10px")};
  font-size: ${(props) => (props.mini ? "18px" : "1.4rem")};
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.5s;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  display: inline-block;
  font-family: Bitrate, sans-serif !important;
  font-weight: normal;
  letter-spacing: 2px;

  &:hover:not([disabled]) {
    color: ${(props) => props.hoverColor ?? "white"};
  }

  &:before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    background: ${(props) => props.primaryColor ?? "var(--primary)"};
    z-index: -1;
    border-radius: 0 0 50% 50%;
    transition: all 0.5s;
  }

  &:not(:disabled):hover:before {
    height: 190%;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled(SecondaryButtonStyle)``;

interface ButtonProps {
  color: string;
  hoverColor: string;
}

export const Button = styled(SecondaryButtonStyle)<ButtonProps>`
  color: white;
  background-color: ${(props) => props.color};
  border: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.hoverColor};
    color: white !important;
  }
`;

interface SecondaryButtonProps {
  redirectExternal?: boolean;
  redirectUrl?: string;
  onClick?: Function;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  mini?: boolean;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = (props) => {
  const { redirect } = useContext(PublicContext);

  const handleOnClick = () => {
    if (props.onClick) return props.onClick();

    if (props.redirectUrl) {
      redirect(props.redirectUrl, props.redirectExternal);
    }
  };

  return (
    <SecondaryButtonStyle
      disabled={props.disabled}
      onClick={() => handleOnClick()}
      type={props.type}
      mini={props.mini}
    >
      {props.children}
    </SecondaryButtonStyle>
  );
};

interface ContainerProps {
  width?: string;
  padding?: string;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: ${(props) => (!props.width ? "1200px" : props.width)};
  margin: 0 auto;
  padding: ${(props) => (props.padding ? props.padding : "1rem")};
  position: relative;

  @media screen and (${(props) => props.theme.tabletLandscape}) {
    padding: 1.5rem;
  }
  @media screen and (${(props) => props.theme.tabletPortrait}) {
    padding: 1.5rem;
  }

  @media screen and (${(props) => props.theme.mobile}) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const Spacer = styled.span<any>`
  display: block;
  padding-bottom: ${(props) => (!!props.bottom ? props.bottom : 0)};
  padding-right: ${(props) => (!!props.right ? props.right : 0)};
  padding-left: ${(props) => (!!props.left ? props.left : 0)};
  padding-top: ${(props) => (!!props.top ? props.top : 0)};
`;

export const Divider = styled.span`
  display: block;
  border-bottom: 1px solid var(--secondary);
  width: 100%;
  padding: 1rem 0 1rem;
`;

export const App = styled.article`
  &:last-child {
    margin-bottom: 0;
  }

  & .center-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .header {
    & h3 {
      text-align: center;
      font-weight: normal;
      width: 100%;
      max-width: 600px;
      margin: 2rem auto;
    }
  }

  & .features {
    gap: 3rem;
    justify-items: center;
    display: grid;
    grid-template-columns: 1fr 1fr;

    & img {
      width: 100%;
      max-width: 400px;
      height: 100%;
      object-fit: cover;
    }
  }

  & .text-lg {
    font-size: 25px;
  }

  & img {
    width: 100%;
    max-width: 400px;
    height: 100%;
    max-height: 400px;
    object-fit: cover;
    display: block;
  }

  & .banner {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5rem;
    align-items: center;
    color: white;

    & article {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    & i {
      border: 1px solid white;
      padding: 2rem 2rem;
      line-height: 1;
      font-size: 30px;
      border-radius: 50%;
    }

    & h3 {
      margin: 0;
    }
  }

  & .columns {
    & img {
      width: 100%;
      max-width: 400px;
      height: 100%;
      max-height: 400px;
      object-fit: cover;
    }
  }

  & .feature__title {
    font-size: 36px;
  }
`;
