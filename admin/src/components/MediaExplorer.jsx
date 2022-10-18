import styled, { css } from "styled-components";
import React, { useEffect, useState } from "react";
import HttpClient from "../utilities/HttpClient";
import { CustomDialog, useDialog } from "react-st-modal";
import Button from "./Button";

const Image = styled.img`
  object-fit: cover;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  position: relative;

  & article {
    display: none;
    position: absolute;
    background: black;
    padding: 0.25rem 0.5rem;
    line-height: 1;
    color: white;
    cursor: pointer;
    bottom: 10px;
    right: 2px;
    z-index: 10;
  }

  &:hover article {
    display: block;
  }
`;

const ImagesContainer = styled.div`
  ${(props) =>
    !props.browser
      ? css`
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.5rem;
          max-height: 300px;
          overflow-y: auto;
        `
      : css`
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        `}
`;

const Container = styled.section`
  padding: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BigImageDialog = ({ path }) => {
  return (
    <div style={{ padding: "1rem" }}>
      <img
        alt="media image"
        style={{ height: 500, objectFit: "cover", width: "100%" }}
        src={path}
      />
    </div>
  );
};

export default function MediaExplorer({ onSelect, noTitle, browser }) {
  const dialog = useDialog();

  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    const { data } = await HttpClient().get("/api/media");
    setImages(data);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    const response = await HttpClient().post("/api/media", formData);
    setImages([response.data, ...images]);
  };

  const deleteImage = async (imageId) => {
    await HttpClient().delete(`/api/media/${imageId}`);
    setImages((prevState) => {
      return [...prevState.filter((x) => x._id !== imageId)];
    });
  };

  const openBigImageDialog = async (path) => {
    await CustomDialog(<BigImageDialog path={path} />);
  };

  const handleOnSelect = (image) => {
    if (onSelect) {
      onSelect("/uploads/" + image.filePath);
    }
    dialog.close("/uploads/" + image.filePath);
  };

  return (
    <Container>
      {!noTitle && !browser && <h1>Manage Media</h1>}

      <Form onSubmit={onSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <Button variant="contained" type="submit" color="primary">
          Upload
        </Button>
      </Form>

      <ImagesContainer browser={browser}>
        {images.map((image, index) => (
          <ImageContainer key={index}>
            <article onClick={() => deleteImage(image._id)}>x</article>
            <Image
              height={browser ? "150px" : "100px"}
              width={browser ? "150px" : "100%"}
              src={import.meta.env.VITE_API_URL + "/uploads/" + image.filePath}
              alt={image.originalName}
              onClick={() =>
                browser
                  ? openBigImageDialog(
                      import.meta.env.VITE_API_URL +
                        "/uploads/" +
                        image.filePath
                    )
                  : handleOnSelect(image)
              }
            />
          </ImageContainer>
        ))}
      </ImagesContainer>
    </Container>
  );
}
