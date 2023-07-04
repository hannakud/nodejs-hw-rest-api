const { CtrlWrapper, HttpError } = require("../helpers/");
const operations = require("../models/contacts");

const getAll = async (req, res) => {
  const result = await operations.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await operations.getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const addContact = async (req, res) => {
  const result = await operations.addContact(req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json({
    status: "success",
    code: 201,
    message: "contact added",
    data: {
      result,
    },
  });
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await operations.removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
  });
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await operations.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    message: "contact updated",
    data: {
      result,
    },
  });
};

module.exports = {
  getAll: CtrlWrapper(getAll),
  getById: CtrlWrapper(getById),
  addContact: CtrlWrapper(addContact),
  deleteContact: CtrlWrapper(deleteContact),
  updateContact: CtrlWrapper(updateContact),
};
