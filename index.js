'use strict';
const counter = document.getElementById("counter");
const merlinContainer = document.getElementById("merlinContainer");
const merlin = document.getElementById("merlin");
const toucan = document.getElementById("toucan");
let isToucanFlying=false;
let isBubblesUp=false;
let counterLogos=0;
const mushroom = document.getElementById("mushroom");
const chest = document.getElementById("chest");
const bubbles = document.getElementById('bubbles');
const angular = document.getElementById('angular');
const nodeJS = document.getElementById('nodeJS');
const merlinStep = 5;
const merlininitialLeft = parseInt(document.getElementById('merlinContainer').offsetLeft,10)-80;
const floorWidth=parseInt(document.getElementById('floor').offsetWidth,10);
const containerinitialBottom=parseInt(document.getElementById('merlinContainer').offsetTop,10);
let tIDCollision, animMerlinRight;
let isAnimated = false;
function checkCollision(element1,element2){
    if ((element1.left < element2.left + element2.width) && (element1.left + element1.width > element2.left) && (element1.top < element2.top + element2.height) && (element1.height + element1.top > element2.top)) {
        // collision détectée !
     // methodes.popAngular();
     return true
    }
  return false
    
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
function checkObstacleCollision(obstacle,merlin){
    const isACollision = checkCollision(obstacle,merlin);
    if(isACollision){
        obstacle.idTouched.style.display="block";
        obstacle.id.style.display="none";
        if (obstacle.touched===false){
            methodes.manageScore();
            bubblesUp();
        }
        obstacle.touched=true;
    }else{
        obstacle.idTouched.style.display="none";
        obstacle.id.style.display="block";
    }
}
function bubblesUp(){
        bubbles.style.display="block";
        bubbles.classList.add("bubblesUp");
        isBubblesUp=true;
        counterLogos++;
        if(counterLogos===1){
            angular.style.display="block";
        }
            if(counterLogos===2){
                nodeJS.style.display="block";
            } 
        setTimeout(()=>{         
            bubbles.classList.remove("bubblesUp");
            bubbles.style.display="none";
           
    }, 4000);
    
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
},
{
    left: parseInt(mushroom.offsetLeft,10),
    top: parseInt(mushroom.offsetTop,10),
    width: parseInt(mushroom.offsetWidth,10),
    height: parseInt(mushroom.offsetHeight,10),
    id: document.getElementById('mushroom'),
    idTouched:document.getElementById('mushroomTouched'),
    touched:false,
}]
//perso objet
const merlinMoves={
        idleBase:[{
            srcImg:'assets/img/wizardpack/idle.png',
            BackgroundX: '0px',
            BagroundY: '0px',
            widhtContainer: '151px',
            heightContainer: '140px',
        },
        {
            srcImg:'assets/img/wizardpack/idle.png',
            BackgroundX: '0px',
            BagroundY: '0px',
            widhtContainer: '151px',
            heightContainer: '140px',
        },
        {
            srcImg:'assets/img/wizardpack/idle.png',
            BackgroundX: '0px',
            BagroundY: '0px',
            widhtContainer: '151px',
            heightContainer: '140px',
        },
        {
            srcImg:'assets/img/wizardpack/idle.png',
            BackgroundX: '0px',
            BagroundY: '0px',
            widhtContainer: '151px',
            heightContainer: '140px',
        },],
        merlinRun:[{
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-297px',
            BagroundY: '0px',
            widhtContainer: '151px',
            heightContainer: '140px',
        },
        {
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-533px',
            BagroundY: '-3px',
            widhtContainer: '151px',
            heightContainer: '140px',
        },
        {
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-749px',
            BagroundY: '0px',
            widhtContainer: '151px',
            heightContainer: '140px',
        },
        {
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-983px',
            BagroundY: '0px',
            widhtContainer: '151px',
            heightContainer: '140px',
        },
        {
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-1219px',
            BagroundY: '-4px',
            widhtContainer: '151px',
            heightContainer: '140px',
        },
        {
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-1458px',
            BagroundY: '-4px',
            widhtContainer: '151px',
            heightContainer: '140px',
        },
        {
            srcImg:'assets/img/wizardpack/run.png',
            BackgroundX: '-1674px',
            BagroundY: '0px',
            widhtContainer: '151px',
            heightContainer: '140px',
        }]

}
const directions = {
    top: false,
    left: false,
    right: false,
    bottom: false
};
window.addEventListener('keydown', (event)=>{
    if('ArrowRight' === event.code){
        directions.right=true;
        methodes.onMerlinMove();
       
    }
    if('ArrowLeft' === event.code){
        directions.left=true;
        methodes.onMerlinMove();
    } 
    if('ArrowUp' === event.code){
        directions.top=true;
    }
    if('ArrowDown' === event.code){
        directions.bottom=true;
    }
});
window.addEventListener('keyup', (event)=>{
    if('ArrowRight' === event.code){
        directions.right=false;
        clearTimeout(animMerlinRight);
       isAnimated = false;
        
    }
    if('ArrowLeft' === event.code){
        directions.left=false;
        clearTimeout(animMerlinRight);
        isAnimated = false;
    } 
    if('ArrowUp' === event.code){
        directions.top=false;
    }
    if('ArrowDown' === event.code){
        directions.bottom=false;
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
            if (directions.left){
                merlin.style.transform = 'scaleX(-1)';
                let leftPosition = parseFloat(merlinMoves.merlinRun[right].BackgroundX);
                leftPosition+=15;
                leftPosition=leftPosition+'px';                
                merlin.style.backgroundPosition = `${leftPosition} ${merlinMoves.merlinRun[right].BagroundY}`; 
                merlinContainer.style.width=`160px`;
            }
            else {
                merlin.style.transform = '';
                merlinContainer.style.width=`${merlinMoves.merlinRun[right].widhtContainer}`;
                merlin.style.backgroundPosition = `${merlinMoves.merlinRun[right].BackgroundX} ${merlinMoves.merlinRun[right].BagroundY}`; 
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
             //gestion colission
            onMerlinMove : ()=>{
                const currentMerlin={
                    left: parseFloat(merlinContainer.offsetLeft),
                    top: parseFloat(merlinContainer.offsetTop),
                    height:parseFloat(merlinContainer.offsetHeight),
                    width:parseFloat(merlinContainer.offsetWidth),
                }
                //window.scroll(left, 0);
            obstacles.forEach(obstacle => {
            checkObstacleCollision(obstacle,currentMerlin); 
            }); 
            
            toucanMoves(currentMerlin); 
             
            //settime out pour pas augmenter score à l'infini
                 /*setTimeout(()=>{
                    methodes.collision(obstaclesId)
                }, 50);*/
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
    if(directions.top){
       /*saut if(divElement.offsetTop<-94){
            methodes.incrementPosition('top',merlinStep);
        }else{
            methodes.incrementPosition('top',-merlinStep);
        }*/
    }
    if(directions.bottom){
        if(merlinContainer.offsetTop>containerinitialBottom){
            methodes.incrementPosition('top',-merlinStep);
        }else{
        methodes.incrementPosition('top',merlinStep);
    }
    }
    //methodes.toucanMove(divElement.offsetLeft);
    //methodes.collision();
    //recurssion compte à rebours 50ml secondes
    window.requestAnimationFrame(methodes.loopAnimation);
}
};
methodes.loopAnimation(0);


