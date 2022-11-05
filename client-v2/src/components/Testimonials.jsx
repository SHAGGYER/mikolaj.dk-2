import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React from "react";
import styled from "styled-components";

const CarouselWrapper = styled.div`
  .carousel .slide {
    background: #fff !important;
    color: black;
    height: 100%;
  }

  .carousel .slide img {
    width: 139px !important;
    border-radius: 50%;
    position: relative;
    left: -175px;
  }

  .myCarousel {
    background: #fafafa;
    margin-top: -6%;
    width: 60%;
    padding-top: 6%;
    padding-bottom: 8%;
    padding-left: 5%;
    padding-right: 5%;
    border: 1px solid #ddd;
    height: 286px;
  }

  .carousel .control-dots {
    padding-left: 5px !important;
    outline: 0;
    bottom: 5px !important;
    width: 60%;
  }

  .myCarousel h3 {
    color: #222;
    font-weight: 100;
    letter-spacing: 0.2px;
    margin-bottom: 4px;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 17px;
  }

  .myCarousel h4 {
    text-transform: uppercase;
    margin-top: 0;
    padding-top: 0;
    font-weight: 500;
    color: #787878;
    font-size: 14px;
  }

  .myCarousel p {
    font-weight: 100 !important;
    line-height: 29px !important;
    color: #222;
    font-size: 15px;
    font-family: sans-serif;
    max-height: 67px;
  }

  .myCarousel p:before {
    content: "“";
    color: #aaa;
    font-size: 26px;
    font-family: monospace;
    font-weight: 100;
  }

  .myCarousel p:after {
    content: "”";
    color: #aaa;
    font-size: 26px;
    font-family: monospace;
    font-weight: 100;
    line-height: 0;
  }

  .carousel .control-dots .dot {
    box-shadow: none !important;
    background: #454545 !important;
    outline: 0;
  }

  .carousel.carousel-slider .control-arrow {
    background: #000 !important;
    height: 50px !important;
    position: absolute;
    top: 35% !important;
  }

  @media only screen and (max-width: 934px) {
    .carousel-root {
      outline: 0;
      width: 93% !important;
      margin: auto !important;
    }

    .carousel.carousel-slider .control-arrow {
      display: none !important;
    }
    .myCarousel {
      background: #fafafa;
      margin-top: -9%;
      width: 100%;
      padding-top: 8%;
      padding-bottom: 12.5%;
      padding-left: 5%;
      padding-right: 5%;
      border: 1px solid #ddd;
      height: 269px;
    }

    .carousel .slide img {
      width: 24% !important;
      border-radius: 50%;
      left: auto;
    }

    h3 {
      display: block;
    }

    .carousel .control-dots {
      width: 100%;
    }
  }
`;

export default function Testimonials() {
  return (
    <CarouselWrapper>
      <Carousel
        showArrows={false}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={6100}
      >
        <div>
          <img src="/assets/jesper.jpg" />
          <div className="myCarousel">
            <h3>Jesper V.T.</h3>
            <h4>GetClients.dk</h4>
            <p>
              Jeg kan klart anbefale Mikolaj hvis du skal have udviklet en
              hjemmeside med komplicerede løsninger.
            </p>
          </div>
        </div>
        <div>
          <img src="/assets/benjamin.jpg" />
          <div className="myCarousel">
            <h3>Benjamin F.</h3>
            <h4>BF Elektronik</h4>
            <p>
              Gennem sit arbejde viste Mikolaj stor professionalisme og
              potentiale han er i besiddelse af.
            </p>
          </div>
        </div>
        <div>
          <img src="/assets/mohman.jpg" />
          <div className="myCarousel">
            <h3>Mohman</h3>
            <h4>Student</h4>
            <p>
              Hvis man ikke er så erfaren igen, så er det dejligt, at få en til
              at se ens kode og komme med nogle kommentarer.
            </p>
          </div>
        </div>
        <div>
          <img src="/assets/yves.jpg" />
          <div className="myCarousel">
            <h3>Yves V.</h3>
            <h4>My Teacher</h4>
            <p>
              Mikolaj har en positiv tilgang til programmering og det er
              kendetegnende for ham at han først er tilfreds, når han har
              arbejdet sig frem til de mest effektive løsninger.
            </p>
          </div>
        </div>
      </Carousel>
    </CarouselWrapper>
  );
}
