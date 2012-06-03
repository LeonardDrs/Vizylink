var HETIC = [];
function newObj(inf,int) {
	var o = {
		influence : inf,
		interactions : int
		};
	return o;
}

$(function(){
	var intA=["b","c"];
	var intB=["a","c"];
	var intC=["a","b"];
	
	A = newObj(10,intA);
	B = newObj(2,intB);
	C = newObj(30,intC);
	HETIC.push(A,B,C)
});