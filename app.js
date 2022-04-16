import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import Route from './routes/routes.js'
import morgan from 'morgan'
import fs from 'fs'
import cloudinary from 'cloudinary'
dotenv.config('dotenv')

const ENV = process.env
const app = express()
mongoose.Promise = global.Promise;


// ENV.DB_URL
// ENV.TESTDB
// const DBURL = ENV.DB_URL
const DBURL = ENV.DB_URL
// Connect MongoDB at default port 27017. 
mongoose.connect(DBURL, {
    useNewUrlParser: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.' + DBURL)
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
const accessLogStream = fs.WriteStream('./access.log', { flags: 'a' })
app.use(cors({
    origin: ['https://ytdll.netlify.app', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,


}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Route)
cloudinary.config({
    cloud_name: ENV.CLD_API_KEY_NAME,
    api_key: ENV.CLD_API_KEY,
    api_secret: ENV.CLD_API_KEY_SEC
});
app.use(morgan('combined', { stream: accessLogStream }))
app.listen(ENV.PORT, () => {
    console.log(`server online in port:` + ENV.PORT)
})

