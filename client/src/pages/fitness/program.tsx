import React, { useContext, useEffect, useState } from "react";
import { Container, SecondaryButtonStyle, Spacer } from "components/UI";
import styled from "styled-components";
import { List, ListItem } from "components/UI/List";
import { useLoader } from "../../hooks/Loader";
import Loader from "components/Loader";
import { Wrapper } from "components/UI/Wrapper";
import { Title } from "components/UI/Title";
import { useTranslation } from "react-i18next";
import PublicContext from "contexts/PublicContext";
import Meta from "components/Meta";

const ProgramLink = styled.a`
  color: var(--secondary);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Card = styled.div`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  background-color: white;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 0;

  & h2 {
    font-family: Bitrate, sans-serif !important;
    font-size: 2rem;
    letter-spacing: 1px;
  }
`;

const GoalContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;

  @media (${(props) => props.theme.tabletPortrait}) {
    grid-template-columns: 1fr;
  }
`;

const Goal = styled.article`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  padding: 4rem 1rem;
  font-size: 30px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: var(--secondary);
    color: white;
  }
`;

const ProgramButton = styled(SecondaryButtonStyle)`
  color: var(--secondary);
  border: 2px solid var(--secondary);

  &:hover {
    color: white;
  }

  &:before {
    background: var(--secondary);
  }
`;

const STEP = {
  GOAL: 1,
  LEVEL: 2,
  PROGRAM_SUGGESTIONS: 3,
};

const GOAL = {
  LOSE_FAT: {
    key: "LOSE_FAT",
    text: "Lose Fat",
  },
  GAIN_MUSCLE: {
    key: "GAIN_MUSCLE",
    text: "Build Muscle",
  },
  STRENGTH: {
    key: "STRENGTH",
    text: "Get Stronger",
  },
};

const LEVEL = {
  BEGINNER: {
    key: "BEGINNER",
    text: "Beginner",
  },
  INTERMEDIATE: {
    key: "INTERMEDIATE",
    text: "Intermediate",
  },
  ADVANCED: {
    key: "ADVANCED",
    text: "Advanced",
  },
};

const PROGRAMS = {
  LOSE_FAT: {
    BEGINNER: [
      {
        name: "12 Week Fat Destroyer",
        url: "https://www.muscleandstrength.com/workouts/12-week-fat-destroyer",
        to: "/fitness/program/12-week-fat-destroyer",
      },
      {
        name: "Total Body Torcher",
        url: "https://www.muscleandstrength.com/workouts/total-body-torcher",
      },
    ],
    INTERMEDIATE: [
      {
        name: "6 Week High-Intensity Functional Training Workout",
        url: "https://www.muscleandstrength.com/workout/6-week-high-intensity-functional-training-workout",
      },
      {
        name: "Return to Ripped: 6 Week Fat Loss Workout Program",
        url: "https://www.muscleandstrength.com/workouts/return-to-ripped",
      },
    ],
    ADVANCED: [
      {
        name: "4 Week Fat Loss Advanced Plyometric Workout",
        url: "https://www.muscleandstrength.com/workouts/4-week-fat-loss-advanced-plyometric-workout",
      },
      {
        name: "10 Weeks to Shredded: Maximize Your Fat Loss with this Workout",
        url: "https://www.muscleandstrength.com/workouts/advanced-fat-loss-workout",
      },
    ],
  },
  GAIN_MUSCLE: {
    BEGINNER: [
      {
        name: "3 Day Workout Routine and Diet for Beginners",
        url: "https://www.muscleandstrength.com/workouts/3-day-workout-routine-and-diet-for-beginners",
      },
      {
        name: "Starting Strong: The Ultimate 8 Week Workout for Beginners",
        url: "https://www.muscleandstrength.com/workouts/starting-strong-8-week-workout-for-beginners",
      },
    ],
    INTERMEDIATE: [
      {
        name: "The Next Step: 6 Week Intermediate Mass Building Workout",
        url: "https://www.muscleandstrength.com/workouts/the-next-step-6-week-intermediate-workout-program",
      },
      {
        name: "Intermediate Muscle Building Workout",
        url: "https://www.muscleandstrength.com/workouts/intermediate-muscle-building-workout.html",
      },
    ],
    ADVANCED: [
      {
        name: "4 Day Advanced Upper/Lower Workout Program to Build Mass",
        url: "https://www.muscleandstrength.com/workouts/4-day-advanced-upper-lower-workout-program-to-build-mass",
      },
      {
        name: "Advanced Bodybuilder Workout",
        url: "https://www.muscleandstrength.com/workouts/advanced-bodybuilder-workout.html",
      },
    ],
  },
  STRENGTH: {
    BEGINNER: [
      {
        name: "Strength And Bulk Beginner Workout - Linear Progression",
        url: "https://www.muscleandstrength.com/workouts/strength-bulk-beginner-workout-linear-progression",
      },
      {
        name: "8 Week Power Physique Workout",
        url: "https://www.muscleandstrength.com/workouts/power-physique-8-week-program",
      },
    ],
    INTERMEDIATE: [
      {
        name: "Stephen Amell’s Arrow Workout: Strength & Functional Training",
        url: "https://www.muscleandstrength.com/workouts/stephen-amell-arrow-workout",
      },
      {
        name: "MFT Training: Boost Strength and Build High Performance Muscle",
        url: "https://www.muscleandstrength.com/workouts/mft-training",
      },
    ],
    ADVANCED: [],
  },
};

