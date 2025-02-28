const express = require("express");
const { getDonor, createDonors, getSingleDonor, updateDonor, deleteDonor } = require("../controllers/donorcontroller");
const router = express.Router();


router.route("/").get(getDonor);

router.route("/").post(createDonors);

router.route("/:id").get(getSingleDonor);

router.route("/:id").put(updateDonor);

router.route("/:id").delete(deleteDonor);

module.exports = router;
