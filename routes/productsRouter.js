const express = require("express");
const router = express.Router();
const { subirArchivo } = require("../helpers/subiendoArchivos");
const { validarJWT } = require("../middlewares/validar-jwt");

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  createProduct,
  updateProduct,
  getProducts,
  detailedProduct,
  deleteProduct,
} = require("../controllers/productsController");

router.get("/", getProducts);
router.get(
  "/:id",
  [check("id", "id is required to be a valid id").isMongoId(), validarCampos],
  detailedProduct
);
router.delete(
  "/:id",
  validarJWT,
  [check("id", "id is required to be a valid id").isMongoId(), validarCampos],
  deleteProduct
);
router.post("/", subirArchivo, validarJWT, createProduct);
router.put(
  "/:id",
  subirArchivo,
  validarJWT,
  [check("id", "id is required to be a valid id").isMongoId(), validarCampos],
  updateProduct
);

module.exports = router;
