import mongoose from "mongoose";
import user from "./user.model.js";
import role from "./role.model.js";
// import movie from "./movie.model.js";

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = user;
db.role = role;
// db.movies = movie;
db.ROLES = ["user", "admin", "moderator"];

export default db;
