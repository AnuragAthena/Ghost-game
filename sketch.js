var PLAY=1;
var END=0;
var towerImg, tower;
var doors, doorsImg, doorsGroup;
var climber, climberImg, climberGroup;
var ghost, ghostImgstand, ghostImgjump;
var invisibleGround;
var gameState=PLAY;
var soundSpooky;

function preload(){

  towerImg = loadImage("tower.png");
  doorsImg=loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImgstand=loadImage("ghost-standing.png");
  ghostImgjump=loadAnimation("ghost-jumping.png");
  soundSpooky=loadSound("spooky.wav");
}

function setup(){

createCanvas(windowWidth, windowHeight);
soundSpooky.play(true);
tower = createSprite(windowWidth/2, windowHeight/2, windowWidth, windowHeight);
tower.addImage(towerImg);
tower.velocityY=2;

ghost=createSprite(windowWidth/2, windowHeight/2);
ghost.addImage(ghostImgstand);  
ghost.scale=0.4;

 invisibleGround=createSprite(windowWidth/2, windowHeight/2 + 8, 500, 5);  
 
ghost.debug=true;
  
  doorsGroup = new Group();  
 
climberGroup = new Group();
}


function draw(){
background(180);

invisibleGround.visible=false;
 if(gameState===PLAY){ 
  if(tower.y > windowHeight){
  tower.y=tower.width/2; 
   }
spawnDoors();
if(keyWentDown("left")){
 ghost.velocityX=-3;  
 ghost.velocityY=0;
}

  if(keyWentUp("left")){
 ghost.velocityY=0;  
 ghost.velocityX=0;
  }
 
  if(keyWentDown("right")){
 ghost.velocityX=3;  
 ghost.velocityY=0;
  }
  
  if(keyWentUp("right")){
 ghost.velocityY=0;  
 ghost.velocityX=0;
  }
  
  ghost.velocityY=ghost.velocityY+0.4; 
   ghost.collide(invisibleGround);   
  
 if(keyDown("space") && ghost.y > windowHeight/2 - 2 ) {  
  ghost.velocityY=-9;
// ghost.changeAnimation(ghostImgjump); 
 }
   if(ghost.isTouching(climberGroup)){  
   gameState=END;
     } 

} 
  else
  
    if(gameState===END){   
  doorsGroup.setVelocityYEach(0);  
  doorsGroup.setLifetimeEach(-1);
   climberGroup.setVelocityYEach(0);
  climberGroup.setLifetimeEach(-1);
   ghost.velocityY=0; 
   ghost.velocityX=0; 
   tower.velocityY=0;
   text.size=50;
   //text("GAME OVER", 300, 300);
    }

drawSprites();

}

function spawnDoors(){
  if(frameCount % 300===0){
var rand = Math.round(random(windowWidth-windowWidth-1,windowWidth))
doors=createSprite(rand, 0, 300, 300);
doors.addImage(doorsImg);
doors.velocityY=3
doors.lifetime=300;
doors.scale = 0.7;
doorsGroup.add(doors);
climber=createSprite(doors.x, 100, 300, 300);  
climber.addImage(climberImg);  
 climber.velocityY=doors.velocityY; 
 climber.lifetime=600/3; 
  climberGroup.add(climber);
   
  }
}