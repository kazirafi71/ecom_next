const {
  register__Controller,
  login__Controller,
  verifyAccount__Controller,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register__Controller);
router.post("/login", login__Controller);
router.get("/verify-account/:email", verifyAccount__Controller);

module.exports = router;
