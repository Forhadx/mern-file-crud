const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: { type: String, require: true },
    price: { type: String, require: true },
    image_path: { type: String, require: true },
    image_mimetype: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", productSchema);
