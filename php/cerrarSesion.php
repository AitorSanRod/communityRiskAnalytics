<?php
    include('conexion.php');

    $cierreDeSesion = true;

    session_start();

    try {
        $_SESSION['usuario'] = null;
        $_SESSION['idUsuario'] = null;
    } catch (Exception $error) {
        $cierreDeSesion = false;
    }

    echo json_encode($cierreDeSesion);
?>