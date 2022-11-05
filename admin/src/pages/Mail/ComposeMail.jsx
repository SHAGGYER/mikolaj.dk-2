import React, { useEffect, useRef, useState } from "react";
import { CustomDialog, useDialog } from "react-st-modal";
import MediaExplorer from "../../components/MediaExplorer";
import "react-quill/dist/quill.snow.css";
import Button from "../../components/Button";
import HttpClient from "../../utilities/HttpClient";
import FloatingTextField from "../../components/FloatingTextField";
import styled from "styled-components";
import JoditEditor from "jodit-react";
import Autocomplete from "../../components/Autocomplete";
import cogoToast from "cogo-toast";

const JoditContainer = styled.div`
  margin-bottom: 1rem;
  margin-top: 1rem;
  ul {
    padding-left: 1rem;
  }
`;

function ComposeMail({ row, fromAddress }) {
  const dialog = useDialog();

  const [fromAccountAddress, setFromAccountAddress] = useState(fromAddress);
  const [recipient, setRecipient] = useState(row ? row.from : "");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState(row ? `Re: ${row.subject}` : "");
  const [attachments, setAttachments] = useState([]);
  const [file, setFile] = useState(null);

  const focusRef = useRef();
  const editor = useRef();

  const config = React.useMemo(
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
        {
          name: "Insert photo",
          tooltip: "Insert photo",
          exec: async (editor) => {
            const result = await CustomDialog(<MediaExplorer />);

            editor.s.insertHTML(
              "<img src=" + import.meta.env.VITE_API_URL + result + " />"
            );
          },
        },
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
        "hr",
      ],
    }),
    []
  );

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, [focusRef.current]);

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
      fromAddress,
      attachments: attachments.map((x) => {
        x.path = import.meta.env.VITE_API_URL + "/uploads/" + x.path;
        return x;
      }),
    };

    await HttpClient().post("/api/mail", body);
    cogoToast.success("Successfully sent mail");
    dialog.close(true);
  };

  const onAttachmentSelected = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    const response = await HttpClient().post(
      "/api/mail/upload-mail-attachment",
      formData
    );
    setAttachments([...attachments, response.data.content]);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <FloatingTextField
        label="From account"
        value={fromAccountAddress}
        onChange={(e) => setFromAccountAddress(e.target.value)}
      />
      <Autocomplete
        label="Recipient"
        innerRef={focusRef}
        onSelectedContact={(contact) => setRecipient(contact)}
        defaultContact={row?.from}
      />
      <FloatingTextField
        label="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <JoditContainer style={{ marginBottom: "1rem" }}>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the body for performance reasons
          onChange={(newContent) => {}}
        />
      </JoditContainer>

      <hr style={{ marginBottom: "1rem" }} />
      <input type="file" onChange={(e) => onAttachmentSelected(e)} />
      <div className="flex gap-1">
        {attachments.map((attachment, index) => (
          <div className="border border-gray-400 p-2 w-48" key={index}>
            Attachment #{index + 1}
          </div>
        ))}
      </div>
      <hr style={{ marginBottom: "1rem", marginTop: "1rem" }} />

      <Button onClick={sendMail}>Send</Button>
    </div>
  );
}

export default ComposeMail;
