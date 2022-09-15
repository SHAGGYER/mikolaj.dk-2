import React, { useContext, useState } from "react";
import { injectStripe } from "react-stripe-elements";

import CardSection from "./CardSection";
import HttpClient from "../../services/HttpClient";
import Alert from "../UI/Alert";
import { Form } from "../UI/Form";
import { Text } from "../UI/Text";
import { SecondaryButton } from "../UI";

const CheckoutForm = ({ stripe, elements, total, onSuccessfulPayment }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState();
  const [name, setName] = useState("");
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

      const { data } = await HttpClient().post("/api/billing/charge", {
        source,
        name,
        total,
      });
      onSuccessfulPayment();
    } catch (error) {
      setSubmitting(false);
      if (
        error.response.status === 400 &&
        error.response.data.errorCode === "OUT_OF_STOCK"
      ) {
        onOutOfStock(error.response.data.errors);
      } else if (error.response) {
        setError(error.response?.data?.error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text size="36" center>
        Betaling
      </Text>
      <Text size="20" center>
        DKK {parseFloat(total).toFixed(2)}
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
          Pay Now
        </SecondaryButton>
      </div>
    </form>
  );
};

export default injectStripe(CheckoutForm);
