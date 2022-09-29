import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function Search() {
  const [searchedUserMovies, setSearchedUserMovies] = useState([]);
  const [searchedUserShows, setSearchedUserShows] = useState([]);
  const [userMovieinfoArray, setUserMovieinfoArray] = useState([]);
  const [userShowinfoArray, setUserShowinfoArray] = useState([]);
  console.log(userMovieinfoArray);
  const user = useSelector((store) => store.user.user);
  // console.log(user.likedMovies.indexOf("985939"));
  const [searchTerm, setSearchTerm] = useState("");

  const clickHandler = async (user, searchedUser) => {
    // console.log(user.accessToken);
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.accessToken,
        },
      };
      const response = await fetch(
        `http://127.0.0.1:8080/api/search/searchUser/${searchedUser}`
      );
      const data = await response.json();
      // console.log(data);
      setSearchedUserMovies(data.movies);
      setSearchedUserShows(data.shows);
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getLikedShowsCall = async (showIdArray) => {
    if (!showIdArray) {
      console.log("user does not exist");
    }
    const array = [];
    await Promise.all(
      showIdArray.map(async (id) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=4503e42f5762f850ada999d307bfc5f9&language=en-US`
        );
        const data = await response.json();
        // console.log(data);
        array.push(data);
        // console.log(array);
      })
    );
    setUserShowinfoArray(array);
  };

  const getLikedMoviesCall = async (movieIdArray) => {
    if (movieIdArray === null) {
      console.log("user does not exist");
    }
    const array = [];
    await Promise.all(
      movieIdArray.map(async (id) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=4503e42f5762f850ada999d307bfc5f9&language=en-US`
        );
        const data = await response.json();
        // console.log(data);

        array.push(data);
      })
    );
    setUserMovieinfoArray(array);
  };

  useEffect(() => {
    const newMoviesArray = searchedUserMovies.filter((movie) =>
      user.likedMovies.includes(movie)
    );
    // console.log(newMoviesArray);
    const newShowsArray = searchedUserShows.filter((show) =>
      user.likedTvShows.includes(show)
    );
    // console.log(newShowsArray);
    getLikedMoviesCall(newMoviesArray);
    getLikedShowsCall(newShowsArray);
  }, [searchedUserMovies, searchedUserShows]);

  return (
    <div>
      <input
        placeholder="Find a user"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          // console.log(searchTerm);
        }}
      />
      <button onClick={() => clickHandler(user, searchTerm)}>Search</button>
      <div className="movies-container">
        {userMovieinfoArray.length === 0 && (
          <p>Any matched movies you have will appear here</p>
        )}
        {userMovieinfoArray.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="movie poster"
            />
            <div className="movie-card-text-overlay">
              <h4>{movie.title}</h4>
            </div>
          </div>
        ))}
      </div>
      <div className="movies-container">
        {userShowinfoArray.length === 0 && (
          <p>Any matched shows you have will appear here</p>
        )}
        {userShowinfoArray.map((show) => (
          // <div key={show}>{show.name}</div>
          <div className="movie-card" key={show.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
              alt="movie poster"
            />
            <div className="movie-card-text-overlay">
              <h4>{show.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
