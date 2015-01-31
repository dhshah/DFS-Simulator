$(document).ready(function (){
	init();
});

var paths = [];
var tiles = [];

function init(){
	var container = $("#table");

	var x = 1;

	for (b = 20; b < 500; b = b + 20){
		paths[b] = [];
		for ( a = 10; a < 1000; a = a + 20){
			var c = new Path(x, a, b);
			paths[b][a] = c;
			container.append($(c.getElement()));
		}
	}

	for (b = 10; b < 500; b = b + 20){
		paths[b] = [];
		for ( a = 20; a < 1000; a = a + 20){
			var c = new Path(x, a, b);
			paths[b][a] = c;
			container.append($(c.getElement()));
		}
	}

	for (b = 10; b < 500; b = b + 20){
		tiles[b] = [];
		for (a = 10; a < 1000; a = a + 20){
			var c = new Tile(x, a, b);
			tiles[b][a] = c;
			container.append($(c.getElement()));
			x = x + 1;
		}
	}
}

function Tile(id, a, b){
	this.id = id;
	this.element = document.createElement('td');
	$(this.element).addClass("tile", 0);
	$(this.element).css("top",b);
	$(this.element).css("left",a);

	this.getColor = function (){
		if ($(this.element).hasClass("active"))
			return "#aa2";
		else 
			return "#aaa"
	}

	this.getElement = function(){
		return this.element;
	}

	this.isActive = function(){
		return $(this.element).hasClass("active");
	}

	$(this.element).hover(function (){
		$(this).addClass("tile-hover", 250);
	},function(){
		$(this).removeClass("tile-hover", 250);
	});

	$(this.element).click(function(){
		DFS(a,b, null);
	});
}

function DFS(a, b, callback){
	$(tiles[b][a].getElement()).addClass("active", 50, function(){
		arr = [[0,1],[0,-1],[1,0],[-1,0]];
		shuffle(arr);
		var found = false;
		for (var x = 0; !found; x++){
			if (x < arr.length ){
				var na = arr[x][0];
				var nb = arr[x][1];
				if ((tiles[b + nb * 20] !== undefined) && 
					(tiles[b + nb * 20][a + na * 20] !== undefined) && 
					!($(tiles[b + nb * 20][a + na * 20].getElement()).hasClass("active"))) {
					found = true;
				}
			} else {
				if (callback !== null) callback();
				return;
			}
		}

		$(paths[b + nb * 10][a + na * 10].getElement()).addClass("active-path",500);
		DFS(a + na * 20,b + nb * 20, function(){
			DFS(a,b, callback);
		});

	});
}

function Path(id, a, b){
	this.id = id;
	this.element = document.createElement('td');
	$(this.element).addClass("path");
	$(this.element).css("top",b);
	$(this.element).css("left",a);
	this.pathFrom = [];
	
	this.addPath = function (a, b){
		pathFrom[a] = b;
		pathFrom[b] = a;
	}

	this.getPathFrom = function(a){
		return this.pathFrom[a];
	}
	
	this.getElement = function(){
		return this.element;
	}
}

function Blank(id){
	this.id = id;
	this.element = document.createElement('td');
	$(this.element).addClass("blak");

	this.getElement = function(){
		return this.element;
	}
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}