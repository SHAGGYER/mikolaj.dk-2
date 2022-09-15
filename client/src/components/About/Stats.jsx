import React from "react";
import styled from "styled-components";
import { Container, SecondaryButton } from "components/UI";
import { Text } from "components/UI/Text";
import { CustomDialog, useDialog } from "react-st-modal";
import { Wrapper } from "components/UI/Wrapper";

const CertificatesContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  & article {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 7px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
  }
`;

const DialogContainer = styled.div`
  padding: 2rem;

  & h2 {
    margin-bottom: 1rem;
  }
`;

const CERTIFICATES = [
  {
    title: "Uddannelsesbevis - Webudvikler",
    url: "uddbevis.pdf",
  },
  {
    title: "Microsoft Technology Associate - Java",
    url: "Microsoft_Certified_Professional_Certificate_0.pdf",
  },
  {
    title: "Microsoft Technology Associate - C#",
    url: "Microsoft_Certified_Professional_Certificate_1.pdf",
  },
  {
    title: "Microsoft Technology Associate - HTML, CSS, JavaScript",
    url: "Microsoft_Certified_Professional_Certificate_2.pdf",
  },
  {
    title: "Microsoft Technology Associate - Python",
    url: "Microsoft_Certified_Professional_Certificate_3.pdf",
  },
  {
    title: "Microsoft Technology Associate - Databases",
    url: "Microsoft_Certified_Professional_Certificate_4.pdf",
  },
];

const CertificatesDialog = () => {
  const dialog = useDialog();

  const showCertificate = (url) => {
    window.open("/static/" + url, "_blank");
  };

  return (
    <DialogContainer>
      <h2>Certifikater</h2>
      <CertificatesContainer>
        {CERTIFICATES.map((cert, index) => (
          <article key={index}>
            <h3>{cert.title}</h3>
            <SecondaryButton onClick={() => showCertificate(cert.url)}>
              Vis
            </SecondaryButton>
          </article>
        ))}
      </CertificatesContainer>
    </DialogContainer>
  );
};

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 4rem;
  align-items: center;

  & article {
    background-color: white;
    padding: 2rem;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

    & h5 {
      font-size: 1rem;
      line-height: 1;
      color: var(--primary);
    }
    & h4 {
      font-size: 5rem;
      line-height: 1;
    }
  }

  @media screen and (${(props) => props.theme.tabletLandscape}) {
    & section {
      grid-template-columns: 200px 200px;
      grid-auto-rows: 200px;
    }

    & aside h2 {
      font-size: 3.5rem;
    }

    & section article h4 {
      font-size: 3.5rem;
    }
  }

  @media screen and (${(props) => props.theme.tabletPortrait}) {
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    text-align: center;
    grid-gap: 2rem;

    & aside h2 {
      font-size: 4rem;
    }

    & section article h4 {
      font-size: 4rem;
    }
  }

  @media screen and (${(props) => props.theme.mobile}) {
    grid-template-columns: 250px;
    justify-content: center;
    grid-auto-rows: 250px;

    & aside h2 {
      font-size: 2.5rem;
    }

    & section article h4 {
      font-size: 2.5rem;
    }
  }
`;

const openCertificatesDialog = async () => {
  await CustomDialog(<CertificatesDialog />);
};

export default function Stats() {
  return (
    <Wrapper>
      <Content>
        <article>
          <h5>Certifikater</h5>
          <h4>10</h4>
          <SecondaryButton onClick={() => openCertificatesDialog()}>
            Tjek Dem Ud
          </SecondaryButton>
        </article>
        <article>
          <h5>Projekter</h5>
          <h4>30</h4>
        </article>
        <article>
          <h5>YouTube Visninger</h5>
          <h4>84k</h4>
        </article>

        <article>
          <h5>Linjer Kode</h5>
          <h4>140k</h4>
        </article>
      </Content>
    </Wrapper>
  );
}
