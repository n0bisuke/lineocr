
## LINE BRAIN OCR APIの非公式SDKです。

[Node.jsでLINE BRAIN OCR APIを使う](https://qiita.com/n0bisuke/items/00d646685b1cb468e26a)

## 使い方

```bash
npm i @n0bisuke/lineocr
```

公式が作るかもしれないのでネームスペース汚染しないようにこうしておきました。

```example/app.js
'use strict';

const Brain = require('@n0bisuke/lineocr');
const ocr = new Brain(`サービスID`); 

const IMAGE_PATH = `./sample.png`; // 画像パス

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
```

```bash
$ node example/app.js

{
  words: [ { boundingBox: [Array], lineBreak: false, segments: [Array] } ]
}
{
  words: [
    {
      boundingBox: [Array],
      text: '斎場御獄',
      confidence: 0.6916899085044861,
      lineBreak: false,
      segments: [Array]
    }
  ]
}
```

<img src="https://github.com/n0bisuke/lineocr/blob/master/example/sample.png?raw=true" width="400px">

## 依存モジュール

axiosを使ってます。

## エラーが出る時

### `Unknown service`

```
{ errorCode: 'ER400', errorMessage: 'Unknown service' }
```

サービスIDが間違ってます。サンプルに書いている`PMqTDgBsucfsyvi7pJEsbIxMIUeNQWDg`などを指定してもダメです。