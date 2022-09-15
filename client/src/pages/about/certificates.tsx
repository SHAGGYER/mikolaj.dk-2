import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Container, SecondaryButton } from "components/UI";
import PublicContext from "contexts/PublicContext";
import { Wrapper } from "components/UI/Wrapper";
import { Title } from "components/UI/Title";
import { useTranslation } from "react-i18next";
import { Text } from "components/UI/Text";
import Meta from "components/Meta";

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
    position: relative;
    z-index: 0;
  }

  @media screen and (max-width: 640px) {
    & article {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }
`;

const CERTIFICATES = [
  {
    title: "Certificate of Completion - Web Developer",
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

export default function MyCertificates() {
  const { t } = useTranslation("certificates");
  const { setMeta, redirect } = useContext(PublicContext);

  useEffect(() => {
    setMeta({
      title: "My Certificates",
      description:
        "Take a look at my certificates that I have acquired during education.",
      keywords: "Certificates",
    });
  }, []);

  const showCertificate = async (certificate) => {
    redirect(
      import.meta.env.VITE_API_URL + "/uploads/certificates/" + certificate.url,
      true
    );
  };

  return (
    <React.Fragment>
      <Meta
        title="My Certificates"
        description="Take a look at my certificates that I have acquired during education."
        url="/about/certificates"
      />

      <Wrapper>
        <Container>
          <Title>
            My <Text color="var(--primary)">Certificates</Text>
          </Title>
          <CertificatesContainer>
            {CERTIFICATES.map((cert, index) => (
              <article key={index}>
                <h3>{cert.title}</h3>
                <SecondaryButton onClick={() => showCertificate(cert)}>
                  {t("show")}
                </SecondaryButton>
              </article>
            ))}
          </CertificatesContainer>
        </Container>
      </Wrapper>
    </React.Fragment>
  );
}
