        'use strict';
        let figure= document.getElementById('figure');
        let newLeft = parseFloat(document.getElementById('figure').style.marginLeft);
        let ifocop=document.getElementById("ifocop");
        let animFigure,punch, animPunch;
        let counterPunch=0;
        let opacityButton=1;
        let displayButton = function() {
            ifocop.style.display="block";
    }
    setTimeout(displayButton, 10000);
    let displayPunch = function() {
        figure.style.backgroundImage=`url('assets/img/punch_anim.gif')`;
        figure.style.width='750px'; 
        figure.style.zIndex=5;
        opacityButton=opacityButton-0.05;
        ifocop.style.opacity = opacityButton;
        if (counterPunch>4){
            displayMerlin();
            playButton();
            setTimeout(stopAnim, 0);
            setTimeout(stopPunch, 0);
        }


}
let displayMerlin = function(){
    figure.style.backgroundImage=`url('assets/img/merlin-jump.png')`;
       //figure.style.width='900px'; 
       figure.style.width='100px';
       figure.style.height='150px';
       figure.style.marginLeft="500px";

      
}
ifocop.addEventListener('click',moveFigure);
        function moveFigure(){
            let animFigure=setInterval(moveFigure2, 100);
            
            //figure.style.marginLeft=newLeft+'px';
        }
    let moveFigure2=function(){
        if(isNaN(newLeft)) newLeft=0;
        figure.style.backgroundImage=`url('assets/img/walk_anim.gif')`;
        figure.style.width='320px';   
        if(newLeft<340){
        newLeft=newLeft+10;
        }
        document.getElementById('figure').style.marginLeft=newLeft+"px";
        console.log(document.getElementById('figure').style.marginLeft);
        if (newLeft>330){
            counterPunch=counterPunch+1;
            let animPunch=setInterval(displayPunch,100);
            figure.style.backgroundImage=`url('assets/img/punch_anim.gif')`;

        }
    }
    let stopPunch=function(){
        clearInterval(animPunch);
    }
    let stopAnim=function(){
        clearInterval(animFigure);
    }
    let playButton =function(){
        let buttonPlay= document.getElementById("buttonPlay");
       buttonPlay.style.display="block";
        buttonPlay.addEventListener("click",function(){
            window.close();
        })
    }
    
   
    
    