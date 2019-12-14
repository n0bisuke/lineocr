'use strict';

const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const OCRAPI_ENDPOINT = `https://ocr-devday19.linebrain.ai/v1/`;

class Brain {
    constructor(OCR_SERVICE_ID) {
        this.URL = {
            RECOGNITION: OCRAPI_ENDPOINT + `recognition`,
            DETECTION: OCRAPI_ENDPOINT + `detection`
        },
        this.SERVICE_ID = OCR_SERVICE_ID;
        this.config = (form) => {
            return {
                headers: {
                    'X-ClovaOCR-Service-ID': OCR_SERVICE_ID,
                    ...form.getHeaders()
                }
            }
        }
    }

    detection(IMAGE_PATH, options = {}){
        const file = fs.createReadStream(IMAGE_PATH);
        const form = new FormData();
        form.append('image', file);
        form.append('scaling', `${options.scaling}` || 'false');
        form.append('ratePosition', `${options.ratePosition}` || 'false');
        form.append('segments', `${options.segments}` || 'true');

        return axios.post(this.URL.DETECTION, form, this.config(form))
    }

    recognition(IMAGE_PATH, options = {}){
        const file = fs.createReadStream(IMAGE_PATH);
        const form = new FormData();
        form.append('image', file);
        form.append('entrance', options.entrance || 'recognition');
        form.append('scaling', `${options.scaling}` || 'false');
        form.append('language', options.language || 'jp');
        form.append('ratePosition', `${options.ratePosition}` || 'false');
        form.append('segments', `${options.segments}` || 'true');

        return axios.post(this.URL.RECOGNITION, form, this.config(form))
    }
     
}

module.exports = Brain;