const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const {
  validarCampos: validateFields,
} = require("../middlewares/validar-campos");

const { existEmail, existUserById } = require("../helpers/db-validators");
const { createUser, login } = require("../controllers/userControllers");

router.post(
  "/new",
  [
    check("email", "email is required").isEmail(),
    check("password", "password must have more than 5 characters").isLength({
      min: 5,
    }),
    check("email").custom(existEmail),
    validateFields,
  ],
  createUser
);

router.post("/login", login);

module.exports = router;
