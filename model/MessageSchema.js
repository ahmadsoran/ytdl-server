import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        minlength: 4,
        required: true
    },
    message: {
        type: String,
        trim: true,
        minlength: 10,
        required: true

    }
},
    { timestamps: true }
)

export default mongoose.model('Messages', MessageSchema);

