import React, { useEffect, useState } from "react";
import { Wrapper } from "components/UI/Wrapper";
import { Button, Container, PrimaryButton } from "components/UI";
import { Subtitle } from "components/UI/Subtitle";
import HttpClient from "services/HttpClient";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Course = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #ccc;
`;

interface ICourse {
  _id: string;
  name: string;
}
function BrowseCourses(props) {
  const history = useHistory();
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const { data } = await HttpClient().get<{ rows: ICourse[] }>(
      "/api/courses"
    );
    setCourses(data.rows);
  };

  return (
    <Wrapper>
      <Container>
        <Subtitle>Online Courses</Subtitle>

        <div>
          {courses.map((course, index) => (
            <Course key={index}>
              <div>
                <h3>{course.name}</h3>
                <h4>$19.99</h4>
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <PrimaryButton
                  onClick={() => history.push(`/courses/${course._id}`)}
                >
                  View Course
                </PrimaryButton>
              </div>
            </Course>
          ))}
        </div>
      </Container>
    </Wrapper>
  );
}

export default BrowseCourses;
