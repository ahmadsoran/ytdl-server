import ytdl from 'ytdl-core';
import fs from 'fs';
import VideoUrlValidation from './videoValidation.js';

const DownloadVideo = async (req, res) => {
    const { url, quality } = req.body;

    console.log({ url, quality });


    console.log(req.headers['Content-Length']);


    try {
        try {

            await VideoUrlValidation.validateAsync({ url, quality })
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message })

        }
        let info = await ytdl.getInfo(url)
        let format = ytdl.chooseFormat(info.formats, {
            quality: quality,

            filter: (format) => {
                return format.contentLength > 0
            }

        });
        // Example of choosing a video format.

        console.log({ url, quality });
        console.log(format?.contentLength);
        if (format?.contentLength > 0) {
            res.setHeader('Content-Length', format?.contentLength);

        } else {
            res.setHeader('Content-Length', 50000);

        }

        // Example of downloading a video.
        ytdl.downloadFromInfo(info, {
            format: format
        }).pipe(res).on('error', (err) => { return res.json({ error: err.message }) })




    }
    catch (error) {
        console.log(error.message);

        return res.status(400).json({ error: error.message });
    }


}

const getVideoInfo = async (req, res) => {
    const { url } = req.body;
    try {

        ytdl.getBasicInfo(url).then(info => {
            res.json({
                videoTitle: info.videoDetails?.title,
                videoDescription: info.videoDetails?.description,
                videoDuration: info.videoDetails?.lengthSeconds,
                videoChannel: info.videoDetails?.author?.name,
                videoChannelImg: info.videoDetails?.author?.thumbnails[0].url,
                videoChannelSub: info.videoDetails?.author?.subscriber_count,
                videoViewers: info.videoDetails?.viewCount,
                videoId: info.videoDetails?.videoId,
                formatContentLength: info.formats[0].contentLength,
                videoQuality: info.formats?.map((data) => {
                    return {
                        qualityLabel: data?.qualityLabel,
                        itag: data?.itag,
                        hasAudio: data?.hasAudio,
                        audioQuality: data?.audioQuality,
                        videoSizes: data?.contentLength,
                    }
                }).filter((data) => {
                    return data.qualityLabel !== ''
                }),
                // videoQualitytest: info.formats,
                videoThumbnail: info.videoDetails?.thumbnails.map((thumbnail) => {
                    return {
                        url: thumbnail.url,
                        width: thumbnail.width,
                        height: thumbnail.height


                    }
                }).splice(-1),

            })

        }).catch(error => {
            res.status(400).json({ error: error.message })
        })
    } catch (error) {
        return res.status(400).json({ error: error.message })


    }

}

export default { DownloadVideo, getVideoInfo };