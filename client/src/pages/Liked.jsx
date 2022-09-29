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

import React, { useEffect } from "react";
import UserLikedMovies from "../components/UserLikedMovies";
import UserLikedShows from "../components/UserLikedShows";
import { updateUserMoviesDb } from "../components/FeaturedMovies";
import { updateUserShowsDb } from "../components/FeaturedSeries";
import { useSelector, useDispatch } from "react-redux";

function Liked() {
  const user = useSelector((store) => store.user.user);
  useEffect(() => {
    updateUserMoviesDb(user);
    updateUserShowsDb(user);
  }, []);

  return (
    <div>
      <UserLikedMovies />
      <UserLikedShows />
    </div>
  );
}

export default Liked;
