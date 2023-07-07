import Joi from 'joi';
import GenderEnum from '../enums/gender';

const create = Joi.object({
  name: Joi.string().required(),
  gender: Joi.string().required().valid(GenderEnum[0], GenderEnum[1]),
});

export default { create };
