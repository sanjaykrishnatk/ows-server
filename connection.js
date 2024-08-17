const mongoose = require("mongoose");

const connectionString = process.env.DATABASE;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log(`MongoDB connected succesfully`);
  })
  .catch((err) => {
    console.log(`Connection failed due to ${err}`);
  });
