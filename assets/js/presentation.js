let figure= document.getElementById('figure');
        let newLeft = document.getElementById('figure').offsetLeft;
        let ifocop=document.getElementById("ifocop");
        let displayButton = function() {
            ifocop.style.display="block";   
    }
    setTimeout(displayButton, 8000);

    ifocop.addEventListener('click',moveFigure());
        function moveFigure(){
            figure.style.backgroundImage=`url('assets/img/walk_anim.gif')`;
            figure.style.width='300px';
            newLeft=+50;
            figure.style.left=newLeft+'px';
            ifocop.style.display="none";
        }