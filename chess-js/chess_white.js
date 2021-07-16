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
let piece_color = "white";
let to_move="white";
let odabran=null;
let castling=[true,true,true,true]; //je li dopusteno? [bijeli_kratko, bijeli_dugo, crni_kratko, crni_dugo]
var game_id="0";
var timestamp = 0;
function stavi_makni(i,micem,testiram) {
	let a;
	if (testiram) {
		a = "t_moguc";
	} else {
		a = "moguc";
	}
	if (micem) {
        	$("#"+to_coords(i)).removeClass(a);
        } else {
        	$("#"+to_coords(i)).addClass(a);
        }	
}
function pod_sahom(boja,moguc_potez="") {
	let p1, p2, p1_old_position, p2_old_position;
	if (moguc_potez!="") {
		p1 = moguc_potez.substr(0,2);
                p2 = moguc_potez.substr(3,2);
		p1_old_position=position[from_coords(p1)];
		p2_old_position=position[from_coords(p2)];
                position[from_coords(p2)]=p1_old_position;
                position[from_coords(p1)]="--";
	}
	let kralj;
	let protivnik;
	let napadnut=false;
	if (boja=="white") {
		kralj=="WK";
		protivnik="B";
	} else {
		kralj="BK";
		protivnik="W"
	}
	for (let i=0; i<64; i++) {
		if (position[i][0]==protivnik) {
			let coords = to_coords(i);
			moguci_potezi(coords, false, true, false);
			$(".t_moguc").each(function(){
				if (position[from_coords($(this).attr('id'))]==kralj) napadnut=true;
			});
			moguci_potezi(coords, true, true, false);
			if (napadnut) {
                		position[from_coords(p2)]=p2_old_position;
                		position[from_coords(p1)]=p1_old_position;
				return true;
			}
		}
	}
        position[from_coords(p2)]=p2_old_position;
        position[from_coords(p1)]=p1_old_position;
	return false;
}
function cekaj_potez() {
	console.log("Slušam!");
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
                let potez = decodeURI( data.msg );
		let p1 = potez.substr(0,2);
		let p2 = potez.substr(3,2);
		let igrac = potez.substr(6,1);
                if ((igrac == "W" && piece_color == "black") || (igrac == "B" && piece_color == "white")) {
			let figura = $("#"+p1).text();
                	let kod_figure = position[from_coords(p1)];
			$("#"+p2).text(figura);
                	position[from_coords(p2)]=kod_figure;
                	$("#"+p1).text("");
                	position[from_coords(p1)]="--";
                	if (piece_color=="white") {
                        	to_move="white";
                	} else {
                        	to_move="black";
                	}
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
function moguci_potezi(id, micem=false, testiram=false, provjere=true) { //drugi argument je true ako micem opcije
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
				if(!provjere || !pod_sahom("black",id+" "+to_coords(i))) stavi_makni(i,micem,testiram);
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
                        	if(!provjere || !pod_sahom("black",id+" "+to_coords(i))) stavi_makni(i,micem,testiram);
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
                                if(!provjere || !pod_sahom("black",id+" "+to_coords(i))) stavi_makni(i,micem,testiram);
                        }
                        for (i=indeks-9; i>=0 && i<=63 && i%8<indeks%8; i-=9) {
				if (position[i][0]=="B") continue;
                                izadji = false;
                                for (let j=i+9; j<indeks; j+=9) {
                                        if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                if(!provjere || !pod_sahom("black",id+" "+to_coords(i))) stavi_makni(i,micem,testiram);
                        }
                        for (i=indeks+9; i>=0 && i<=63 && i%8>indeks%8; i+=9) {
				if (position[i][0]=="B") continue;
                                izadji = false;
                                for (let j=i-9; j>indeks; j-=9) {
                                        if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                if(!provjere || !pod_sahom("black",id+" "+to_coords(i))) stavi_makni(i,micem,testiram);
                        }
                        for (i=indeks+7; i>=0 && i<=63 && i%8<indeks%8; i+=7) {
				if (position[i][0]=="B") continue;
                                izadji = false;
                                for (let j=i-7; j>indeks; j-=7) {
                                        if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                if(!provjere || !pod_sahom("black",id+" "+to_coords(i))) stavi_makni(i,micem,testiram);
                        }
                        break;
		case "BN":
			i=indeks-17;
			if (i>=0 && i<=63 && i%8<indeks%8) {
				if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
			}
			i=indeks-15;
			if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
			i=indeks-10;
			if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
			i=indeks-6;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
                        i=indeks+6;
                        if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
			i=indeks+10;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
                        i=indeks+15;
                        if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
			i=indeks+17;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
			break;
		case "BK":
			i=indeks-9;
			if (i>=0 && i%8<indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
			i=indeks-8;
			if (i>=0) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
			i=indeks-7;
			if (i>=0 && i%8>indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
			i=indeks-1;
                        if (i%8<indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
			i=indeks+1;
                        if (i%8>indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
			i=indeks+7;
                        if (i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
			i=indeks+8;
                        if (i<=63) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
			i=indeks+9;
                        if (i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
			i=indeks-2;
			if (castling[3]) {
				if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
			}
			i=indeks+2;
			if (castling[2]) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
			break;
		case "BP":
			i=indeks+8;
                        if (i<=63) {
                                if (position[i]=="--" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
			if (Math.trunc(indeks/8)==1) {
				i=indeks+16;
				if (position[i]=="--" && position[i-8]=="--" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
			}
			i=indeks+7;
                        if (i<=63 && position[i][0]=="W" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        i=indeks+9;
                        if (i<=63 && position[i][0]=="W" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
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
                                if(!provjere || !pod_sahom("white",id+" "+to_coords(i))) stavi_makni(i,micem,testiram);
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
                                if(!provjere || !pod_sahom("white",id+" "+to_coords(i))) stavi_makni(i,micem,testiram);
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
                                if(!provjere || !pod_sahom("white",id+" "+to_coords(i))) stavi_makni(i,micem,testiram);
                        }
                        for (i=indeks-9; i>=0 && i<=63 && i%8<indeks%8; i-=9) {
                                if (position[i][0]=="W") continue;
                                izadji = false; 
                                for (let j=i+9; j<indeks; j+=9) {
                                        if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                if(!provjere || !pod_sahom("white",id+" "+to_coords(i))) stavi_makni(i,micem,testiram);
                        }
                        for (i=indeks+9; i>=0 && i<=63 && i%8>indeks%8; i+=9) {
                                if (position[i][0]=="W") continue;
                                izadji = false; 
                                for (let j=i-9; j>indeks; j-=9) {
                                        if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                if(!provjere || !pod_sahom("white",id+" "+to_coords(i))) stavi_makni(i,micem,testiram);
                        }
                        for (i=indeks+7; i>=0 && i<=63 && i%8<indeks%8; i+=7) {
                                if (position[i][0]=="W") continue;
                                izadji = false;
                                for (let j=i-7; j>indeks; j-=7) {
                                        if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                if(!provjere || !pod_sahom("white",id+" "+to_coords(i))) stavi_makni(i,micem,testiram);
                        }
			break;
		case "WN":
			i=indeks-17;
                        if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
                        i=indeks-15;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
                        i=indeks-10;
                        if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
                        i=indeks-6;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
                        i=indeks+6;
                        if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
			i=indeks+10;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
                        i=indeks+15;
                        if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
                        i=indeks+17;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
                        break;
                case "WK":
			i=indeks-9;
                        if (i>=0 && i%8<indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
                        i=indeks-8;
                        if (i>=0) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
                        i=indeks-7;
                        if (i>=0 && i%8>indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
                        i=indeks-1;
                        if (i%8<indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
                        i=indeks+1;
                        if (i%8>indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
                        i=indeks+7;
                        if (i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
                        i=indeks+8;
                        if (i<=63) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
                        i=indeks+9;
                        if (i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
                        i=indeks-2;
                        if (castling[1]) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
                        i=indeks+2;
                        if (castling[0]) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
                        break;
                case "WP":
			i=indeks-8;
                        if (i>=0) {
                                if (position[i]=="--"  && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
			console.log(Math.trunc(indeks/8));
			if (Math.trunc(indeks/8)==6) {
                                i=indeks-16;
                                if (position[i]=="--" && position[i+8]=="--"  && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        }
			i=indeks-7;
			if (i>=0 && position[i][0]=="B"  && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
                        i=indeks-9;
                        if (i>=0 && position[i][0]=="B"  && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,testiram);
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
		console.log(to_move);
		if (to_move==piece_color && (position[from_coords($(this).attr('id'))][0]==pc || position[from_coords($(this).attr('id'))][0]=="-") || $(this).hasClass("moguc")) {
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
				$(this).text(figura);
				position[from_coords($(this).attr('id'))]=kod_figure;
				console.log(position[from_coords($(this).attr('id'))]);
				$("#"+odabran).text("");
				position[from_coords($("#"+odabran).attr('id'))]="--";
				salji_potez($("#"+odabran).attr('id')+" "+$(this).attr('id')+" "+((piece_color=="white")?"W":"B"));
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

