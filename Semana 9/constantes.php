<?php
    define('Soynuevo', 'Datos en constante');

    define('SoyNuevoArreglo',
        [123, true, "Fin datos"]
    );

    define ('conexion', 'soy la conexion a la bd');

    function conectar(){
        echo conexion;
    }

    echo Soynuevo;
    echo "<br>";
    var_dump(SoyNuevoArreglo);
    echo "<br>";
    conectar();

?>