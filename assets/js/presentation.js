        'use strict';
        const jerome= document.getElementById('jerome');
        let newLeft = parseInt(document.getElementById('jerome').style.marginLeft,10);
        const ifocop=document.getElementById("ifocop");
        const buttonPlay= document.getElementById("buttonPlay");
        const IntervalDisplayButton= 10000;
        let animJeromeId, animPunchId;
        let opacityButton=1;
        let isJeromePunch=false;
        function setBlockDisplay(element) {
            element.style.display="block";
    }
    setTimeout(() => setBlockDisplay(ifocop), IntervalDisplayButton);
    function displayPunch() {
        jerome.style.backgroundImage=`url('assets/img/punch_anim.gif')`;
        jerome.style.width='750px'; 
        jerome.style.zIndex=5;
        ifocop.style.opacity -= 0.05;
        if (isJeromePunch){
            setTimeout(() =>stopAnimInterval(animJeromeId), 0);
            //setTimeout(() =>stopAnimTimeOut(animPunchId), 0);

            setTimeout(() =>setBlockDisplay(merlin), 1000);
            setTimeout(() =>{jerome.remove();}, 1000);
            setTimeout(() =>playButton(), 1000);
            
        }
}
ifocop.addEventListener('click',()=>{
            animJeromeId=setInterval(moveJeromeAndPunch, 100);
        });
    function moveJeromeAndPunch(){
        if(isNaN(newLeft)) newLeft=0;
        jerome.style.backgroundImage=`url('assets/img/walk_anim.gif')`;
        jerome.style.width='320px';   
        if(newLeft<340){
        newLeft=newLeft+10;
        jerome.style.marginLeft=newLeft+"px";
        }
        if (newLeft>=340&&!isJeromePunch){
            isJeromePunch=true;
            animPunchId=setTimeout(displayPunch,0);
            jerome.style.backgroundImage=`url('assets/img/punch_anim.gif')`;
        }
    }
    function stopAnimInterval(animationId){
        clearInterval(animationId);
    }
    function stopAnimTimeOut(animationIdTime){
        clearTimeout(animationIdTime);
    }
    function playButton(){
       buttonPlay.style.display="block";
        buttonPlay.addEventListener("click",()=>{
            window.close();
        })
    }
    
   
    
    