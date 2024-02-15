const { cloudinary } = require("../Config/cloudineryConfig");
const productModel = require("../Models/productModel");

const createProduct = async (req, res) => {
  const {
    ProductName,
    ProductDescription,
    ProductPrice,
    ProductCategory,
    ProductImage,
  } = req.body;

  if (
    !ProductName ||
    !ProductDescription ||
    !ProductPrice ||
    !ProductImage ||
    !ProductCategory
  ) {
    res.status(400).send({ mesage: "All fields are required" });
  } else {
    try {
      const imageUpload = await cloudinary.uploader.upload(ProductImage, {
        folder: "productImages",
      });

      const productLink = imageUpload.secure_url;
      console.log("product Link :", productLink);
      const createProduct = await productModel.create({
        ProductName,
        ProductDescription,
        ProductPrice,
        ProductImage: productLink,
        ProductCategory,
      });
      if (createProduct) {
        res
          .status(200)
          .send({ message: "Product created Successfully", status: true });
      } else {
        res.status(400).send({ message: "Unable to post product" });
      }
    } catch (error) {
      res.status(400).send({ message: "Server error", error });
    }
  }
};

module.exports = { createProduct };
