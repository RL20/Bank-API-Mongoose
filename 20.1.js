const express = require("express");
require("./db/mongoose");
const Product = require("./models/products");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
 
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
 
});

app.get("/products/active", async (req, res) => {
  try {
    const activeProducts = await Product.find({ isActive: true });
    res.status(200).send(activeProducts);
  } catch (error) {
    res.status(500).send(error);
  
});

app.get("/products/range", async (req, res) => {
  const minValue = req.query.min;
  const maxValue = req.query.max;

  try {
    const rangeProducts = await Product.find({
      "details.price": { $gte: minValue, $lte: maxValue },
    });
    res.status(200).send(rangeProducts);
  } catch (error) {
    res.status(500).send(error);
  }


});

app.get("/products/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const pid = await Product.findById(_id);
    res.status(200).send(pid);
  } catch (error) {
    res.status(500).send(error);
  }
  
});
app.patch("/products/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ["name", "category", "isActive", "details.description", "details.price", "details.discount", "details.images", "details.phoneNumber", "dateAdded"];
  const isValidOperation = updates.every((item) => {
    return allowUpdates.includes(item);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      //if there is no user with this id
      res.status(404).send({ error: "no such product to update" });
    }
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.delete("/products", async (req, res) => {
  try {
    const products = await Product.deleteMany({});
    if (!products) {
      res.status(404).send({ error: "no products to delete" });
    }
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const productToDelete = await Product.findOneAndDelete(req.params.id);
    if (!productToDelete) {
      res.status(404).send({ error: "no such product to delete" });
    }
    res.status(200).send(productToDelete);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
