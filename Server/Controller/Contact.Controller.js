
const { Contact } = require("../Model");

// CREATE CONTACT
const createContact = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      subject,
      message,
    } = req.body;

    if (
      !fullName?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    const contact = await Contact.create({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Contact submitted successfully",
      data: contact,
    });

  } catch (error) {
    return next(error);
  }
};

// GET ALL CONTACTS
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });

  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createContact,
  getAllContacts,
};
