const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/ordersControllers");

router.post("/", createOrder);

module.exports = router;
