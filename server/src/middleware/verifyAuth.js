import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(createHttpError(401, "You are unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(createHttpError(403, "Broken or invalid token"));
    }
    req.user = user;
    next()
  });
};

export default verifyToken;
