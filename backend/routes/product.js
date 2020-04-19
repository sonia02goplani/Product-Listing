const productRouter = require("express").Router();
const Product = require("../models/Product.model");
const Order = require("../models/Order.model");
productRouter.route("/").get((req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => res.status(400).json("Error" + err));
});
productRouter.route("/placeorder").post((req, res) => {
  const companyName = req.body.companyName;
  const productName = req.body.productName;
  const rate = req.body.rate;
  const quantity = req.body.quantity;
  const totalPrice = req.body.totalPrice;
  const orderNo = req.body.orderNo;
  const order = new Order({
    companyName,
    productName,
    orderNo,
    rate,
    quantity,
    totalPrice,
  });
  order
    .save()
    .then((order) => {
      res.json(order);
    })
    .catch((err) => res.status(400).json("Error" + err));
});

productRouter.route("/orders").get((req, res) => {
  Order.find()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => res.status(400).json("Error" + err));
});
module.exports = productRouter;
