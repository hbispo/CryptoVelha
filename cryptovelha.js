atual = 'FF0';
last = null;
obx = 0;
oby = 0;

function clique(cell,x,y,xx,yy) {
	if((obx!=0 || oby!=0) && (x!=obx || y!=oby))
		return;
	
	if(cell.innerHTML != '')
		return;
	
	last = cell;
	var jogador = document.getElementById('jogadordiv').childNodes[1].cloneNode(true);
	cell.appendChild(jogador);
	
	
	
	if(atual == 'FF0')
		atual = 'e01839';
	else
		atual = 'FF0';
	
	document.getElementById('jogadordiv').childNodes[1].setAttribute("style","color:#"+atual);
	
	obx = xx;
	oby = yy;
	document.getElementById('x1y1').style.backgroundColor = '';
	document.getElementById('x2y1').style.backgroundColor = '';
	document.getElementById('x3y1').style.backgroundColor = '';
	document.getElementById('x1y2').style.backgroundColor = '';
	document.getElementById('x2y2').style.backgroundColor = '';
	document.getElementById('x3y2').style.backgroundColor = '';
	document.getElementById('x1y3').style.backgroundColor = '';
	document.getElementById('x2y3').style.backgroundColor = '';
	document.getElementById('x3y3').style.backgroundColor = '';
	document.getElementById('x1y1').style.cursor = 'default';
	document.getElementById('x2y1').style.cursor = 'default';
	document.getElementById('x3y1').style.cursor = 'default';
	document.getElementById('x1y2').style.cursor = 'default';
	document.getElementById('x2y2').style.cursor = 'default';
	document.getElementById('x3y2').style.cursor = 'default';
	document.getElementById('x1y3').style.cursor = 'default';
	document.getElementById('x2y3').style.cursor = 'default';
	document.getElementById('x3y3').style.cursor = 'default';
	document.getElementById('x'+xx+'y'+yy).style.backgroundColor = 'gray';
	document.getElementById('x'+xx+'y'+yy).style.cursor = 'pointer';
}

function desfazer() {
	if(atual == 'FF0')
		atual = 'e01839';
	else
		atual = 'FF0';
	
	document.getElementById('jogador').setAttribute("style","color:#"+atual);
	
	last.innerHTML = '';
}