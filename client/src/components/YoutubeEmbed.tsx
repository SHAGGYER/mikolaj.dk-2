import React from "react";
import styled from "styled-components";

const Embed = styled.div<any>`
  overflow: hidden;
  position: relative;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  margin: 0 auto;

  iframe {
    width: 100%;
    height: 100%;
    position: ${(props) => (!props.absolute ? "static" : "absolute")};
  }
`;

const YoutubeEmbed = ({
                        embedId,
                        height = "480px",
                        width = "850px",
                        absolute = false,
                      }) => (
  <Embed
    className="video-responsive"
    height={height}
    width={width}
    absolute={absolute}
  >
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </Embed>
);

export default YoutubeEmbed;
