var gs, gsImg;
var tower, towerImg;
var door, doorImg, doorGroup;
var climber, climberImg, climberGroup;
var GameState = 'PLAY';






function preload() {
  gsImg = loadImage("ghost-standing.png");
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
}

function setup() {
  createCanvas(600, 400);
  tower = createSprite(300,200);
  tower.addImage(towerImg);
  tower.velocityY = 1.5;
  
  doorGroup = createGroup();
  climberGroup = createGroup();
  
  ghost = createSprite(300,200,50,50);
  ghost.addImage(gsImg);
  ghost.scale = 0.4;
}

function draw() {
  background("black");
  if (GameState === 'PLAY') {
  if (tower.y>400) {
      tower.y = 200;
      }
  
  if (keyDown("space")) {
      ghost.velocityY = -2;
      }
      ghost.velocityY = ghost.velocityY + 0.5;
  
  if (keyDown(LEFT_ARROW)) {
      ghost.x = ghost.x - 2
      }
  
  if (keyDown(RIGHT_ARROW)) {
      ghost.x = ghost.x + 2
      }
  if (climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
      //GameState = 'END';
      } 
  
    if (ghost.y>400) {
      GameState = 'END';  
        } 
  spawnDoor();
  spawnClimber();}
  
  if (GameState === 'END') {
      text("Game Over",300,200);
      ghost.destroy();
      }
  drawSprites();
}

function spawnDoor(){
  if (frameCount% 200 === 0) {
      door = createSprite(300,-50);
      door.x = Math.round(random(100,500));
      door.addImage(doorImg);
      door.velocityY = 1.5;
      door.lifetime = 400; 
      doorGroup.add(door);
      }
}

function spawnClimber(){
      if (frameCount% 200 === 0) {
      climber = createSprite(300,-50);
      climber.x = door.x;
      climber.y = door.y + 50;  
      climber.addImage(climberImg);
      climber.velocityY = 1.5;
      climber.lifetime = 400; 
      climberGroup.add(climber);
      }
}