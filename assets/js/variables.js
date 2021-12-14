'use strict';
const counter = document.getElementById("counter");
const merlinContainer = document.getElementById("merlinContainer");
const merlin = document.getElementById("merlin");
const toucan = document.getElementById("toucan");
const plantAttack = document.getElementById("plantAttack");
const plant = document.getElementById("plant");
const life = document.getElementById("life");
let counterLife=0;
const bear = document.getElementById("bear");
const mountain = document.getElementById("mountain");
const sky = document.getElementById("sky");
let timer, secondes = 0; 
let isToucanFlying=false;
let isPlantAttack=false;
let isLeftPosition=false;
let isAttack;
let isBubblesUp=false;
let isJumping = false;
let spaceHoldStatus = false;
let scorpioLeft, bearLeft;
let counterLogos=0;
const mongo= document.getElementById("mongo");
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
},
{
    left: 975,
    top: 534,
    width: 105,
    height: 68,
    id: document.getElementById('plantAttack'),
    idTouched:document.getElementById('plantTouched'),
    touched:false,
    class:'',
    enemy:true,
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