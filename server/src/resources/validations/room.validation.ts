import Joi from 'joi';
import RankEnum from '../enums/rank';

const create = Joi.object({
  room_number: Joi.number().required(),
  rank: Joi.string().required().valid(RankEnum[0], RankEnum[1], RankEnum[2]),
});

export default { create };
