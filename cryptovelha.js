current = 'FF0';
choice = false;

last = null;
lastobx = null;
lastoby = null;

obx = 0;
oby = 0;

game = [3];
game[1] = [3];
game[2] = [3];
game[3] = [3];

game[1][1] = '';
game[2][1] = '';
game[3][1] = '';

game[1][2] = '';
game[2][2] = '';
game[3][2] = '';

game[1][3] = '';
game[2][3] = '';
game[3][3] = '';

winner = '';

function movement(cell, x, y, xx, yy) {
    if(winner != '')
        return;
    
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
    paintVictory(x,y,xx,yy)
    
    if(winner != '')
        return;
    
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

function paintVictory(x,y,xx,yy){
    if(game[x][y] != '')
        return;
    
    var cor = document.getElementById('x'+x+'y'+y+'xx'+xx+'yy'+yy).childNodes[0].style.color;
    
    var lin = false;
    var lin1 = false;
    var lin2 = false;
    var lin3 = false;
    
    if(document.getElementById('x'+x+'y'+y+'xx1yy'+yy).innerHTML != '')
        lin1 = document.getElementById('x'+x+'y'+y+'xx1yy'+yy).childNodes[0].style.color;
    if(document.getElementById('x'+x+'y'+y+'xx2yy'+yy).innerHTML != '')
        lin2 = document.getElementById('x'+x+'y'+y+'xx2yy'+yy).childNodes[0].style.color;
    if(document.getElementById('x'+x+'y'+y+'xx3yy'+yy).innerHTML != '')
        lin3 = document.getElementById('x'+x+'y'+y+'xx3yy'+yy).childNodes[0].style.color;
    
    if (cor == lin1 && lin1 == lin2 && lin2 == lin3)
        lin = true;
    
    var col = false;
    var col1 = false;
    var col2 = false;
    var col3 = false;
    
    if(document.getElementById('x'+x+'y'+y+'xx'+xx+'yy1').innerHTML != '')
        col1 = document.getElementById('x'+x+'y'+y+'xx'+xx+'yy1').childNodes[0].style.color;
    if(document.getElementById('x'+x+'y'+y+'xx'+xx+'yy2').innerHTML != '')
        col2 = document.getElementById('x'+x+'y'+y+'xx'+xx+'yy2').childNodes[0].style.color;
    if(document.getElementById('x'+x+'y'+y+'xx'+xx+'yy3').innerHTML != '')
        col3 = document.getElementById('x'+x+'y'+y+'xx'+xx+'yy3').childNodes[0].style.color;
    
    if (cor == col1 && col1 == col2 && col2 == col3)
        col = true;
    
    var dd = false;
    if(xx == yy){
        var dd1 = false;
        var dd2 = false;
        var dd3 = false;

        if(document.getElementById('x'+x+'y'+y+'xx1yy1').innerHTML != '')
            dd1 = document.getElementById('x'+x+'y'+y+'xx1yy1').childNodes[0].style.color;
        if(document.getElementById('x'+x+'y'+y+'xx2yy2').innerHTML != '')
            dd2 = document.getElementById('x'+x+'y'+y+'xx2yy2').childNodes[0].style.color;
        if(document.getElementById('x'+x+'y'+y+'xx3yy3').innerHTML != '')
            dd3 = document.getElementById('x'+x+'y'+y+'xx3yy3').childNodes[0].style.color;

        if (cor == dd1 && dd1 == dd2 && dd2 == dd3)
            dd = true;
    }
    
    var da = false;
    var dif = ((xx - yy) < 0 ? (xx - yy) * -1 : (xx - yy));
    if(dif != 1){
        var da1 = false;
        var da2 = false;
        var da3 = false;

        if(document.getElementById('x'+x+'y'+y+'xx3yy1').innerHTML != '')
            da1 = document.getElementById('x'+x+'y'+y+'xx3yy1').childNodes[0].style.color;
        if(document.getElementById('x'+x+'y'+y+'xx2yy2').innerHTML != '')
            da2 = document.getElementById('x'+x+'y'+y+'xx2yy2').childNodes[0].style.color;
        if(document.getElementById('x'+x+'y'+y+'xx1yy3').innerHTML != '')
            da3 = document.getElementById('x'+x+'y'+y+'xx1yy3').childNodes[0].style.color;

        if (cor == da1 && da1 == da2 && da2 == da3)
            da = true;
    }
    
    if(lin){
        paintLine(x,y,yy);
        game[x][y] = cor;
    }
    if(col){
        paintColumn(x,y,xx);
        game[x][y] = cor;
    }
    if(dd){
        paintDiag(x,y,'d');
        game[x][y] = cor;
    }
    if(da){
        paintDiag(x,y,'a');
        game[x][y] = cor;
    }
    
    if(game[x][y] != '')
        paintEnd(x,y);
}

function paintEnd(x,y){
    
    var lin = false;
    if(game[x][1] == game[x][2] && game[x][2] == game[x][3])
        lin = true;
    
    var col = false;
    if(game[1][y] == game[2][y] && game[2][y] == game[3][y])
        col = true;
    
    var dd = false;
    if(x==y && game[1][1] != '' && game[1][1] == game[2][2] && game[2][2] == game[3][3])
        dd = true;
    
    var da = false;
    if((x-y) != 1 && (x-y) != -1 && game[1][3] != '' && game[1][3] == game[2][2] && game[2][2] == game[3][1])
        da = true;
    
    resetBoard();
    
    if(lin){
        winner = game[x][y];
        document.getElementById('x1y'+y).style.backgroundColor = 'gray';
        document.getElementById('x2y'+y).style.backgroundColor = 'gray';
        document.getElementById('x3y'+y).style.backgroundColor = 'gray';
    }
    if(col){
        winner = game[x][y];
        document.getElementById('x'+x+'y1').style.backgroundColor = 'gray';
        document.getElementById('x'+x+'y2').style.backgroundColor = 'gray';
        document.getElementById('x'+x+'y3').style.backgroundColor = 'gray';
    }
    if(dd){
        winner = game[x][y];
        document.getElementById('x1y1').style.backgroundColor = 'gray';
        document.getElementById('x2y2').style.backgroundColor = 'gray';
        document.getElementById('x3y3').style.backgroundColor = 'gray';
    }
    if(da){
        winner = game[x][y];
        document.getElementById('x1y3').style.backgroundColor = 'gray';
        document.getElementById('x2y2').style.backgroundColor = 'gray';
        document.getElementById('x3y1').style.backgroundColor = 'gray';
    }
    
    if(winner != '')
        document.getElementById('playerdiv').childNodes[0].textContent = "O jogo acabou! Vencedor: ";
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

function paintLine(x,y,yy){    
    document.getElementById('x'+x+'y'+y+'xx1yy'+yy).style.backgroundColor = 'white';
    document.getElementById('x'+x+'y'+y+'xx2yy'+yy).style.backgroundColor = 'white';
    document.getElementById('x'+x+'y'+y+'xx3yy'+yy).style.backgroundColor = 'white';
}

function paintColumn(x,y,xx){
    document.getElementById('x'+x+'y'+y+'xx'+xx+'yy1').style.backgroundColor = 'white';
    document.getElementById('x'+x+'y'+y+'xx'+xx+'yy2').style.backgroundColor = 'white';
    document.getElementById('x'+x+'y'+y+'xx'+xx+'yy3').style.backgroundColor = 'white';
}

function paintDiag(x,y,dir){
    if(dir=='d'){
        document.getElementById('x'+x+'y'+y+'xx1yy1').style.backgroundColor = 'white';
        document.getElementById('x'+x+'y'+y+'xx2yy2').style.backgroundColor = 'white';
        document.getElementById('x'+x+'y'+y+'xx3yy3').style.backgroundColor = 'white';
    }
    if(dir=='a'){
        document.getElementById('x'+x+'y'+y+'xx3yy1').style.backgroundColor = 'white';
        document.getElementById('x'+x+'y'+y+'xx2yy2').style.backgroundColor = 'white';
        document.getElementById('x'+x+'y'+y+'xx1yy3').style.backgroundColor = 'white';
    }
}

function paintArea(x,y){
    document.getElementById('x' + x + 'y' + y).style.backgroundColor = 'gray';
    document.getElementById('x' + x + 'y' + y).style.cursor = 'pointer';
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

function desfazer() {
    if(last == null)
        return;
    
    obx = lastobx;
    oby = lastoby;
    
    changePlayer();

    last.innerHTML = '';
    paintBoard(obx,oby);
}