const Joi = require("joi");

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string().min(6).required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  phone: Joi.string().min(6),
});

module.exports = { schemaAddContact, schemaUpdateContact };
