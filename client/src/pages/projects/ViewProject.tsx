import React from "react";
import { IProject } from "models/IProject";

interface Props {
  project: IProject;
}
function ViewProject({ project }: Props) {
  return <div style={{ padding: "1rem" }}></div>;
}

export default ViewProject;
