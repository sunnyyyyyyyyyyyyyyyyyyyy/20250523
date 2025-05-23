let facemesh;
let video;
let predictions = [];
let points = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
              76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184];
let startButton;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 創建一個按鈕，讓用戶點擊以啟動程式
  startButton = createButton('開始');
  startButton.position(width / 2 - 30, height / 2 - 20);
  startButton.mousePressed(startFacemesh);
}

function startFacemesh() {
  // 啟動 Facemesh 模型
  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', results => {
    predictions = results;
  });

  // 移除按鈕
  startButton.remove();
}

function modelReady() {
  console.log('Facemesh model loaded!');
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  stroke(255, 105, 180); // 粉紅色
  strokeWeight(15); // 線條粗細
  noFill();

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    beginShape();
    for (let i = 0; i < points.length; i++) {
      const index = points[i];
      const [x, y] = keypoints[index];
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
