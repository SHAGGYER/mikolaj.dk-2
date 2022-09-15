import React, { useContext, useEffect, useState } from "react";
import { Container, SecondaryButton, Spacer } from "components/UI";
import styled from "styled-components";
import TextField from "components/UI/TextField";
import { Wrapper } from "components/UI/Wrapper";
import { Title } from "components/UI/Title";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import PublicContext from "contexts/PublicContext";
import { Text } from "components/UI/Text";
import Meta from "components/Meta";

const Card = styled.div`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  background-color: white;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const BMI_RANGES = [
  {
    key: "NORMAL_WEIGHT",
    text: "Normal Weight",
    low: 19,
    high: 24.9,
  },
  {
    key: "OVERWEIGHT",
    text: "Overweight",
    low: 24.9,
    high: 29.9,
  },
  {
    key: "OBESE_1",
    text: "Obese",
    low: 29.9,
    high: 34.9,
  },
  {
    key: "OBESE_2",
    text: "Obese Cl. 1",
    low: 34.9,
    high: 39.9,
  },
  {
    key: "OBESE_3",
    text: "Obese Cl. 2",
    low: 39.9,
    high: undefined,
  },
];

export default function FitnessBMI() {
  const { t } = useTranslation("fitness_bmi");
  const { setMeta } = useContext(PublicContext);
  const [result, setResult] = useState(null);

  const initialValues = {
    weight: "",
    height: "",
  };

  const validationSchema = Yup.object({
    weight: Yup.number()
      .required("Weight is required")
      .typeError("Must be a number"),
    height: Yup.number()
      .required("Height is required")
      .typeError("Must be a number"),
  });

  useEffect(() => {
    setMeta({
      title: "BMI Calculator",
      description: "Calculate your BMI",
      keywords: "BMI Calculator",
    });
  }, []);

  const calculate = ({ weight, height }) => {
    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);
    let formula = parsedWeight / ((parsedHeight / 100) * (parsedHeight / 100));
    setResult(formula);
  };

  const isReadyToCalculate = ({ weight, height }) => {
    return !(!height || !weight);
  };

  const getBmiRange = () => {
    for (let range of BMI_RANGES) {
      if (result > range.low && (range.high ? result < range.high : true)) {
        return range.text;
      }
    }
  };

  return (
    <React.Fragment>
      <Meta
        title="BMI Calculator"
        description="Use this tool to quickly calculate your BMI."
        url="/fitness/bmi"
      />

      <Wrapper>
        <Container>
          <Title>{t("title")}</Title>
          <Text block center>
            The body mass index (BMI) is a measure that uses your height,
            <br />
            and weight to work out if your weight is healthy.
          </Text>
          <Spacer bottom="2rem" />
          <Card>
            <Formik
              onSubmit={calculate}
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {({ handleSubmit, values }) => (
                <Form
                  onSubmit={handleSubmit}
                  style={{ position: "relative", zIndex: 0 }}
                >
                  <TextField label={t("height_cm")} name="height" />
                  <TextField label={t("weight_kg")} name="weight" />
                  <SecondaryButton
                    type="submit"
                    disabled={!isReadyToCalculate(values)}
                  >
                    Calculate
                  </SecondaryButton>
                </Form>
              )}
            </Formik>

            {result && (
              <React.Fragment>
                <Spacer bottom={"2rem"} />
                <h2>
                  {t("your_bmi")}: {parseFloat(result).toFixed(2)}
                </h2>
                <h2>
                  {t("your_weight_level")}: {getBmiRange()}
                </h2>
              </React.Fragment>
            )}
          </Card>
        </Container>
      </Wrapper>
    </React.Fragment>
  );
}
