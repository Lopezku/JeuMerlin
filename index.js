'use strict';
const counter = document.getElementById("counter");
const merlinContainer = document.getElementById("merlinContainer");
const merlin = document.getElementById("merlin");
const toucan = document.getElementById("toucan");
const life = document.getElementById("life");
let counterLife=0;
const bear = document.getElementById("bear");
const mountain = document.getElementById("mountain");
const sky = document.getElementById("sky");
let timer, secondes = 0; 
let isToucanFlying=false;
let isLeftPosition=false;
let isAttack;
let isBubblesUp=false;
let isJumping = false;
let spaceHoldStatus = false;
let scorpioLeft, bearLeft;
let counterLogos=0;
const mushroom = document.getElementById("mushroom");
const mushroom2 = document.getElementById("mushroom2");
const tile3 = document.getElementById("tile3");
const chest = document.getElementById("chest");
const scorpio = document.getElementById("scorpio");
const scorpioTouched = document.getElementById("scorpioTouched");
const bearTouched = document.getElementById("bearTouched");
const bubbles = document.getElementById('bubbles');
const angular = document.getElementById('angular');
const typescript = document.getElementById('typescript');
const nodeJS = document.getElementById('nodeJS');
const js = document.getElementById('js');
const merlinStep = 3;
let positionMountain = parseInt(mountain.style.backgroundPositionX,10);
const merlininitialLeft = parseInt(document.getElementById('merlinContainer').offsetLeft,10);
//const floorWidth=parseInt(document.getElementById('floor').offsetWidth,10);
const floorWidth= 1843;
const containerinitialBottom=parseInt(document.getElementById('merlinContainer').offsetTop,10);
let animMerlinRight, animMerlinAttack, timerCollision, tIDBear;
let isAnimated = false;

function checkCollision(element1,element2){
    if ((element1.left < element2.left + element2.width) && (element1.left + element1.width > element2.left) && (element1.top < element2.top + element2.height) && (element1.height + element1.top > element2.top)) {
        
        // collision détectée !
 
     return true
    }
 
  return false
}
function parralaxLeft(){
    //positionMountain = parseInt(mountain.style.backgroundPositionX,10);
    if(isNaN(positionMountain)){
        positionMountain=-20;
}
positionMountain=positionMountain-20;
mountain.style.backgroundPositionX=positionMountain + "px";
};
function parralaxRight(){
    //positionMountain = parseInt(mountain.style.backgroundPositionX,10);
    if(isNaN(positionMountain)){
        positionMountain=20;
}
positionMountain=positionMountain+20;
mountain.style.backgroundPositionX=positionMountain + "px";
};
function animateBear() {
    let positionBear = 256; 
   
    tIDBear = setInterval ( () => {bear.style.backgroundPosition = `-${positionBear}px 0px`; 
    if (positionBear < 1536)
    { positionBear = positionBear + 256;}
    else
    { positionBear = 256; }
    let speedBear=bear.offsetLeft+15;
    bear.style.left=speedBear+'px';
    }, 100);
    }; 
function stopBear() {clearInterval(tIDBear);
};
function merlinInitalPosition(){
    merlin.style.backgroundImage = `url('${merlinMoves.idleBase[0].srcImg}')`;
       merlin.style.backgroundPositionX=merlinMoves.idleBase[0].BackgroundX;
       merlin.style.backgroundPositionY=merlinMoves.idleBase[0].BagroundY;
       merlinContainer.style.top=merlinMoves.idleBase[0].topContainer;
       merlinContainer.style.height=merlinMoves.idleBase[0].heightContainer;
       merlinContainer.style.width=merlinMoves.idleBase[0].widhtContainer;
}
function merlinInitalLeftPosition(){
merlin.style.backgroundImage = `url('${merlinMoves.idleBase[1].srcImg}')`;
merlinContainer.style.top=merlinMoves.idleBase[1].topContainer;
merlinContainer.style.width=merlinMoves.idleBase[1].widhtContainer;
merlin.style.backgroundPositionX='-880px';
merlinContainer.style.height=merlinMoves.idleBase[1].heightContainer;
merlin.style.backgroundPositionY=merlinMoves.idleBase[1].BagroundY;
merlinContainer.style.top=merlinMoves.idleBase[1].topContainer;
isLeftPosition=true;
}
function toucanMoves(element){
    const distanceBetweenToucanMerlin=toucan.offsetLeft-element.left;
    if(isToucanFlying) return
    if(distanceBetweenToucanMerlin<700){
        toucan.id="toucan1";
    }
    if(distanceBetweenToucanMerlin<600){
        toucan.id="toucan2";
    }
    if(distanceBetweenToucanMerlin<500){
        toucan.id="toucan3";
    }
    if(distanceBetweenToucanMerlin<300){
        toucan.id="toucan4";
        toucan.classList.add("fly");
        isToucanFlying=true;
    }
}

