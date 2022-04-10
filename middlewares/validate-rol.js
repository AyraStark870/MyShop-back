const validateRol = (req, res, next) => {
  if (req.role !== "administrator") {
    return res.status(401).json({
      ok: false,
      msg: "unauthorized",
    });
  }
  next();
};
module.exports = {
  validateRol,
};
