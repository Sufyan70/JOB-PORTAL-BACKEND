const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDb = require("./utils/db");
const userRoute  = require  ( "./routes/userRoutes")
dotenv.config({});

const app = express();

app.get("/", (req, res) => {
  return res.send("Job Portal Backend");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 4000;


app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server running at port ${PORT}`);
});
