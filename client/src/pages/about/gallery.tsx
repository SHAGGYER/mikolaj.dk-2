import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Wrapper } from "components/UI/Wrapper";
import { Title } from "components/UI/Title";
import { Container, Spacer } from "components/UI";
import { CustomDialog } from "react-st-modal";
import PublicContext from "contexts/PublicContext";
import Flexbox from "components/UI/FlexBox";
import { Text } from "components/UI/Text";
import Meta from "components/Meta";
import BlurImageLoader from "react-blur-image-loader";
import PreviewImg from "../../public/user_account.png";

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryItem = styled.div`
  border-radius: 7px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
  height: 350px;
  overflow: hidden;
  cursor: pointer;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 7px;
    transition: all 0.6s linear;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

const ImageModal = ({ path, position, isMobile }) => {
  return (
    <div
      style={{
        padding: "15px 15px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={import.meta.env.VITE_API_URL + "/uploads" + path}
        style={{
          borderRadius: 7,
          maxWidth: !isMobile ? 670 : "100%",
          objectFit: "cover",
          objectPosition: position ?? "center",
        }}
      />
    </div>
  );
};

export default function Gallery() {
  const { setMeta, isMobile } = useContext(PublicContext);

  useEffect(() => {
    setMeta({
      title: "Gallery",
      description: "Take a look at my picture gallery!",
      keywords: "Gallery",
    });
  }, []);

  const openImageModal = async (path, position) => {
    if (isMobile) return;
    await CustomDialog(
      <ImageModal path={path} position={position} isMobile={isMobile} />,
      {
        className: "big-modal",
      }
    );
  };

  const images = [
    {
      path: "/mikolaj2.jpg",
    },
    {
      path: "/mikolaj7.jpg",
    },
    {
      path: "/mikolaj10.jpg",
    },
    {
      path: "/mikolaj6.jpg",
    },
    {
      path: "/mikolaj4.jpg",
    },
    {
      path: "/mikolaj3.jpg",
    },
    {
      path: "/mikolaj8.jpg",
    },
    {
      path: "/mikolaj5.jpg",
      position: "right",
    },
    {
      path: "/mikolaj11.jpg",
    },
  ];

  return (
    <>
      <Meta
        title="Gallery"
        description="Take a look at my picture gallery."
        url="/about/gallery"
      />
      <Wrapper>
        <Container>
          <Title>Gallery</Title>

          <Flexbox
            gap="1rem"
            width="100%"
            justifyContent={!isMobile ? "flex-end" : "flex-start"}
            wrap="nowrap"
          >
            <Text
              size={!isMobile ? "1.15rem" : "1rem"}
              style={{ textAlign: !isMobile ? "right" : "left" }}
            >
              “Your first 1,000 photographs are your worst.”
              <br />– Henri Cartier-Bresson
            </Text>
            <img
              alt="quote"
              src={import.meta.env.VITE_API_URL + "/uploads" + "/quote.png"}
              style={
                !isMobile
                  ? { width: 50, height: 50 }
                  : { height: 40, width: 40 }
              }
            />
          </Flexbox>

          <Spacer bottom="2.2rem" />

          <GalleryContainer id="gallery-container">
            {images.map((image, index) => (
              <GalleryItem key={index}>
                <img
                  loading="lazy"
                  src={import.meta.env.VITE_API_URL + "/uploads" + image.path}
                  alt={`mikolaj ${index + 1}`}
                />
              </GalleryItem>
            ))}
          </GalleryContainer>
        </Container>
      </Wrapper>
    </>
  );
}
