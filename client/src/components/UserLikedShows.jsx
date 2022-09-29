import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { removeUserShow } from "../features/user/userSlice";

export const updateUserShowsDb = async (userInfo) => {
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
      `http://127.0.0.1:8080/api/update/userShows`,
      options
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {}
};

function UserLikedShows() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const showIdArray = user.likedTvShows;
  const params = useParams();
  const userId = params.id;
  //   console.log(user);
  const [userShowinfoArray, setUserShowinfoArray] = useState([]);
  const getLikedMoviesCall = async (showIdArray) => {
    const array = [];
    await Promise.all(
      showIdArray.map(async (id) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=4503e42f5762f850ada999d307bfc5f9&language=en-US`
        );
        const data = await response.json();
        array.push(data);
      })
    );
    setUserShowinfoArray(array);
  };

  const clickHandler = (likedShowId) => {
    dispatch(removeUserShow(String(likedShowId)));
  };

  useEffect(() => {
    getLikedMoviesCall(showIdArray);
    updateUserShowsDb(user);
  }, [user]);

  return (
    <div>
      <h3 className="container-title">{user.username}s liked shows</h3>
      <div className="movies-container">
        {userShowinfoArray.length > -1 &&
          userShowinfoArray.map((show) => (
            <div className="movie-card" key={show.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                alt="movie poster"
              />
              <div className="movie-card-text-overlay">
                {/* <p>{movie.overview}</p> */}
                <h4>{show.name}</h4>

                <button
                  onClick={() => {
                    clickHandler(show.id);
                  }}
                >
                  Remove
                </button>

                {/* <div className="movie-card-overlay-btns">
                <div>More</div>
                <div
                  onClick={() => {
                    updateUserMoviesDb(user);
                    clickHandler(String(movie.id), user);
                  }}
                >
                  Like
                </div>
              </div> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserLikedShows;
