<?php
    include('conexion.php');

    $usuarioExistente = true;

    session_start();

    if($_SESSION['usuario'] == '' ){
        $usuarioExistente = false;
    }

    echo json_encode($usuarioExistente);
?>