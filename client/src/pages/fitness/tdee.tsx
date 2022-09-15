import React, { useContext, useEffect, useState } from "react";
import { Container, SecondaryButton, Spacer } from "components/UI";
import styled from "styled-components";
import Select from "components/UI/Select";
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

const ACTIVITY_LEVELS_FORMULA = {
  male: {
    SEDENTARY: 1.2,
    LIGHT: 1.375,
    MODERATE: 1.55,
    VERY_ACTIVE: 1.725,
    EXTREMELY_ACTIVE: 1.9,
  },
  female: {
    SEDENTARY: 1.1,
    LIGHT: 1.275,
    MODERATE: 1.35,
    VERY_ACTIVE: 1.525,
    EXTREMELY_ACTIVE: 1.725,
  },
};

const ACTIVITY_LEVELS = {
  SEDENTARY: "Sedentary (office job)",
  LIGHT: "Little Active (1-3 times a week)",
  MODERATE: "Active (3-5 times a week)",
  VERY_ACTIVE: "Very Active (6-7 times a week)",
  EXTREMELY_ACTIVE: "Extremely Active (twice a day)",
};

export default function FitnessTDEE() {
  const { t } = useTranslation("fitness_tdee");
  const { setMeta } = useContext(PublicContext);
  const [result, setResult] = useState(null);

  const initialValues = {
    gender: "male",
    height: "",
    weight: "",
    age: "",
    activityLevel: "",
  };

  const validationSchema = Yup.object({
    height: Yup.number()
      .required("Height is required")
      .typeError("Must be a number"),
    weight: Yup.number()
      .required("Weight is required")
      .typeError("Must be a number"),
    age: Yup.number().required("Age is required").typeError("Must be a number"),
    activityLevel: Yup.string().required("Activity level is required"),
  });

  useEffect(() => {
    setMeta({
      title: "TDEE Calculator",
      description: "Calculate your TDEE",
      keywords: "TDEE Calculator",
    });
  }, []);

  const calculate = ({ height, weight, age, gender, activityLevel }) => {
    const parsedHeight = parseFloat(height);
    const parsedWeight = parseFloat(weight);
    const parsedAge = parseFloat(age);

    let formula;
    if (gender === "male") {
      formula =
        parsedHeight * 6.25 + parsedWeight * 9.99 - parsedAge * 4.92 + 5;
      formula = ACTIVITY_LEVELS_FORMULA.male[activityLevel] * formula;
    } else {
      formula =
        parsedHeight * 6.25 + parsedWeight * 9.99 - parsedAge * 4.92 - 161;
      formula = ACTIVITY_LEVELS_FORMULA.female[activityLevel] * formula;
    }

    setResult(formula);
  };

  const isReadyToCalculate = ({ height, weight, age, activityLevel }) => {
    if (!height || !weight || !age || !activityLevel) return false;
    return true;
  };

  return (
    <React.Fragment>
      <Meta
        title="TDEE Calculator"
        description="Effectively calculate your daily maintenance calories."
        url="/fitness/tdee"
      />

      <Wrapper>
        <Container>
          <Title>{t("title")}</Title>
          <Text block center>
            TDEE is a measure of how many calories you burn per day.
          </Text>
          <Spacer bottom="2rem" />
          <Card>
            <Formik
              onSubmit={calculate}
              validationSchema={validationSchema}
              initialValues={initialValues}
            >
              {({ handleSubmit, values }) => (
                <Form
                  onSubmit={handleSubmit}
                  style={{ position: "relative", zIndex: 0 }}
                >
                  <Select name="gender" label={t("gender")}>
                    <option value="male">{t("male")}</option>
                    <option value="female">{t("female")}</option>
                  </Select>

                  <TextField name="height" label={t("height_cm")} />

                  <TextField label={t("weight_kg")} name="weight" />

                  <TextField label={t("age")} name="age" />

                  <Select name="activityLevel" label={t("activity_level")}>
                    <option value="">{t("choose_a_level")}</option>
                    {Object.keys(ACTIVITY_LEVELS).map((key, index) => (
                      <option key={index} value={key}>
                        {ACTIVITY_LEVELS[key]}
                      </option>
                    ))}
                  </Select>

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
                  {t("maintenance")}: {parseInt(result)} {t("calories_per_day")}
                </h2>
                <h2>
                  {t("gain_weight")}: {parseInt(result) + 200}{" "}
                  {t("calories_per_day")}
                </h2>
                <h2>
                  {t("lose_weight")}: {parseInt(result) - 500}{" "}
                  {t("calories_per_day")}
                </h2>
              </React.Fragment>
            )}
          </Card>
        </Container>
      </Wrapper>
    </React.Fragment>
  );
}
