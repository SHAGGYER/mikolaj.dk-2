import React, { useMemo, useRef, useState } from "react";
import HttpClient from "../../utilities/HttpClient";
import cogoToast from "cogo-toast";
import { CustomDialog, useDialog } from "react-st-modal";
import MediaExplorer from "../../components/MediaExplorer";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import JoditEditor from "jodit-react";

export default function HobbiesForm({ row }) {
  const [name, setName] = useState(row ? row.name : "");
  const [body, setBody] = useState(row ? row.body : "");
  const [image, setImage] = useState(row ? row.image : "");
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const dialog = useDialog();

  const editor = useRef(undefined);

  const config = useMemo(
    () => ({
      readonly: false,
      spellcheck: false,
      minHeight: 500,
      toolbarButtonSize: "medium",
      showCharsCounter: false,
      showPlaceholder: false,
      showXPathInStatusbar: false,
      disablePlugins: "clean-html, paste",
      removeButtons: [
        "fullsize",
        "undo",
        "redo",
        "copyformat",
        "strikethrough",
        "eraser",
      ],
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "paragraph",
        "fontsize",
        "font",
        "|",
        "ul",
        "ol",
        "|",
        "indent",
        "outdent",
        "|",
        "left",
        "center",
        "right",
        "|",
        "link",
        "image",
        "hr",
      ],
    }),
    []
  );

  const onSubmit = async () => {
    try {
      const payload = {
        name,
        body,
        image,
      };

      await HttpClient()[row ? "put" : "post"](
        "/api/resource/hobby" + (row ? `/${row._id}` : ""),
        payload
      );
      cogoToast.success(`Hobby ${row ? "updated" : "created"} successfully`);
      setName("");
      setBody("");
      dialog.close(true);
    } catch (e) {
      if (e.response.status === 450) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const openMediaDialog = async () => {
    await CustomDialog(<MediaExplorer onSelect={(image) => setImage(image)} />);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ color: "black", fontSize: "2rem", marginBottom: "1rem" }}>
        {!!row ? "Edit" : "Create"} Hobby
      </h1>

      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Name"
        error={errors.name}
      />

      <div style={{ color: "black", marginBottom: "1rem" }}>
        <JoditEditor
          ref={editor}
          value={body}
          tabIndex={1}
          config={config}
          onBlur={(newContent) => setBody(newContent)} // preferred to use only this option to update the body for performance reasons
          onChange={(newContent) => undefined}
        />
      </div>

      {image && (
        <div style={{ marginBottom: "1rem" }}>
          <img
            onClick={openMediaDialog}
            style={{ maxHeight: 200 }}
            src={import.meta.env.VITE_API_URL + image}
            alt="image"
          />
        </div>
      )}

      <div style={{ display: "flex", gap: "0.5rem" }}>
        {image ? (
          <Button onClick={() => setImage(null)}>Delete Image</Button>
        ) : (
          <Button onClick={openMediaDialog}>Choose Image</Button>
        )}
        <Button onClick={() => onSubmit()}>Save</Button>
      </div>
    </div>
  );
}
