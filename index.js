const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const port = process.env.PORT;

const { dbConnection } = require("./DB/config");

const app = express();

dbConnection();

app.use(cors());

app.use(express.static("uploads"));

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/api/posts", require("./routes/posts"));
app.use("/api/users", require("./routes/usersRouter"));
app.use("/api/products", require("./routes/productsRouter"));
app.use("/api/orders", require("./routes/ordersRouter"));

app.listen(port, () => {
  console.log(`servidor corriendo en el puerto ${port}`);
});
