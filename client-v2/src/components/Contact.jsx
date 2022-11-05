import React, { useContext, useEffect, useState } from "react";
import { Container } from "./UI/Container";
import { Wrapper } from "./UI/Wrapper";
import FloatingTextField from "./UI/FloatingTextField";
import FloatingTextArea from "./UI/FloatingTextArea";
import { PrimaryButton } from "./UI/PrimaryButton";
import cogoToast from "cogo-toast";
import HttpClient from "../HttpClient";
import { AppContext } from "../AppContext";
import useElementOnScreen from "../hooks/UseElementOnScreen";

export default function Contact() {
  const { setCurrentComponent } = useContext(AppContext);
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.35,
  });

  useEffect(() => {
    console.log(isVisible);
    if (isVisible) {
      setCurrentComponent("contact");
    }
  }, [isVisible]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !message) {
      cogoToast.error("Please enter all fields");
      return;
    }

    const data = {
      name,
      email,
      message,
    };

    try {
      await HttpClient().post("/api/mail/sendMail", data);
      cogoToast.success("Your message has been sent successfully");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      cogoToast.error("Server error");
    }
  };

  return (
    <Container ref={containerRef}>
      <Wrapper id="contact">
        <h3>Contact</h3>
        <div className="content">
          <h2>Drop me a line...</h2>
          <hr />
          <p>
            If you have any questions regarding my work, please do not hesitate
            to contact me. I will reply within 24 hours :)
          </p>

          <form onSubmit={onSubmit}>
            <FloatingTextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FloatingTextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FloatingTextArea
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <PrimaryButton $filled>Send Message</PrimaryButton>
          </form>
        </div>
      </Wrapper>
    </Container>
  );
}
