import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { useDialog } from "react-st-modal";

const Wrapper = styled.section`
  padding: 2rem;

  & article {
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    font-size: 20px;
    cursor: pointer;
  }
`;

export default function LanguageChooserDialog() {
  const dialog = useDialog();

  const handleSetLanguage = async (language) => {
    dialog.close(language);
  };

  return (
    <Wrapper>
      <h1>Choose Language / Vælg Sprog</h1>
      <div>
        <article onClick={() => handleSetLanguage("da")}>
          Danish / Dansk
        </article>
        <article onClick={() => handleSetLanguage("en")}>
          English / Engelsk
        </article>
      </div>
    </Wrapper>
  );
}
