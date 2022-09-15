import { Spacer, SecondaryButton } from "./UI";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import HttpClient from "services/HttpClient";
import { Title } from "./UI/Title";
import { Agent } from "services/api";
import { IMedia } from "models/IMedia";

const Image = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  cursor: pointer;
`;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
`;

const Container = styled.section`
  padding: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function MediaExplorer({ onSelect, noTitle }) {
  const [images, setImages] = useState<IMedia[]>([]);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    const imgs = await Agent.Media.getMedia();
    setImages(imgs);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file!);
    const response = await HttpClient().post<IMedia>("/api/media", formData);
    setImages([response.data, ...images]);
  };

  return (
    <Container>
      {!noTitle && <Title>Manage Media</Title>}

      <Form onSubmit={onSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files![0])} />

        <SecondaryButton>Upload</SecondaryButton>
      </Form>
      <Spacer bottom="1rem" />

      <ImagesContainer>
        {images.map((image, index) => (
          <Image
            src={"/uploads/" + image.filePath}
            alt={image.originalName}
            onClick={() => onSelect("/uploads/" + image.filePath)}
            key={index}
          />
        ))}
      </ImagesContainer>
    </Container>
  );
}
