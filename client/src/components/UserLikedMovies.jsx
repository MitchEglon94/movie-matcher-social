import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { removeUserMovie } from "../features/user/userSlice";

export const updateUserMoviesDb = async (userInfo) => {
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
  } catch (err) {
    console.log(err);
  }
};

function UserLikedMovies() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const movieIdArray = user.likedMovies;
  const params = useParams();
  const userId = params.id;
  //   console.log(user);
  const [userMovieinfoArray, setUserMovieinfoArray] = useState([]);
  const getLikedMoviesCall = async (movieIdArray) => {
    const array = [];
    await Promise.all(
      movieIdArray.map(async (id) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=4503e42f5762f850ada999d307bfc5f9&language=en-US`
        );
        const data = await response.json();
        array.push(data);
      })
    );
    setUserMovieinfoArray(array);
  };

  const clickHandler = (likedMovieId) => {
    dispatch(removeUserMovie(String(likedMovieId)));
  };

  useEffect(() => {
    getLikedMoviesCall(movieIdArray);
    updateUserMoviesDb(user);
  }, [user]);

  return (
    <div>
      <h3 className="container-title">{user.username}s liked movies</h3>
      <div className="movies-container">
        {userMovieinfoArray.length > -1 &&
          userMovieinfoArray.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="movie poster"
              />
              <div className="movie-card-text-overlay">
                <h4>{movie.title}</h4>
                <button
                  onClick={() => {
                    clickHandler(movie.id);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserLikedMovies;
