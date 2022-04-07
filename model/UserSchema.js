import mongoose  from 'mongoose'

const userLoginSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
    },
    password: String,
    email: String,
    code: Number,


})

export default mongoose.model('UserLogin' , userLoginSchema);


