var HETIC = [];
var circles = [];
var connexion = [];
var grp = [];
function newObj(nom,inf,int) {
	var o = {
		name : nom,
		influence : inf,
		interactions : int
		};
	return o;
}
$(function(){
	var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

	if (document.attachEvent) //if IE (and Opera depending on user setting)
	    document.attachEvent("on"+mousewheelevt, wheel)
	else if (document.addEventListener) //WC3 browsers
	    document.addEventListener(mousewheelevt, wheel, false)
	
	
	var intA=[{"nom":"Thomas","id":"B"},{"nom":"Marius","id":"C"}];
	var intB=[{"nom":"Léonard","id":"A"}];
	var intC=[{"nom":"Léonard","id":"A"}];
	
	A = newObj("Léonard",59,intA);
	D = newObj("Léonard",20,intA);
	E = newObj("Léonard",40,intA);
	F = newObj("Léonard",89,intA);
	G = newObj("Léonard",17,intA);
	H = newObj("Léonard",90,intA);
	I = newObj("Léonard",77,intA);
	J = newObj("Léonard",66,intA);
	JA = newObj("Léonard",66,intA);
	JZ = newObj("Léonard",66,intA);
	JE = newObj("Léonard",66,intA);
	JR = newObj("Léonard",66,intA);
	JT = newObj("Léonard",66,intA);
	JY = newObj("Léonard",66,intA);
	JU = newObj("Léonard",66,intA);
	JI = newObj("Léonard",66,intA);
	JO = newObj("Léonard",66,intA);
	JP = newObj("Léonard",66,intA);
	JQ = newObj("Léonard",66,intA);
	JS = newObj("Léonard",66,intA);
	JD = newObj("Léonard",66,intA);
	JF = newObj("Léonard",66,intA);
	JG = newObj("Léonard",66,intA);
	JH = newObj("Léonard",66,intA);
	JJ = newObj("Léonard",66,intA);
	JK = newObj("Léonard",66,intA);
	B = newObj("Thomas",0,intB);
	C = newObj("Marius",100,intC);
	HETIC.push(A,B,C);
	HETIC.push(A,B,C,D,E,F,G,H,I,J,JA,JZ,JE,JR,JT,JY,JU,JI,JO,JP,JQ,JS,JD,JF,JG,JH);
	var r=Raphael('container',"100%","100%");
	var _r = "#container";
	var viewBoxWidth  = 1000; 
	var viewBoxHeight = 800;
	var mousedown;
	var dX,dY;
	var oX = 0, oY = 0, oWidth = viewBoxWidth, oHeight = viewBoxHeight;
	var viewBox = r.setViewBox(oX,oY,viewBoxWidth,viewBoxHeight);
		viewBox.X = oX;
		viewBox.Y = oY;
		
	function zoom(delta) {
		vBHo = viewBoxHeight;
		vBWo = viewBoxWidth;
		if (delta < 0) {
			viewBoxWidth *= 0.95;
			viewBoxHeight*= 0.95;
		} else {
			viewBoxWidth *= 1.05;
			viewBoxHeight*= 1.05;
		}
		viewBox.X -= (viewBoxWidth - vBWo) / 2;
		viewBox.Y -= (viewBoxHeight - vBHo) / 2;
		r.setViewBox(viewBox.X,viewBox.Y,viewBoxWidth,viewBoxHeight);
		}
		
	function wheel(event){
		var delta = 0;
		if (!event) /* For IE. */
		event = window.event;
		if (event.wheelDelta) { /* IE/Opera. */
			delta = event.wheelDelta/120;
		} else if (event.detail) { /** Mozilla case. */
			delta = -event.detail/3;
		}
		if (delta) {
			zoom(delta);
		}
		if (event.preventDefault) {
			event.preventDefault();
		}          
		event.returnValue = false;
    }
	
	$(_r).mousedown(function(e){
		if (r.getElementByPoint( e.pageX, e.pageY ) != null) {return;}
		mousedown = true;
		startX = e.pageX; 
		startY = e.pageY;    
	});

	$(_r).mousemove(function(e){
		if (!mousedown) {return;}
		dX = startX - e.pageX;
		dY = startY - e.pageY;
		x = viewBoxWidth / 1000; // r.width 
		y = viewBoxHeight / 800;//r.height 
		dX *= x; 
		dY *= y; 
	            //alert(viewBoxWidth +" "+ paper.width );
		r.setViewBox(viewBox.X + dX, viewBox.Y + dY, viewBoxWidth, viewBoxHeight);
	})

	$(_r).mouseup(function(e){
		if (!mousedown) return; 
		viewBox.X += dX; 
		viewBox.Y += dY; 
		mousedown = false; 
	});
	
	function rdm(from, to){
		return Math.floor(Math.random() * (to - from + 1) + from);
	}

	function wiggle (t,wbound,origCx,origCy) {
		var newcx = origCx + rdm(-wbound, wbound);
		var newcy = origCy + rdm(-wbound, wbound);
		t[0].animate({cx: newcx, cy: newcy}, 500, '<');
		t[1].animate({cx: newcx, cy: newcy}, 500, '<');
	}
	
	
	for (pin in HETIC ){
		var group = r.set();
		var intLength = HETIC[pin].interactions.length;
		var rad = intLength*10; // ajustements possible (taille)
		var l = 1/2*(100-HETIC[pin].influence)+35 // ajustements possibles (couleur)
		var cx = Math.random()*900+200+rad;
		var cy = Math.random()*600+100+rad;
		var color = Raphael.hsl(203,90,l);
		var circle = r.circle(cx,cy,rad); 
			circle.name = HETIC[pin].name;
			circle.hover(function(e) {console.log(this.name)},function() {})
			circle.attr({"stroke":"transparent", fill: color});
		var text = r.text(cx,cy,HETIC[pin].name)
		group.push(circle);
		group.push(text);
		group.hover(function(e) {console.log(e)})
		circles.push({"name":circle.name,"circle":circle,"interactions":HETIC[pin].interactions});
		grp.push(group)
	}
	grp[0].rotate(Math.random() * 90);
	var grpL = grp.length;
	for (i=0;i<grpL;i++){
		setInterval(function() {
			wiggle(group[i],10,cx,cy)
		},1000)
	}
	// console.log(circles)
	var test = [];
	for (i=0;i<circles.length;i++){
		// console.log(circles[i],'cercle')
		for (j=0;j<circles[i].interactions.length;j++){
			// console.log(circles[i].name)
			// console.log(circles[i].interactions[j].nom,'interaction')
			for (k=0;k<circles.length;k++){
				// console.log("does it")
				// console.log(circles[k].name,"match ?")
				if (circles[i].interactions[j].nom == circles[k].name) {
					for(m=0;i<test.length;m++){
						// console.log(test,'ttrtrtrtrtrtr');
						if(circles[i]!=test[1]){
							test.push({"1":circles[k],"2":circles[i]})
							// console.log(test,"ytrertyuytr")
						}
					}
					// console.log(circles[k].name,"match")
					var circle1 = circles[i].circle;
					var circle2 = circles[k].circle;
					// console.log(circles[i].circle,circle2,"OUI")
					if(connexion.push(r.connection(circle1,circle2,"#000",r))){console.log('done')}
				};
			}
		};
		// console.log(HETIC[pin].interactions[i]);
		// var x = circle.attrs.cx;
		// var y = circle.attrs.cy;
		// var w = Math.sqrt((circle.attrs.cy)*(circle.attrs.cy)+(circle.attrs.cx)*(circle.attrs.cx));
		// var h = 2;
		// var line = r.rect(x, y, w, h);
	}
});