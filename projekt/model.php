<?php
require_once('view.php');
require_once('controller.php');

class Model {

    public static function init($gamestate) {
        
        $color =  Model::render_board($gamestate);
        $hidden_var = "<input type='hidden' name=boardstate value=".serialize($gamestate).">";
        $gamestate = Model::add_icons($gamestate);
        require_once('game.php');
        
        $vars = [
            "color" => $color,
            "hidden_var" => $hidden_var,
            "gamestate"  => $gamestate,
        ];

        View::render_html($vars);
    }

    public static function render_board($board) {
        
        foreach(Controller::$ROWS as $row) {
            foreach(Controller::$COLUMNS as $col) {
                $field = $col.$row;
                
                if(in_array($field, $board["blue"])) {
                    $color[$field]="blue";
                } else if((intval($row) % 2 == 0 && ord($col[0]) % 2 == 1) 
                        || intval($row) % 2 == 1 && ord($col[0]) % 2 == 0) {
                        $color[$field]="light";
                } else {
                    $color[$field]="dark";
                }
            }       
        }
        return $color;
    }

    public static function add_icons($_board) {
        $board = [];
        
        
        foreach($_board as $key => $value) {
            $board[$key] = Controller::$CHESS_FIGURES[$value];
        }
        return $board;
    }

    public static function d() {}

    public static function change_board_state($board, $vars) {
        
        foreach(Controller::$ROWS as $row) {
            foreach(Controller::$COLUMNS as $col) {
                $fil = $col.$row;
                if(isset($vars[$fil])) {
                    if($board["gamestate"] == 0) {
                        $board["blue"] = [$fil];
                        $posx = ord($fil[0]) - ord('a');
                        $posy = 8 - intval($fil[1]);
                        $arr = Controller::get_next_positions($board, $board[$fil], $posx, $posy);
                        if(count($arr) > 0) {
                            $board["gamestate"] = 1;
                            $board["old"] = $fil;
                        }
                        foreach($arr as $a) {
                            array_push($board["blue"], $a);
                        }
                    } else if($board["gamestate"] == 1) {
                        if(strcmp($fil, $board["old"]) == 0) {
                            $board["gamestate"] = 0;
                            $board["blue"] = [];
                        }
                        else if(in_array($fil, $board["blue"])) {   
                            
                            $board[$fil] = $board[$board["old"]];
                            unset($board[$board["old"]]);
                            $board["gamestate"] = 0;
                            $board["blue"] = [];
                        }
                    }
                }
            }
        }
        return $board;
    }

   

};

?>