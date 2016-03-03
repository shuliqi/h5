var isScrolling = null;
var startPos = null;
var endPos  =null;
var index = 0;
var clientX = document.documentElement.offsetWidth || document.body.offsetWidth;
var oContainer = document.getElementById("slide");
var aIndex = oContainer.getElementsByTagName('div');
var oIcon = document.getElementById('icon');
var aIcon = oIcon.getElementsByTagName('span');
oContainer.ontouchstart = function(event){	
	var touch = event.targetTouches[0];//获取第一个手指
	startPos = {x:touch.pageX,y:touch.pageY,time:+new Date};//获取当前手指的坐标
	isScrolling = 0;
}
oContainer.ontouchmove = function(event){
	//当有其他的放大操作的时候，就不执行
	if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
		var touch = event.targetTouches[0];
		endPos = {x:touch.pageX - startPos.x,y:touch.pageY - startPos.y};
		isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0;
		if(isScrolling === 0){
　　　　		event.preventDefault(); 
　　　　		oContainer.style.left = -clientX * index + endPos.x +'px' ;
　　		}						
}
oContainer.ontouchend = function(){
	var duration = +new Date - startPos.time;   
	if(Number(duration) > 10){ 		
			if(endPos.x > 10){
                if(index !== 0) index -= 1;
            }
			else if(endPos.x < -10){
                if(index !== aIndex.length-1) index += 1;
            }
	}
	this.style.left = -100*index + '%';
	for (var i = 0; i < aIcon.length; i++) {
		aIcon[i].style.width = 13+ 'px';
		aIcon[i].style.height = 13 + 'px';		
	}
	aIcon[index].style.width = 17+ 'px';
	aIcon[index].style.height = 17 + 'px';	
	this.removeEventListener('ontouchmove',this,false);
    this.removeEventListener('ontouchend',this,false);
}