const express = require("express");

const productsController = require("../controllers/picture");
const fileUpload = require("../middleware/imageUrl");

const router = express.Router();

router.get("/store", productsController.getProducts);

router.post(
  "/store",
  fileUpload.single("image_path"),
  productsController.createProduct
);

router.patch(
  "/store/:pId",
  fileUpload.single("image_path"),
  productsController.updateProducts
);

router.delete("/store/:id", productsController.deleteProducts);

router.get("/download/:id", productsController.getImageDownload);

module.exports = router;
