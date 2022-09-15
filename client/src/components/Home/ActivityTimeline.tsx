import React, { useContext, useEffect } from "react";
import { Container, Spacer } from "components/UI";
import Timeline from "components/UI/Timeline";
import { Wrapper } from "components/UI/Wrapper";
import { useTranslation } from "react-i18next";
import { Text } from "components/UI/Text";
import { Subtitle } from "components/UI/Subtitle";
import TimelineSnake from "components/UI/TimelineSnake";

export default function ActivityTimeline() {
  const { t } = useTranslation("job");

  const TimelineItems = [
    {
      title: "June 2022 - August 2022",
      description: "Work at Servicepos as a FullStack Engineer",
      extra: "2022",
    },
    {
      title: t("timeline6_title"),
      description: t("timeline6_desc1"),
      extra: t("timeline6_desc2"),
    },
    {
      title: t("timeline1_title"),
      description: t("timeline1_desc1"),
      extra: t("timeline1_desc2"),
    },
    {
      title: t("timeline2_title"),
      description: t("timeline2_desc1"),
      extra: t("timeline2_desc2"),
    },
    {
      title: t("timeline3_title"),
      description: t("timeline3_desc1"),
      extra: t("timeline3_desc2"),
    },
    {
      title: t("timeline5_title"),
      description: t("timeline5_desc1"),
      extra: "Responsibilities: Fronted and Backend Development",
    },
    {
      title: t("timeline4_title"),
      description: t("timeline4_desc1"),
    },
    {
      title: "January 2016",
      description: "Decided that coding will be my career.",
    },
    {
      title: "2005",
      description: "I started learning PHP.",
    },
    {
      title: "2001",
      description: "My mom bought me my first HTML book.",
    },
  ];

  return (
    <React.Fragment>
      <Wrapper>
        <Container>
          <Subtitle align="center">
            <Text color="black">Timeline</Text>
          </Subtitle>
          <TimelineSnake items={TimelineItems} />
        </Container>
      </Wrapper>
    </React.Fragment>
  );
}
