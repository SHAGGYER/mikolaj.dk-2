import React, { useState } from "react";
import FloatingTextField from "../../components/FloatingTextField";
import Button from "../../components/Button";
import { useDialog } from "react-st-modal";
import HttpClient from "../../utilities/HttpClient";
import FloatingTextArea from "../../components/FloatingTextArea";

function CreateProject({ project }) {
  const [title, setTitle] = useState(project ? project.title : "");
  const [githubUrl, setGithubUrl] = useState(project ? project.githubUrl : "");
  const [demoUrl, setDemoUrl] = useState(project ? project.demoUrl : "");
  const [description, setDescription] = useState(
    project ? project.description : ""
  );

  const dialog = useDialog();

  const onSubmit = async () => {
    const body = {
      title,
      githubUrl,
      demoUrl,
      description,
    };

    if (project) {
      const { data } = await HttpClient().put(
        "/api/admin/update-project/" + project._id,
        body
      );
      dialog.close({
        ...project,
        ...body,
      });
    } else {
      const { data } = await HttpClient().post(
        "/api/admin/create-project",
        body
      );
      dialog.close(data.content);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-2xl mb-4">Create Project</h3>
      <FloatingTextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <FloatingTextField
        label="Github URL"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
      />
      <FloatingTextField
        label="Demo URL"
        value={demoUrl}
        onChange={(e) => setDemoUrl(e.target.value)}
      />

      <FloatingTextArea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex gap-1">
        <Button $mini onClick={onSubmit}>
          Save
        </Button>
        <Button $mini variant="error" onClick={() => dialog.close()}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default CreateProject;
