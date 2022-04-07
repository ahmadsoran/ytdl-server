import joi from 'joi';

const VideoUrlValidation = joi.object({
    url: joi.string().uri().min(5).required(),
    quality: joi.number().min(1).required()


})

export default VideoUrlValidation;