function getObjectLength (object){
    if(typeof(object)!=="object") throw new Error('not an object')
    return Object.keys(object).length;
}
//jump
function jump(jumpDuration, jumpHeight, multiplier){
    if(multiplier>5){
      return;
    }
    
    //jumpCount.textContent = multiplier;
    merlin.style.backgroundImage=`url('assets/img/wizardpack/jump.png')`;
    gsap.to(merlinContainer, jumpDuration*multiplier, {
      y:jumpHeight*multiplier,
      ease:Power3.easeOut,
      onComplete:function(){
        // end jump
        gsap.to(merlinContainer, (jumpDuration*multiplier)*.8, {
          y:0, 
          ease:Power1.easeIn,
          onComplete:function(){
            isJumping = false;
          }
        });            
      }
    });
    // continue adjusting height of jump if spacebar is held
    //TweenMax depredicated gsap
    gsap.delayedCall(.06, function(){
        if(spaceHoldStatus===true){    
            methodes.onMerlinMove(); 
          multiplier += 1;
          if(multiplier<=5){
            jump(jumpDuration, jumpHeight, multiplier);
          }
        }            
    });   
  } 

function checkObstacleCollision(obstacle,merlin){
    console.log({merlin})

    const isACollision = checkCollision(obstacle,merlin);
    if((isACollision)&&(obstacle.enemy===false)){
        console.log('merlin' + merlin.top+ 'left'+ merlin.left)
        obstacle.idTouched.style.display="block";
        obstacle.id.style.display="none";
        if (obstacle.touched===false){
            bubblesUp();
            methodes.manageScore();
            setTimeout(() => {
                /*document.getElementById("merlin").style.backgroundImage=`url('assets/img/wizardpack/jump.png')`;*/
                //brillance aux touchés des bienfaits
                document.getElementById("merlin").style.filter="brightness(1.75)";
                mountain.style.backgroundImage = `url('assets/img/glacial_mountains/background_glacial_mountains_lightened.png')`;
            }, 50);
            
        }
        obstacle.touched=true;
    }
    if((isACollision)&&(obstacle.enemy===true)){
        if((directions.enterAttack)){
            obstacle.id.style.display="none";
            if (obstacle.touched===false){
                bubblesUp();
                methodes.manageScore();
                //image à la position du scorpio
                if(obstacle.id==='bear'){
                    stopBear();
                }
                obstacle.idTouched.style.display="block";
                obstacle.idTouched.style.left=document.getElementById("merlinContainer").offsetLeft;
            }
            obstacle.touched=true;
        }else{
            isAttack=false;
            if((!isAttack)&&(!obstacle.touched)){
               methodes.manageLife(); 
            setTimeout(() => {
                document.getElementById("merlin").style.opacity = "0.5";
            }, 50);
            isAttack=true;
        }  
        }
        
    }
    /* remettre image de base pour obstacles
    else{
        obstacle.idTouched.style.display="none";
        obstacle.id.style.display="block";
        obstacles[2].id.style.display="none";
        obstacles[2].idTouched.style.display="block";
    }*/
}

