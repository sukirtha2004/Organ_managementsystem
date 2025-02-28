const express = require("express");
const {getRecipient,createRecipients,getSingleDRecipient,updateRecipient,deleteRecipient} = require("../controllers/recipientcontroller");
const router = express.Router();


router.route("/").get(getRecipient);

router.route("/").post(createRecipients);

router.route("/:id").get(getSingleDRecipient);

router.route("/:id").put(updateRecipient);

router.route("/:id").delete(deleteRecipient);

module.exports = router;
