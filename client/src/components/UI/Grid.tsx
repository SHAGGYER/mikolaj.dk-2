import styled from "styled-components";

interface GridProps {
  columns: string;
  gap: string;
  alignItems?: string
}
const Grid = styled.div<GridProps>`
  display: grid;
  gap: ${(props) => props.gap};
  grid-template-columns: ${(props) => props.columns};
  align-items: ${props => props.alignItems ? props.alignItems : "auto"};

  @media (${(props) => props.theme.tabletPortrait}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export default Grid;
