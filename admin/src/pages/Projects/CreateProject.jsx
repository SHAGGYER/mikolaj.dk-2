import React, { useState } from "react";
import FloatingTextField from "../../components/FloatingTextField";
import Button from "../../components/Button";
import { useDialog } from "react-st-modal";
import HttpClient from "../../utilities/HttpClient";

function CreateProject() {
  const [title, setTitle] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");

  const dialog = useDialog();

  const onSubmit = async () => {
    const body = {
      title,
      githubUrl,
      demoUrl,
    };

    const { data } = await HttpClient().post("/api/admin/create-project", body);
    dialog.close(data.content);
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
