const Joi = require('joi')
module.exports.mangaSchema_Joi =  Joi.object({
    manga: Joi.object({
        title: Joi.string().required(),
        author:Joi.string().required(),
        description:Joi.string().required(),
   //   image:Joi.string().required(),
        genre:Joi.array().items(Joi.string()).required()
    }).required(),
    deleteImages:Joi.array()
});

module.exports.commentSchema_Joi =  Joi.object({
    comment: Joi.object({
        body: Joi.string().required(),
        score:Joi.number().required().min(1).max(10)
    }).required()
});