import authJwt from "../middlewares/authJwt.js";
import {
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
  updateUserLikedMovies,
  updateUserMovies,
  updateUserShows,
  searchUser,
} from "../controllers/user.controller.js";
const userRoute = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // app.get("/api/loggedin/update", [authJwt.verifyToken], userBoard);
  app.get("/api/test/all", allAccess);
  app.get(
    "/api/search/searchUser/:username",

    searchUser
  );
  app.post("/api/update/userMovies", [authJwt.verifyToken], updateUserMovies);
  app.post("/api/update/userShows", [authJwt.verifyToken], updateUserShows);
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    moderatorBoard
  );
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    adminBoard
  );
};

export default userRoute;
