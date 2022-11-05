import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 10rem 0;
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 4rem;
  margin-bottom: 3rem;

  h2 {
    font-size: 50px;
  }

  > h3 {
    writing-mode: vertical-lr;
    color: var(--primary);
    font-size: 120px;
    line-height: 1;
  }

  hr {
    background: var(--primary);
    height: 3px;
    border: none;
    width: 200px;
    margin: 1rem 0;
  }

  .content {
    > p {
      margin-bottom: 4rem;
      max-width: 60%;
    }
  }

  @media screen and (max-width: 934px) {
    display: block;
    padding: 0 1rem;

    > h3 {
      display: none;
    }

    h2 {
      font-size: 25px;
    }
  }
`;
