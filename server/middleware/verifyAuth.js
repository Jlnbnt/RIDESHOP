const verifyJWT = require("../middleware/verifyJWT");

const verifyAuth = (req, res, next) => {
  verifyJWT(req, res, () => {
    if (req.id === req.params.id || req.isAdmin) {
      next();
    } else {
      res.status(403).json("You dont have permission");
    }
  });
};
module.exports = verifyAuth;
