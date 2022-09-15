import React, {useContext} from "react";
import {CustomDialog, useDialog} from "react-st-modal";
import styled from "styled-components";
import PublicContext from "contexts/PublicContext";
import {useCart} from "../hooks/Cart";
import Product from "./Product";
import {useTranslation} from "react-i18next";

const QuickViewContainer = styled.section`
  padding: 1rem;
`;

const QuickViewDialog = ({product}) => {
    const dialog = useDialog();

    return (
        <QuickViewContainer>
            <Product product={product} onAddToCart={() => dialog.close(product)}/>
        </QuickViewContainer>
    );
};

const ProductsList = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(4, 1fr);

  & .product {
    background-color: white;
    padding: 1.5rem;
    text-align: center;

    & .img-container {
      position: relative;
      height: 200px;
      margin-bottom: 1rem;

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        margin: 0 auto;
        display: block;
      }

      & article {
        position: absolute;
        opacity: 0;
        transition: all 0.3s ease-in-out;
        bottom: 0;
        text-align: center;
        background-color: var(--secondary);
        padding: 0.25rem;
        width: 100%;
        cursor: pointer;
        color: white;
      }

      &:hover article {
        opacity: 1;
      }
    }

    & h3 {
      font-size: 20px;
      color: var(--secondary);
      cursor: pointer;
      margin-bottom: 0.5rem;
      font-weight: normal;
      transition: all 0.4s ease-in-out;

      &:hover {
        color: black;
      }
    }
  }

  @media (${(props) => props.theme.tabletPortrait}) {
    grid-template-columns: repeat(2, 200px);
  }

  @media (${(props) => props.theme.mobile}) {
    grid-template-columns: 1fr;
    justify-content: center;
  }
`;

export default function Products({products, redirectTo}) {
    const {redirect} = useContext(PublicContext);
    const {addToCart} = useCart();
    const {t} = useTranslation("products_component");

    const openQuickViewDialog = async (product) => {
        const result = await CustomDialog(<QuickViewDialog product={product}/>, {
            className: "big-modal",
        });
        if (result) {
            addProductToCart(product);
        }
    };

    const addProductToCart = async (product) => {
        await addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            type: "product",
        });
        handleRedirect("/cart");
    };

    const handleRedirect = (path) => {
        redirectTo ? redirectTo(path) : redirect(path);
    };

    return (
        <ProductsList>
            {products.map((product, index) => (
                <div key={index} className="product">
                    <div className="img-container">
                        <img alt="product" src={`${process.env.API_URL}${product.images[0]}`}/>
                        <article onClick={() => openQuickViewDialog(product)}>
                            {t("quick_view")}
                        </article>
                    </div>
                    <h3 onClick={() => handleRedirect(`/shop/product/${product._id}`)}>
                        {product.name}
                    </h3>
                    <aside>DKK {parseFloat(product.price).toFixed(2)}</aside>
                </div>
            ))}
        </ProductsList>
    );
}
