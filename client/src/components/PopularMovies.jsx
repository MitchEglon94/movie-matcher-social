import React, { useEffect, useState } from "react";
import { updateUserMovies } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import ScrollDialog from "./MovieModal";

export const updateUserMoviesDb = async (userInfo) => {
  // const userId = userInfo.id;
  // console.log(userInfo.accessToken);

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userInfo.accessToken,
      },
      body: JSON.stringify({ userInfo }),
    };

    const response = await fetch(
      `http://127.0.0.1:8080/api/update/userMovies`,
      options
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {}
};

function PopularMovies() {
  const dispatch = useDispatch();
  //   const MOVIE_ENDPOINT = process.env;
  const [movies, setMovies] = useState([]);
  const user = useSelector((store) => store.user.user);

  const getMovies = async () => {
    let rand = Math.floor(Math.random() * 10 + 1);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=4503e42f5762f850ada999d307bfc5f9&page=1`
      );
      const data = await response.json();
      console.log(data.results);
      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const clickHandler = (likedMovieId, currentUser) => {
    dispatch(updateUserMovies(likedMovieId));
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="featured-movie-section">
      <h2>Popular Movies</h2>
      <div className="movies-container">
        {movies &&
          movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt="movie poster"
              />
              <div className="movie-card-text-overlay">
                {/* <p>{movie.overview}</p> */}
                <h4>{movie.title}</h4>

                <div className="movie-card-overlay-btns">
                  <ScrollDialog item={movie} user={user} />
                  <div
                    onClick={() => {
                      updateUserMoviesDb(user);
                      clickHandler(String(movie.id), user);
                    }}
                  >
                    Like
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PopularMovies;
