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
import { Text } from "components/UI/Text";
import PublicContext from "contexts/PublicContext";
import Meta from "components/Meta";

// @ts-ignore
Number.prototype.between = function (a, b) {
  var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
  return this > min && this < max;
};

interface FormikInitialValues {
  height: string;
  gender: string;
  neckSize: string;
  waistSize: string;
  hipSize: string;
}

const Card = styled.div`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  background-color: white;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export default function FitnessBodyFat() {
  const { t } = useTranslation("fitness_body_fat");
  const { setMeta, user, redirect } = useContext(PublicContext);
  const [result, setResult] = useState(null);

  const initialValues = {
    height: "",
    gender: "male",
    neckSize: "",
    waistSize: "",
    hipSize: "",
  };

  const validationSchema = Yup.object({
    height: Yup.number()
      .required("Height is required")
      .typeError("Must be a number"),
    neckSize: Yup.number()
      .required("Neck size is required")
      .typeError("Must be a number"),
    waistSize: Yup.number()
      .required("Waist size is required")
      .typeError("Must be a number"),
    hipSize: Yup.number().when("gender", {
      is: "female",
      then: Yup.number()
        .required("Hip size is required")
        .typeError("Must be a number"),
    }),
  });

  useEffect(() => {
    setMeta({
      title: "Body Fat Calculator",
      description: "Calculate your Body Fat",
      keywords: "Body Fat Calculator",
    });
  }, []);

  const percentCat = (gender) => {
    if (gender === "male") {
      if (result.between(6, 13)) {
        return "Athlete";
      } else if (result.between(14, 17)) {
        return "Fitness";
      } else if (result.between(18, 24)) {
        return "Acceptable";
      } else return "Obese";
    } else if (gender === "female") {
      if (result.between(14, 20)) {
        return "Athlete";
      } else if (result.between(21, 24)) {
        return "Fitness";
      } else if (result.between(25, 31)) {
        return "Acceptable";
      } else if (result > 31) return "Obese";
    }
  };

  const calculate = ({ gender, waistSize, neckSize, height, hipSize }) => {
    if (!user) {
      return redirect("/login");
    }

    let formula = undefined;
    if (gender === "male") {
      formula =
        495 /
          (1.0324 -
            0.19077 * Math.log10(parseFloat(waistSize) - parseFloat(neckSize)) +
            0.15456 * Math.log10(parseFloat(height))) -
        450;
    } else {
      formula =
        495 /
          (1.29579 -
            0.35004 *
              Math.log10(
                parseFloat(waistSize) +
                  parseFloat(hipSize) -
                  parseFloat(neckSize)
              ) +
            0.221 * Math.log10(parseFloat(height))) -
        450;
    }
    setResult(formula);
  };

  const isReadyToCalculate = ({
    height,
    neckSize,
    waistSize,
    gender,
    hipSize,
  }) => {
    return !(
      !height ||
      !neckSize ||
      !waistSize ||
      (gender === "female" && !hipSize)
    );
  };

  return (
    <React.Fragment>
      <Meta
        title="Body Fat Calculator"
        description="Find your body fat using Navy Seals formula."
        url="/fitness/body-fat"
      />

      <Wrapper>
        <Container>
          <Title>{t("title")}</Title>
          <Text block center size="20">
            by US. Navy Seal Formula
          </Text>
          <Spacer bottom={"2rem"} />
          <Card>
            <Formik<FormikInitialValues>
              initialValues={initialValues}
              onSubmit={calculate}
              validationSchema={validationSchema}
            >
              {({ handleSubmit, values }) => (
                <Form onSubmit={handleSubmit}>
                  <div style={{ position: "relative", zIndex: 0 }}>
                    <TextField label={t("height_cm")} name="height" />
                    <Select name="gender" label={t("gender")}>
                      <option value="male">{t("male")}</option>
                      <option value="female">{t("female")}</option>
                    </Select>
                    <TextField label={t("neck_size_cm")} name="neckSize" />
                    <TextField label={t("waist_size_cm")} name="waistSize" />
                    {values.gender === "female" && (
                      <TextField label={t("hip_size_cm")} name="hipSize" />
                    )}
                    <SecondaryButton
                      type="submit"
                      disabled={!isReadyToCalculate(values)}
                    >
                      Calculate
                    </SecondaryButton>
                  </div>

                  {result && (
                    <React.Fragment>
                      <Spacer bottom={"2rem"} />
                      <h2>
                        {t("your_body_fat")}: {parseFloat(result).toFixed(1)}% (
                        {percentCat(values.gender)})
                      </h2>
                    </React.Fragment>
                  )}
                </Form>
              )}
            </Formik>
          </Card>
        </Container>
      </Wrapper>
    </React.Fragment>
  );
}