export default function FitnessProgram() {
  const { t } = useTranslation("fitness_find_program");
  const { setMeta, user, redirect } = useContext(PublicContext);
  const [step, setStep] = useState(STEP.GOAL);
  const [goal, setGoal] = useState(null);
  const [level, setLevel] = useState(null);
  const [programs, setPrograms] = useState([]);
  useEffect(() => {}, []);
  const { loading, clearLoaderTimeout, loadingOff, loadingOn } = useLoader();

  useEffect(() => {
    setMeta({
      title: "Find Program",
      description: "Find a fitness program best suited to your needs.",
      keywords: "Fitness program",
    });
  }, []);

  useEffect(() => {
    let timeoutID;
    if (goal && level) {
      calculatePrograms();
      loadingOff(1500);

      if (!user) {
        setTimeout(() => {
          redirect("/login");
        }, 1000);
      }
    } else {
      loadingOff(500);
    }

    return () => {
      clearLoaderTimeout();
    };
  }, [goal, level, user]);

  const handleStepGoal = (_goal) => {
    setGoal(_goal);
    setStep(STEP.LEVEL);
  };

  const handleStepLevel = (_level) => {
    loadingOn();
    setLevel(_level);
    setStep(STEP.PROGRAM_SUGGESTIONS);
  };

  const calculatePrograms = () => {
    const _programs = PROGRAMS[goal][level];
    setPrograms(_programs);
  };

  return (
    <React.Fragment>
      <Meta
        title="Find fitness program"
        description="Find a fitness program best suited to your needs."
        url="/fitness/program"
      />

      <Wrapper>
        <Container>
          <Title>{t("title")}</Title>
          {!loading ? (
            <Card>
              {step === STEP.GOAL && (
                <React.Fragment>
                  <h2>{t("step1_title")}</h2>
                  <Spacer bottom={"1rem"} />
                  <GoalContainer>
                    <Goal onClick={() => handleStepGoal(GOAL.LOSE_FAT.key)}>
                      {t("step1_choice1")}
                    </Goal>
                    <Goal onClick={() => handleStepGoal(GOAL.GAIN_MUSCLE.key)}>
                      {t("step1_choice2")}
                    </Goal>
                    <Goal onClick={() => handleStepGoal(GOAL.STRENGTH.key)}>
                      {t("step1_choice3")}
                    </Goal>
                  </GoalContainer>
                </React.Fragment>
              )}
              {step === STEP.LEVEL && (
                <React.Fragment>
                  <h2>{t("step2_title")}</h2>
                  <Spacer bottom={"1rem"} />
                  <GoalContainer>
                    <Goal onClick={() => handleStepLevel(LEVEL.BEGINNER.key)}>
                      {t("step2_choice1")}
                    </Goal>
                    <Goal
                      onClick={() => handleStepLevel(LEVEL.INTERMEDIATE.key)}
                    >
                      {t("step2_choice2")}
                    </Goal>
                    <Goal onClick={() => handleStepLevel(LEVEL.ADVANCED.key)}>
                      {t("step2_choice3")}
                    </Goal>
                  </GoalContainer>
                </React.Fragment>
              )}
              {step === STEP.PROGRAM_SUGGESTIONS && (
                <React.Fragment>
                  <h2>{t("program_suggestions")}</h2>
                  <Spacer bottom={"0.5rem"} />

                  <h3>
                    {t("your_goal")}: {GOAL[goal].text}
                  </h3>
                  <h3>
                    {t("your_level")}: {LEVEL[level].text}
                  </h3>
                  <Spacer bottom={"2rem"} />
                  {!!programs.length ? (
                    <List>
                      {programs.map((program, index) => (
                        <ListItem paddingBottom="1rem" key={index}>
                          <ProgramLink href={program.url} target="_blank">
                            {program.name}
                          </ProgramLink>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <h4>{t("no_programs_found")}</h4>
                  )}
                  <Spacer bottom={"2rem"} />
                  <ProgramButton
                    onClick={() => {
                      loadingOn();
                      setGoal(null);
                      setLevel(null);
                      setStep(STEP.GOAL);
                    }}
                  >
                    {t("choose_again_button")}
                  </ProgramButton>
                </React.Fragment>
              )}
            </Card>
          ) : (
            <Loader relative />
          )}
        </Container>
      </Wrapper>
    </React.Fragment>
  );
}
