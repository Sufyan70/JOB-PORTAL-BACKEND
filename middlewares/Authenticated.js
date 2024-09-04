const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send({
        message: "User not Authenticated",
        success: false,
      });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).send({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Server error in Authentication",
      success: false,
    });
  }
};

module.exports = isAuthenticated
