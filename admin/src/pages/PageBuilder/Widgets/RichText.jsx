import React, { useEffect, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";

function RichText({ html, onUpdateValue }) {
  const [body, setBody] = useState(html ? html : "");

  useEffect(() => {
    onUpdateValue({ value: body, style: {} });
  }, [body]);

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

  return (
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
  );
}

export default RichText;
