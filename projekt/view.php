<?php
class View {
    public static function render_html($vars) {
        extract($vars);
        require_once '_view.php';
        return;
    }
};
?>