//avoid scroll
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function bubblesUp(){
        bubbles.style.left= document.getElementById("merlinContainer").offsetLeft+'px';
        bubbles.style.display="block";
        bubbles.classList.add("bubblesUp");
        isBubblesUp=true;
        counterLogos++;
        if(counterLogos===1){
            angular.style.display="block";
        }
            if(counterLogos===2){
                js.style.display="block";
                //bear attack after JS
                animateBear();
            } 
            if(counterLogos===3){
                nodeJS.style.display="block";
            } 
            if(counterLogos===4){
                typescript.style.display="block";
            }
        setTimeout(()=>{         
            bubbles.classList.remove("bubblesUp");
            bubbles.style.display="none";
    }, 3000);
    
}
/*
var animationEnCours = false;
var aExecuter = function(tempsEcoule){
    augmentLeft1px();
    //recurssion compte à rebours 50ml secondes
    if(animationEnCours){
    window.requestAnimationFrame(aExecuter);
}
};*/
const obstacles=[{
    left: parseInt(chest.offsetLeft,10),
    top: parseInt(chest.offsetTop,10),
    width: parseInt(chest.offsetWidth,10),
    height: parseInt(chest.offsetHeight,10),
    id: document.getElementById('chest'),
    idTouched:document.getElementById('chestTouched'),
    touched:false,
    class:'',
    enemy:false,
},
{
    left: parseInt(mushroom.offsetLeft,10),
    top: parseInt(mushroom.offsetTop,10),
    width: parseInt(mushroom.offsetWidth,10),
    height: parseInt(mushroom.offsetHeight,10),
    id: document.getElementById('mushroom'),
    idTouched:document.getElementById('mushroomTouched'),
    touched:false,
    class:'',
    enemy:false,
},
{
    top: parseInt(scorpio.offsetTop,10),
    width: parseInt(scorpio.offsetWidth,10),
    height: parseInt(scorpio.offsetHeight,10),
    id: document.getElementById('scorpio'),
    idTouched:document.getElementById('scorpioTouched'),
    touched:false,
    class:'',
    enemy:true,
},
{
    top: parseInt(bear.offsetTop,10),
    width: parseInt(bear.offsetWidth,10),
    height: parseInt(bear.offsetHeight,10),
    id: document.getElementById('bear'),
    idTouched:document.getElementById('bearTouched'),
    touched:false,
    class:'',
    enemy:true,
},
{
    left: parseInt(mushroom2.offsetLeft,10),
    top: parseInt(mushroom2.offsetTop,10),
    width: parseInt(mushroom2.offsetWidth,10),
    height: parseInt(mushroom2.offsetHeight,10),
    id: document.getElementById('mushroom2'),
    idTouched:document.getElementById('mushroom2Touched'),
    touched:false,
    class:'',
    enemy:false,
}
]
//perso objet
const merlinMoves={
        idleBase:[{
            srcImg:'assets/img/wizardpack/idle.png',
            BackgroundX: '-79px',
            BagroundY: '-51px',
            widhtContainer: '60px',
            heightContainer: '90px',
            topContainer:'510px',
        },
        {
            srcImg:'assets/img/wizardpack/idle.png',
            BackgroundX: '-313px',
            BagroundY: '-51px',
            widhtContainer: '60px',
            heightContainer: '90px',
            topContainer:'510px',
        },
        {
            srcImg:'assets/img/wizardpack/idle.png',
            BackgroundX: '-544px',
            BagroundY: '-51px',
            widhtContainer: '69px',
            heightContainer: '90px',
            topContainer:'510px',
        },
        {
            srcImg:'assets/img/wizardpack/idle.png',
            BackgroundX: '-775px',
            BagroundY: '-51px',
            widhtContainer: '69px',
            heightContainer: '90px',
            topContainer:'510px',
        },],
        merlinRunLeft:[{
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-198px',
            BagroundY: '-51px',
            widhtContainer: '77px',
            heightContainer: '90px',
            topContainer:'510px',
        },
        {
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-428px',
            BagroundY: '-51px',
            widhtContainer: '60px',
            heightContainer: '90px',
            topContainer:'510px',
        },
        {
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-656px',
            BagroundY: '-51px',
            widhtContainer: '73px',
            heightContainer: '90px',
            topContainer:'510px',
        },
        {
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-888px',
            BagroundY: '-51px',
            widhtContainer: '77px',
            heightContainer: '90px',
            topContainer:'510px',
        },
        {
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-1121px',
            BagroundY: '-51px',
            widhtContainer: '76px',
            heightContainer: '90px',
            topContainer:'510px',
        },
        {
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-1346px',
            BagroundY: '-51px',
            widhtContainer: '60px',
            heightContainer: '90px',
            topContainer:'510px',
        },
        {
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-1580px',
            BagroundY: '-51px',
            widhtContainer: '60px',
            heightContainer: '90px',
            topContainer:'510px',
        }],
        merlinRun:[{
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-308px',
            BagroundY: '-51px',
            widhtContainer: '71px',
            heightContainer: '90px',
            topContainer:'510px',
        },
        {
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-547px',
            BagroundY: '-51px',
            widhtContainer: '60px',
            heightContainer: '90px',
            topContainer:'510px',
        },
        {
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-763px',
            BagroundY: '-51px',
            widhtContainer: '73px',
            heightContainer: '90px',
            topContainer:'510px',
        },
        {
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-996px',
            BagroundY: '-51px',
            widhtContainer: '77px',
            heightContainer: '90px',
            topContainer:'510px',
        },
        {
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-1233px',
            BagroundY: '-51px',
            widhtContainer: '65px',
            heightContainer: '90px',
            topContainer:'510px',
        },
        {
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-1471px',
            BagroundY: '-51px',
            widhtContainer: '60px',
            heightContainer: '90px',
            topContainer:'510px',
        },
        {
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-1690px',
            BagroundY: '-51px',
            widhtContainer: '72px',
            heightContainer: '90px',
            topContainer:'510px',
        }],
        merlinAttack:[{
            srcImg:'assets/img/wizardpack/attack1.png',
            BackgroundX: '-53px',
            BagroundY: '-19px',
            widhtContainer: '76px',
            heightContainer: '122px',
            topContainer:'477px',
        },
        {
            srcImg:'assets/img/wizardpack/attack1.png',
            BackgroundX: '-274px',
            BagroundY: '-19px',
            widhtContainer: '76px',
            heightContainer: '122px',
            topContainer:'477px',
        },
        {
            srcImg:'assets/img/wizardpack/attack1.png',
            BackgroundX: '-514px',
            BagroundY: '-19px',
            widhtContainer: '76px',
            heightContainer: '122px',
            topContainer:'477px',
        },
        {
            srcImg:'assets/img/wizardpack/attack1.png',
            BackgroundX: '-779px',
            BagroundY: '-1px',
            widhtContainer: '89px',
            heightContainer: '140px',
            topContainer:'460px',
        },
        {
            srcImg:'assets/img/wizardpack/attack1.png',
            BackgroundX: '-1010px',
            BagroundY: '-37px',
            widhtContainer: '105px',
            heightContainer: '104px',
            topContainer:'496px',

        },
        {
            srcImg:'assets/img/wizardpack/attack1.png',
            BackgroundX: '-1242px',
            BagroundY: '-33px',
            widhtContainer: '110px',
            heightContainer: '108px',
            topContainer:'492px',
        },
        {
            srcImg:'assets/img/wizardpack/attack1.png',
            BackgroundX: '-1471px',
            BagroundY: '-25px',
            widhtContainer: '120px',
            heightContainer: '116px',
            topContainer:'484px',
        },
        {
            srcImg:'assets/img/wizardpack/attack1.png',
            BackgroundX: '-1702px',
            BagroundY: '-14px',
            widhtContainer: '129px',
            heightContainer: '127px',
            topContainer:'473px',
        }],
        merlinAttackLeft:[{
            srcImg:'assets/img/wizardpack/attack1.png',
            BackgroundX: '-178px',
            BagroundY: '-19px',
            widhtContainer: '76px',
            heightContainer: '122px',
            topContainer:'478px',
        },
        {
            srcImg:'assets/img/wizardpack/attack1.png',
            BackgroundX: '-400px',
            BagroundY: '-19px',
            widhtContainer: '76px',
            heightContainer: '122px',
            topContainer:'478px',
        },
        {
            srcImg:'assets/img/wizardpack/attack1.png',
            BackgroundX: '-640px',
            BagroundY: '-19px',
            widhtContainer: '76px',
            heightContainer: '122px',
            topContainer:'477px',
        },
        {
            srcImg:'assets/img/wizardpack/attack1.png',
            BackgroundX: '-915px',
            BagroundY: '-5px',
            widhtContainer: '86px',
            heightContainer: '136px',
            topContainer:'464px',
        },
        {
            srcImg:'assets/img/wizardpack/attack1.png',
            BackgroundX: '-1164px',
            BagroundY: '-38px',
            widhtContainer: '104px',
            heightContainer: '104px',
            topContainer:'496px',
        },
        {
            srcImg:'assets/img/wizardpack/attack1.png',
            BackgroundX: '-1400px',
            BagroundY: '-32px',
            widhtContainer: '109px',
            heightContainer: '109px',
            topContainer:'491px',
    
        },
        {
            srcImg:'assets/img/wizardpack/attack1.png',
            BackgroundX: '-1636px',
            BagroundY: '-24px',
            widhtContainer: '129px',
            heightContainer: '117px',
            topContainer:'483px',
        },
        {
            srcImg:'assets/img/wizardpack/attack1.png',
            BackgroundX: '-1877px',
            BagroundY: '-15px',
            widhtContainer: '126px',
            heightContainer: '126px',
            topContainer:'474px',
        }],
}
const directions = {
    top: false,
    left: false,
    right: false,
    space: false,
    enterAttack:false,
};
window.addEventListener('keydown', (event)=>{
    if('ArrowRight' === event.code){
        directions.right=true;
        methodes.onMerlinMove(); 
        if(merlinContainer.offsetLeft<floorWidth){
        parralaxLeft();
        }
        clouds.style.display="block";
        clouds.classList.add("cloudsMove");
        /*scorpio.style.display="block";
        scorpio.classList.add("scorpioMove");*/
    }
    if('Enter' === event.code){
        directions.enterAttack=true;
       methodes.onMerlinMove();  
    }
    if('ArrowLeft' === event.code){
        directions.left=true;
       methodes.onMerlinMove();
       if(merlinContainer.offsetLeft>1){
        parralaxRight();
        }
       
    } 
    if('ArrowUp' === event.code){
        directions.top=true;
    }
    if('Space' === event.code){
        directions.space=true;
        if(isJumping===false && spaceHoldStatus===false){
            spaceHoldStatus = true;
            isJumping = true;     
            jump(.05, -40, 1);
           
          }
        //methodes.onMerlinMove();
        
    }
});
window.addEventListener('keyup', (event)=>{
    if('ArrowRight' === event.code){
        directions.right=false;
        clearTimeout(animMerlinRight);
       isAnimated = false;   
       merlinInitalPosition();
       isLeftPosition=false;
      
    }
    if('ArrowLeft' === event.code){
        directions.left=false;
        clearTimeout(animMerlinRight);
        isAnimated = false;
        //position base
        merlinInitalLeftPosition();
    } 
    if('Enter' === event.code){
        directions.enterAttack=false;
        clearTimeout(animMerlinAttack);
        isAnimated = false;
        if(isLeftPosition){
           merlinInitalLeftPosition();
        }else{
        merlinInitalPosition();
    }
    } 
    if('ArrowUp' === event.code){
        directions.top=false;
    }
    if('Space' === event.code){
        directions.space=false;
        spaceHoldStatus = false;
        if(isLeftPosition){
            merlinInitalLeftPosition();
         }else{
         merlinInitalPosition();
     }
    }

});
let methodes = {
        incrementPosition : (position, increment)=>{
        let positionValue = parseInt(merlinContainer.style[position],10);
            if((isNaN(positionValue))&&('left'===position)){
                positionValue = 1;
            }
            if((isNaN(positionValue))&&('top'===position)){
                positionValue = 450;
            }
        positionValue = positionValue + increment;
        merlinContainer.style[position] = positionValue +'px';
        },
        //animation marche droite
        animatedRight: (right = 0) =>{
            merlinContainer.style.height=`${merlinMoves.merlinRun[right].heightContainer}`;
            merlin.style.backgroundImage=`url(${merlinMoves.merlinRun[right].srcImg})`;
            if (directions.left){
                merlin.style.transform = 'scaleX(-1)';               
                merlin.style.backgroundPosition = `${merlinMoves.merlinRunLeft[right].BackgroundX} ${merlinMoves.merlinRunLeft[right].BagroundY}`; 
                merlinContainer.style.width=`${merlinMoves.merlinRunLeft[right].widhtContainer}`;
                merlinContainer.style.top=`${merlinMoves.merlinRunLeft[right].topContainer}`;
                //merlin.style.backgroundImage=`url(assets/img/wizardpack/run.png)`;
            }
            else {
                merlin.style.transform = '';
                merlinContainer.style.width=`${merlinMoves.merlinRun[right].widhtContainer}`;
                merlin.style.backgroundPosition = `${merlinMoves.merlinRun[right].BackgroundX} ${merlinMoves.merlinRun[right].BagroundY}`; 
                merlinContainer.style.top=`${merlinMoves.merlinRun[right].topContainer}`;
            }
            if (right < merlinMoves.merlinRun.length-1){
                right++;
            }else{
                right = 0;
            }
            animMerlinRight = window.setTimeout(()=>{
                methodes.animatedRight(right)
            }, 50);
    },

    //animation attack
    animatedAttack: (attack = 0) =>{
        merlinContainer.style.height=`${merlinMoves.merlinAttack[attack].heightContainer}`;
        merlin.style.backgroundImage=`url(${merlinMoves.merlinAttack[attack].srcImg})`;
        if (isLeftPosition){
           merlin.style.transform = 'scaleX(-1)';               
            merlin.style.backgroundPosition = `${merlinMoves.merlinAttackLeft[attack].BackgroundX} ${merlinMoves.merlinAttackLeft[attack].BagroundY}`; 
            merlinContainer.style.width=`${merlinMoves.merlinAttackLeft[attack].widhtContainer}`;
            //merlin.style.backgroundImage=`url(assets/img/wizardpack/run.png)`;
            merlinContainer.style.top=`${merlinMoves.merlinAttackLeft[attack].topContainer}`;
        }
        else {
            merlin.style.transform = '';
            merlinContainer.style.width=`${merlinMoves.merlinAttack[attack].widhtContainer}`;
            merlin.style.backgroundPosition = `${merlinMoves.merlinAttack[attack].BackgroundX} ${merlinMoves.merlinAttack[attack].BagroundY}`; 
            merlinContainer.style.top=`${merlinMoves.merlinAttack[attack].topContainer}`;
        }
        if (attack < merlinMoves.merlinAttack.length-1){
            attack++;
        }else{
            attack = 0;
        }
        animMerlinAttack = window.setTimeout(()=>{
            methodes.animatedAttack(attack)
        }, 50);
},
             //gestion colission
            onMerlinMove : ()=>{
                const currentMerlin={
                    left: parseFloat(merlinContainer.offsetLeft),
                    top: parseFloat(merlinContainer.offsetTop),
                    height:parseFloat(merlinContainer.offsetHeight),
                    width:parseFloat(merlinContainer.offsetWidth),
                }
                
                //position scorpio collision
                obstacles[2].left = parseInt(scorpio.offsetLeft,10);
                scorpioLeft = parseInt(scorpio.offsetLeft,10);
                //position bear collision
                //window.scroll(left, 0);
                obstacles[3].left = parseInt(bear.offsetLeft,10);
                bearLeft = parseInt(bear.offsetLeft,10);
            obstacles.forEach(obstacle => {
            checkObstacleCollision(obstacle,currentMerlin); 
            }); 
            //after attack ennemy
            document.getElementById("merlin").style.opacity = "1";
            document.getElementById("merlin").style.filter="brightness(1)";
            mountain.style.backgroundImage = `url('assets/img/glacial_mountains/background_glacial_mountains.png')`;
            //merlinInitalPosition();
            //after touch mushroom
            /*document.getElementById("merlin").style.filter="brightness(1)";
            mountain.style.backgroundImage = `url('assets/img/glacial_mountains/background_glacial_mountains.png')`;
            merlinInitalPosition();*/

            toucanMoves(currentMerlin); 
           
            //settime out pour pas augmenter score à l'infini
                 /*setTimeout(()=>{
                    methodes.collision(obstaclesId)
                }, 50);*/
            },
            manageLife: ()=>{
                let widthLife=life.offsetWidth-56;
                life.style.width=widthLife+'px';
                counterLife+=1;
            },
            manageScore: ()=>{
            counter.innerHTML = parseInt(counter.innerHTML,10)+100;
        //if score 1000 open cv + jdialog felicitations
        },
     loopAnimation: (elapsedTime)=>{
    if(directions.right){
        if(merlinContainer.offsetLeft<floorWidth){
        methodes.incrementPosition('left',merlinStep);
        if (!isAnimated){
            isAnimated = true;
            methodes.animatedRight();          
          }   
    }else {
        methodes.incrementPosition('left',-merlinStep);
    }
    }
    if(directions.left){
        if(merlinContainer.offsetLeft<merlininitialLeft){
        methodes.incrementPosition('left',merlinStep);
    }else{
        methodes.incrementPosition('left',-merlinStep);
        if (!isAnimated){
            isAnimated = true;
            methodes.animatedRight();          
          }   
    }}
    if(directions.enterAttack){
        
        if (!isAnimated){
            isAnimated = true;
            methodes.animatedAttack();          
          }   
    }
    if(directions.top){
       /*saut if(divElement.offsetTop<-94){
            methodes.incrementPosition('top',merlinStep);
        }else{
            methodes.incrementPosition('top',-merlinStep);
        }*/
    }
    if(directions.space){
        /*if(merlinContainer.offsetTop>containerinitialBottom){
            methodes.incrementPosition('top',-merlinStep);
        }else{
        methodes.incrementPosition('top',merlinStep);
    }*/
    }
    //methodes.onMerlinMove();
    //methodes.toucanMove(divElement.offsetLeft);
    //methodes.collision();
    //recurssion compte à rebours 50ml secondes
    window.requestAnimationFrame(methodes.loopAnimation);
    //Game over
    if(counterLife>2){
        alert('Vous pouvez réessayez si vous voulez. GAME OVER: attention aux animaux et autres ennemis!');
        //edge chrome
        counterLife=0;
        document.location.reload();   
        //edge
        setTimeout(function(){ location.reload(); }, 2000);     
    }
   
}
};
methodes.loopAnimation(0);
//ok dans mozilla et pas chrome ni edge
setInterval(methodes.onMerlinMove, 1000);


