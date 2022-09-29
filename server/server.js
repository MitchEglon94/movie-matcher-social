import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import dbConfig from "./app/config/db.config.js";
import authRoute from "./app/routes/auth.routes.js";
import userRoute from "./app/routes/user.routes.js";

const app = express();

let corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Role = db.role;
db.mongoose
  .connect(`mongodb://127.0.0.1:27017/movieMatcher`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// routes
authRoute(app);
userRoute(app);

app.get("/", (req, res) => {
  res.json({ message: "welcome to the app" });
});

app.listen(8080, () => {
  console.log(`server running on port 8080`);
});
