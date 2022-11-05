import React, { useState } from "react";
import { Container } from "./UI/Container";
import { Wrapper } from "./UI/Wrapper";
import styled from "styled-components";
import { CustomDialog } from "react-st-modal";
import { PrimaryButton } from "./UI/PrimaryButton";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 220px;
  border-radius: 0.25rem;
  border: 1px solid var(--primary);
  position: relative;
  z-index: 1;
  overflow: hidden;
  cursor: pointer;

  &:hover .backdrop {
    top: 0;
  }

  .button {
    color: white;
    text-decoration: underline;
  }

  .backdrop {
    position: absolute;
    top: -999px;
    transition: all 0.3s ease-in-out;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BoxContainer = styled.div`
  display: grid;
  gap: 0.25rem;
  grid-template-columns: repeat(4, 1fr);
`;

const items = [
  {
    title: "Flirtzie.dk",
    description: "My dating service app",
    image: "flirtzie.png",
    link: "https://www.flirtzie.dk",
    keywords: ["react", "nodejs", "stripe"],
    githubUrl: "",
  },
  {
    title: "Mikolaj.dk (v1)",
    description: "My old portfolio website",
    image: "mikolaj_v1.png",
    link: "https://mikolaj-v1.mikolaj.dk",
    keywords: ["react", "nodejs", "stripe"],
    githubUrl: "",
  },
  {
    title: "WpHosty",
    description: "My Wordpress hosting SaaS",
    image: "wphosty.png",
    link: "https://wphosty.mikolaj.dk",
    keywords: ["react", "nodejs", "stripe"],
    githubUrl: "",
  },
  {
    title: "Coingo",
    description: "",
    image: "coingo.png",
    link: "https://coingo.mikolaj.dk",
    keywords: ["vue", "laravel"],
    githubUrl: "",
  },
  {
    title: "Miko POS",
    description: "",
    image: "miko_pos.png",
    link: "https://miko-pos.mikolaj.dk",
    keywords: ["react", "nodejs"],
    githubUrl: "",
  },
  {
    title: "Daysure",
    description: "Booking app for barbers",
    image: "daysure.png",
    link: "https://daysure.mikolaj.dk",
    keywords: ["react", "nodejs"],
    githubUrl: "",
  },
];

const ItemDialogStyled = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }

  article {
    display: flex;
    gap: 0.5rem;
  }
`;

const ItemDialog = ({ item }) => {
  return (
    <ItemDialogStyled>
      <h2>{item.title}</h2>
      <img src={`/assets/${item.image}`} alt={item.title} />
      <p>{item.description}</p>
      <article>
        <PrimaryButton $filled onClick={() => window.open(item.link, "_blank")}>
          Visit Project
        </PrimaryButton>
        <PrimaryButton
          $filled
          onClick={() => window.open(item.githubUrl, "_blank")}
        >
          Github
        </PrimaryButton>
      </article>
    </ItemDialogStyled>
  );
};

const Buttons = styled.article`
  display: flex;
  gap: 1.25rem;
  align-items: center;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  border: none;
  background-color: ${(props) =>
    props.$selected ? "var(--primary)" : "transparent"};
  cursor: pointer;
  font-size: 18px;
  padding: 0.25rem 0.5rem;
`;

const keywords = [
  {
    title: "All",
    key: "all",
  },
  {
    title: "React",
    key: "react",
  },
  {
    title: "Vue",
    key: "vue",
  },
  {
    title: "Laravel",
    key: "laravel",
  },
  {
    title: "Node.js",
    key: "nodejs",
  },
  {
    title: "With Payment",
    key: "stripe",
  },
];

export default function Portfolio() {
  const [shownItems, setShownItems] = useState(items);
  const [currentKeyword, setCurrentKeyword] = useState("all");
  const openItemDialog = async (item) => {
    await CustomDialog(<ItemDialog item={item} />);
  };

  const searchItems = (keyword) => {
    setCurrentKeyword(keyword);

    if (keyword === "all") {
      return setShownItems(items);
    }

    setShownItems(items.filter((item) => item.keywords.includes(keyword)));
  };

  return (
    <Container>
      <Wrapper>
        <h3>Portfolio</h3>
        <div className="content">
          <h2>My Work</h2>
          <hr />
          <Buttons>
            {keywords.map((keyword, index) => (
              <Button
                key={index}
                onClick={() => searchItems(keyword.key)}
                $selected={currentKeyword === keyword.key}
              >
                {keyword.title}
              </Button>
            ))}
          </Buttons>
          <BoxContainer>
            {shownItems.map((item, index) => (
              <Box key={index}>
                <div className="backdrop" onClick={() => openItemDialog(item)}>
                  <div className="button">View Project</div>
                </div>
                <img src={`/assets/${item.image}`} alt={item.title} />
              </Box>
            ))}
          </BoxContainer>
        </div>
      </Wrapper>
    </Container>
  );
}
