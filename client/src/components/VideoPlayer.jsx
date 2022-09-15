import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Player = styled.div`
  position: relative;
  display: flex;

  & .controls {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    & .volume-slider {
      display: none;
      position: absolute;
      bottom: 20px;
      right: 5px;
      height: 100px;
      width: 20px;
      background-color: #ccc;

      & aside {
        background-color: var(--secondary);
        position: absolute;
        bottom: 0;
        width: 100%;
        pointer-events: none;
      }
    }
  }

  & video {
    width: 100%;
  }

  & .play {
    display: none;
    border: none;
    background-color: var(--secondary);
    padding: 1rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin-bottom: 0.25rem;
    color: white;
    outline: none;
  }

  &:hover .play {
    display: block;
  }

  & .progress {
    width: 100%;
    background-color: #ccc;

    & aside {
      height: 5px;
      background-color: var(--secondary);
      width: ${(props) => (props.progress ? props.progress + "%" : "0")};
    }
  }

  &:hover .progress aside {
    height: 20px;
  }

  &:hover .controls .volume-slider {
    display: block;
  }
`;

export default function VideoPlayer({ path }) {
  const [isPlaying, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    const player = document.getElementById("player");
    player.addEventListener("play", handlePlay);
    player.addEventListener("pause", handlePause);
    player.addEventListener("timeupdate", handleProgress);

    const progressBar = document.getElementById("progress-bar");
    progressBar.addEventListener("click", handleScrub);

    const volumeSlider = document.getElementById("volume-slider", false);
    volumeSlider.addEventListener("click", handleVolume);
  }, []);

  function handlePlay() {
    setPlaying(true);
  }

  function handlePause() {
    setPlaying(false);
  }

  function handleProgress() {
    if (this.currentTime) {
      const _progress = (this.currentTime / this.duration) * 100;
      setProgress(_progress);
    }
  }

  function handleScrub(event) {
    const progressBar = document.getElementById("progress-bar");
    const player = document.getElementById("player");
    const scrubTime =
      (event.offsetX / progressBar.offsetWidth) * player.duration;
    player.currentTime = scrubTime;
  }

  function handleVolume(event) {
    const player = document.getElementById("player");

    const _volume = 1 - event.offsetY / this.offsetHeight;
    const height = (1 - event.offsetY / this.offsetHeight) * 100;
    player.volume = _volume;
    setVolume(height);
  }

  function play() {
    const player = document.getElementById("player");
    player.play();
  }

  function pause() {
    const player = document.getElementById("player");
    player.pause();
  }

  return (
    <Player>
      <video id="player" autoPlay src={path} />
      <button className="play" onClick={() => (!isPlaying ? play() : pause())}>
        {isPlaying ? (
          <i className="fas fa-pause"></i>
        ) : (
          <i className="fas fa-play"></i>
        )}
      </button>

      <div className="controls">
        <div id="volume-slider" className="volume-slider">
          <aside id="volume-aside" style={{ height: `${volume}%` }}></aside>
        </div>
        <article id="progress-bar" className="progress">
          <aside style={{ width: `${progress}%` }}></aside>
        </article>
      </div>
    </Player>
  );
}
