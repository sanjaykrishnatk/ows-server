const express = require("express");
const userController = require("./controller/userController");
const adminController = require("./controller/adminController");
const productController = require("./controller/productController");
const orderController = require("./controller/orderController");
const jwt = require("./middleware/jwtMiddleware");
const multerConfig = require("./middleware/multerMiddleware");
const adminJwt = require("./middleware/adminJwtMiddleware");
const router = new express.Router();

router.post("/register", userController.registerController);
router.post("/login", userController.loginController);
router.post("/ageverification", userController.ageController);
router.post("/adminlogin", adminController.loginController);
router.post(
  "/addproduct",
  adminJwt,
  multerConfig.single("image"),
  productController.addProductController
);
router.get("/allproducts", productController.getAllProducts);
router.post(
  "/editproduct/:id",
  adminJwt,
  multerConfig.single("image"),
  productController.editProductController
);
router.delete(
  "/deleteproduct/:id",
  adminJwt,
  productController.deleteProductController
);
router.post("/address/:id", jwt, userController.addressController);
router.post("/order", jwt, orderController.orderPlacementController);
router.get("/order/:id", jwt, orderController.fetchOrderController);
router.post(
  "/updateorder/:id",
  adminJwt,
  orderController.updateOrderController
);
router.get("/allorder", adminJwt, orderController.allOrdersController);
router.get("/allusers", adminJwt, userController.getAllUserController);
router.get("/productcategory", productController.productCategoryController);
router.get("/productsearch", productController.productSearchController);
router.get("/trendingproduct", productController.trendingProductController);
module.exports = router;
