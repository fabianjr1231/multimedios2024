<?php

    $a = 90;
    $b = 20;

    if($a == $b){
        echo "Si";
    }
    else{
        echo "No";
    }

    if($a == 90){
        echo "Si";
    }
    else{
        echo "No";
    }

    if($a == "90"){
        echo "Si";
    }
    else{
        echo "No";
    }

    if($a > $b){
        echo "$a es mayor";
    }
    elseif($a < $b){
        echo "$a es menor";
    }
    else{
        echo "Son iguales";
    }
?>