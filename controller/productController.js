const products = require("../models/productModel");
exports.addProductController = async (req, res) => {
  const { name, price, image, category } = req.body;
  console.log(name, price, category, image);
  const adminId = req.payload;
  const productImage = req.file.filename;
  try {
    const existingProduct = await products.findOne({ name, category });
    if (existingProduct) {
      res.status(406).json(`Product already exists`);
    } else {
      const newProduct = new products({
        name,
        price,
        category,
        image: productImage,
      });
      await newProduct.save();
      res.status(200).json(newProduct);
    }
  } catch (err) {
    res.status(401).json(`Unable to add product`);
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await products.find();
    if (allProducts) {
      res.status(200).json(allProducts);
    }
  } catch (err) {
    res.status(401).json("Something went wrong");
  }
};

exports.editProductController = async (req, res) => {
  const { name, price, image, category } = req.body;
  console.log(name, price, category, image);
  const adminId = req.payload;
  const { id } = req.params;
  console.log(id);
  try {
    const existingProduct = await products.findOne({ _id: id });
    if (existingProduct) {
      const productImage = req.file ? req.file.filename : existingProduct.image;
      const updatedProduct = await products.findByIdAndUpdate(
        { _id: id },
        {
          name,
          price,
          image: productImage,
          category,
        },
        {
          new: true,
        }
      );
      await updatedProduct.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(406).json(`Something went wrong`);
    }
  } catch (err) {
    res.status(401).json(`Unable to update product ${err}`);
  }
};

exports.deleteProductController = async (req, res) => {
  const { id } = req.params;
  try {
    const existingProduct = products.findOne({ _id: id });
    if (existingProduct) {
      await products.findByIdAndDelete({ _id: id });
      res.status(200).json("Product Deleted Succesfully");
    } else {
      res.status(406).json(`Something went wrong.`);
    }
  } catch (err) {
    res.status(401).json(`Something went wrong.`);
  }
};
exports.productCategoryController = async (req, res) => {
  const selectedCategory = req.query.category;

  try {
    const query = {
      category: { $regex: selectedCategory, $options: "i" },
    };
    const categoryProducts = await products.find(query);
    res.status(200).json(categoryProducts);
  } catch (err) {
    res.status(401).json(`Something went wrong! ${err}`);
  }
};
exports.productSearchController = async (req, res) => {
  const productName = req.query.name;
  try {
    const query = {
      name: { $regex: productName, $options: "i" },
    };
    const searchedProduct = await products.find(query);
    res.status(200).json(searchedProduct);
  } catch (err) {
    res.status(401).json(`Something went wrong! ${err}`);
  }
};
exports.trendingProductController = async (req, res) => {
  try {
    const trendingProducts = await products.find().sort({ _id: -1 }).limit(8);
    res.status(200).json(trendingProducts);
  } catch (err) {
    res.status(401).json(`Something went wrong! ${err}`);
  }
};
