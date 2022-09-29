// Copyright 2022 mitchelleglon
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import React, { useEffect, useState } from "react";
import { updateUserShows } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import ScrollDialog from "./ShowModal";

export const updateUserShowsDb = async (userInfo) => {
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
      `http://127.0.0.1:8080/api/update/userShows`,
      options
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {}
};

function FeaturedSeries() {
  const dispatch = useDispatch();
  const TV_ENDPOINT = process.env.TV_ENDPOINT;
  const [series, setSeries] = useState([]);
  const user = useSelector((store) => store.user.user);

  const getSeries = async () => {
    let rand = Math.floor(Math.random() * 10 + 1);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=4503e42f5762f850ada999d307bfc5f9&page=${rand}`
      );
      const data = await response.json();
      console.log(data.page);
      console.log(data.results);
      setSeries(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const clickHandler = (likedShowId, currentUser) => {
    dispatch(updateUserShows(likedShowId));
  };

  useEffect(() => {
    getSeries();
  }, []);

  return (
    <div className="featured-movie-section">
      <h2>Featured TV Shows</h2>
      <div className="movies-container">
        {series &&
          series.map((show) => (
            <div className="movie-card" key={show.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${show.poster_path}`}
                alt="movie poster"
              />
              <div className="movie-card-text-overlay">
                {/* <p>{movie.overview}</p> */}
                <h4>{show.name}</h4>

                <div className="movie-card-overlay-btns">
                  <ScrollDialog item={show} user={user} />
                  <div
                    onClick={() => {
                      updateUserShowsDb(user);
                      clickHandler(String(show.id), user);
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

export default FeaturedSeries;
