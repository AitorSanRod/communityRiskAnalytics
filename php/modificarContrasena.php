<?php
    #PHP dedicado a la modificación de la contraseña, devuelve un booleano.
    include('conexion.php');

    $idUsuario;
    $paquete;
    $consulta;
    $fila;
    $nuevaContrasena = $_POST['nuevaContrasena'];
    $resultado = true;

    session_start();

    $idUsuario = $_SESSION['idUsuario'];

    if($resultado){
        $consulta = "UPDATE usuarios SET contrasena = SHA1('$nuevaContrasena') WHERE idusuario = '$idUsuario'";

        try {
            $paquete = mysqli_query($conexion, $consulta);
        } catch (Exception $error) {
            $resultado = false;
        }
    }

    #Devolución de respuesta a JS.
    echo json_encode($resultado);
?>