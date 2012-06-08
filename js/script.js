var HETIC = [];
var circles = [];
var grp = [];
var link = [];
var onClickCircle=false;
var effect = [] // onclick
var test;
var connexion=[]
var i = 0
var anim1;
// var pos = [{"x":0,"y":0,"r":0}];


// tweets , klout, followers , following 
var pos = [];
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

	var hl; var hc; var hh;
	$('body, #content').height(window.innerHeight);
	
	function showlegend(){
		$('#legende').show();
		$('.legende').css({"background":"#f1f1f1","color":"#333"});
	}
	
	function hidelegend(){
		$('#legende').hide();
		$('.legende').css({"background":"#86888a","color":"#151a20"});
	}
	
	function showcreerliste(){
		$('#creerliste').show();
		$('.creerliste').css({"background":"#f1f1f1","color":"#333"});
	}
	
	function hidecreerliste(){
			$('#creerliste').hide();
			$('.creerliste').css({"background":"#86888a","color":"#151a20"});
	}
	
	$('.legende').click(function(){
		if(hc == 1){
			hidecreerliste();
			showlegend();
			hc = 0;
		}else{
			showlegend();
		}
		
		if(hl == 1){
			hidelegend();
			hl = 0;
		}else { hl = 1;}
		
	});
	
	$('#closeleg').click(function(){
		hidelegend();
		hl = 0;
	});

	$('.creerliste').click(function(){
		if(hl == 1){
			hidelegend();
			showcreerliste();
			hl = 0;
		}else{
			showcreerliste();
		}
		if(hc == 1){
			hidecreerliste();
			hc = 0;
		}else {hc = 1;}
	});
	
	$('#closelist').click(function(){
		hidecreerliste();
		hc = 0;
	});
	
	$('.relation').click(function(){
		if( hh == 1){
			$('#hashtags').hide();
			hh = 0;
		}else{ 
			$('#hashtags').show();
			hh = 1;
		}
	});
	
	$('#closehashtags').click(function(){
		$('#hashtags').hide();
		hh = 0;
	});
	
	
	
	var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

	if (document.attachEvent) //if IE (and Opera depending on user setting)
	    document.attachEvent("on"+mousewheelevt, wheel)
	else if (document.addEventListener) //WC3 browsers
	    document.addEventListener(mousewheelevt, wheel, false)
	
	
	var intA=[{"nom":"Marius","ID":"C"},{"nom":"LEO","ID":"E"}];
	var intB=[{"nom":"Léonard","ID":"A"},{"nom":"LEO","ID":"E"},{"nom":"LEO","ID":"F"},{"nom":"LEO","ID":"G"},{"nom":"LEO","ID":"H"},{"nom":"LEO","ID":"I"},{"nom":"LEO","ID":"J"},{"nom":"LEO","ID":"JA"},{"nom":"LEO","ID":"JZ"},{"nom":"LEO","ID":"JE"},{"nom":"LEO","ID":"JR"},{"nom":"LEO","ID":"JT"},{"nom":"LEO","ID":"JY"},{"nom":"LEO","ID":"JU"},{"nom":"LEO","ID":"JI"},{"nom":"LEO","ID":"JO"},{"nom":"LEO","ID":"JP"},{"nom":"LEO","ID":"JQ"}];
	var intC=[{"nom":"Léonard","ID":"A"}];
	var intE=[{"nom":"Léonard","ID":"A"},{"nom":"Thomas","ID":"B"}];
	
	A = newObj("Léonard",59,intA,"A");
	B = newObj("Thomas",100,intB,"B");
	C = newObj("Marius",100,intC,"C");
	D = newObj("D",20,intA,"D");
	E = newObj("LEO",40,intE,"E");
	F = newObj("LéoFnard",89,intA,"F");
	G = newObj("LéonGard",17,intA,"G");
	H = newObj("LéonaHrd",90,intA,"H");
	I = newObj("LéonIard",77,intA,"I");
	J = newObj("LéonaJrd",66,intA,"J");
	JA = newObj("LéonJAard",66,intA,"JA");
	JZ = newObj("LéJZonard",66,intA,"JZ");
	JE = newObj("LéoJEnard",66,intA,"JE");
	JR = newObj("LéonJRard",66,intA,"JR");
	JT = newObj("JTLéonard",66,intA,"JT");
	JY = newObj("LéJYonard",66,intA,"JY");
	JU = newObj("LéonJUard",66,intA,"JU");
	JI = newObj("LéonarJId",66,intA,"JI");
	JO = newObj("LéonJOard",66,intA,"JO");
	JP = newObj("LéJPonard",66,intA,"JP");
	JQ = newObj("LéoJQnard",66,intA,"JQ");
	JS = newObj("LéonaJSrd",66,intA,"JS");
	JD = newObj("LéJDonard",66,intA,"JD");
	JF = newObj("LéoJFnard",66,intA,"JF");
	JG = newObj("LéonJGard",66,intA,"JG");
	JH = newObj("LéonJHard",66,intA,"JH");
	JJ = newObj("LéoHJJnard",66,intA,"JJ");
	JK = newObj("LéonJKard",66,intA,"JK");
	// HETIC.push(A,B,C,E);
	 HETIC.push(A,B,C,D,E,F,G,H,I,J,JA,JZ,JE,JR,JT,JY,JU,JI,JO,JP,JQ,JS,JD,JF,JG,JH);
	var r=Raphael('content',"100%","100%");
	r.customAttributes.arc = function (xloc, yloc, value, R) {
		// console.log(xloc,yloc,value,R)
		// return false
		var total = 100;
		var alpha = 360 / total * value;
		var a = (90 - alpha) * Math.PI / 180;
		var x = xloc + R * Math.cos(a);
		var y = yloc - R * Math.sin(a);
 		var path;
		if(onClickCircle && value<=100){
			if (total == value) {
				path = [
				["M", xloc, yloc - R],
				["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
				];
			} else {
				path = [
				["M", xloc, yloc - R],
				["A", R, R, 0, +(alpha > 180), 1, x, y]
				];
			}
		} else {
			if (total == value) {
				path = [
				["M", xloc, yloc - R],
				["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
				];
			} else {
				path = [
				["M", xloc, yloc - R],
				["A", R, R, 0, +(alpha < 540), 0, x, y]
				];
			}
		}
	    
	    return {
	        path: path
	    };
	};
	function random (x,y){
		return Math.floor(Math.random()*(y-x)+x);
	}
	var _r = "#content";
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
			zoom(-delta);
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
		// console.log(t[0].attrs.cy,'recu')
		var newcx = origCx + rdm(-wbound, wbound);
		var newcy = origCy + rdm(-wbound, wbound);
	// console.log(origCy,newcy,t[0].name)
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


checkPos = function (x,y,r,debug) {
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
		cxCircle=x;
		cyCircle=y;
		// pos.push({"x":cx,"y":cy,"rad":rad})
	}
	
	var evObj = document.createEvent('MouseEvents'); 
	evObj.initEvent('click', true, false);
	
init = function () {
	for (pin in users ){
		console.log('a')
		var group = r.set();
		var intLength = users[pin].interactions.length;
		var rad = intLength*5/3+20; // ajustements possible (taille)
		var l = 1/2*(100-users[pin].klout) // ajustements possibles (couleur)
		var l = 1/2*(100-Math.random()*80+19) // ajustements possibles (couleur)
		cxCircle = rdm(100,window.innerWidth)-50;
		cyCircle = rdm(150,window.innerHeight)-50;
		checkPos(cxCircle,cyCircle,rad,users[pin].ID);
		var tname;
		(users[pin].nom.length>19)?tname=users[pin].pseudo:tname=users[pin].nom;
		var color = Raphael.hsl(203,90,l);
		var circle = r.circle(cxCircle,cyCircle,rad); 
			circle.name = users[pin].nom;
			circle.attrs.origCx = cxCircle;
			circle.attrs.origCy = cyCircle;
			circle.attrs.color = color;
			circle.attrs.l = l;
			circle.attrs.ID = users[pin].ID;
			// console.log( HETIC[pin]["name"])
			circle.attrs.interactions = users[pin].interactions;
			// console.log(cy,'enregistr')
			// circle.hover(function(e) {console.log(this.name)},function() {})
			circle.attr({"stroke":"transparent", fill: color});
			// OUVERTURE DU CERCLE SUR "+"
			var show = r.circle(cxCircle,cyCircle,rad);
			var a = -135 * Math.PI / 180;
			var b = 45 * Math.PI / 180;
			var x = cxCircle + rad * Math.cos(a);
			var y = cyCircle + rad * Math.sin(a);
			var x2 = cxCircle + rad * Math.cos(b);
			var y2 = cyCircle + rad * Math.sin(b);
			var d = 135 * Math.PI / 180;
			var c = -45 * Math.PI / 180;
			var x3 = cxCircle + rad * Math.cos(c);
			var y3 = cyCircle + rad * Math.sin(c);
			var x4 = cxCircle + rad * Math.cos(d);
			var y4 = cyCircle + rad * Math.sin(d);
			var transp = {fill:"",stroke:""};
			var showLine1 = r.path(["M" + x + " " + y + " L" + x2 + " " + y2]).attr(transp);
			var showLine2 = r.path(["M" + x3 + " " + y3 + " L" + x4 + " " + y4]).attr(transp);
				show.attr(transp);
				show.klout=users[pin].klout;
				show.followers=nbFollowers/users[pin].followers;
				show.following=nbFollowing/users[pin].following;
				show.tweets=users[pin].tweets;
				show.status=false;
				show.ori=({'fill':'#516775',"fill-opacity":'.6','stroke':'#fff','stroke-opacity':'.5'});
				show.lines={"0":showLine1,"1":showLine2};
				show.linesAttr={'stroke':'#fff','stroke-opacity':'.5'};

		// ANIMATION DU + 

			// show.anim=({0:anim1,1:anim2,2:anim3,3:anim4});
			circle.attrs.show = show
		// var text = r.text(cxCircle,cyCircle,users[pin].nom);
		var pix = 0.02*rad;
		// var text = r.print(cxCircle,cyCircle,users[pin].nom,r.getFont("Georgia"),pix);
		var text = r.text(cxCircle,cyCircle,tname).transform('s'+pix).attr({'fill':'#fff'});
			text.attrs.circle = circle;
		group.push(circle);
		group.push(text);
		circle.click(function(e) {onClick(this)})
		text.click(function(e){this.attrs.circle.node.dispatchEvent(evObj)}); //trigger
		circles.push({"name":circle.name,"circle":circle,"interactions":users[pin].interactions});
		grp.push(group)
	}
}	
	function resetLinks(){
		var linkL=link.length;
		for(i=0;i<linkL;i++){
			// link[i].attr({stroke:'#3c9edb'})
			// console.log(link[i]["link"].attr({stroke:'#3c9edb'}))
			link[i]["link"].attr({stroke:'#205b80',opacity:'1'})
		}
	}
	
	
	$('#content svg').click(function(e) {
		if (e.target.nodeName === "svg" && onClickCircle)
	    {
			
			initHalo();
			rinitCircles();
			resetLinks();
			// initLinks();
	    }	
	})
	function initHalo(debg){
		var x = effect[0]['x'];
		var y = effect[0]['y'];
		var rad = effect[0]['rad'];
	if(anim1){
		var vit = 100
		var ax =anim1.attrs.ax;
		var ay =anim1.attrs.ay;
		var ar =anim1.attrs.ar;
		var val1=anim1.attrs.val1;
		var val2=anim2.attrs.val2;
		var val3=anim3.attrs.val3;
		var val4=anim4.attrs.val4;
		
		var t = anim1.attrs.t;
		
		
		// console.log(ax,ay,ar,val1,val2,val3,val4)
		anim4.animate({
			arc: [ax,ay,0,ar+val4]
		},vit,'=',function() {
				anim3.animate({
					arc: [ax,ay,0,ar+val3]
				},vit,'=',function() {
						anim2.animate({
							arc: [ax,ay,0,ar+val2]
						},vit,'=',function() {
								anim1.animate({
									arc: [ax,ay,0,ar+val1]
								},vit,'=',function() {

									t.animate({transform: 's1'},300,'<',function() {
											t.lines[0].attr({'stroke':'','fill':''});
											t.lines[1].attr({'stroke':'','fill':''});
											t.attr({'stroke':'','fill':''}).toBack();
											// onClickCircle=false;
											t.status=false;
									});
									t.lines[0].animate({transform: 's1'},200,'<');
									t.lines[1].animate({transform: 's1'},200,'<');
									effect[0]['halo'].animate({
										arc: [x,y,200,rad],
										transform: 's1'
									}, 500,"<",function() {
									
									});
								})
						})
				})
		})
		
	}
		effect[0]['halo'].animate({
			arc: [x,y,200,rad]
		}, 500,"<>",function() {
			onClickCircle=false;
		
		});
		x2 = effect[1].attrs.cx;
		y2 = effect[1].attrs.cy;
		// effect[1].animate({transform:'matrix(1,0,0,1,'+x2+','+y2+')'},600,"=",function() {this.remove()});
		effect[1].attr({opacity:'0'}).animate({transform:'m'+x2+' '+y2},600,"<",function() {
			this.remove();
			// console.log("OMFGOMFGOMFGOMFGOMFGOMFGOMFGOMFGOMFGOFGMFOGFMGFOGFMGFOGMF",i,"id effect")
			});
		effect[2].remove();
		effect = [];
	}
	function onClickPlus(t,open) {
		if (!open) {
			// mega show :DDD
			var ax = t.attrs.cx;
			var ay = t.attrs.cy;
			var ar = t.attrs.r;
			t.attr(t.ori);
			// console.log(t.attrs)
			t.animate({transform: 's2.5'},500,'<',function() {
				// ICI MEGA ANIMATION INTERNE
				console.log(t)
				var stat1 = (t.klout+10)*2;
				var stat2 = Math.random()*50+10;
				var stat3 = Math.random()*100+10;
				var stat4 = Math.random()*50+10;
				var val1 = stat1/2;
				var val2 = stat2/2;
				var val3 = stat3/2;
				var val4 = stat4/2;
				anim1 = r.path().attr({arc:[ax, ay, 0, ar+val1],"stroke":"#588cad"});
					anim1.attrs.ax = ax;
					anim1.attrs.ay = ay;
					anim1.attrs.ar = ar;
					anim1.attrs.val1 = val1;
					anim1.attrs.t = t;
				anim2 = r.path().attr({arc:[ax, ay, 0, ar+val2],"stroke":"#67b0df"});
					anim2.attrs.val2 = val2;
				anim3 = r.path().attr({arc:[ax, ay, 0, ar+val3],"stroke":"#156493"});
					anim3.attrs.val3 = val3;
				anim4 = r.path().attr({arc:[ax, ay, 0, ar+val4],"stroke":"#a5c6da"});
					anim4.attrs.val4 = val4;
					anim1.attr({"stroke-width":stat1}).transform('r-45 '+ax+' '+ay)
					anim2.attr({"stroke-width":stat2}).transform('r45 '+ax+' '+ay)
					anim3.attr({"stroke-width":stat3}).transform('r135 '+ax+' '+ay)
					anim4.attr({"stroke-width":stat4}).transform('r225 '+ax+' '+ay)

				// var it = 0;
				var vit = 250
				anim1.animate({
					arc: [ax,ay,26,ar+val1]
				},vit,'=',function() {
						anim2.animate({
							arc: [ax,ay,25,ar+val2]
						},vit,'=',function() {
								anim3.animate({
									arc: [ax,ay,26,ar+val3]
								},vit,'=',function() {
										anim4.animate({
											arc: [ax,ay,26,ar+val4]
										},vit,'=')
								})
						})
				})
			});
			t.lines[0].animate({transform: 's2.5'},500,'<');
			t.lines[1].animate({transform: 's2.5'},500,'<');
			effect[0]["halo"].animate({transform: 's2.45'},500,'<');
			
			t.lines[0].attr(t.linesAttr);
			t.lines[1].attr(t.linesAttr);
			t.status=true;
		} else {
			t.animate({transform: 's1'},500,'<',function() {
				this.attr({fill:'',stroke:''});
			});
			effect[0]["halo"].animate({transform: 's1'},500,'<');
			t.lines[0].animate({transform: 's1'},500,'<');
			t.lines[1].animate({transform: 's1'},500,'<');
			t.status=false
		}
	}
	
	function onClick(t){
		var interL=t.attrs.interactions.length;
		var hide = [];
		hide.push(t)
		for (j=0;j<interL;j++){
			for (i=0;i<circles.length;i++) {
				circles[i].circle.attr({opacity:'0.3'}).toBack();
				if (t.attrs.interactions[j]==circles[i].circle) {
						hide.push(circles[i].circle);
				}
			}
		}
		for (i=0;i<hide.length;i++){
			hide[i].attr({opacity:'1'});
		}
		// if (interL==0) {rinitCircles()};

		var ccx = t.attrs.origCx;
		var ccy = t.attrs.origCy;
		var ccr = t.attrs.r;
		var cR = ccr*30/100
			// currCircle.attr({"stroke":"", opacity: currCircle.attrs.color});
			// currCircle.attr({"stroke":"", fill: currCircle.attrs.color});
			// console.log(t.name);
		var cx = (5*ccr/7);
		var cy = (5*ccr/7);
		var plus = r.circle(ccx,ccy,cR).toBack();
			plus.attrs.cx = ccx;
			plus.attrs.cy = ccy;
					// currCircle.attrs.color
			plus.attr({'fill': t.attrs.color,'stroke':'transparent'});
					// wiggle (plus,10,cx,cy);
						// plus.animate({"cx":cx,"cy":cy},">",500)
			plus.animate({transform:'t-'+cx+' -'+cy},600,'>')
		var plusText = r.text(ccx,ccy,'+').attr({'fill':''});
			plusText.animate({transform:'t-'+cx+' -'+cy},600,">",function() {this.attr({'fill':'#000',})})
			plusText.attrs.circle = plus;
			plus.click(function(e) {onClickPlus(t.attrs.show,t.attrs.show.status)})
			plusText.click(function(e){this.attrs.circle.node.dispatchEvent(evObj)}); //trigger
			t.attr({"stroke":"", fill: t.attrs.color},function() {});
			
		
			t.attrs.show.lines[0].toBack()
			t.attrs.show.lines[1].toBack()
		// animated stuff
		
		if(effect[0]){
			initHalo(true);
			// console.log("OMFGOMFGOMFGOMFGOMFGOMFGOMFGOMFGOMFGOFGMFOGFMGFOGFMGFOGMF",i,"pd ?")
		}
		
		onClickCircle=true;
		if (!effect.length) {
			console.log(t,'REGARDE MF')
			var x=t.attrs.cx;
			var y=t.attrs.cy;
			var rad=t.attrs.r+ 5;
			var halo = r.path().attr({
				arc: [x,y,0,rad],
				'stroke': "#12364b",
				'stroke-width': 5,
				
			}).toBack();
			halo.stop().animate({
				arc: [x,y,100,rad],
				'stroke-width': 5,
				'stroke': "#12364b"
			}, 500,"<>",function() {
				onClickCircle=true;
			});
			effect.push({"halo":halo,"x":x,"y":y,"rad":rad});
			effect.push(plus);
			effect.push(plusText);
		}
		
		var linkL = link.length
		for (var i=0;i<linkL;i++){
			if (t!=link[i][1] && t!=link[i][2]){
				// si les liens sont differrent, remove ou assombre
				// link[i]['link'].remove()
				// link[i]['link'].attr({'stroke':''})
				link[i]['link'].attr({stroke:'#205b80',opacity:'.3'}).toBack()
				// link[i]['link'].attr({stroke:'red',"stroke-dasharray":["-."]})
			} else {
				link[i]['link'].attr({stroke:'#3c9edb',opacity:'1'}).toBack()
				// console.log(link[i]['link'])
			}
		}
		
		
		

		
	}
	
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
	
initLinks = function () {
		console.log('initlinks')
		var circlesL = circles.length;
		for (i=0;i<circlesL;i++){
			var newInterect=[];
			// console.log(circles[i],'cercle')
			var itrsL = circles[i].interactions.length;
			for (j=0;j<itrsL;j++){
				
				// console.log(circles[i].circle.attrs.ID,'id',circles[i].circle.name)
				// console.log(circles[i].interactions[j].ID,'interaction')
				for (k=0;k<circlesL;k++){
					// console.log("does it")
					// console.log(circles[k].circle.attrs.ID,"match ?")
					if (circles[i].interactions[j].ID == circles[k].circle.attrs.ID) {
						newInterect.push(circles[k].circle)
						interc.push({"0":circles[k],"1":circles[i]})
						// console.log(circles[k].name,"match")
						// console.log("link",circles[i],circles[k])
						var circle1 = circles[i].circle;
						var circle2 = circles[k].circle;
							// interc.push({"0":circle1,"1":circle2})
						// console.log(circles[i].circle,circle2,"OUI")
						r.connection(circle1,circle2,'#205b80',r)
						k = circles.length; // sort de la boucle
					};
				}
			}
			// console.log(circles[i].circle)
			circles[i].circle.attrs.interactions=newInterect;
			// console.log(HETIC[pin].interactions[i]);
			// var x = circle.attrs.cx;
			// var y = circle.attrs.cy;
			// var w = Math.sqrt((circle.attrs.cy)*(circle.attrs.cy)+(circle.attrs.cx)*(circle.attrs.cx));
			// var h = 2;
			// var line = r.rect(x, y, w, h);
		}
	}
	
	function rinitCircles() {
		for (i=0;i<circles.length;i++) {
			var currCircle = circles[i].circle;
			circles[i].circle.attr({"stroke":"transparent", fill: circles[i].circle.attrs.color,opacity:"1"});
		}
	}
});