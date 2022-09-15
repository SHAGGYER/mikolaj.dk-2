import React from "react";
import { Wrapper } from "components/UI/Wrapper";
import { Container, PrimaryButton } from "components/UI";
import { Subtitle } from "components/UI/Subtitle";
import { Text } from "components/UI/Text";
import styled from "styled-components";
import FlirtzieThumbnail from "../../public/flirtzie.png";
import FlirtzieFull from "../../public/flirtzie_full.png";
import DaysureThumb from "../../public/daysure.png";
import DaysureFull from "../../public/daysure_full.png";
import VaerdicheckThumb from "../../public/vaerdicheck_thumb.png";
import VaerdicheckFull from "../../public/vaerdicheck.png";
import { CustomDialog } from "react-st-modal";

const Grid = styled.div`
  margin-top: 3rem;

  section {
    overflow: hidden;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 300px);

    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
    }

    article {
      overflow: hidden;
      border: 1px solid black;
      height: 300px;
      cursor: pointer;
      position: relative;

      .backdrop {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 2;
        display: none;
      }

      button {
        z-index: 3;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: none;
      }

      img {
        position: absolute;
        left: 0;
        top: 0;
        transition: all 0.3s ease-in-out;
        z-index: 0;

        width: 100%;
        height: 100%;
      }

      &:hover {
        img {
          transform: scale(1.1);
        }

        .backdrop {
          display: block;
        }

        button {
          display: block;
        }
      }
    }
  }
`;

const projects = [
  {
    alt: "flirtzie",
    img: FlirtzieThumbnail,
    imgFull: FlirtzieFull,
  },
  {
    alt: "vaerdicheck",
    img: VaerdicheckThumb,
    imgFull: VaerdicheckFull,
  },
  {
    alt: "daysure",
    img: DaysureThumb,
    imgFull: DaysureFull,
  },
];

const FullImageDialog = ({ imgPath }) => {
  return (
    <div style={{ padding: "1rem" }}>
      <img src={imgPath} alt="big image" style={{ width: "100%" }} />
    </div>
  );
};

function Projects(props) {
  const openProject = async (project) => {
    await CustomDialog(<FullImageDialog imgPath={project.imgFull} />, {
      className: "big-modal",
    });
  };

  return (
    <Wrapper>
      <Container id="about-platform">
        <Subtitle>
          My <Text color="var(--primary)">Projects</Text>
          <Grid>
            <section>
              {projects.map((project, index) => (
                <article key={index}>
                  <img src={project.img} alt={project.alt} />
                  <div className="backdrop" />
                  <PrimaryButton onClick={() => openProject(project)}>
                    View Project
                  </PrimaryButton>
                </article>
              ))}
            </section>
          </Grid>
        </Subtitle>
      </Container>
    </Wrapper>
  );
}

export default Projects;
