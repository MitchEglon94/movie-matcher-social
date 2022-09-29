import mongoose from "mongoose";
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    likedMovies: [],
    likedTvShows: [],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

export default User;

// likedMovies: [
//   {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Movie",
//   },
// ],
