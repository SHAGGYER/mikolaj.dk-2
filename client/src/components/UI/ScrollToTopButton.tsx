import React, {useEffect, useState} from "react";
import styled, {keyframes, css} from "styled-components";

const UncoverFooter = keyframes`
  from {
    bottom: 1rem;
  }

  to {
    bottom: 5rem;
  }
`

const CoverFooter = keyframes`
  from {
    bottom: 5rem;
  }

  to {
    bottom: 1rem;
  }
`

const UncoverFooterMobile = keyframes`
  from {
    bottom: 1rem;
  }

  to {
    bottom: 7.25rem;
  }
`

const CoverFooterMobile = keyframes`
  from {
    bottom: 7.25rem;
  }

  to {
    bottom: 1rem;
  }
`

interface Interface {
    active: boolean;
    atBottom: boolean;
}

const Button = styled.button<Interface>`
  transition: opacity 1s linear;
  opacity: ${props => props.active ? 0.75 : 0};
  cursor: pointer;
  z-index: 9999;

  position: fixed;
  right: 30px;
  bottom: 1rem;
  height: 75px;
  width: 75px;
  border: none;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  text-align: center;

  & i {
    font-size: 2rem;
  }

  ${props => props.atBottom ? css`
    animation: ${UncoverFooter} linear forwards 0.5s;
  ` : css`
    animation: ${CoverFooter} linear forwards 0.5s;
  `};

  @media (max-width: 600px) {
    ${props => props.atBottom ? css`
      animation: ${UncoverFooterMobile} linear forwards 0.5s;
    ` : css`
      animation: ${CoverFooterMobile} linear forwards 0.5s;
    `};
  }
`

export default function ScrollToTopButton() {
    const [active, setActive] = useState(false)
    const [atBottom, setAtBottom] = useState(false)

    const scrollHandler = (event) => {
        const element = event.target;

        setActive(window.scrollY > 90);
        setAtBottom(window.scrollY + window.innerHeight >= document.body.offsetHeight - 50)
    }

    useEffect(() => {
        if (window) {
            window.addEventListener("scroll", scrollHandler)
        }

        return () => {
            window.removeEventListener("scroll", scrollHandler)
        }
    }, [])


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    return (
        <Button onClick={scrollToTop} atBottom={atBottom} active={active}>
            <i className="mdi mdi-arrow-up"/>
        </Button>
    )
}