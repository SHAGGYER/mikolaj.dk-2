import React, { useEffect, useState } from "react";
import { Wrapper } from "components/UI/Wrapper";
import { Container } from "components/UI";
import { Title } from "components/UI/Title";
import { List, ListItem } from "components/UI/List";
import HttpClient from "services/HttpClient";
import Meta from "components/Meta";
import { useHistory } from "react-router-dom";

interface Props {}

const YoutubeCourses: React.FC<Props> = ({ children }) => {
  const history = useHistory();
  const [courses, setCourses] = useState<any>([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const { data } = await HttpClient().get("/api/youtube-courses");
    setCourses(data);
  };

  return (
    <>
      <Meta
        title="YouTube Courses"
        description="Learn code for free!"
        url="/learning/youtube"
      />
      <Wrapper>
        <Container>
          <Title>Youtube Courses</Title>

          <List>
            {courses.map((course, index) => (
              <ListItem
                hand
                margin
                shadow
                key={index}
                style={{ padding: "1rem" }}
                onClick={() =>
                  history.push(`/learning/web-dev-course/${course._id}`)
                }
              >
                <i
                  className={"mdi mdi-youtube"}
                  style={{ fontSize: 30, color: "red" }}
                ></i>
                {course.title}
              </ListItem>
            ))}
          </List>
        </Container>
      </Wrapper>
    </>
  );
};

export default YoutubeCourses;
