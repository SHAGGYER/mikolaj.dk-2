import React, { useContext } from "react";
import styled from "styled-components";
import PublicContext from "contexts/PublicContext";
import Products from "./Products";
import { SecondaryButton, Spacer } from "./UI";
import { useTranslation } from "react-i18next";
import { IShopProduct } from "models/IShopProduct";

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
`;

interface Props {
  redirectTo: Function;
  products: IShopProduct[];
}
export default function ShopSubmenuComponent({ redirectTo, products }: Props) {
  const { t } = useTranslation("navbar");
  return (
    <Container>
      <SecondaryButton onClick={() => redirectTo("/shop")}>
        {t("visit_shop")}
      </SecondaryButton>
      <Products redirectTo={redirectTo} products={products} />
    </Container>
  );
}
