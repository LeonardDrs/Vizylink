var HETIC = [];
var circles = [];
var grp = [];
var link = [];
var onClickCircle=false;
// var pos = [{"x":0,"y":0,"r":0}];
var pos = [{}];
function newObj(nom,inf,int,id) {
	var o = {
		name : nom,
		influence : inf,
		interactions : int,
		ID: id
		};
	return o;
}
$(function(){
	var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

	if (document.attachEvent) //if IE (and Opera depending on user setting)
	    document.attachEvent("on"+mousewheelevt, wheel)
	else if (document.addEventListener) //WC3 browsers
	    document.addEventListener(mousewheelevt, wheel, false)
	
	
	var intA=[{"nom":"Thomas","ID":"B"},{"nom":"Marius","ID":"C"},{"nom":"LEO","ID":"E"}];
	var intB=[{"nom":"Léonard","ID":"A"},{"nom":"LEO","ID":"E"},{"nom":"LEO","ID":"F"},{"nom":"LEO","ID":"G"},{"nom":"LEO","ID":"H"},{"nom":"LEO","ID":"I"},{"nom":"LEO","ID":"J"},{"nom":"LEO","ID":"JA"},{"nom":"LEO","ID":"JZ"},{"nom":"LEO","ID":"JE"},{"nom":"LEO","ID":"JR"},{"nom":"LEO","ID":"JT"},{"nom":"LEO","ID":"JY"},{"nom":"LEO","ID":"JU"},{"nom":"LEO","ID":"JI"},{"nom":"LEO","ID":"JO"},{"nom":"LEO","ID":"JP"},{"nom":"LEO","ID":"JQ"}];
	var intC=[{"nom":"Léonard","ID":"A"}];
	var intE=[{"nom":"Léonard","ID":"A"},{"nom":"Thomas","ID":"B"}];
	
	A = newObj("Léonard",59,intA,"A");
	B = newObj("Thomas",0,intB,"B");
	C = newObj("Marius",100,intC,"C");
	D = newObj("Léonard",20,intA,"D");
	E = newObj("LEO",40,intE,"E");
	F = newObj("Léonard",89,intA,"F");
	G = newObj("Léonard",17,intA,"G");
	H = newObj("Léonard",90,intA,"H");
	I = newObj("Léonard",77,intA,"I");
	J = newObj("Léonard",66,intA,"J");
	JA = newObj("Léonard",66,intA,"JA");
	JZ = newObj("Léonard",66,intA,"JZ");
	JE = newObj("Léonard",66,intA,"JE");
	JR = newObj("Léonard",66,intA,"JR");
	JT = newObj("Léonard",66,intA,"JT");
	JY = newObj("Léonard",66,intA,"JY");
	JU = newObj("Léonard",66,intA,"JU");
	JI = newObj("Léonard",66,intA,"JI");
	JO = newObj("Léonard",66,intA,"JO");
	JP = newObj("Léonard",66,intA,"JP");
	JQ = newObj("Léonard",66,intA,"JQ");
	JS = newObj("Léonard",66,intA,"JS");
	JD = newObj("Léonard",66,intA,"JD");
	JF = newObj("Léonard",66,intA,"JF");
	JG = newObj("Léonard",66,intA,"JG");
	JH = newObj("Léonard",66,intA,"JH");
	JJ = newObj("Léonard",66,intA,"JJ");
	JK = newObj("Léonard",66,intA,"JK");
	// HETIC.push(A,B,C,E);
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
		mousedown = false;
		if (!mousedown) return; 
		viewBox.X += dX; 
		viewBox.Y += dY;
	});
	
	function rdm(from, to){
		return Math.floor(Math.random() * (to - from + 1) + from);
	}

	function wiggle (t,wbound,origCx,origCy) {
		console.log(t[0].attrs.cy,'recu')
		var newcx = origCx + rdm(-wbound, wbound);
		var newcy = origCy + rdm(-wbound, wbound);
	console.log(origCy,newcy,t[0].name)
		// t.animate({cx: newcx, cy: newcy}, 500, '<');
		t.animate ({transform:'t'+newcx+newcy},1000)
		// t[1].animate({cx: newcx, cy: newcy}, 500, '<');
		// setInterval(wiggle(t,wbound,origCx,origCy),1000)
	}
	
	Raphael.el.wiggle = function(wbound) {
	    var newcx = rdm(-wbound, wbound);
	    var newcy = rdm(-wbound, wbound);
	    // this.animate({cx: newcx, cy: newcy}, 1000, '>');
		this.animate ({transform:'t'+newcx+newcy},1000)
	}
