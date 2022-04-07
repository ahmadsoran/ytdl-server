import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import Route from './routes/routes.js'
import morgan from 'morgan'
import fs from 'fs'
dotenv.config('dotenv')

const ENV = process.env
const app = express()
mongoose.Promise = global.Promise;


// ENV.DB_URL
// ENV.TESTDB
const DBURL = ENV.TESTDB
// Connect MongoDB at default port 27017. 
mongoose.connect(ENV.DB_URL, {
    useNewUrlParser: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.' + DBURL)
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
const accessLogStream = fs.WriteStream('./access.log', { flags: 'a' })
app.use(cors({ origin: '*', credentials: true }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Route)
app.use(morgan('combined', { stream: accessLogStream }))
app.listen(ENV.PORT, () => {
    console.log('server online in http://localhost:' + ENV.PORT)
})

