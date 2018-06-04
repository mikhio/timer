var div = document.querySelector('.res');

//var ch = function(key) {
	
//};

var find = function (cl, key) {
	var el = document.querySelector('.' + cl);
	el.addEventListener('click', function() {
		div.textContent = cl;
	});
	
};

find('start', start);
find('stop', stop);
find('clear', clear);

//document.body.addEventListener('keydown', function(event) {
//	ch(event.key);
//});