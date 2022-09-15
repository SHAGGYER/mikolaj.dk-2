import styled from "styled-components";

interface SubtitleProps {
  align?: string;
}

export const Subtitle = styled.h2<SubtitleProps>`
  font-family: Bitrate, sans-serif !important;
  font-size: 2.8rem;
  letter-spacing: 3px;
  text-align: ${(props) => props.align ?? "left"};
  margin-bottom: 2rem;
`;
