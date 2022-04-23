const {
  getAllProducts__controller,
  addProduct__controller,
  productDetails__controller,
} = require("../controllers/productControllers");
const { requiredLogin } = require("../middleware/requiredLogin");
const upload = require("../middleware/multer");

const router = require("express").Router();

router.get("/all-products", getAllProducts__controller);

router.get("/products/:productId", productDetails__controller);

router.post(
  "/add-product",
  requiredLogin,
  upload.single("productImg"),
  addProduct__controller
);

module.exports = router;
