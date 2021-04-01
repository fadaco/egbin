const Joi = require('joi');

const register_schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    
})

// const login_schema = async (body) => {
//     const schema = await Joi.object({
//         email: Joi.string().trim().email(),
//         password: Joi.string().min(6).required(),
//         phone_number: Joi.string(),
//         user_name: Joi.string(),

//     });

//     const {error} = await schema.validate(body);
//     return error;
// }

module.exports = {
    register_schema
  //  login_schema
};
