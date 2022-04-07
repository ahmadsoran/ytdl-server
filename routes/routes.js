import { Router } from "express";
const Route = Router();
import VideoRoutes from './controllers/video/video-download.js';

Route.post("/download", VideoRoutes.DownloadVideo)
Route.post("/getVideoInfo", VideoRoutes.getVideoInfo)


export default Route; 