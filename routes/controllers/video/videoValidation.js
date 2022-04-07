import joi from 'joi';

const VideoUrlValidation = joi.object({
    url: joi.string().uri().min(5).required(),
    quality: joi.number().min(1).required()


})

export default VideoUrlValidation;


// .then((response: AxiosResponse) => {
//     console.log(response);
//     // if (response) {

//     //     response.blob().then(blob => {
//     //         var url = window.URL.createObjectURL(blob);
//     //         var a = document.createElement('a');
//     //         a.href = url;
//     //         a.download = videoDownload && `${videoDownload?.videoTitle}${selectQuality.vidype}`;
//     //         document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
//     //         a.click();
//     //         a.remove();  //afterwards we remove the element again

//     //     })
//     // }
//     // else {
//     //     setErrMsg(response.statusText + '  please make sure the url is correct & quality selected');
//     // }
// }).catch(err => {
//     return console.log(err)
// })