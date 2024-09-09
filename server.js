const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./utils/db");
const userRoute = require("./routes/userRoutes");
const companyRoute = require("./routes/companyRoutes");
const jobRoute = require("./routes/jobRoutes");

dotenv.config({});

const app = express();

app.get("/", (req, res) => {
  return res.send("Job Portal Backend");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// const PORT = process.env.PORT || 4000;
const PORT = 8000

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server running at port ${PORT}`);
});
