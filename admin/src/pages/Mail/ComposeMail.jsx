import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import { CustomDialog, useDialog } from "react-st-modal";
import MediaExplorer from "../../components/MediaExplorer";
import "react-quill/dist/quill.snow.css";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import HttpClient from "../../utilities/HttpClient";

function ComposeMail({ row }) {
  const dialog = useDialog();

  const [recipient, setRecipient] = useState(row ? row.from : "");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState(row ? `Re: ${row.subject}` : "");
  const quill = useRef();

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "image",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  const imageHandler = async () => {
    const image = await CustomDialog(<MediaExplorer />);

    const editor = quill.current.editor;
    const range = editor.getSelection(true);
    editor.insertEmbed(range.index, "image", image);
  };

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "code-block", "image"],
        ],
        handlers: {
          image: imageHandler,
          link: function (val) {
            {
              if (val) {
                const href = prompt("Enter link");
                const editor = quill.current.editor;
                // const range = editor.getSelection(true);
                // editor.insertText(range.index, href);
                this.quill.format("link", href);
              }
            }
          },
        },
      },
    }),
    []
  );

  const sendMail = async () => {
    const body = {
      to: recipient,
      message: content,
      subject,
    };

    await HttpClient().post("/api/mail", body);
    dialog.close(true);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <TextField
        label="Recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <TextField
        label="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <div style={{ marginBottom: "1rem" }}>
        <ReactQuill
          ref={quill}
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
        />
      </div>
      <Button onClick={sendMail}>Send</Button>
    </div>
  );
}

export default ComposeMail;
