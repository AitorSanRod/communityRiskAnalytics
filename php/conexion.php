<?php
    #PHP dedicado a la conexión a la base de datos
    
    $host = 'localhost';
    $user = 'root';
    $pass = '';
    $dataBase = 'communityriskanalytics';
    $conexion = mysqli_connect($host, $user, $pass, $dataBase);
?>