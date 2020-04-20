const companyRouter = require("express").Router();
let Company = require("../models/Company.model");
const Product = require("../models/Product.model");
companyRouter.route("/").get((req, res) => {
  Company.find()
    .then((items) => {
      res.json(items);
    })
    .catch((err) => res.status(400).json("Error" + err));
});

companyRouter.route("/addCompany").post((req, res) => {
  console.log(req.body);
  const companyName = req.body.companyName;
  const gst = req.body.gst;
  Company.find({ companyName: companyName })
    .then((company) => {
      if (company.length) {
        res.status(400).send({ error: "Already Exists" });
      } else {
        const company = new Company({
          companyName,
          gst,
        });
        company
          .save()
          .then((reg) => {
            res.json(company);
          })
          .catch((err) => {
            res.status(400).send("Failed to store to database");
          });
      }
    })
    .catch((error) => {
      console.log(error);
      console.log("Server error");
      res.send("Server error");
    });
});

companyRouter.route("/addProduct").post((req, res) => {
  const companyName = req.body.companyName;
  const productName = req.body.productName;
  const cost = req.body.cost;

  Product.find({ productName: productName })
    .then((response) => {
      if (response.length) {
        res.status(400).send({ error: "Already Exists" });
      } else {
        const productDetails = new Product({
          companyName,
          productName,
          cost,
        });
        productDetails
          .save()
          .then((result) => {
            res.json(productDetails);
          })
          .catch((err) => {
            console.log(err);
            res.send("Failed to store to database");
          });
      }
    })
    .catch((error) => {
      console.log(error);
      console.log("Server error");
      res.send("Server error");
    });
});

companyRouter.route("/products").post((req, res) => {
  const companyName = req.body.companyName;
  Product.find({ companyName: companyName })
    .then((comProducts) => {
      res.json(comProducts);
    })
    .catch((err) => res.status(400).json("Error" + err));
});

module.exports = companyRouter;
