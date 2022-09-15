import React, { useEffect, useState } from "react";
import { Container, Spacer } from "../UI";
import styled from "styled-components";
import { Wrapper } from "../UI/Wrapper";
import { Title } from "../UI/Title";
import { useTranslation } from "react-i18next";
import { Text } from "components/UI/Text";
import HttpClient from "services/HttpClient";
import { IHobby } from "models/IHobby";

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  & img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }

  & img.contain {
    object-fit: contain;
  }

  & h2 {
    font-size: 2rem;
    font-family: Bitrate, sans-serif !important;
    margin-bottom: 1rem;
  }

  & p {
    font-size: 19px;
    line-height: 1.6;
  }

  @media (${(props) => props.theme.tabletPortrait}) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 2rem;

    &.mobile-reverse {
      display: flex;
      flex-direction: column-reverse;
    }
  }
`;

export default function Hobbies() {
  const { t } = useTranslation("hobbies");
  const [hobbies, setHobbies] = useState<IHobby[]>([]);

  useEffect(() => {
    getHobbies();
  }, []);

  const getHobbies = async () => {
    const { data } = await HttpClient().get<{ rows: IHobby[] }>(
      "/api/resource/hobby"
    );
    setHobbies(data.rows);
  };

  return (
    <Wrapper>
      <Container>
        <Title>
          My <Text color="var(--primary)">Hobbies</Text>
        </Title>

        {hobbies.map((hobby, index) => (
          <ContentContainer
            key={index}
            className={index % 2 === 0 ? "" : "mobile-reverse"}
          >
            {index % 2 === 0 ? (
              <>
                <article>
                  <h2>{hobby.name}</h2>
                  <p dangerouslySetInnerHTML={{ __html: hobby.body }} />
                </article>
                <article>
                  <img
                    src={import.meta.env.VITE_API_URL + hobby.image}
                    className="contain"
                    alt={hobby.name}
                  />
                </article>
              </>
            ) : (
              <>
                <article>
                  <img
                    src={import.meta.env.VITE_API_URL + hobby.image}
                    className="contain"
                    alt={hobby.name}
                  />
                </article>
                <article>
                  <h2>{hobby.name}</h2>
                  <p dangerouslySetInnerHTML={{ __html: hobby.body }} />
                </article>
              </>
            )}
          </ContentContainer>
        ))}

        {/* <ContentContainer>
          <article>
            <h2>Cooking</h2>
            <p>
              I love cooking. Making homemade food that tastes great is
              something I really enjoy doing. I really like making lasagne, but
              I never actually made bechamel sauce from scratch, I use Knorr fix
              that I mix with milk, add ground beef and pasta.
              <Spacer bottom="1rem" />
              Homemade pizza ala Mikolaj is also quite good; the taste of it
              being much better than a frozen pizza, but a bit behind restaurant
              quality. I make my own pizza sauce, but on more than one occasion
              - store bought...
              <Spacer bottom="1rem" />I enjoy making tortilla wraps that are
              really spicy, and to that end I fill them with jalapenos and chili
              sauce. Eating it can be somewhat less enjoyable, as I usually
              spill the sauce all over my t-shirt.
            </p>
          </article>
          <article>
            <img
              src={import.meta.env.VITE_API_URL + "/uploads" + "/cooking.svg"}
              className="contain"
              alt="cooking"
            />
          </article>
        </ContentContainer>

        <ContentContainer className="mobile-reverse">
          <article>
            <img
              src={import.meta.env.VITE_API_URL + "/uploads" + "/soccer.png"}
              alt="football"
            />
          </article>
          <article>
            <h2>Football</h2>
            <p>{t("hobby2_text1")}</p>
            <Spacer bottom="1rem" />
            <p>{t("hobby2_text2")}</p>
          </article>
        </ContentContainer>
        <ContentContainer>
          <article>
            <h2>Gaming</h2>
            <p>
              I had been gaming ever since I remember. I don't remember the very
              first game, or the few next games after that, but I do remember
              playing FIFA '97. Graphics were terrible. So playing FIFA 2003 was
              very enjoyable, as it was the first FIFA game where faces in-game
              actually resembled their real-life counterparts. Buying a new FIFA
              game was kind of a tradition for me, and games like GTA (starting
              with GTA 2) and Battlefield also became my free time spenders.
              <Spacer bottom="1rem" />
              But not until playing World of Warcraft that I truly found passion
              in gaming. I got "introduced" to it after watching a South Park
              episode dedicated to the game (Season 10, Episode 8). I've used
              many hours on the game, created many characters and leveled them
              to max level. After 14 years of playing the game, I got bored of
              the game and stopped playing, but I do recall the great times I
              have had. Who knows, maybe when the next expansion gets released,
              I might check it out.
              <Spacer bottom="1rem" />
              After a three month break from gaming (starting May 2021), I
              decided to do it again. But not World of Warcraft, FIFA or GTA. I
              bought Mafia III, and so far I've really enjoyed it, I got
              immersed in the story and the gameplay is also fabulous.
            </p>
          </article>
          <article style={{ alignSelf: "center" }}>
            <img
              className="contain"
              src={import.meta.env.VITE_API_URL + "/uploads" + "/game.png"}
              alt="world of warcraft"
            />
          </article>
        </ContentContainer>
        <ContentContainer className="mobile-reverse">
          <article>
            <img src={"/fitness.png"} alt="fitness" />
          </article>
          <article>
            <h2>{t("hobby1")}</h2>
            <p>
              I know quite a bit about theory and techniques in bodybuilding. I
              began training in a gym when I was 15 years old. I trained for a
              year and I got some muscle mass but nothing extraordinary. I had
              always been thin and it helped with getting some muscles in my
              body. Right now I'm taking a break, and I'm planning to rejoin the
              bodybuilding community after I've adjusted to my new job.
            </p>
          </article>
        </ContentContainer>*/}
      </Container>
    </Wrapper>
  );
}
