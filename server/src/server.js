const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");

require("./auth/passport");

const PORT = process.env.PORT || 8080;

const app = express();

app.enable("trust proxy");
app.use(cookieParser());
dotenv.config();

app.use(express.static(path.join(__dirname, "../../build")));

const whitelist = [process.env.CLIENT_HOST];
const corsOptions = {
  origin: whitelist,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  cookieSession({
    key: "quiz-session",
    keys: ["key1", "key2"],
    maxAge: 3600000,
    httpOnly: false,
    // sameSite: "none",
    // domain: process.env.CLIENT_LOCAL_HOST,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const authRouter = require("./api/auth");
app.use("/auth/google", authRouter);

// app.get("/", (req, res, next) => {
//   try {
//     res.send("<h1>User Backend Home</h1>");
//   } catch (err) {
//     next(err);
//   }
// });

app.get("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../../build", "index.html"));
});

const checkUserLoggedIn = (req, res, next) => {
  req.user ? next() : res.status(401).send({ Error: "User is invalid" });
};

app.get("/profile", checkUserLoggedIn, (req, res, next) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    next(err);
  }
});

app.get("/logout", (req, res, next) => {
  try {
    req.session = null;
    req.logout();
    res
      .status(200)
      .cookie("userId", "", { expires: new Date() })
      .cookie("name", "", { expires: new Date() })
      .cookie("email", "", { expires: new Date() })
      .cookie("auth", false, { expires: new Date() })
      .redirect(process.env.CLIENT_HOST);
  } catch (err) {
    next(err);
  }
});

// app.get("/*", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "../../build", "index.html"));
// });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).send({
    Error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