/*	
	var max = Math.PI*2;
	var popularity = [];
	var pop=0;
	for(var i = 0;i<my_songs.length;i++){
		popularity.push(my_songs[i].data.popularity);

	}	var res = median(popularity);
		var canvas = document.getElementById('canvas1');
		var ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.strokeStyle = "rgb(127, 186, 91)";
		var o = Math.floor((max/100)*res);
		ctx.arc(100, 101, 50, 0, o, false);
		ctx.lineWidth = 10;
		ctx.stroke();
*/
	$('#container svg').click(function(e) {
		if (e.target.nodeName === "svg" && onClickCircle)
	    {
			rinitCicles();
			clearLinks()
			initLinks();
			onClickCircle=false;
	    }	
	})

	function checkPos(x,y,r,debug) {
		for (var i=0; i < pos.length; i++) {
			// console.log("i",i)
			// console.log(x,y,r,debug,"reçu")
			// console.log(pos[i]["x"],pos[i]["y"],pos[i]["r"],pos[i]["deb"],"enregitr")
			// console.log("min",debug,x-r,"x")
			// console.log("min",pos[i]["deb"],pos[i]["x"]-pos[i]["r"],"x")
			// console.log("max",debug,pos[i]["x"]+pos[i]["r"],"x")
			// console.log("max",pos[i]["deb"],x+r,"x")
			if (pos[i]["x"]+pos[i]["r"] >= x-r && pos[i]["x"]-pos[i]["r"] <= x+r) {
				// refaire
				// checkPos(Math.random()*900+200,Math.random()*600+100,r,debug);
				// return false;
				if (pos[i]["y"]+pos[i]["r"] >= y-r && pos[i]["y"]-pos[i]["r"] <= y+r) {
					// refaire
					checkPos(Math.random()*900+200,Math.random()*600+100,r,debug);
					return false;
					// console.log(debug,"collision",pos[i]["deb"])
				}
			}
		};
		// console.debug(pos)
		pos.push({"x":x,"y":y,"r":r,"deb":debug});
		// console.log(pos,"fin du tour, contenu de pos")
		cx=x;
		cy=y;
		// pos.push({"x":cx,"y":cy,"rad":rad})
	}
	
	var evObj = document.createEvent('MouseEvents'); 
	evObj.initEvent('click', true, false);
	for (pin in HETIC ){
		var group = r.set();
		var intLength = HETIC[pin].interactions.length;
		var rad = intLength*75/13; // ajustements possible (taille)
		var l = 1/2*(100-HETIC[pin].influence)+35 // ajustements possibles (couleur)
		var cx = Math.random()*900+200;
		var cy = Math.random()*600+100;
		checkPos(cx,cy,rad,HETIC[pin].name);
		var color = Raphael.hsl(203,90,l);
		var circle = r.circle(cx,cy,rad); 
			circle.name = HETIC[pin].name;
			circle.attrs.origCx = cx;
			circle.attrs.origCy = cy;
			circle.attrs.color = color;
			circle.attrs.l = l;
			circle.attrs.ID = HETIC[pin]["ID"];
			// console.log( HETIC[pin]["name"])
			circle.attrs.interactions = HETIC[pin].interactions;
			// console.log(cy,'enregistr')
			// circle.hover(function(e) {console.log(this.name)},function() {})
			circle.attr({"stroke":"transparent", fill: color});
		var text = r.text(cx,cy,HETIC[pin].name);
			text.attrs.circle = circle;
		group.push(circle);
		group.push(text);
		circle.click(function(e) {onClick(this)})
		text.click(function(e){this.attrs.circle.node.dispatchEvent(evObj)}); //trigger
		circles.push({"name":circle.name,"circle":circle,"interactions":HETIC[pin].interactions});
		grp.push(group)
	}
	
	function clearLinks(){
		var linkL=link.length;
		for(i=0;i<linkL;i++){
			link[i].remove();
		}
	}
	
	function onClick(t){
		onClickCircle=true;
		for (i=0;i<circles.length;i++) {
			if (t!=circles[i].circle) {
				var l = circles[i].circle.attrs.l
				var color = Raphael.hsl(200,30,l);
				circles[i].circle.attr({"stroke":"transparent", fill: color});
			} else {
				var currCircle = circles[i].circle;
				circles[i].circle.attr({"stroke":"transparent", fill: circles[i].circle.attrs.color});
			}
		}
		clearLinks();
		for (j=0;j<interc.length;j++){
			// console.log(interc[j][0]);
			// console.log(interc[j][0],currCircle);
			if(interc[j][0]==currCircle || interc[j][1]==currCircle){
				r.connection(interc[j][0],interc[j][1],"#3c9edb",r)
			} else {
				r.connection(interc[j][0],interc[j][1],"#205b80",r)
			}
			// if(connexion.push(r.connection(interc[j][0],interc[j][1],"#3c9edb",r))){console.log('done')}
		}
	}
		var interc = [];
	
	// grp[0].rotate(Math.random() * 90);
	function wiggleAll() {
		for (i=0;i<grp.length;i++) {
			// console.log(grp[i][0])
			console.log('lol',grp[i][0].attrs.origCy,'envoyé')
			wiggle(grp[i],10,grp[i][0].attrs.origCx,grp[i][0].attrs.origCy);
		}
	}
	// setInterval(wiggleAll,1000);
	
	// console.log(circles)
	var interc = [];
	
	function initLinks() {
		for (i=0;i<circles.length;i++){
			// console.log(circles[i],'cercle')
			for (j=0;j<circles[i].interactions.length;j++){
				// console.log(circles[i].circle.attrs.ID,'id',circles[i].circle.name)
				// console.log(circles[i].interactions[j].ID,'interaction')
				for (k=0;k<circles.length;k++){
					// console.log("does it")
					// console.log(circles[k].circle.attrs.ID,"match ?")
					if (circles[i].interactions[j].ID == circles[k].circle.attrs.ID) {	
						// interc.push({"0":circles[k],"1":circles[i]})
						// console.log(circles[k].name,"match")
						// console.log("link",circles[i],circles[k])
						var circle1 = circles[i].circle;
						var circle2 = circles[k].circle;
						interc.push({"0":circle1,"1":circle2})
						// console.log(circles[i].circle,circle2,"OUI")
						if(r.connection(circle1,circle2,'#205b80',r)){console.log('done')}
						k = circles.length;
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
	}
	
	initLinks();
	
	function rinitCicles() {
		for (i=0;i<circles.length;i++) {
			var currCircle = circles[i].circle;
			circles[i].circle.attr({"stroke":"transparent", fill: circles[i].circle.attrs.color});
		}
	}
});