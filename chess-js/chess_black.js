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
let piece_color = "black"; //ovdje treba staviti boju igrača iz ajaxa
let to_move="white";
let odabran=null;
let castling=[true,true,true,true]; //je li dopustena rokada? [bijeli_kratko, bijeli_dugo, crni_kratko, crni_dugo]
var ep=null;
var send_string=null;
var game_id="0"; //ovdje treba ići game id iz ajaxa
var timestamp = 0;
function stavi_makni(i,micem,klasa) {
	let a;
	if (micem) {
        	$("#"+to_coords(i)).removeClass(klasa);
        } else {
        	$("#"+to_coords(i)).addClass(klasa);
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
		kralj="WK";
		protivnik="B";
	} else {
		kralj="BK";
		protivnik="W"
	}
	for (let i=0; i<64; i++) {
		if (position[i][0]==protivnik) {
			let coords = to_coords(i);
			moguci_potezi(coords, false, "t_moguc", false);
			for (let j=0; j<64; j++) {
				if ($("#"+to_coords(j)).hasClass("t_moguc") && position[j]==kralj) {
					moguci_potezi(coords, true, "t_moguc", false);
					if (moguc_potez!="") {
						position[from_coords(p2)]=p2_old_position;
                                		position[from_coords(p1)]=p1_old_position;
					}
                                	return true;
				}
			}
			moguci_potezi(coords, true, "t_moguc", false);
		}
	}
	if (moguc_potez!="") {
	        position[from_coords(p2)]=p2_old_position;
        	position[from_coords(p1)]=p1_old_position;
	}
	return false;
}
function ima_potez(boja) {
	let b;
	if (boja == "bijela") {
		b="W";
	} else {
		b="B"
	}
	for (let i=0; i<64; i++) {
		if (position[i][0]==b) {
			moguci_potezi(to_coords(i),false,"m_moguc");
			for (let j=0; j<64; j++) {
				if ($("#"+to_coords(j)).hasClass("m_moguc")) {
					moguci_potezi(to_coords(i),true,"m_moguc");
					return true;
				}
			}
			moguci_potezi(to_coords(i),true,"m_moguc");
		}
	}
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
                let potez = decodeURI( data.msg );
		let p1 = potez.substr(0,2);
		let p2 = potez.substr(3,2);
		let igrac = potez.substr(6,1);
                if ((igrac == "W" && piece_color == "black") || (igrac == "B" && piece_color == "white")) {
			if (p2!="CL" && p2!="CS") {
				let figura = $("#"+p1).text();
        	        	let kod_figure = position[from_coords(p1)];
				$("#"+p2).text(figura);
                		position[from_coords(p2)]=kod_figure;
	                	$("#"+p1).text("");
        	        	position[from_coords(p1)]="--";
				if (kod_figure == "BP" && from_coords(p2)==ep) {
					position[from_coords(p2)-8]="--";
					$("#"+to_coords(from_coords(p2)-8)).text("");
				}
				if (kod_figure == "WP" && from_coords(p2)==ep) {
					position[from_coords(p2)+8]="--";
					$("#"+to_coords(from_coords(p2)+8)).text("");
				}
				if (kod_figure == "BP" && from_coords(p2)-from_coords(p1)==16) {
                        	        ep=from_coords(p1)+8;
	                        } else if (kod_figure == "WP" && from_coords(p1)-from_coords(p2)==16) {
        	                        ep=from_coords(p1)-8;
                	        } else {
                        	        ep=null;
	                        }
				if ((kod_figure=="BP" && p2[1]=="1") || (kod_figure=="WP" && p2[1]=="8")) {
					let pro = potez.substr(8,1);
					switch (pro) {
						case "Q":
							if (igrac == "W") {
								$("#"+p2).text("\u2655");
                                				position[from_coords(p2)]="WQ";
							} else {
								$("#"+p2).text("\u265B");
                                                                position[from_coords(p2)]="BQ";
							}
							break;
						case "R":
							if (igrac == "W") {
                                                                $("#"+p2).text("\u2656");
                                                                position[from_coords(p2)]="WR";
                                                        } else {
                                                                $("#"+p2).text("\u265C");
                                                                position[from_coords(p2)]="BR";
                                                        }
							break;
						case "B":
							if (igrac == "W") {
                                                                $("#"+p2).text("\u2657");
                                                                position[from_coords(p2)]="WB";
                                                        } else {
                                                                $("#"+p2).text("\u265D");
                                                                position[from_coords(p2)]="BB";
                                                        }
							break;
						case "N":
							if (igrac == "W") {
                                                                $("#"+p2).text("\u2658");
                                                                position[from_coords(p2)]="WN";
                                                        } else {
                                                                $("#"+p2).text("\u265E");
                                                                position[from_coords(p2)]="BN";
                                                        }
							break;
					}

				}
				if (!ima_potez(piece_color)) {
					if (pod_sahom(piece_color)) {
						alert("Šah mat! Izgubili ste"); //hendlaj gubitak
					} else {
						alert("Remi!"); //hendlaj remi
					}
				}
        	        	if (piece_color=="white") {
                	        	to_move="white";
                		} else {
	                        	to_move="black";
        	        	}
			} else {
				if (p2=="CS") {
					$("#"+to_coords(from_coords(p1)+2)).text($("#"+p1).text());
        	                        position[from_coords(p1)+2]=position[from_coords(p1)];
                	                $("#"+p1).text("");
                        	        position[from_coords(p1)]="--";
					$("#"+to_coords(from_coords(p1)+1)).text($("#"+to_coords(from_coords(p1)+3)).text());
        	                        position[from_coords(p2)+1]=position[from_coords(p2)+3];
                	                $("#"+to_coords(from_coords(p1)+3)).text("");
                        	        position[from_coords(p1)+3]="--";
				} else {
					$("#"+to_coords(from_coords(p1)-2)).text($("#"+p1).text());
                                        position[from_coords(p1)-2]=position[from_coords(p1)];
                                        $("#"+p1).text("");
                                        position[from_coords(p1)]="--";
                                        $("#"+to_coords(from_coords(p1)-1)).text($("#"+to_coords(from_coords(p1)-4)).text());
                                        position[from_coords(p2)-1]=position[from_coords(p2)-4];
                                        $("#"+to_coords(from_coords(p1)-4)).text("");
                                        position[from_coords(p1)-4]="--";
				}
				if (!ima_potez(piece_color)) {
                                        if (pod_sahom(piece_color)) {
                                                alert("Šah mat! Izgubili ste"); //hendlaj gubitak
                                        } else {
                                                alert("Remi!"); //hendlaj remi
                                        }
                                }
				if (piece_color=="white") {
                                        to_move="white";
                                } else {
                                        to_move="black";
                                }
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
function moguci_potezi(id, micem=false, klasa="moguc", provjere=true) { //drugi argument je true ako micem opcije
	let indeks=from_coords(id);
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
				if(!provjere || !pod_sahom("black",id+" "+to_coords(i))) stavi_makni(i,micem,klasa);
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
                        	if(!provjere || !pod_sahom("black",id+" "+to_coords(i))) stavi_makni(i,micem,klasa);
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
                                if(!provjere || !pod_sahom("black",id+" "+to_coords(i))) stavi_makni(i,micem,klasa);
                        }
                        for (i=indeks-9; i>=0 && i<=63 && i%8<indeks%8; i-=9) {
				if (position[i][0]=="B") continue;
                                izadji = false;
                                for (let j=i+9; j<indeks; j+=9) {
                                        if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                if(!provjere || !pod_sahom("black",id+" "+to_coords(i))) stavi_makni(i,micem,klasa);
                        }
                        for (i=indeks+9; i>=0 && i<=63 && i%8>indeks%8; i+=9) {
				if (position[i][0]=="B") continue;
                                izadji = false;
                                for (let j=i-9; j>indeks; j-=9) {
                                        if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                if(!provjere || !pod_sahom("black",id+" "+to_coords(i))) stavi_makni(i,micem,klasa);
                        }
                        for (i=indeks+7; i>=0 && i<=63 && i%8<indeks%8; i+=7) {
				if (position[i][0]=="B") continue;
                                izadji = false;
                                for (let j=i-7; j>indeks; j-=7) {
                                        if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                if(!provjere || !pod_sahom("black",id+" "+to_coords(i))) stavi_makni(i,micem,klasa);
                        }
                        break;
		case "BN":
			i=indeks-17;
			if (i>=0 && i<=63 && i%8<indeks%8) {
				if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
			}
			i=indeks-15;
			if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
			i=indeks-10;
			if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
			i=indeks-6;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
                        i=indeks+6;
                        if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
			i=indeks+10;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
                        i=indeks+15;
                        if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
			i=indeks+17;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
			break;
		case "BK":
			i=indeks-9;
			if (i>=0 && i%8<indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
			i=indeks-8;
			if (i>=0) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
			i=indeks-7;
			if (i>=0 && i%8>indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
			i=indeks-1;
                        if (i%8<indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
			i=indeks+1;
                        if (i%8>indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
			i=indeks+7;
                        if (i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
			i=indeks+8;
                        if (i<=63) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
			i=indeks+9;
                        if (i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="B" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
			i=indeks-2; //castle long black
			if (castling[3]) {
				if (position[indeks-1]=="--" && position[indeks-2]=="--" && position[indeks-3]=="--" && position[indeks-4]=="BR" && (!provjere || (!pod_sahom("black",id+" "+to_coords(indeks-1)) && !pod_sahom("black",id+" "+to_coords(indeks-2)) && !pod_sahom("black",id+" "+to_coords(indeks))))) stavi_makni(i,micem,klasa);
			}
			i=indeks+2;  //castle short black
			if (castling[2]) {
	                        if (position[indeks+1]=="--" && position[indeks+2]=="--" && position[indeks+3]=="BR" &&(!provjere || (!pod_sahom("black",id+" "+to_coords(indeks+1)) && !pod_sahom("black",id+" "+to_coords(indeks+2)) && !pod_sahom("black",id+" "+to_coords(indeks))))) stavi_makni(i,micem,klasa);
			}
			break;
		case "BP":
			i=indeks+8;
                        if (i<=63) {
                                if (position[i]=="--" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
			if (Math.trunc(indeks/8)==1) {
				i=indeks+16;
				if (position[i]=="--" && position[i-8]=="--" && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
			}
			i=indeks+7;
                        if (i<=63 && i%8<indeks%8 && (position[i][0]=="W" || ep==i) && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        i=indeks+9;
                        if (i<=63 && i%8>indeks%8 && (position[i][0]=="W" || ep==i) && (!provjere || !pod_sahom("black",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
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
                                if(!provjere || !pod_sahom("white",id+" "+to_coords(i))) stavi_makni(i,micem,klasa);
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
                                if(!provjere || !pod_sahom("white",id+" "+to_coords(i))) stavi_makni(i,micem,klasa);
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
                                if(!provjere || !pod_sahom("white",id+" "+to_coords(i))) stavi_makni(i,micem,klasa);
                        }
                        for (i=indeks-9; i>=0 && i<=63 && i%8<indeks%8; i-=9) {
                                if (position[i][0]=="W") continue;
                                izadji = false; 
                                for (let j=i+9; j<indeks; j+=9) {
                                        if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                if(!provjere || !pod_sahom("white",id+" "+to_coords(i))) stavi_makni(i,micem,klasa);
                        }
                        for (i=indeks+9; i>=0 && i<=63 && i%8>indeks%8; i+=9) {
                                if (position[i][0]=="W") continue;
                                izadji = false; 
                                for (let j=i-9; j>indeks; j-=9) {
                                        if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                if(!provjere || !pod_sahom("white",id+" "+to_coords(i))) stavi_makni(i,micem,klasa);
                        }
                        for (i=indeks+7; i>=0 && i<=63 && i%8<indeks%8; i+=7) {
                                if (position[i][0]=="W") continue;
                                izadji = false;
                                for (let j=i-7; j>indeks; j-=7) {
                                        if (position[j]!="--") izadji=true;
                                }
                                if (izadji) continue;
                                if(!provjere || !pod_sahom("white",id+" "+to_coords(i))) stavi_makni(i,micem,klasa);
                        }
			break;
		case "WN":
			i=indeks-17;
                        if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
                        i=indeks-15;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
                        i=indeks-10;
                        if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
                        i=indeks-6;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
                        i=indeks+6;
                        if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
			i=indeks+10;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
                        i=indeks+15;
                        if (i>=0 && i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
                        i=indeks+17;
                        if (i>=0 && i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
                        break;
                case "WK":
			i=indeks-9;
                        if (i>=0 && i%8<indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
                        i=indeks-8;
                        if (i>=0) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
                        i=indeks-7;
                        if (i>=0 && i%8>indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
                        i=indeks-1;
                        if (i%8<indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
                        i=indeks+1;
                        if (i%8>indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
                        i=indeks+7;
                        if (i<=63 && i%8<indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
                        i=indeks+8;
                        if (i<=63) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
                        i=indeks+9;
                        if (i<=63 && i%8>indeks%8) {
                                if (position[i][0]!="W" && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
                        i=indeks-2;
                        if (castling[1]) { //castle long white
                        	if (position[indeks-1]=="--" && position[indeks-2]=="--" && position[indeks-3]=="--" && position[indeks-4]=="WR" && (!provjere || (!pod_sahom("white",id+" "+to_coords(indeks-1)) && !pod_sahom("white",id+" "+to_coords(indeks-2)) && !pod_sahom("white",id+" "+to_coords(indeks))))) stavi_makni(i,micem,klasa);
			}
                        i=indeks+2;
                        if (castling[0]) { //castle short white
                                if (position[indeks+1]=="--" && position[indeks+2]=="--" && position[indeks+3]=="WR" && (!provjere || (!pod_sahom("white",id+" "+to_coords(indeks+1)) && !pod_sahom("white",id+" "+to_coords(indeks+2)) && !pod_sahom("white",id+" "+to_coords(indeks))))) stavi_makni(i,micem,klasa);
                        }
                        break;
                case "WP":
			i=indeks-8;
                        if (i>=0) {
                                if (position[i]=="--"  && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
			if (Math.trunc(indeks/8)==6) {
                                i=indeks-16;
                                if (position[i]=="--" && position[i+8]=="--"  && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        }
			i=indeks-7;
			if (i>=0 && i%8>indeks%8 && (position[i][0]=="B" || ep==i)  && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
                        i=indeks-9;
                        if (i>=0 && i%8<indeks%8 && (position[i][0]=="B" || ep==i)  && (!provjere || !pod_sahom("white",id+" "+to_coords(i)))) stavi_makni(i,micem,klasa);
			break;
		default:
	}
}
$(function(){
	let over = false;
	let cells = $("td");
	let pc;
	let opp_piece_color;
	if (piece_color=="white") {
        	pc="W";
		opp_piece_color="black";
        } else {
        	pc="B";
		opp_piece_color="white";
        }
	cekaj_potez();
	cells.click(function(event) {
		if($(this).hasClass("promocija")) {
                                switch ($(this).attr('id')) {
                                        case "pq":
                                                send_string+=" Q";
                                                p2=send_string.substr(3,2);
                                                if (pc=="W") {
                                                        $("#"+p2).text("\u2655");
                                                        position[from_coords(p2)]="WQ";
                                                } else {
                                                        $("#"+p2).text("\u265B");
                                                        position[from_coords(p2)]="BQ";
                                                }
                                                break;
                                        case "pr":
                                                send_string+=" R";
                                                p2=send_string.substr(3,2);
                                                if (pc=="W") {
                                                        $("#"+p2).text("\u2656");
                                                        position[from_coords(p2)]="WR";
                                                } else {
                                                        $("#"+p2).text("\u265C");
                                                        position[from_coords(p2)]="BR";
                                                }
                                                break;
                                        case "pb":
                                                send_string+=" B";
                                                p2=send_string.substr(3,2);
                                                if (pc=="W") {
                                                        $("#"+p2).text("\u2657");
                                                        position[from_coords(p2)]="WB";
                                                } else {
                                                        $("#"+p2).text("\u265D");
                                                        position[from_coords(p2)]="BB";
                                                }
						break;
                                        case "pn":
                                                send_string+=" N";
                                                p2=send_string.substr(3,2);
                                                if (pc=="W") {
                                                        $("#"+p2).text("\u2658");
                                                        position[from_coords(p2)]="WN";
                                                } else {
                                                        $("#"+p2).text("\u265E");
                                                        position[from_coords(p2)]="BN";
                                                }
						break;
                                }
			salji_potez(send_string);
                        odabran=null;
                        if (piece_color=="white") {
                        	to_move="black";
                        } else {
                        	to_move="white";
                        }
                        $("#overlay").css("display","none");
			if (!ima_potez(opp_piece_color)) {
                       		if (pod_sahom(opp_piece_color)) {
                                	alert("Šah mat! Pobijedili ste"); //hendlaj pobijedu
                                } else {
                                	alert("Remi!"); //hendlaj remi
                                }
                        }
		} else if (to_move==piece_color && (position[from_coords($(this).attr('id'))][0]==pc || position[from_coords($(this).attr('id'))][0]=="-") || $(this).hasClass("moguc")) {
			if ($(this).hasClass("odabran") || (position[from_coords($(this).attr('id'))]=="--" && !$(this).hasClass("moguc"))) {
				if (odabran!=null) {
					moguci_potezi(odabran, true);
				}
				$("#"+odabran).removeClass("odabran");
				odabran=null;
			} else if ($(this).hasClass("moguc")) {
				debugger;
				let p1=$("#"+odabran).attr('id');
				let p2=$(this).attr('id');
				moguci_potezi(odabran, true);
				$("#"+odabran).removeClass("odabran");
                	        let figura = $("#"+odabran).text();
				let kod_figure = position[from_coords($("#"+odabran).attr('id'))];
				if (p1=="a1") castling[1]=false;
                                if (p1=="h1") castling[0]=false;
                                if (p1=="a8") castling[3]=false;
                                if (p1=="h8") castling[2]=false;
                                if (p1=="e1") {
                                        castling[0]=false;
                                        castling[1]=false;
                                }
                                if (p1=="e8") {
                                        castling[2]=false;
                                        castling[3]=false;
                                }
				$(this).text(figura);
				position[from_coords($(this).attr('id'))]=kod_figure;
				$("#"+odabran).text("");
				position[from_coords($("#"+odabran).attr('id'))]="--";
				if (kod_figure == "BP" && from_coords(p2)==ep) {
					position[from_coords(p2)-8]="--";
					$("#"+to_coords(from_coords(p2)-8)).text("");
                        	}
	                        if (kod_figure == "WP" && from_coords(p2)==ep) {
					position[from_coords(p2)+8]="--";
					$("#"+to_coords(from_coords(p2)+8)).text("");
                        	}
				if (kod_figure == "BP" && from_coords(p2)-from_coords(p1)==16) {
                                	ep=from_coords(p1)+8;
                                } else if (kod_figure == "WP" && from_coords(p1)-from_coords(p2)==16) {
                                        ep=from_coords(p1)-8;
                                } else {
                                        ep=null;
                                }
				if (kod_figure=="WK" && p1=="e1" && p2=="c1") {
					$("#d1").text($("#a1").text());
					position[59]="WR";
                                	$("#a1").text("");
                                	position[56]="--";
					p2="CL";
				}
				if (kod_figure=="WK" && p1=="e1" && p2=="g1") {
                                        $("#f1").text($("#h1").text());
                                        position[61]="WR";
                                        $("#h1").text("");
                                        position[63]="--";
					p2="CS";
                                }
				if (kod_figure=="BK" && p1=="e8" && p2=="c8") {
                                        $("#d8").text($("#a8").text());
                                        position[3]="BR";
                                        $("#a8").text("");
                                        position[0]="--";
					p2="CL";
                                }
                                if (kod_figure=="BK" && p1=="e8" && p2=="g8") {
                                        $("#f8").text($("#h8").text());
                                        position[5]="BR";
                                        $("#h8").text("");
                                        position[7]="--";
					p2="CS";
                                }
				if ((kod_figure=="BP" && p2[1]=="1") || (kod_figure=="WP" && p2[1]=="8")) {
					send_string=p1+" "+p2+" "+((piece_color=="white")?"W":"B");
					$("#overlay").css("display","block");
				} else {
					salji_potez(p1+" "+p2+" "+((piece_color=="white")?"W":"B"));
					odabran=null;
					if (!ima_potez(opp_piece_color)) {
                                	        if (pod_sahom(opp_piece_color)) {
                                        	        alert("Šah mat! Pobijedili ste"); //hendlaj pobijedu
	                                        } else {
        	                                        alert("Remi!"); //hendlaj remi
                	                        }
                                	}
					if (piece_color=="white") {
						to_move="black";
					} else {
						to_move="white";
					}
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

