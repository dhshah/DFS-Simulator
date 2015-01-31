function Tile(id){
	this.id = id;
	this.element = document.createElement('td');
	this.element.addClass("tile");
	this.neighbors = [];

	this.addNeighbor = function(neighbor){
		neighbors.push(neighbor);
	}

	this.getElement = function(){
		return this.element;
	}

	$(this.element).hover(function (){
		this.animate({backgroundColor:"#aaa"}, 250);
	},function(){
		this.animate({backgroundColor:"#888"}, 250);
	});

	$(this.element).click(function(){

	});

}

function Path(id){
	this.id = id;
	this.element = document.createElement('td');
	this.element.addClass("path");
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
	this.element.addClass("blak");

	this.getElement = function(){
		return this.element;
	}
}