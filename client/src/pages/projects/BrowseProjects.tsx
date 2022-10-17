import React, { useEffect, useState } from "react";
import { Wrapper } from "components/UI/Wrapper";
import { Container, SecondaryButton, Spacer } from "components/UI";
import { Title } from "components/UI/Title";
import HttpClient from "services/HttpClient";
import styled from "styled-components";

const ProjectsContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
`;

const ProjectStyled = styled.div`
  border: 1px solid #ccc;
  padding: 2rem;
  min-height: 200px;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  article {
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0.25rem;
  }
`;

function BrowseProjects(props) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    const { data } = await HttpClient().get<{ content: any }>(
      "/api/admin/projects"
    );
    setProjects(data.content);
  };

  return (
    <>
      <Wrapper>
        <Container>
          <Title>Projects</Title>
          <ProjectsContainer>
            {projects.map((project, index) => (
              <ProjectStyled key={index}>
                <h3>{project.title}</h3>
                <article>
                  <SecondaryButton mini>View Github</SecondaryButton>
                  <SecondaryButton mini>View Demo</SecondaryButton>
                </article>
              </ProjectStyled>
            ))}
          </ProjectsContainer>
        </Container>
      </Wrapper>
    </>
  );
}

export default BrowseProjects;
