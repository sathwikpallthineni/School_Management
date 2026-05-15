import Joi from "joi";

const schoolSchema = Joi.object({
    name: Joi.string().required().max(30),
    address: Joi.string().required().max(50),
    latitude: Joi.number().required(),
    longitude: Joi.number().required()
});

export default schoolSchema;