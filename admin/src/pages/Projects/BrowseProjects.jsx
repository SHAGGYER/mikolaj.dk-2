import React, { useEffect, useState } from "react";
import HttpClient from "../../utilities/HttpClient";
import { CustomDialog } from "react-st-modal";
import CreateProject from "./CreateProject";
import Button from "../../components/Button";

function BrowseProjects(props) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const openCreateProjectDialog = async () => {
    const result = await CustomDialog(<CreateProject />);
    if (result) {
      const _projects = [...projects];
      _projects.push(result);
      setProjects(_projects);
    }
  };

  const getProjects = async () => {
    const { data } = await HttpClient().get("/api/admin/projects");
    setProjects(data.content);
  };
  return (
    <>
      <Button variant="primary" onClick={openCreateProjectDialog}>
        Create Project
      </Button>
      <div className="flex gap-4 mt-4">
        {projects.map((project, index) => (
          <div className="border border-gray-400 p-4 w-64" key={index}>
            {project.title}
          </div>
        ))}
      </div>
    </>
  );
}

export default BrowseProjects;
