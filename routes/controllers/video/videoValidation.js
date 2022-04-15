import joi from 'joi';

const VideoUrlValidation = joi.object({
    url: joi.string().required().trim().replace(/\s/g, ''),
    quality: joi.string().min(1).required()


})

export default VideoUrlValidation;

