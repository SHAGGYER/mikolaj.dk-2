import React, { useContext, useState } from "react";
import { injectStripe } from "react-stripe-elements";

import CardSection from "./CardSection";
import HttpClient from "../../services/HttpClient";
import Alert from "../UI/Alert";
import { Form } from "../UI/Form";
import { Text } from "../UI/Text";
import PublicContext from "../../contexts/PublicContext";
import { SecondaryButton } from "../UI";

const CheckoutForm = ({ stripe, elements, onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState();
  const [name, setName] = useState("");
  const [saveCard, setSaveCard] = useState(true);
  const { user } = useContext(PublicContext);
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError(null);

    setSubmitting(true);

    try {
      const sourceResponse = await stripe.createSource({ type: "card" });
      const { source, error } = sourceResponse;
      if (error) {
        setError(error.message);
        setSubmitting(false);
        return;
      }

      const { data } = await HttpClient().post("/api/billing/update-card", {
        source,
        name,
      });
      onSuccess(data);
    } catch (error) {
      setSubmitting(false);
      if (error.response) {
        setError(error.response?.data?.error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text size="36" center>
        Opdatér Kort
      </Text>

      {!!error && <Alert error>{error}</Alert>}
      <input
        className="card__element mb-1"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <CardSection />

      <div className="mt-2">
        <SecondaryButton type="submit" loading={submitting}>
          Opdatér Kort
        </SecondaryButton>
      </div>
    </form>
  );
};

export default injectStripe(CheckoutForm);
