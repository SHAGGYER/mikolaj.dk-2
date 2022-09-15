import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { SecondaryButton, Spacer } from "./UI";

const SliderItem = styled.div`
  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;

    @media (${(props) => props.theme.mobile}) {
      height: 350px;
    }
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  & .images {
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  & .info {
    & h3 {
      margin-bottom: 1rem;
      font-size: 20px;

      & span {
        font-weight: normal;
      }
    }

    & h4 {
      font-size: 20px;
      margin-bottom: 0.5rem;
    }

    & .description {
      background-color: white;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
      padding: 1rem;
      border-radius: 3px;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
export default function Product({ product, onAddToCart }) {
  const { t } = useTranslation("product");
  return (
    <div>
      <ProductContainer>
        <article className="images">
          <img
            src={process.env.API_URL + product?.images[0]}
            alt="product image"
          />
        </article>
        <article className="info">
          <h3>{product?.name}</h3>
          <h3>
            {t("quantity")}: <span>{product?.quantity}</span>
          </h3>
          <h3>
            {t("condition")}: <span>{product?.condition}</span>
          </h3>
          <h3>
            {t("price")}:{" "}
            <span>{parseFloat(product?.price).toFixed(2)} DKK</span>
          </h3>
          <SecondaryButton
            onClick={() => onAddToCart()}
            disabled={!product?.quantity}
          >
            {t("add_to_cart")}
          </SecondaryButton>
          <Spacer bottom="1rem" />
          <h4>{t("product_description")}</h4>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: product?.description }}
          ></div>
        </article>
      </ProductContainer>
    </div>
  );
}
