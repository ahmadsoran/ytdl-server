import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,

    },
    password: {
        type: String,
        minlength: 8,
    },
    email: {
        type: String,
        minlength: 5,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'supporter'],

    },
    created_at: {
        type: Date,
        default: Date.now
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    firstName: {
        type: String,
        trim: true,
        maxlength: 20,
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/ahmacloud/image/upload/v1649622231/ytdl-profile-image/funmoji_jm2bxz.png',

    },







})

export default mongoose.model('User', UserSchema);

