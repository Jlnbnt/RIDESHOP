const verifyJWT = require("../middleware/verifyJWT");

const verifyRole = (req, res, next) => {
  verifyJWT(req, res, () => {
    if (req.isAdmin) {
      next();
    } else {
      res.status(403).json("You dont have permission");
    }
  });
};
module.exports = verifyRole;
