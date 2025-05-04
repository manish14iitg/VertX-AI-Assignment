const express = require("express");
const { protect } = require("../middlewares/protect");
const { signup, login, getUserInfo, getUsers } = require("../controllers/authController");
const router = express.Router();
// const { register, login, getMe } = require("../controllers/authController");
// const { protect } = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", protect, getUserInfo);
router.get("/users", protect, getUsers);

module.exports = router;
