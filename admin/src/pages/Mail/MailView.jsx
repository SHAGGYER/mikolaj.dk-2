import React from "react";
import styled from "styled-components";
import moment from "moment";
import Button from "../../components/Button";

const Container = styled.div`
  h4 {
    margin-bottom: 1rem;
  }

  p {
    background-color: #eee;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }

  .buttons {
    display: flex;
    gap: 0.5rem;
  }
`;

function MailView({ row, onReply, onBack }) {
  return (
    <Container>
      <h3>
        <b>{row.from}</b> at{" "}
        <u>{moment(row.date).format("DD-MM-YYYY HH:mm")}</u>
      </h3>
      <h4>
        <b>Subject:</b> {row.subject}
      </h4>
      <p dangerouslySetInnerHTML={{ __html: row.message }}></p>
      <article className="buttons">
        <Button onClick={onReply}>Reply</Button>
        <Button onClick={onBack}>Back</Button>
      </article>
      <article className="border border-gray-400 p-2 mt-2 mb-2">
        {row.attachments.map((attachment, index) => (
          <a
            key={index}
            href={
              import.meta.env.VITE_API_URL +
              "/api/mail/download-attachment?id=" +
              attachment
            }
          >
            Attachment #{index + 1}
          </a>
        ))}
      </article>
    </Container>
  );
}

export default MailView;
