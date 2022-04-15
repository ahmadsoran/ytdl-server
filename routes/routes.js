import { Router } from "express";
import multer from "multer";
import Users from "./controllers/user/users.js";
import userDownload from './controllers/downloads/userDownloads.js';
const Route = Router();
import VideoRoutes from './controllers/video/video-download.js';
import isAuth from "../middlewears/isAuth.js";
import BugReport from "./controllers/messages/BugReport.js";


Route.options('/download', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
})
Route.post("/download", VideoRoutes.DownloadVideo)
Route.post("/getVideoInfo", VideoRoutes.getVideoInfo)
Route.post("/register", Users.userRegister)
Route.post("/login", Users.userLogin)

const storage = multer.diskStorage({})
let upload = multer({
    storage
})
Route.post("/uploadImage", upload.single('uploadImage'), Users.userUploadImages)
Route.get("/getUserData", Users.getUserData)
Route.post("/downloads", isAuth, userDownload.userDownloads)
Route.get("/downloadsData", isAuth, userDownload.getUserDownloads)
Route.get("/alluserdownload", isAuth, userDownload.getAllDownloads)
Route.post("/bugreport", BugReport.BugReport)

export default Route; 