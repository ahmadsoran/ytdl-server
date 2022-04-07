import ytdl from 'ytdl-core';
import fs from 'fs';
import VideoUrlValidation from './videoValidation.js';

const DownloadVideo = async (req, res) => {
    const { url, quality } = req.body;
    console.log(req.body);

    try {
        try {

            await VideoUrlValidation.validateAsync({ url, quality })
        } catch (error) {
            return res.status(400).json(error.message)

        }
        // Example of choosing a video format.
        let info = await ytdl.getInfo(url);
        let format = ytdl.chooseFormat(info.formats, {
            quality: quality,

        });

        // Example of downloading a video.
        ytdl.downloadFromInfo(info, {
            format: format
        }).pipe(fs.createWriteStream(`${info.videoDetails?.videoId}`)).on('finish', (err) => {
            if (err) {
                return res.status(400).json(err.message)
            }
            res.download(`${info.videoDetails.videoId}`);
            console.log('downloaded')
        })



    } catch (error) {
        return console.log(error);
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
                videoQuality: info.formats?.map((data) => {
                    return {
                        qualityLabel: data?.qualityLabel,
                        itag: data?.itag,
                        hasAudio: data?.hasAudio,
                        audioQuality: data?.audioQuality,
                    }
                }).filter((data) => {
                    return data.qualityLabel !== 'tiny'
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
            res.status(400).json(error.message)
        })
    } catch (error) {
        return res.status(400).json(error.message)


    }

}

export default { DownloadVideo, getVideoInfo };