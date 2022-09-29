import config from "../config/auth.config.js";
import db from "../models/index.js";
import mongoose from "mongoose";
const User = db.user;

export const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
export const userBoard = (req, res) => {
  console.log(req.body);
  res.status(200).send("User Content.");
};
export const adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
export const moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

export const updateUserLikedMovies = (req, res) => {
  res.status(200).send("user updated");
};

export const updateUserMovies = (req, res) => {
  // console.log("requsest body", req.body.userInfo.id);
  // const movies = req.body;
  const id = mongoose.Types.ObjectId(req.body.userInfo.id);
  User.findByIdAndUpdate(
    { _id: id },
    { $set: { likedMovies: req.body.userInfo.likedMovies } },
    { new: true }
  ).exec();
};

// ONGOING TO PASS SEARCHED USER TO CLIENT SIDE

export const searchUser = async (req, res) => {
  const { username } = req.params;
  console.log(username);
  const foundUser = await User.findOne({ username: username }).exec();
  let userLikedInfo = null;
  if (foundUser) {
    userLikedInfo = {
      movies: foundUser.likedMovies,
      shows: foundUser.likedTvShows,
    };
    res.send(userLikedInfo);
  } else {
    res.send("user does not exist");
  }
  // const userLikedInfo = [foundUser, likedMovies, foundUser.likedTvShows];
};

// ((err, user) => {
//   if (err) {
//     res.status(500).send({ message: err });
//     return;
//   }
//   if (!user) {
//     return res.status(404).send({ message: "User not found" });
//   }

//   res.status(200).send(user);
// });

export const updateUserShows = (req, res) => {
  // console.log("requsest body", req.body.userInfo.id);
  // const movies = req.body;
  const id = mongoose.Types.ObjectId(req.body.userInfo.id);
  User.findByIdAndUpdate(
    { _id: id },
    { $set: { likedTvShows: req.body.userInfo.likedTvShows } },
    { new: true }
  ).exec();
};
