var shooter,shooterimg,ssimg,hurtimg
var zom_a,zom_d,zom_w,zomg
var boyG,boyIMG
var bgImage
var bullet,bulletImg,bulletG
var ground
var my_logo,logoimg
var gs=2;
var gameover,go
var coin,coin_IMG
var sc=0
var gun,gun_s
function preload() {
 shooterimg=loadImage("shooter/shooting.png")
 ssimg=loadImage("shooter/ss.png")
 hurtimg=loadImage("shooter/hurt.png")
 bgImage=loadImage("bg.jpg")
 zom_w=loadAnimation("zw/zw9.png","zw/zw10.png","zw/zw11.png","zw/zw12.png","zw/zw13.png","zw/zw14.png","zw/zw15.png","zw/zw16.png")
 bulletImg=loadImage("bullet.png")
 my_logo=loadImage("MY LOGO.png")
gameover=loadImage("g_oimg1.jpg")
boyIMG=loadAnimation("boy walking/b1.png","boy walking/b2.png","boy walking/b3.png","boy walking/b4.png")
coin=loadImage("coin_img.png")
gun=loadSound("gun_s.mp3")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  logoimg=createSprite(1650,60,10,10)
  logoimg.scale=0.2
  logoimg.addImage("it is logo",my_logo)
  ground=createSprite(windowWidth/2,windowHeight-135,width,20)
  ground.visible=false;
  shooter=createSprite(80,windowHeight-205)
  shooter.addImage("standing",ssimg)
shooter.addImage("hurt",hurtimg)
shooter.addImage("shooting",shooterimg)
coin_IMG=createSprite(70,70)
coin_IMG.addImage("coin_place",coin)
coin_IMG.scale=0.1+0.05



 
//shooter.collide(ground)
  zomg=new Group()
  bulletG=new Group()
  boyG=new Group()
  
}

function draw() {
  if(gs==2){
    background("black")
    textSize(50)
    fill("white")
    text("instructions to follow",250,200)
    text(" 1.hit space to fight",250,300)
    text("press n to start the game",250,600)
    if(keyCode==110){
      console.log("i pressed n")
      gs=1
    }
  }
  if(gs===1){
  background(bgImage);
  noStroke();
  textSize(35)
  fill("white")
  text("  " + sc,90,80)
  
 if(keyWentDown(32))
 {bullet=createSprite(153,windowHeight-202)
  bullet.addImage("bullet",bulletImg)
    bullet.scale=0.3;
    gun.play()
   
     shooter.changeImage("shooting",shooterimg)
  
    bullet.velocity.x=15
    bulletG.add(bullet);
    
 }
 else if(keyWentUp(32)){
   shooter.changeImage("standing",ssimg)
 }

 /*if(zomg.isTouching(bulletG)){
  for(var i=0;i<zomg.length;i++){     
      if(zomg[i].isTouching(bulletG))
   {
        zomg[i].destroy()
        bulletG.destroyEach()
       
   } 
  
  }
}

  if(zomg.isTouching(shooter)){
    shooter.changeImage("hurt",hurtimg)
    zomg.destroyEach();

    }*/
    handleTouch();
    handleTouch2();
    handleTouch3();
    handleTouch4();

    spawnzombie();
    spawnBoy();
    if(gs==0){
     
     remover()
    }

    if(sc<0){
      remover()
    }
    
 drawSprites();
  }
 
  
}
function spawnzombie(){

  if(frameCount % 100 === 0){
   var zom=createSprite(random(windowWidth/2-400,windowWidth),windowHeight-191,50,50)
   zom.addAnimation("walking",zom_w)
  zom.velocity.x=-10
  zom.scale=2.4
  zom.lifetime=500
  zomg.add(zom);
  }
  
  
}

function spawnBoy(){
  if(frameCount % 150 === 0){
    var boy=createSprite(random (windowWidth/2-400,windowWidth),windowHeight-204,50,50)
    boy.addAnimation("boy walking",boyIMG)
   boy.velocity.x=-10
   boy.scale=0.8
   boy.lifetime=500
   boyG.add(boy);
   }
}

function handleTouch(){
  
    // Adding fuel
    zomg.overlap(shooter, function(collector,collected) {
      
      //collected is the sprite in the group collectibles that triggered
      //the event
      collector.remove();
      //collector.destroyEach();
      shooter.changeImage("hurt",hurtimg);
       gs=0;
    });
  
}
function handleTouch2(){
  bulletG.overlap(zomg, function(collector,collected) {
    collected.remove();
    collector.remove();
    sc=sc+5
  });
}
function handleTouch3(){
  bulletG.overlap(boyG, function(collector,collected) {
    collected.remove();
    collector.remove();
    sc=sc-10
  });
}

function handleTouch4(){
  boyG.overlap(shooter, function(collector,collected) {
    //collected.remove();
    collector.remove();
    sc=sc+10
  });
}
function remover(){
  background(gameover);
 removeSprites()
}