// require the Express module
const express = require("express");
// creates an instance of an Express server
const app = express();
//converts params and body into usable JSON
app.use(express.json());
app.use(express.static("./public"));


const cartItems = require("./router");
app.use("/cart-items", cartItems);

// define the port
const port = 5000;
// run the server
app.listen(port, () => console.log(`Listening on port: ${port}.`));

