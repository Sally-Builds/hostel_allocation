import Joi from 'joi';
import GenderEnum from '../enums/gender';
import RankEnum from '../enums/rank';

const create = Joi.object({
  name: Joi.string().required(),
  gender: Joi.string().required().valid(GenderEnum[0], GenderEnum[1]),
  rank: Joi.string().required().valid(RankEnum[0], RankEnum[1], RankEnum[2]),
});

export default { create };
