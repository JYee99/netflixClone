import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import requests from "../api/requests";
import "./Banner.css";
import styled from "styled-components";

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    // 현재 상영중인 영화 정보들 가져오기
    const request = await axios.get(requests.fetchNowPlaying);

    // 여러 영화중 하나의 영화 ID를 가져오기
    const moiveId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;
    // 특정 영화의 상세한 정보 가져오기(비디오 포함)
    const result = await axios.get(`movie/${moiveId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(result.data);
    console.log(result.data);
  };
  const truncate = (str, num) => {
    return str?.length > num ? str.substr(0, num - 1) + "..." : str;
  };
  if (!isClicked) {
    return (
      <div
        className="banner"
        style={{
          backgroundImage: `url("https://media.themoviedb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.orginal_name}
          </h1>
          <div className="banner__buttons">
            <button
              className="banner__button play"
              onClick={() => setIsClicked(true)}
            >
              Play
            </button>
            <button className="banner__button info">
              <div className="space"></div>
              More Information
            </button>
          </div>
          <h1 className="banner__description">
            {truncate(movie?.overview, 100)}
          </h1>
        </div>
        <div className="banner--fadeBottom" />
      </div>
    );
  } else {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            title="YouTube video player"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.95;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
