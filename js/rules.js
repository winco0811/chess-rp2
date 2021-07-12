angular.module('chess', []).controller('game', ['$scope', function($scope) {
	
	//Nacrtaj plocu
    $scope.widths = [];

    for(var i = 0; i < 8; i++) { 
        $scope.widths.push(i);
    }
	
}]);

$(document).ready(function() {   

	//kodovi za slike figura(ne trebamo imati spremljene slike figura)
	var chessPieces = {
		 'white': {
			  'king': '&#9812;',
			  'queen': '&#9813;',
			  'rook': '&#9814;',
			  'bishop': '&#9815;',
			  'knight': '&#9816;',
			  'pawn': '&#9817;'
		 },
		 'black': {
			  'king': '&#9818;',
			  'queen': '&#9819;',
			  'rook': '&#9820;',
			  'bishop': '&#9821;',
			  'knight': '&#9822;',
			  'pawn': '&#9823;'
		 }
	};

	//bijeli je prvi na potezu
	var player = 'white';

	//odabrana figura:
	var select = {
		 canMove: false, //moze li se micati
		 piece: '',      //tip figure
		 box: ''         //pozicija figure
	}

	//Pozicija i boja pijuna koji je u promociji
	var promotion = {};

	//Postavi plocu
	$(function() {	
		 //ovisno je li broj paran postavlja polje na crno ili bijelo
		 for(var i = 0; i < 8; i++) {
			  for(var j = 0; j < 8; j++) {
					var box = $('#box-' + i + '-' + j);
					if((i + j) % 2 !== 0) {
						 box.addClass('dark-box');
					} else {
						 box.addClass('light-box');
					}
					//postavi figuru na mjesto (i,j)
					setNewBoard(box, i, j); 
			  }
		 }		 
		 setTheme();
	});

	//funkcija odgovorna za klik evente
	//CLICKEVENT FUNCTION
	$(function() {
			//pijun je promaknut:	
			var promote = $('#pawn-promotion-option .option');
			promote.on('click', function() {

				var newType = $(this).attr('id');
				promotion.box.html(chessPieces[promotion.color][newType]);
				promotion.box.addClass('placed');
				promotion.box.attr('piece', promotion.color + '-' + newType);

				$('#pawn-promotion-option').addClass('hide');
				$('#game').css('opacity', '1');

			});

		 //kada kliknemo na polje poziva se ova funkcija
		 $('.box').on('click', function() {
			 
			  if($(this).hasClass('selected')) { 
			  	//ako je prije bila selektirana, odselektiraj ju
					$(this).removeClass('selected');
					//makni oznacena polja za sugestiju poteza
					$('.box').removeClass('suggest'); 
					select ={ canMove: false, 
										piece: '', 
										box: '' 
									};
					return;
			  }

			  //odaberi novo polje
			  if(!select.canMove) {
					//provjeri mice li igrac svoje figure a ne od protivnika
					if(String($(this).attr('piece').indexOf(player)) >= 0) {
						 //selektiraj figuru
						 selectPiece($(this));
					}
			  }

			  //Nova destinacija za figuru
			  else if(select.canMove) { 
					var selectedPieceInfo = select.piece.split('-');
					var color = selectedPieceInfo[0];
					var type = selectedPieceInfo[1];

					//ako je odabrao drugu figuru iste boje onda makni klasu selected od tog polja
					if(String($(this).attr('piece').indexOf(color)) >= 0) {
						 $('#' + select.box).removeClass('selected');
						 $('.box').removeClass('suggest');
						 selectPiece($(this));
						 return;
					}

					//ako polje ima postavljenu klasu "suggest" znaci da se tamo moze pomaknut
					if($(this).hasClass('suggest')) { 


						 //Postavi figuru na polje
						 setPiece($(this), color, type);

						 //izbrisi polje
						 deleteBox($('#' + select.box));

						 $('.box').removeClass('suggest');

						 select = { 
						 	canMove: false, 
						 	piece: '', 
						 	box: '' };

						//promjeni igraca koji je na redu
						switchPlayer();
					}
			  }
		 	});
		});

	//dohvati figuru i poziciju
	var selectPiece = function(box) {
		 box.addClass('selected');
		 select.canMove = true;
		 select.box = box.attr('id');
		 select.piece = box.attr('piece');

		 var moves = getNextMoves(select.piece, select.box);
		 suggestNextMoves(moves);
	}

	//legalni potezi://

	//vraca moguce poteze odredene figure
	var getNextMoves = function(selectedPiece, selectedBox) {
		 var selectedPieceInfo = selectedPiece.split('-');
		 var color = selectedPieceInfo[0];
		 var type = selectedPieceInfo[1];

		 //odredi koordinate (i,j) na kojem se nalazi "piece", box-i-j u html-u
		 var id = selectedBox.split('-');
		 var i = parseInt(id[1]);
		 var j = parseInt(id[2]);

		 var nextMoves = [];

		 //offset varijabla koja nam govori u kojem smjeru se odredena figura moze micati
		 //(npr. [1,1] znaci gore desno-dijagonalno)
		 //[-1,0] je dolje itd...
		 switch(type) {
				 
			  case 'pawn':
					if(color === 'black') {
						 var offset = [
							  [0, 1], [0, 2], [1, 1], [-1, 1]
						 ];
					} else {
						 var offset = [
							  [0, -1], [0, -2], [1, -1], [-1, -1]
						 ];
					}
					nextMoves = pawnMoves(i, j, color, offset);
					break;
			  case 'rook':
					var offset = [
						 [0, 1], [0, -1], [1, 0], [-1, 0]
					];
					nextMoves = otherPiecesMoves(i, j, color, offset);
					break;
			  case 'knight':
					var offset = [
						 [-1, -2], [-2, -1], [1, -2], [-2, 1],
						 [2, -1], [-1, 2], [2, 1], [1, 2]
					];
					nextMoves = knightMoves(i, j, color, offset);
					break;
			  case 'bishop':
					var offset = [
						 [1, 1], [1, -1], [-1, 1], [-1, -1]
					];
					nextMoves = otherPiecesMoves(i, j, color, offset);
					break;
			  case 'queen':
					var offset1 = [
						 [1, 1], [1, -1], [-1, 1], [-1, -1]
					];
					var offset2 = [
						 [0, 1], [0, -1], [1, 0], [-1, 0]
					];
					nextMoves1 = otherPiecesMoves(i, j, color, offset1);
					nextMoves2 = otherPiecesMoves(i, j, color, offset2);
					nextMoves = nextMoves1.concat(nextMoves2);
					break;
			  case 'king':
					var offset = [
						 [1, 1], [1, -1], [-1, 1], [-1, -1],
						 [0, 1], [0, -1], [1, 0], [-1, 0]
					];
					nextMoves = knightMoves(i, j, color, offset);
					break;
			  default: 
					break;
		 }
		 return nextMoves;
	}

	//vraca moguce poteze pijuna
	var pawnMoves = function(i, j, color, moves) {
		 var nextMoves = [];
		 for(var index = 0; index < moves.length; index++) {
			  var tI = i + moves[index][0];
			  var tJ = j + moves[index][1];
			  if( !outOfBounds(tI, tJ) ) {
					var box = $('#box-' + tI + '-' + tJ);

					if(index === 0) { 
						 if(!box.hasClass('placed')) {
							  nextMoves.push([tI, tJ]);
						 } else {
							  index++;
						 }
					} else if(index === 1) { 
						 if( ((color === 'black' && j === 1) ||
								 (color === 'white' && j === 6)) &&
							  !box.hasClass('placed')) {
							  nextMoves.push([tI, tJ]);
						 }
					} else if(index > 1) { 
						 if(box.attr('piece') !== '' && box.attr('piece').indexOf(color) < 0) {
							  nextMoves.push([tI, tJ]);
						 }
					}
			  }
		 }
		 return nextMoves;
	}

	//moguci potezi za kralja i konja
	var knightMoves = function(i, j, color, moves) {
		 var nextMoves = [];
		 for(var move of moves) {
			  var tI = i + move[0];
			  var tJ = j + move[1];
			  if( !outOfBounds(tI, tJ) ) {
					var box = $('#box-' + tI + '-' + tJ);
					if(!box.hasClass('placed') || box.attr('piece').indexOf(color) < 0) {
						 nextMoves.push([tI, tJ]);
					}
			  }
		 }
		 return nextMoves;
	}

	//vraca moguce pozicije ostalih figura(kraljica,lovac,top)
	var otherPiecesMoves = function(i, j, color, moves) {
		 var nextMoves = [];
		 for(var move of moves) {
			  var tI = i + move[0];
			  var tJ = j + move[1];
			  var sugg = true;
			  while(sugg && !outOfBounds(tI, tJ)) {
					var box = $('#box-' + tI + '-' + tJ);
					if(box.hasClass('placed')) {
						 if(String(box.attr('piece').indexOf(color)) >= 0) {
							  sugg = false;
						 } else {
							  nextMoves.push([tI, tJ]);
							  sugg = false;
						 }
					}
					if(sugg) {
						 nextMoves.push([tI, tJ]);
						 tI += move[0];
						 tJ += move[1];
					}
			  }
		 }
		 return nextMoves;
	}

	//provjeri jesi otisao izvan ploce sa koordinatama (8x8 je velicina ploce)
	var outOfBounds = function(i, j) {
		if( i < 0 || i >= 8 || j < 0 || j >= 8 )
		 	return true;
		else return false;
	}

	//za sve legalne poteze dodaj klasu "suggest" svakom polju
	var suggestNextMoves = function(nextMoves) {		
		for(var move of nextMoves) {
			 var box = $('#box-' + move[0] + '-' + move[1]);
			 box.addClass('suggest');
		}
	}


	//postavi figuru na polje "box"
	var setPiece = function(box, color, type) {

		 //jel postoji kralj na ploci
		 if(box.attr('piece').indexOf('king') >= 0) {  
			  showWinner();
			  box.html(chessPieces[color][type]);
			  box.addClass('placed');
			  box.attr('piece', color + '-' + type);

			  return;
		 }

		 //provjeri jel pijun u poziciji za promaknuce (j=7 oznacava zadnji rang za crnog)
		 var j = parseInt(box.attr('id').charAt(6));
		 if(type === 'pawn') {
			  if( (player === 'black' && j === 7) ||
					(player === 'white' && j === 0)) {
					$('#game').css('opacity', '0.5');

					var option = $('#pawn-promotion-option');
					option.removeClass('hide');
					option.find('#queen').html(chessPieces[player].queen);
					option.find('#rook').html(chessPieces[player].rook);
					option.find('#knight').html(chessPieces[player].knight);
					option.find('#bishop').html(chessPieces[player].bishop);

					promotion = { box: box, color: color };

					return;
			  }
		 }

		 box.html(chessPieces[color][type]);
		 box.addClass('placed');
		 box.attr('piece', color + '-' + type);
	}

	//izbrisi polje koje je selektirano
	var deleteBox = function(box) {
		 box.removeClass('placed');
		 box.removeClass('selected');
		 box.removeClass('suggest');
		 box.html('');
		 box.attr('piece', '');
	}

	//postavi plocu
	var setNewBoard = function(box, i, j) {
		 if(j === 7) {
			  if(i === 0 || i === 7) {
					setPiece(box, 'white', 'rook');
			  } else if(i === 1 || i === 6) {
					setPiece(box, 'white', 'knight');
			  } else if(i === 2 || i === 5) {
					setPiece(box, 'white', 'bishop');
			  } else if(i === 3) {
					setPiece(box, 'white', 'queen');
			  } else if(i === 4) {
					setPiece(box, 'white', 'king');
			  }
		 } else if(j === 6) {
			  setPiece(box, 'white', 'pawn');
		 } else if(j === 1) {
			  setPiece(box, 'black', 'pawn');
		 } else if(j === 0) {
			  if(i === 0 || i === 7) {
					setPiece(box, 'black', 'rook');
			  } else if(i === 1 || i === 6) {
					setPiece(box, 'black', 'knight');
			  } else if(i === 2 || i === 5) {
					setPiece(box, 'black', 'bishop');
			  } else if(i === 3) {
					setPiece(box, 'black', 'queen');
			  } else if(i === 4) {
					setPiece(box, 'black', 'king');
			  }
		 }
	}

	var switchPlayer = function() {
		 if(player === 'black') {
			  player = 'white';
		 } else {
			  player = 'black';
		 }
	}

	var showWinner = function(winner) {
		console.log(player + " is a winner");
		$('#game').css('opacity', '0.5');

	}
    
});


//postavi pozadinsku boju i boju polja na sahovskoj ploci (crno-bijela polja)
var setTheme = function() {               
	$('#board').css('border-color', "#666");
        
    //bijela polja
    $('.light-box').css('background', "#fff");
        
    //crna polja
    $('.dark-box').css('background', "#ccc");
        
    //boja figura
    $('.box').css('color', "#000");
}
