const Joi = require("joi");
const passwordvalidation = Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).messages({
        'string.empty': `"password" cannot be an empty field`,
        'string.min': `"password" should have a minimum length of 6 `,
        'any.required': `"password" is a required field`,
        "string.pattern.base": " password should contain from 6 to 30 character or number"
    })


module.exports = {
    signUpValidationSchema: {
        body: Joi.object().options({ abortEarly: false }).required().keys({
            fname: Joi.string().required(),
            lname: Joi.string().optional(),
            email: Joi.string().email().required(),
            password:passwordvalidation,
            role: Joi.string().optional().valid("user", "proUser","admin"),
        })
    },
    signInValidationSchema: {
        body: Joi.object().required().keys({
            email:Joi.string().email().required(),
            password:passwordvalidation
        })
    }
}

