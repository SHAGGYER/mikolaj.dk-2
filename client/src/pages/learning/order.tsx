import React, { useContext, useEffect, useState } from "react";
import { Text } from "components/UI/Text";
import { Wrapper } from "components/UI/Wrapper";
import { Container, SecondaryButton, Spacer } from "components/UI";
import TextField from "components/UI/TextField";
import Alert from "components/UI/Alert";
import HttpClient from "services/HttpClient";
import PublicContext from "contexts/PublicContext";
import TextArea from "components/UI/TextArea";
import styled from "styled-components";
import cogoToast from "cogo-toast";
import { Title } from "components/UI/Title";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";
import Meta from "components/Meta";
import { useHistory } from "react-router-dom";

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
  position: relative;
  z-index: 0;
`;

const HOURLY_RATE = 135;

export default function LearningOrder() {
  const history = useHistory();
  const { t } = useTranslation("one_on_one_order");
  const { setMeta, redirect, user } = useContext(PublicContext);
  const [services, setServices] = useState({
    frontend: false,
    backend: false,
    devops: false,
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isFormValid, setFormValid] = useState(false);
  const [error, setError] = useState<any>({});

  /*  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, []);*/

  const defaultYupErrors = {
    name: undefined,
    email: undefined,
    message: undefined,
    hours: undefined,
  };
  const [yupErrors, setYupErrors] = useState(defaultYupErrors);

  const initialValues = {
    name: "",
    email: "",
    message: "",
    hours: "",
    services: {
      frontend: false,
      backend: false,
      devops: false,
    },
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email("Must be an email"),
    message: Yup.string().required("Message is required"),
    hours: Yup.number()
      .typeError("Must be a number")
      .min(0.5, "Minimum is 0.5 hour"),
  });

  useEffect(() => {
    setMeta({
      title: "Order 1-on-1",
      description:
        "Are you ready for an adventure that could potentially change your life? Order my 1-on-1 now!",
      keywords: "Coding School, Coding Education, 1-on-1, Order",
    });
  }, []);

  const handleChangeService = (prop, checked) => {
    setServices({ ...services, [prop]: checked });
    const { services: err, ...oldErrors } = error;
    setError(oldErrors);
  };

  const getTotalPrice = (hours) => {
    const parsedHours = parseFloat(hours);
    if (isNaN(parsedHours) || parsedHours < 0) return 0;

    const amount = Math.floor(parsedHours / 5);
    return parsedHours * HOURLY_RATE - amount * 100;
  };

  const checkServices = () => {
    setError({});
    const _error: any = {};

    let atLeastOneSelected = false;
    for (let [_, value] of Object.entries(services)) {
      if (value) atLeastOneSelected = true;
    }

    if (!atLeastOneSelected) {
      _error.services =
        "You need to choose at least one form of education to continue";
      const container = document.getElementById(
        "order-education-forms-container"
      );
      container.scrollIntoView();
    }

    if (Object.keys(_error).length) {
      return setError(_error);
    }
  };

  const customHandleSubmit = (event, handleSubmit, errors) => {
    event.preventDefault();
    //checkServices();
    const isValid = !Object.keys(errors).length;
    setFormValid(isValid);
    setHasSubmitted(true);
    if (isValid) {
      handleSubmit();
      setYupErrors(defaultYupErrors);
    } else {
      setYupErrors(errors);
    }
  };

  const onSubmit = async ({ hours, name, email, message }) => {
    setError({});
    const _error: any = {};

    if (
      (hours && isNaN(parseFloat(hours))) ||
      (hours && parseFloat(hours) < 0)
    ) {
      _error.hours = "Amount of hours must be above 0 if specified";
    }

    if (Object.keys(_error).length) {
      return setError(_error);
    }

    const data = {
      user: {
        name,
        email,
        message,
      },
      order: {
        services,
        hours,
        total: getTotalPrice(hours),
      },
    };

    try {
      await HttpClient().post("/api/mail/createOrder", data);
      cogoToast.success(
        "Thank you for your order. I will answer as soon as possible"
      );
      redirect("/");
    } catch (e) {
      if (e.response.status === 400) {
        setError(e.response.data.errors);
      }
    }
  };

  return (
    <React.Fragment>
      <Wrapper>
        <Container>
          <Title>Order 1-on-1</Title>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, values, errors }) => (
              <Form
                onSubmit={(event) =>
                  customHandleSubmit(event, handleSubmit, errors)
                }
              >
                <Text size="20" color="var(--primary)" block>
                  {t("section2_title")}
                </Text>

                <Text size="14">{t("section2_desc")}</Text>
                <Spacer bottom="1rem" />

                <TextField name="hours" label={t("section2_field_label")} />
                <Spacer bottom="1rem" />

                <div>
                  <Text>
                    {t("section2_total_price")}:{" "}
                    {getTotalPrice(values.hours).toFixed(2)}kr
                  </Text>
                </div>
                <Spacer bottom="2rem" />

                <Text size="20" color="var(--primary)">
                  {t("section3_title")}
                </Text>
                <Spacer bottom="1rem" />

                <TextField
                  name="name"
                  error={yupErrors.name}
                  label={t("section3_name")}
                />
                <TextField name="email" label="Email" />
                <TextArea
                  name="message"
                  rows={15}
                  label={"Describe what you wish to learn"}
                />

                <SecondaryButton>{t("send_order_button")}</SecondaryButton>
                {hasSubmitted && !isFormValid && (
                  <React.Fragment>
                    <Spacer bottom="1rem" />
                    <Alert error>Please fix errors to continue</Alert>
                  </React.Fragment>
                )}
              </Form>
            )}
          </Formik>
        </Container>
      </Wrapper>
    </React.Fragment>
  );
}
