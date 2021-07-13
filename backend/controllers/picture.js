const path = require("path");
const fs = require("fs");

const Product = require("../models/picture");

exports.createProduct = (req, res, next) => {
  const { title, price } = req.body;
  let imgPath = "";
  let imgMimetype = "";
  if (req.file) {
    imgPath = req.file.path.replace(/\\/g, "/");
    imgMimetype = req.file.mimetype;
  }
  const product = new Product({
    title: title,
    price: price,
    image_path: imgPath,
    image_mimetype: imgMimetype,
  });
  product
    .save()
    .then((result) => {
      //console.log('all data: ', result)
      res.status(200).json({ message: "data added..", product: result });
    })
    .catch((err) => console.log('add error? ',err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((prods) => {
      // console.log('products: ',prods);
      res.json({ message: "fetch all product", products: prods });
    })
    .catch((err) => {
      console.log('get error? ',err);
    });
};

exports.updateProducts = (req, res, next) => {
  const pId = req.params.pId;
  const { title, price } = req.body;
  let image_path = req.body.image_path;
  let image_mimetype = req.body.image_mimetype;
  if (req.file) {
    image_path = req.file.path.replace(/\\/g, "/");
    image_mimetype = req.file.mimetype;
  }
  Product.findById(pId)
    .then((prod) => {
      prod.title = title;
      prod.price = price;
      prod.image_path = image_path;
      prod.image_mimetype = image_mimetype;
      return prod.save();
    })
    .then((result) => {
      res.json({ message: "product updated..", products: result });
    })
    .catch((err) => console.log(err));
};

exports.deleteProducts = (req, res, next) => {
  const pId = req.params.id;
  Product.findById(pId)
    .then((prod) => {
      clearImage(prod.image_path);
      return Product.findByIdAndDelete(pId);
    })
    .then((result) => {
      res.json({ message: "Product is deleted!" });
    })
    .catch((err) => console.log(err));
};

const clearImage = (ImgPath) => {
  ImgPath = path.join(__dirname, "..", ImgPath);
  fs.unlink(ImgPath, (err) => {
    console.log('delete done! ',err);
  });
};

exports.getImageDownload = (req, res, next) => {
  Product.findById(req.params.id)
    .then((prod) => {
      res.set({ "Content-Type": prod.image_mimetype }); // mimetype = image/png, image/jpeg, image/jpg
      res.sendFile(path.join(__dirname, "..", prod.image_path));
    })
    .catch((err) => console.log('dwon error? ',err));
};
