<?php

    session_start();

    if ($_SESSION["datosdeuso"] != null){
        echo "Estoy conectado";
    }
    else{
        echo "No estoy conectado";
    }
?>