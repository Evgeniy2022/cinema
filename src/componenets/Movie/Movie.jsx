import { useState } from "react";

import "./Movie.css";

import { Card, Rate, Typography } from "antd";
import { Ganres } from "../../genreContext";
import { guestSessionAddRate } from "../../api/api";

const { Paragraph } = Typography;

const cardDescStyle = {
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  overflow: "hidden",
};

export function Movie({ movie }) {
  const [starsValue, setStarsValue] = useState(movie.rating || 0);

  const imageUrlStyle = movie.backdrop_path
    ? {
        backgroundImage: `url("https://image.tmdb.org/t/p/w500${movie.backdrop_path}")`,
      }
    : { backgroundImage: 'url("/public/default-image.webp")' };

  function rateHandler(rate) {
    setStarsValue(rate);
    guestSessionAddRate(movie.id, rate);
  }

  return (
    <Card
      className="card-style"
      styles={{
        body: {
          display: "grid",
          gridTemplateColumns: "0 40% 60% 0",
          maxHeight: "310px",
          minHeight: "310px",
          padding: "0",
          borderRadius: "0",
        },
      }}
    >
      <div style={{ ...cardDescStyle, ...imageUrlStyle }}></div>
      <div className="movie">
        <div>
          <div className="estimate">
            <div className="estimate-number">
              {Math.round(movie.vote_average * 10) / 10}
            </div>
          </div>
          <h1 className="movie__title">{movie.title}</h1>
          <div className="movie__release">
            {movie.release_date ? movie.release_date : "NEW"}
          </div>
          <div className="movie__genre">
            <Ganres ids={movie.genre_ids} />
          </div>
          <div className="movie__description">
            <Paragraph
              ellipsis={{
                rows: 5,
                expandable: "collapsible",
              }}
              title={`${movie.overview}`}
            >
              {movie.overview ? movie.overview : "Описание фильма отсутствует!"}
            </Paragraph>
          </div>
        </div>
        <Rate
          style={{ marginBottom: "10px", fontSize: "16px" }}
          count={10}
          onChange={rateHandler}
          value={starsValue}
          allowHalf
        />
      </div>
    </Card>
  );
}
