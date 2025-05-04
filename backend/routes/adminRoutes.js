const express = require("express");
const router = express.Router();
const {
  getAnalytics,
  getActivities,
  getUsers,
  
  updateCredits,
} = require("../controllers/adminController");

router.get("/analytics", getAnalytics);

router.get("/activities", getActivities);

router.get("/users", getUsers);



router.patch("/users/:id/credits", updateCredits);

module.exports = router;
