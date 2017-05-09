current = 'FF0';
choice = false;

last = null;
lastobx = null;
lastoby = null;

obx = 0;
oby = 0;

function movement(cell, x, y, xx, yy) {
    if(choice == true){
        choose(x,y);
        return;
    }

    if ((obx != 0 || oby != 0) && (x != obx || y != oby))
        return;

    if (cell.innerHTML != '')
        return;
    
    last = cell;
    lastobx = obx;
    lastoby = oby;
    
    cell.appendChild(playerDot());
    
    if(isFull(xx,yy)){
        choice = true;
        alert("Este quadrante está cheio, por favor escolha um com espaços para o próximo jogador.");
        
        obx = 0;
        oby = 0;
        
        paintBoard(0,0);
        
        return;
    }

    obx = xx;
    oby = yy;

    changePlayer();
    
    paintBoard(obx,oby);
}

function choose(x,y){
    if(isFull(x,y))
        return;
    
    choice = false;
    
    changePlayer();

    obx = x;
    oby = y;
        
    paintBoard(obx,oby);
}

function playerDot(){
    return document.getElementById('playerdiv').childNodes[1].cloneNode(true);
}

function isFull(x,y){
    var area = document.getElementById('x'+x+'y'+y);
    
    for(var i = 0; i <= 4; i = i+2)
        for(var j = 1; j <= 5; j = j+2)
            if(area.childNodes[1].childNodes[1].childNodes[i].childNodes[j].innerHTML == "")
                return false;
    
    return true;
}

function changePlayer(){
    if (current == 'FF0')
        current = 'e01839';
    else
        current = 'FF0';

    document.getElementById('playerdiv').childNodes[1].setAttribute("style", "color:#" + current);
}

function paintArea(x,y){
    document.getElementById('x' + x + 'y' + y).style.backgroundColor = 'gray';
    document.getElementById('x' + x + 'y' + y).style.cursor = 'pointer';
}

function resetArea(x,y){
    document.getElementById('x'+x+'y'+y).style.backgroundColor = '';
    document.getElementById('x'+x+'y'+y).style.cursor = 'default';
}

function resetBoard(){
    resetArea(1,1);
    resetArea(2,1);
    resetArea(3,1);
    
    resetArea(1,2);
    resetArea(2,2);
    resetArea(3,2);
    
    resetArea(1,3);
    resetArea(2,3);
    resetArea(3,3);
}

function paintBoard(x,y){
    resetBoard();
    if(x > 0 && y > 0)
        paintArea(x,y);
    else{
        if(!isFull(1,1))
            paintArea(1,1);
        if(!isFull(2,1))
            paintArea(2,1);
        if(!isFull(3,1))
            paintArea(3,1);
        
        if(!isFull(1,2))
            paintArea(1,2);
        if(!isFull(2,2))
            paintArea(2,2);
        if(!isFull(3,2))
            paintArea(3,2);
        
        if(!isFull(1,3))
            paintArea(1,3);
        if(!isFull(2,3))
            paintArea(2,3);
        if(!isFull(3,1))
            paintArea(3,3);
    }
}

function desfazer() {
    if(last == null)
        return;
    
    obx = lastobx;
    oby = lastoby;
    
    changePlayer();

    last.innerHTML = '';
    paintBoard(obx,oby);
}