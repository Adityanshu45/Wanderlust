const joi = require('joi');

module.exports.listingSchema =joi.object({
    listing : joi.object({
        title : joi.string().required(),
        description : joi.string().required(),
        image : joi.string().allow("",null),
        location :joi.string().required(),
        country : joi.string().required(),
        price :joi.number().required().min(0),
        category: joi.array().items(
            joi.string().valid(
           'Trending','Rooms','Iconic Cities','Mountains','Castles','Amazings Pools','Camping','Farms','Arctic','Domes','Boats'
        )),
    }).required(),
});

//reviews validateSchem

module.exports.reviewSchema = joi.object({
    review:joi.object({
        rating : joi.number().required().min(1).max(5),
        comment:joi.string().required(),
    }).required(),
})