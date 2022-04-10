const User = require("../models/users");

const existUserById = async (req, res, next) => {
  const { id } = req.params;
  let user = await User.findById(id);

  if (!user) {
    return res.status(401).json({
      ok: false,
      msg: "user not foud",
    });
  }

  req.user = user;
  next();
};

module.exports = {
  existUserById,
};
