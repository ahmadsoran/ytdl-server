import { Router } from "express";
const Route = Router();
import VideoRoutes from './controllers/video/video-download.js';

Route.options('/download', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
})
Route.post("/download", VideoRoutes.DownloadVideo)
Route.post("/getVideoInfo", VideoRoutes.getVideoInfo)


export default Route; 