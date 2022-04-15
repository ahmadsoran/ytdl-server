import joi from 'joi';

const UsersValidation = joi.object({

    firstName: joi.string().min(4).max(30).required().trim(),
    username: joi.string().min(5).max(30).required().trim().regex(/^[a-z0-9_A-Z]+$/),
    phoneNumber: joi.number(),
    email: joi.string().email().required().trim(),
    password: joi.string().min(8).required(),

})
export default UsersValidation;