<?php

    class Cliente{
        public $id;
        pubLic $nombre;
        public $apellidos;

        public function __construct($id, $nombre, $apellidos){
            $this -> id = $id;
            $this -> nombre = $nombre;
            $this -> apellidos = $apellidos; 
        }

        public function setNombre ($nombre){
            $this -> nombre = $nombre;
        }

        public function setApellidos ($apellidos){
            $this -> apellidos = $apellidos;
        }

        public function getNombre (){
            return $this -> nombre;
        }

        public function getApellidos(){
            return $this -> apellidos;
        }
    }

    $Fabian = new Cliente(1, "Fabián", "Jiménez");

    var_dump($Fabian);
    echo "<br>";
    echo $Fabian -> getNombre();
    echo "<br>";
    echo $Fabian -> getApellidos();
    echo "<br>";
    echo $Fabian -> setNombre("Federico");
    echo $Fabian -> getNombre();
    

    




?>