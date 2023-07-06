import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().required(),
  reg_no: Joi.string().required(),
  department: Joi.string().required(),
  gender: Joi.string().required(),
  password: Joi.string().required().min(8),
});

export default { create };
