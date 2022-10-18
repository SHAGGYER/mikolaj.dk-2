import React, { useEffect, useState } from "react";
import HttpClient from "../../utilities/HttpClient";
import { Confirm, CustomDialog } from "react-st-modal";
import CreateProject from "./CreateProject";
import Button from "../../components/Button";
import styled from "styled-components";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { setPageTitle } from "../../store/reducers/Common";
import { useDispatch } from "react-redux";
import cogoToast from "cogo-toast";

const MenuStyled = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;

  a {
    text-decoration: underline;
    color: var(--blue);
  }
`;

function BrowseProjects(props) {
  const [projects, setProjects] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle("Projects"));
    getProjects();
  }, []);

  const openCreateProjectDialog = async () => {
    const result = await CustomDialog(<CreateProject />);
    if (result) {
      const _projects = [...projects];
      _projects.push(result);
      setProjects(_projects);
      cogoToast.success("Successfully created this project");
    }
  };

  const openEditDialog = async (project) => {
    const result = await CustomDialog(<CreateProject project={project} />);
    if (result) {
      const _projects = [...projects].map((x) => {
        if (x._id === result._id) {
          return result;
        }
        return x;
      });
      setProjects(_projects);
      cogoToast.success("Successfully saved changes");
    }
  };

  const getProjects = async () => {
    const { data } = await HttpClient().get("/api/admin/projects");
    setProjects(data.content);
  };

  const deleteProject = async (project) => {
    await HttpClient().delete("/api/admin/projects/" + project._id);
    const _projects = [...projects].filter((x) => x._id !== project._id);
    setProjects(_projects);
    cogoToast.success("Successfully deleted this project");
  };

  return (
    <>
      <Button variant="primary" onClick={openCreateProjectDialog}>
        Create Project
      </Button>
      <div className="flex gap-4 mt-4">
        {projects.map((project, index) => (
          <div className="border border-gray-400 p-4 w-64 relative" key={index}>
            <MenuStyled>
              <a href="#" onClick={() => openEditDialog(project)}>
                Edit
              </a>
              <ConfirmDialog
                title="This will delete the project"
                onSuccess={() => deleteProject(project)}
              />
            </MenuStyled>
            {project.title}
          </div>
        ))}
      </div>
    </>
  );
}

export default BrowseProjects;
