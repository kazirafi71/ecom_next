const User = require("../model/UserModel");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

module.exports = {
  requiredLogin(req, res, next) {
    let { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        error: "You must be logged in",
      });
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        return res.status(404).json({
          error: "Invalid credentials",
        });
      }

      let { _id } = payload;
      User.findOne({ _id: _id })
        .then((userData) => {
          if (!userData) {
            return res.status(404).json({
              error: "Invalid credentials",
            });
          }
          req.user = userData;
          next();
        })
        .catch((err) => {
          return res.status(404).json({
            error: "Invalid credentials",
          });
        });
    });
  },
};
