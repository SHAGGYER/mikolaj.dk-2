import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Divider,
  SecondaryButtonStyle,
  Spacer,
} from "components/UI";
import TextField from "components/UI/TextField";
import TextArea from "components/UI/TextArea";
import styled from "styled-components";
import HttpClient from "services/HttpClient";
import Alert from "components/UI/Alert";
import { Wrapper } from "components/UI/Wrapper";
import { Title } from "components/UI/Title";
import GoogleMapReact from "google-map-react";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";
import PublicContext from "contexts/PublicContext";
import { Backdrop } from "components/Backdrop";
import { Text } from "components/UI/Text";
import Meta from "components/Meta";

interface ContactWrapperProps {
  bgUrl?: string;
}

const ContactWrapper = styled(Wrapper)<ContactWrapperProps>`
  background: url(${(props) => props.bgUrl}) center center / cover fixed;
  height: 600px;
  position: relative;
  z-index: 1;

  & article.content {
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: white;
    position: relative;
  }
`;

const ContactContainer = styled(Container)`
  height: 100%;
`;

const ContactGrid = styled.div`
  display: grid;
  background-color: white;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  padding: 2rem;
  grid-template-columns: 4fr 5fr;
  gap: 2rem;
  transform: translateY(-130px);
  position: relative;
  z-index: 3;

  & h3 {
    font-family: Bitrate, sans-serif !important;
    font-size: 2.25rem;
    font-weight: normal;
    word-spacing: -3px;
  }

  & .items {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  & .items .item {
    display: flex;
    gap: 0.75rem;
    align-items: center;

    & h4 {
      font-family: Bitrate, sans-serif !important;
      font-size: 1.45rem;
      font-weight: normal;
      text-transform: uppercase;
      word-spacing: -2px;
    }

    & i {
      font-size: 1.6rem;
    }
  }

  @media (${(props) => props.theme.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export default function Contact() {
  const { t } = useTranslation("contact");
  const { setMeta, redirect } = useContext(PublicContext);
  const [error, setError] = useState<any>({});
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email("Must be an email"),
    message: Yup.string().required("Message is required"),
  });

  useEffect(() => {
    setMeta({
      title: "Contact",
      description: "Hey, you came all this way, might as well drop a line!",
      keywords: "Contact",
    });
  }, []);

  const onSubmit = async ({ name, email, message }, { resetForm }) => {
    setInfo("");

    const data = {
      name,
      email,
      message,
    };

    try {
      setLoading(true);
      await HttpClient().post("/api/mail/sendMail", data);

      setLoading(false);
      setInfo("Tak for din besked!");
      resetForm({
        values: initialValues,
      });
    } catch (error) {
      setLoading(false);
      if (error.response.status === 500) {
        setError({ general: "Server Error" });
      }
    }
  };

  return (
    <React.Fragment>
      <Meta
        title="Contact me"
        description="Drop a line."
        url="/about/contact"
      />

      <ContactWrapper
        bgUrl={`${import.meta.env.VITE_API_URL}/uploads/hands.jpg`}
      >
        <Backdrop strength={0.5} />
        <ContactContainer>
          <aside />
          <article className="content">
            <Title>
              <Text color="var(--primary)">Contact </Text>
              Me
            </Title>
          </article>
        </ContactContainer>
      </ContactWrapper>
      <Wrapper>
        <Container>
          <ContactGrid>
            <div>
              <h3 className="title">{t("contact_information")}</h3>
              <Divider />
              <Spacer bottom="1rem" />

              <div className="items">
                <div className="item">
                  <i className="mdi mdi-account"></i>
                  <div>
                    <h4>MY NAME</h4>
                    <span>Mikolaj Marciniak</span>
                  </div>
                </div>
                <div className="item">
                  <i className="mdi mdi-at"></i>
                  <div>
                    <h4>Email</h4>
                    <span>
                      <a
                        style={{ color: "black" }}
                        href="mailto:hello@mikolaj.dk"
                      >
                        hello@mikolaj.dk
                      </a>
                    </span>
                  </div>
                </div>
                <div className="item">
                  <i className="mdi mdi-city"></i>
                  <div>
                    <h4>{t("address")}</h4>
                    <span>Odense, Danmark</span>
                  </div>
                </div>
              </div>
              <Spacer bottom="2rem" />

              <div style={{ height: 300 }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: import.meta.env.VITE_GOOGLE_API_KEY,
                  }}
                  defaultCenter={{
                    lat: 55.40394301777089,
                    lng: 10.403006387790594,
                  }}
                  defaultZoom={12}
                ></GoogleMapReact>
              </div>
            </div>
            <div>
              <h3 className="title">DROP A LINE</h3>
              <Divider />
              <Spacer bottom="1rem" />
              {error.general && <Alert error>{error.general}</Alert>}
              {!!info && <Alert primary>{info}</Alert>}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ handleSubmit }) => (
                  <form
                    onSubmit={handleSubmit}
                    style={{ position: "relative", zIndex: 0 }}
                  >
                    <TextField name="name" label={t("name")} />
                    <TextField name="email" label="Email" />
                    <TextArea name="message" label={t("message")} />
                    <SecondaryButtonStyle
                      style={{ padding: "0.5rem 0.75rem", fontSize: "1.4rem" }}
                      primaryColor="var(--secondary)"
                      disabled={loading}
                    >
                      {t("send_message_button")}
                    </SecondaryButtonStyle>
                  </form>
                )}
              </Formik>
            </div>
          </ContactGrid>
        </Container>
      </Wrapper>
    </React.Fragment>
  );
}
