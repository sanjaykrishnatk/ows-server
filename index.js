require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./routes");
const mainServer = express();
mainServer.use(cors());
mainServer.use(express.json());
mainServer.use(router);
require("./connection");
mainServer.use("/uploads", express.static("./uploads"));
const PORT = 4000 || process.env.PORT;
mainServer.listen(PORT, () => {
  console.log(`server running successfully at port ${PORT}`);
});
