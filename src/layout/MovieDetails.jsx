import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Preloader } from "../components/preloader";

export function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=af5717ed&i=${id}`)
      .then((responce) => responce.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Movie not found");
          navigate("/", { replace: true });
        }
        setloading(false);
      });
  }, [id, navigate]);
  if (loading) {
    return <Preloader />;
  }
  if (error)
    return (
      <div className="center red-text">
        <h5>{error}</h5>
        <button
          className="btn waves-effect waves-light blue"
          onClick={() => navigate("/")}
        >
          Go Back Home
        </button>
      </div>
    );
  if (!movie) {
    return null;
  }
  return (
    <div className="section">
      <button
        className="btn waves-effect waves-light blue"
        onClick={() => navigate(-1)}
      >
        <i className="material-icons left">arrow_back</i> Back
      </button>
      <div className="row">
        <div className="col s12 m4">
          <div className="card">
            <div className="card-image">
              <img
                src={
                  movie.Poster && movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450"
                }
                alt={movie.Title || "MoviePoster"}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x450?text=Poster+Error";
                }}
              />
            </div>
          </div>
        </div>
        <div className="col s12 m8">
          <div className="card-panel">
            <h4>
              {movie.Title || "No title"}({movie.Year || "Unknow year"})
            </h4>
            <div className="divider"></div>
            <div className="section">
              {movie.Rated && (
                <p>
                  <strong>Rated:</strong>
                  {movie.Rated}
                </p>
              )}
              {movie.Rated && (
                <p>
                  <strong>Runtime:</strong>
                  {movie.Rated}
                </p>
              )}
              {movie.Rated && (
                <p>
                  <strong>Genre:</strong>
                  {movie.Rated}
                </p>
              )}
              {movie.Rated && (
                <p>
                  <strong>Released:</strong>
                  {movie.Rated}
                </p>
              )}
            </div>
            <div className="divider"></div>
            {movie.Plot && (
              <>
                <div className="section">
                  <h5>Plot</h5>
                  <p>{movie.Plot}</p>
                </div>
                <div className="divider"></div>
              </>
            )}
            <div className="section">
              <h5>Ratings</h5>
              <ul className="collection">
                {movie.Ratings?.map((rating, index) => {
                  <li key={index} className="collection-item">
                    <strong>{rating.Source}:</strong>
                    {rating.Value}
                  </li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
