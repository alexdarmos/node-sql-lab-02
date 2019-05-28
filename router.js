//import express
const express = require("express");
//add router for students - splits routes into separate modules
const cartItems = express.Router();

// const items = require(`./cartData`);

const pg = require("pg");
const pool = new pg.Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "ExpressShopDB",
  ssl: false
});

cartItems.get("/", (req, res) => {
    pool.query("SELECT * FROM ShoppingCart;")
    .then ( (results) => {
        res.send(results.rows);
    })
    .catch ( (err) => {
        res.send(err);
    })
});

cartItems.post("/", (req, res) => {
    let data = req.body;
    pool.query("INSERT INTO ShoppingCart (product, price, quantity, image) values($1::text, $2::float, $3::int, $4::text)",[data.product, data.price, data.quantity, data.image])
    .then( () => {
        res.status(201);
        res.send(data.body);
    })
});

// accept PUT request at URI: /students
cartItems.put("/:id", (req, res) => {
    pool.query("UPDATE ShoppingCart SET quantity=$1::int WHERE id=$2::int", [req.body.quantity, req.body.id])
    .then( () => {
        res.send("Cart Item Updated!");
    })
    .catch( (err) => {
        res.send(err);
    })
});
// accept DELETE request at URI: /students
cartItems.delete("/:id", (req, res) => {
    pool.query("DELETE FROM ShoppingCart WHERE id=$1::int", [req.params.id])
    .then( () => {
        res.status(201);
        res.send("Cart Item Deleted!");
    })
});

module.exports = cartItems;