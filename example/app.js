'use strict';

const Brain = require('../');
const ocr = new Brain(`YOUR SERVICE ID`); 

const IMAGE_PATH = `./example/sample.png`; // 画像パス

//DETECTION - 文字領域の検出のみを行います。
ocr.detection(IMAGE_PATH)
    .then(res => console.log(res.data)) //成功時
    .catch(err => console.log(err.response)); //失敗時

//RECOGNITION - 文字認識のみを行います。もしくは、文字領域の検出と認識を順に行います。
const options = {
    entrance: 'detection', //optional: Default value: recognition
    // language: 'jp', //optional: Default value: jp
    // scaling: false, //optional: Default value: false
    // ratePosition: false, //optional: Default value: false
    // segments: true //optional: Default value: true
};
ocr.recognition(IMAGE_PATH, options)
    .then(res => console.log(res.data)) //成功時
    .catch(err => console.log(err.response)); //失敗時