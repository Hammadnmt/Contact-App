
const express = require('express');
const router = express.Router()
const { createContact, getAllContact, getContactbyId, updateContact, deleteContact } = require('../controllers/contactController')

const validateToken = require('../middleware/validateTokenHandler')

router.use(validateToken)
router.route("/").get(getAllContact).post(createContact);
router.route("/:id").get(getContactbyId).put(updateContact).delete(deleteContact);

module.exports = router;