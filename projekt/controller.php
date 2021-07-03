<?php
require_once('model.php');

function startsWith ($string, $startString)
{
    $len = strlen($startString);
    return (substr($string, 0, $len) === $startString);
}

class Controller {
    static $ROWS = ['8', '7', '6', '5', '4', '3', '2', '1'];
    static $COLUMNS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    
    static $CHESS_FIGURES = [
        'TOP_B' => '&#9820;',
        'SKAKAC_B' => '&#9822;',
        'LOVAC_B' => '&#9821;',
        'DAMA_B' => '&#9819;',
        'KRALJ_B' => '&#9818;',
        'PJESAK_B' => '&#9823;',
        'TOP_W' => '&#9814;',
        'SKAKAC_W' => '&#9816;',
        'LOVAC_W' => '&#9815;',
        'DAMA_W' => '&#9813;',
        'KRALJ_W' => '&#9812;',
        'PJESAK_W' => '&#9817;',
    ];

    static $PAWN_MOVES = [
        'TOP' => [ "dirr" => [[1,0], [0,-1], [-1,0], [0,1]], "mull" => 8],
        'SKAKAC' => [ "dirr" => [[-1,2], [1,-2], [1,2], [-1,-2], [2, 1], [-2, -1], [2, -1], [-2, 1]], "mull" => 1],
        'LOVAC' => [ "dirr" => [[1,1], [-1,-1], [-1,1], [1,-1]], "mull" => 8],
        'PJESAK_W' => [ "dirr" => [[0,-1]], "mull" => 2],
        'PJESAK_B' => [ "dirr" => [[0,1]], "mull" => 2],
        'KRALJ' => [ "dirr" => [[1,0], [0,-1], [-1,0], [0,1], [1,1],[-1,-1], [1,-1],[-1,1]], "mull" => 1],
        'DAMA' => [ "dirr" => [[1,0], [0,-1], [-1,0], [0,1], [1,1],[-1,-1], [1,-1],[-1,1]], "mull" => 8],
        
    ];

    public static function init() {
        
        if(!isset($_POST["boardstate"])) {
            $gamestate = Controller::get_initial_board();
        } else {
            $gamestate = unserialize($_POST["boardstate"]);
            $gamestate = Model::change_board_state($gamestate, $_POST);
        }

        Model::init($gamestate);
        
    }

    public static function get_initial_board(){
        $board = [
            "a8" => "TOP_B",
            "b8" => "SKAKAC_B",
            "c8" => "LOVAC_B",
            "d8" => "DAMA_B",
            "e8" => "KRALJ_B",
            "f8" => "LOVAC_B",
            "g8" => "SKAKAC_B",
            "h8" => "TOP_B",
            "a7" => "PJESAK_B",
            "b7" => "PJESAK_B",
            "c7" => "PJESAK_B",
            "d7" => "PJESAK_B",
            "e7" => "PJESAK_B",
            "f7" => "PJESAK_B",
            "g7" => "PJESAK_B",
            "h7" => "PJESAK_B",
            "a2" => "PJESAK_W",
            "b2" => "PJESAK_W",
            "c2" => "PJESAK_W",
            "d2" => "PJESAK_W",
            "e2" => "PJESAK_W",
            "f2" => "PJESAK_W",
            "g2" => "PJESAK_W",
            "h2" => "PJESAK_W",
            "a1" => "TOP_W",
            "b1" => "SKAKAC_W",
            "c1" => "LOVAC_W",
            "d1" => "DAMA_W",
            "e1" => "KRALJ_W",
            "f1" => "LOVAC_W",
            "g1" => "SKAKAC_W",
            "h1" => "TOP_W",
            "blue" => [],
            "gamestate" => 0,
        ];
        return $board;
    }

    
    

    public static function get_field_name($x, $y) {
        return Controller::$COLUMNS[$x].Controller::$ROWS[$y];
    }

    public static function get_next_positions($board, $pawn, $posx, $posy) {
        foreach(Controller::$PAWN_MOVES as  $_pawn => $_val) {
            
            if(startsWith($pawn, $_pawn)) {
                $arr = [];
                
                
                foreach(Controller::$PAWN_MOVES[$_pawn]["dirr"] as $dirr) {
                    $limit = Controller::$PAWN_MOVES[$_pawn]["mull"];
                    
                    $dx = $posx;
                    $dy = $posy;
                    for($i = 0; $i < $limit; ++$i) {
                        if(strcmp($_pawn, "PJESAK_W") == 0 && $posy != 6 && $i > 0) break;
                        if(strcmp($_pawn, "PJESAK_B") == 0 && $posy != 1 && $i > 0) break;
                        $dx = $dx + $dirr[0];
                        $dy = $dy + $dirr[1];
                        if( $dx < 0 || $dx >=8 || $dy < 0 || $dy >= 8 ) continue;
                        if(isset($board[Controller::get_field_name($dx, $dy)])) break;
                        array_push($arr, Controller::get_field_name($dx, $dy));
                    }
                }
                
                return $arr;
            }
        }
        return [];
    }

    
};

?>