function beginGame(){
    /*alert('Pour jouer, appuyer sur les flèches Droite et Gauche. Pour attaquer appuyer sur Entrée. Pour passer directement au CV ou au site, cliquez sur les boutons en haut à droite');*/
    window.open("presentation.html", "Bienvenue dans le game!", "height=650px, width=1000px");
    alert('Pour jouer, appuyer sur les flèches Droite et Gauche. Pour attaquer appuyer sur Entrée. Pour sauter, appuyez sur Espace. Pour passer directement au CV ou au site, cliquez sur les boutons en haut à droite');
    methodes.loopAnimation(0);
}
beginGame();
//if inactivity

function resetTimer()
{ 
	//merlinInitalPosition(); 
	clearInterval(timer); 
	secondes = 0; 
	timer = setInterval(startTimer, 1000); 
}

window.onload = resetTimer;
window.ontouchstart = resetTimer; 
window.onclick = resetTimer; 
window.onkeypress = resetTimer;
window.onmousemove = resetTimer; 
window.onmousedown = resetTimer;  

function startTimer() 
{ 
	secondes++; 
   /* merlin.style.backgroundImage=`url('assets/img/idle_inactivity.gif')`;
        merlin.style.backgroundPositionY=`-90px`;
        merlin.style.transform = 'scaleX(1)';
        merlinContainer.style.width = '40px';*/
} 