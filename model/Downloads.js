import mongoose from 'mongoose'
const { Schema, model } = mongoose
const DownloadSchema = new Schema({
    videoUrl: String,
    title: String,
    thumbnail: String,
    userId: String,
    nameOfUser: String,
    userImage: String,
    downloadedNumber: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            byUser: String,
            thumbnail: String,

        }
    ],
    userRole: String,
    downloadedAt: {
        type: Date,
        default: Date.now
    },



})

const Download = model('Downloads', DownloadSchema);
export default Download;

