import React, { useEffect, useState } from "react";
import { Wrapper } from "components/UI/Wrapper";
import { Container, SecondaryButton, Spacer } from "components/UI";
import { Title } from "components/UI/Title";
import HttpClient from "services/HttpClient";
import styled from "styled-components";
import { CustomDialog, useDialog } from "react-st-modal";

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

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    text-align: center;
  }

  article {
    position: relative;
    z-index: 999;
  }
`;

const ProjectDialogStyled = styled.div`
  padding: 2rem;
  position: relative;

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
  }

  article {
    z-index: 5;
    display: flex;
    align-items: start;
    gap: 0.25rem;
  }

  .toggler {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 30px;
    cursor: pointer;
  }
`;

const Project = ({ project }) => {
  const dialog = useDialog();

  const redirect = (path) => {
    window.open(path, "_blank");
  };

  return (
    <ProjectDialogStyled>
      <div className="toggler" onClick={() => dialog.close()}>
        x
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <article>
        <SecondaryButton mini onClick={() => redirect(project.githubUrl)}>
          View Github
        </SecondaryButton>
        <SecondaryButton mini onClick={() => redirect(project.demoUrl)}>
          View Demo
        </SecondaryButton>
      </article>
    </ProjectDialogStyled>
  );
};

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

  const openProject = async (project) => {
    await CustomDialog(<Project project={project} />);
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
                  <SecondaryButton onClick={() => openProject(project)}>
                    View
                  </SecondaryButton>
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
