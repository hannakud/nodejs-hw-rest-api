const { Router } = require("express");
const ctrl = require("../../controllers/contacts");
const { schemaContact: schema } = require("../../schemas");
const { validateBody } = require("../../middlewares");
const router = Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(schema.schemaAddContact), ctrl.addContact);

router.delete("/:id", ctrl.deleteContact);

router.put(
  "/:id",
  validateBody(schema.schemaUpdateContact),
  ctrl.updateContact
);

module.exports = router;
