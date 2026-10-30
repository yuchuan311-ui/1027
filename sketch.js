// 宣告精靈圖片變數，供載入後繪製角色使用
let runSprite;

// 宣告角色在畫面中的水平位置
let playerX;

// 宣告角色在畫面中的垂直位置
let playerY;

// 宣告角色目前面向的方向，1代表右，-1代表左
let facingDirection = 1;

// 宣告精靈圖片上的單格寬度
const frameWidth = 512 / 6;

// 宣告精靈圖片上的單格高度
const frameHeight = 128;

// 宣告精靈圖片包含的影格數量
const totalFrames = 6;

// 宣告每秒播放的動畫影格數
const animationSpeed = 5;

// 宣告角色移動速度
const moveSpeed = 4;

// 宣告目前播放的精靈影格編號
let currentFrame = 0;

// 宣告動畫影格累積時間
let animationFrameCounter = 0;

// 預載精靈圖片，避免進入繪製階段時圖片尚未準備完成
function preload() {
  // 由專案根目錄載入跑步精靈圖片
  runSprite = loadImage("walk/跑步/跑步.png");
}

// 初始化全螢幕畫布與角色位置
function setup() {
  // 建立與瀏覽器視窗大小相同的畫布
  createCanvas(windowWidth, windowHeight);
  // 使用像素比例繪製，讓角色邊緣保持清晰
  pixelDensity(1);
  // 設定圖片左右中心點為角色的繪製基準點
  imageMode(CENTER);
  // 將角色放在畫面水平中央
  playerX = width / 2;
  // 將角色放在畫面垂直中央
  playerY = height / 2;
}

// 持續繪製畫面與角色動畫
function draw() {
  // 塗滿畫布背景顏色c1cfda
  background("#c1cfda");

  // 判斷右方向鍵是否被按住
  if (keyIsDown(RIGHT_ARROW)) {
    // 讓角色向右移動
    playerX += moveSpeed;
    // 記錄角色面向右方
    facingDirection = 1;
  }

  // 判斷左方向鍵是否被按住
  if (keyIsDown(LEFT_ARROW)) {
    // 讓角色向左移動
    playerX -= moveSpeed;
    // 記錄角色面向左方
    facingDirection = -1;
  }

  // 記錄左右方向鍵是否有任一鍵被按住
  const isMoving = keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW);

  // 角色移動時累積動畫時間
  if (isMoving) {
    // 每一畫面累加一次動畫計時
    animationFrameCounter++;
    // 判斷是否達到切換下一影格的畫面數
    if (animationFrameCounter >= 60 / animationSpeed) {
      // 切換到下一個精靈影格
      currentFrame = (currentFrame + 1) % totalFrames;
      // 重置動畫影格計時
      animationFrameCounter = 0;
    }
  }

  // 設定角色的左右邊界，避免角色完全移出畫面
  playerX = constrain(playerX, frameWidth / 2, width - frameWidth / 2);

  // 計算目前影格在精靈圖片中的水平座碼
  const sourceX = currentFrame * frameWidth;

  // 保存目前繪圖座標與縮放設定
  push();
  // 移動座標原點到角色位置
  translate(playerX, playerY);
  // 依角色方向翻轉水平座標
  scale(facingDirection, 1);
  // 從精靈圖片裁切目前影格並繪製角色
  image(
    runSprite,
    0,
    0,
    frameWidth,
    frameHeight,
    sourceX,
    0,
    frameWidth,
    frameHeight
  );
  // 恢復繪圖座標與縮放設定
  pop();
}

// 當瀏覽器視窗大小變更時同步調整畫布
function windowResized() {
  // 將畫布大小調整為目前視窗大小
  resizeCanvas(windowWidth, windowHeight);
}
