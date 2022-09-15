import styled, {css} from "styled-components";
import Flexbox from "./FlexBox";
import {Header} from "./Header";
import {Icon} from "./Icon";

interface WrapperProps {
    borderThickness?: string;
    borderColor?: string;
    padding?: string;
    circular?: boolean;
    rectangle?: boolean;
    backgroundColor?: string;
    borderRadius?: string;
}

const Wrapper = styled.div<WrapperProps>`
  background-color: ${(props) => props.backgroundColor || "white"};
  border-width: ${(props) => props.borderThickness || "2px"};
  border-color: ${(props) => props.borderColor || "black"};
  padding: ${(props) => props.padding || "2.5rem"};
  border-style: solid;

  ${(props) =>
          props.circular &&
          css`
            border-radius: 50%;
          `}

  ${(props) =>
          props.rectangle &&
          css`
            border-radius: 0;
          `}
`;

interface IconBoxProps {
    icon: string;
    size: string;
    contentColor?: string;
    backgroundColor?: string;
    title: string;
    thickness?: string;
    radius?: string;
    circular?: boolean;
    rectangle?: boolean;
    padding?: string;
}

export const IconBox: React.FC<IconBoxProps> = (props) => {
    return (
        <Wrapper
            {...props}
            borderColor={props.contentColor}
            borderThickness={props.thickness}
            borderRadius={props.radius}
        >
            <Flexbox
                gap="1rem"
                alignItems="center"
                justifyContent="center"
                direction="column"
            >
                <Icon
                    size={props.size}
                    color={props.contentColor}
                    className={props.icon}
                />
                <Header size={props.size} color={props.contentColor}>
                    {props.title}
                </Header>
            </Flexbox>
        </Wrapper>
    );
};
