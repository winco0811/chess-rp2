function to_coords(num) {
	return String.fromCharCode(97+num%8) + String(8-Math.trunc(num/8));
}
function from_coords(coords){
	return 8*(8-parseInt(coords[1]))+coords.charCodeAt(0)-97;
}
let position = [
	"BR","BN","BB","BQ","BK","BB","BN","BR",
	"BP","BP","BP","BP","BP","BP","BP","BP",
	"--","--","--","--","--","--","--","--",
	"--","--","--","--","--","--","--","--",
	"--","--","--","--","--","--","--","--",
	"--","--","--","--","--","--","--","--",
	"WP","WP","WP","WP","WP","WP","WP","WP",
	"WR","WN","WB","WQ","WK","WB","WN","WR"
];
let piece_color = "black";
let to_move="white";
let odabran=null;
let castling=[true,true,true,true]; //je li dopusteno? [bijeli_kratko, bijeli_dugo, crni_kratko, crni_dugo]
var game_id="0";
var timestamp = 0;
function stavi_makni(i,micem) {
	if (micem) {
        	$("#"+to_coords(i)).removeClass("moguc");
        } else {
        	$("#"+to_coords(i)).addClass("moguc");
        }	
}
function cekaj_potez() {
	$.ajax(
    {
        url: "cekaj_potez.php",
        type: "GET",
        data:
        { 
            timestamp: timestamp, 
	    id: game_id,
            cache: new Date().getTime()
        },
        dataType: "json",
        success: function( data ) 
        {
            console.log( "cekaj_potez :: success :: data = " + JSON.stringify( data ) );
            if( typeof( data.error ) !== "undefined" )
            {
                console.log( "cekaj_potez :: success :: server javio grešku " + data.error );
            }
            else
            {
                // Ako nema greške, pročitaj poruku i dodaj ju u div.
                let potez = decodeURI( data.msg )
		let p1 = potez.substr(0,2);
		let p2 = potez.substr(3,5);
		console.log(p2);	
                let figura = $("#"+p1).text();
                let kod_figure = position[from_coords($("#"+p1).attr('id'))];
                console.log(figura + " " + kod_figure);
                $("#"+p2).text(figura);
                position[from_coords($("#"+p2).attr('id'))]=kod_figure;
                $("#"+p1).text("");
                position[from_coords($("#"+p1).attr('id'))]="--";
                if (piece_color=="white") {
                         to_move="white";
                } else {
                        to_move="black";
                }
                timestamp = data.timestamp;
                cekaj_potez();
            }
        },
        error: function( xhr, status )
        {
            console.log( "cekaj_potez :: error :: status = " + xhr.status );
            // Nešto je pošlo po krivu...
            // Ako se dogodio timeout, tj. server nije ništa poslao u zadnjih XY sekundi,
            // pozovi ponovno cekaj_potez.
            if( status === "timeout" )
                cekaj_potez();
        }
    } );
}
function salji_potez(potez) {
	$.ajax(
	{
        	url: "salji_potez.php",
	        type: "GET",
        	data: {
            		id: game_id,
            		msg: encodeURI( potez )
        	},
        dataType: "json",
        success: function( data )
        {
            console.log( "posaljiPoruku :: success :: data = " + JSON.stringify( data ) );
        },
        error: function( xhr, status )
        {
            if( status !== null )
                console.log( "posaljiPoruku :: greška pri slanju poruke (" + status + ")" );
        }
    } );
}
function moguci_potezi(id, micem=false) { //drugi argument je true ako micem opcije
	indeks=from_coords(id);
	let i = 0;
	let izadji = false;
	switch (position[indeks]) {
		case "BQ":
		case "BR":
			for (i = indeks-indeks%8; i < indeks-indeks%8+8; i++) {
				if (i<indeks) {
					if (position[i][0]=="B") continue;
					izadji = false;
					for (let j=i+1; j<indeks; j++) {
						if (position[j]!="--") izadji=true;
					}
					if (izadji) continue;
				}
				if (i>indeks) {
                                        if (position[i][0]=="B") continue;
					izadji=false;
                                        for (let j=i-1; j>indeks; j--) {
                                                if (position[j]!="--") izadji=true;
                                        }
					if (izadji) continue;
                                }
				if (i==indeks) continue;
				stavi_makni(i,micem);
			}
			for (i = indeks%8; i < 64; i+=8) {
				if (i<indeks) {
                                        if (position[i][0]=="B") continue;
                                        izadji = false;
                                        for (let j=i+8; j<indeks; j+=8) {
                                                if (position[j]!="--") izadji=true;
                                        }
                                        if (izadji) continue;
                                }
                                if (i>indeks) {
                                        if (position[i][0]=="B") continue;
                                        izadji=false;
                                        for (let j=i-8; j>indeks; j-=8) {
                                                if (position[j]!="--") izadji=true;
                                        }
                                        if (izadji) continue;
                                }
                                if (i==indeks) continue;
                                if (i==indeks) continue;
                        	stavi_makni(i,micem);
			}
			if (position[indeks]=="BR") break;
		case "BB":
                        for (i=indeks-7; i>=0 && i<=63 && i%8>indeks%8; i-=7) {
				if (position[i][0]=="B") continue;
                                izadji = false;
                               	for (let j=i+7; j<indeks; j+=7) {
                                	if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                stavi_makni(i,micem);
                        }
                        for (i=indeks-9; i>=0 && i<=63 && i%8<indeks%8; i-=9) {
				if (position[i][0]=="B") continue;
                                izadji = false;
                                for (let j=i+9; j<indeks; j+=9) {
                                        if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                stavi_makni(i,micem);
                        }
                        for (i=indeks+9; i>=0 && i<=63 && i%8>indeks%8; i+=9) {
				if (position[i][0]=="B") continue;
                                izadji = false;
                                for (let j=i-9; j>indeks; j-=9) {
                                        if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                stavi_makni(i,micem);
                        }
                        for (i=indeks+7; i>=0 && i<=63 && i%8<indeks%8; i+=7) {
				if (position[i][0]=="B") continue;
                                izadji = false;
                                for (let j=i-7; j>indeks; j-=7) {
                                        if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                stavi_makni(i,micem);
                        }
                        break;
		case "BN":
			i=indeks-17;
			if (i>=0 && i<=63 && i%8<indeks%8) {
				if (position[i][0]!="B") stavi_makni(i,micem);
			}
			i=indeks-15;
			if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="B") stavi_makni(i,micem);
                        }
			i=indeks-10;
			if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="B") stavi_makni(i,micem);
                        }
			i=indeks-6;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="B") stavi_makni(i,micem);
                        }
                        i=indeks+6;
                        if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="B") stavi_makni(i,micem);
                        }i=indeks+10;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="B") stavi_makni(i,micem);
                        }
                        i=indeks+15;
                        if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="B") stavi_makni(i,micem);
                        }
			i=indeks+17;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="B") stavi_makni(i,micem);
                        }
			break;
		case "BK":
			i=indeks-9;
			if (i>=0 && i%8<indeks%8) {
                                if (position[i][0]!="B") stavi_makni(i,micem);
                        }
			i=indeks-8;
			if (i>=0) {
                                if (position[i][0]!="B") stavi_makni(i,micem);
                        }
			i=indeks-7;
			if (i>=0 && i%8>indeks%8) {
                                if (position[i][0]!="B") stavi_makni(i,micem);
                        }
			i=indeks-1;
                        if (i%8<indeks%8) {
                                if (position[i][0]!="B") stavi_makni(i,micem);
                        }
			i=indeks+1;
                        if (i%8>indeks%8) {
                                if (position[i][0]!="B") stavi_makni(i,micem);
                        }
			i=indeks+7;
                        if (i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="B") stavi_makni(i,micem);
                        }
			i=indeks+8;
                        if (i<=63) {
                                if (position[i][0]!="B") stavi_makni(i,micem);
                        }
			i=indeks+9;
                        if (i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="B") stavi_makni(i,micem);
                        }
			i=indeks-2;
			if (castling[3]) {
				if (position[i][0]!="B") stavi_makni(i,micem);
			}
			i=indeks+2;
			if (castling[2]) {
                                if (position[i][0]!="B") stavi_makni(i,micem);
                        }
			break;
		case "BP":
			i=indeks+8;
                        if (i<=63) {
                                if (position[i]=="--") stavi_makni(i,micem);
                        }
			if (Math.trunc(indeks/8)==1) {
				i=indeks+16;
				if (position[i]=="--" && position[i-8]=="--") stavi_makni(i,micem);
			}
			i=indeks+7;
                        if (i<=63 && position[i][0]=="W") stavi_makni(i,micem);
                        i=indeks+9;
                        if (i<=63 && position[i][0]=="W") stavi_makni(i,micem);
			break;
		case "WQ":
		case "WR":
			for (i = indeks-indeks%8; i < indeks-indeks%8+8; i++) {
                                if (i<indeks) {
                                        if (position[i][0]=="W") continue;
                                        izadji = false;
                                        for (let j=i+1; j<indeks; j++) {
                                                if (position[j]!="--") izadji=true;
                                        }
                                        if (izadji) continue;
                                }
                                if (i>indeks) {
                                        if (position[i][0]=="W") continue;
                                        izadji=false;
                                        for (let j=i-1; j>indeks; j--) {
                                                if (position[j]!="--") izadji=true;
                                        }
                                        if (izadji) continue;
                                }
                                if (i==indeks) continue;
                                stavi_makni(i,micem);
                        }
                        for (i = indeks%8; i < 64; i+=8) {
                                if (i<indeks) {
                                        if (position[i][0]=="W") continue;
                                        izadji = false;
                                        for (let j=i+8; j<indeks; j+=8) {
                                                if (position[j]!="--") izadji=true;
                                        }
                                        if (izadji) continue;
                                }
                                if (i>indeks) {
                                        if (position[i][0]=="W") continue;
                                        izadji=false;
                                        for (let j=i-8; j>indeks; j-=8) {
                                                if (position[j]!="--") izadji=true;
                                        }
                                        if (izadji) continue;
                                }
                                if (i==indeks) continue;
                                if (i==indeks) continue;
                                stavi_makni(i,micem);
                        }
                	if (position[indeks]=="WR") break;
		case "WB":
                        for (i=indeks-7; i>=0 && i<=63 && i%8>indeks%8; i-=7) {
                                if (position[i][0]=="W") continue;
                                izadji = false; 
                                for (let j=i+7; j<indeks; j+=7) {
                                        if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                stavi_makni(i,micem);
                        }
                        for (i=indeks-9; i>=0 && i<=63 && i%8<indeks%8; i-=9) {
                                if (position[i][0]=="W") continue;
                                izadji = false; 
                                for (let j=i+9; j<indeks; j+=9) {
                                        if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                stavi_makni(i,micem);
                        }
                        for (i=indeks+9; i>=0 && i<=63 && i%8>indeks%8; i+=9) {
                                if (position[i][0]=="W") continue;
                                izadji = false; 
                                for (let j=i-9; j>indeks; j-=9) {
                                        if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                stavi_makni(i,micem);
                        }
                        for (i=indeks+7; i>=0 && i<=63 && i%8<indeks%8; i+=7) {
                                if (position[i][0]=="W") continue;
                                izadji = false;
                                for (let j=i-7; j>indeks; j-=7) {
                                        if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                stavi_makni(i,micem);
                        }
			break;
		case "WN":
			i=indeks-17;
                        if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="W") stavi_makni(i,micem);
                        }
                        i=indeks-15;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="W") stavi_makni(i,micem);
                        }
                        i=indeks-10;
                        if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="W") stavi_makni(i,micem);
                        }
                        i=indeks-6;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="W") stavi_makni(i,micem);
                        }
                        i=indeks+6;
                        if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="W") stavi_makni(i,micem);
                        }
			i=indeks+10;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="W") stavi_makni(i,micem);
                        }
                        i=indeks+15;
                        if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="W") stavi_makni(i,micem);
                        }
                        i=indeks+17;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="W") stavi_makni(i,micem);
                        }
                        break;
                case "WK":
			i=indeks-9;
                        if (i>=0 && i%8<indeks%8) {
                                if (position[i][0]!="W") stavi_makni(i,micem);
                        }
                        i=indeks-8;
                        if (i>=0) {
                                if (position[i][0]!="W") stavi_makni(i,micem);
                        }
                        i=indeks-7;
                        if (i>=0 && i%8>indeks%8) {
                                if (position[i][0]!="W") stavi_makni(i,micem);
                        }
                        i=indeks-1;
                        if (i%8<indeks%8) {
                                if (position[i][0]!="W") stavi_makni(i,micem);
                        }
                        i=indeks+1;
                        if (i%8>indeks%8) {
                                if (position[i][0]!="W") stavi_makni(i,micem);
                        }
                        i=indeks+7;
                        if (i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="W") stavi_makni(i,micem);
                        }
                        i=indeks+8;
                        if (i<=63) {
                                if (position[i][0]!="W") stavi_makni(i,micem);
                        }
                        i=indeks+9;
                        if (i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="W") stavi_makni(i,micem);
                        }
                        i=indeks-2;
                        if (castling[1]) {
                                if (position[i][0]!="W") stavi_makni(i,micem);
                        }
                        i=indeks+2;
                        if (castling[0]) {
                                if (position[i][0]!="W") stavi_makni(i,micem);
                        }
                        break;
                case "WP":
			i=indeks-8;
                        if (i>=0) {
                                if (position[i]=="--") stavi_makni(i,micem);
                        }
			console.log(Math.trunc(indeks/8));
			if (Math.trunc(indeks/8)==6) {
                                i=indeks-16;
                                if (position[i]=="--" && position[i+8]=="--") stavi_makni(i,micem);
                        }
			i=indeks-7;
			if (i>=0 && position[i][0]=="B") stavi_makni(i,micem);
                        i=indeks-9;
                        if (i>=0 && position[i][0]=="B") stavi_makni(i,micem);
			break;
		default:
	}
}
$(function(){
	let over = false;
	let cells = $("td");
	let pc=null;
	if (piece_color=="white") {
        	pc="W";
        } else {
        	pc="B";
        }
	cekaj_potez();
	cells.click(function(event) {
		console.log(to_move+" "+piece_color);
		if (to_move==piece_color && (position[from_coords($(this).attr('id'))][0]==pc || position[from_coords($(this).attr('id'))][0]=="-")) {
			if ($(this).hasClass("odabran") || (position[from_coords($(this).attr('id'))]=="--" && !$(this).hasClass("moguc"))) {
				if (odabran!=null) {
					moguci_potezi(odabran, true);
				}
				odabran=null;
				$(this).removeClass("odabran");
			} else if ($(this).hasClass("moguc")) {
				moguci_potezi(odabran, true);
				$("#"+odabran).removeClass("odabran");
                	        let figura = $("#"+odabran).text();
				let kod_figure = position[from_coords($("#"+odabran).attr('id'))];
				console.log(figura + " " + kod_figure);
				$(this).text(figura);
				position[from_coords($(this).attr('id'))]=kod_figure;
				console.log(position[from_coords($(this).attr('id'))]);
				$("#"+odabran).text("");
				position[from_coords($("#"+odabran).attr('id'))]="--";
				salji_potez($("#"+odabran).attr('id')+" "+$(this).attr('id'));
				odabran=null;
				if (piece_color=="white") {
					to_move="black";
				} else {
					to_move="white";
				}
			} else {
				if (odabran != null) {
					moguci_potezi(odabran, true);
					$("#"+odabran).removeClass("odabran");
				}
				odabran = $(this).attr('id');
				$(this).addClass("odabran");
				moguci_potezi(odabran);
			}
		}
	});
});

