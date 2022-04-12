const express = require("express");
const router = express.Router();
const {
  createOrder,
  ordersByUserId,
} = require("../controllers/ordersControllers");

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.post(
  "/",
  validarJWT,
  [check("userAddress", "address is required!").not().isEmpty(), validarCampos],
  createOrder
);
router.get(
  "/:userId",
  validarJWT,
  [
    check("userId", "id is required to be a valid id").isMongoId(),
    validarCampos,
  ],
  ordersByUserId
);

module.exports = router;
