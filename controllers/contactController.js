const asynchandler = require('express-async-handler')
const Contact = require('../models/contactModel')
/*
@desc GET all Contact
@route GET /api/contacts
@access private
*/
const getAllContact = asynchandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
})
/*
@desc GET Contact by id
@route POST /api/contact/:id
@access private
*/
const getContactbyId = asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("No Contact Found")
    }
    res.status(200).json(contact)
})
/*
@desc create new Contact
@route POST /api/contact/
@access private
*/
const createContact = asynchandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(200).json(contact);
});
/*
@desc update existing Contact
@route PUT /api/contact/:id
@access private
*/
const updateContact = asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("No Contact Found")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedContact)
})
/*
@desc delete existing Contact
@route DELETE /api/contact/:id
@access private
*/
const deleteContact = asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("No Contact Found")
    }
    await Contact.deleteOne({ _id: req.params.id })
    res.status(200).json(contact);
})
module.exports = {
    getAllContact,
    getContactbyId,
    createContact,
    updateContact,
    deleteContact
}