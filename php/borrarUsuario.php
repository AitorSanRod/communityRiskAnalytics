<?php
    #PHP dedicado al borrado de usuarios, devuelve un booleano.
    include('conexion.php');

    $respuestaQuery = true;
    $idUsuario;
    $consulta;
    $paquete;

    session_start();

    #El id del usuario lo sacamos de la variable de sesión.
    $idUsuario = $_SESSION['idUsuario'];
    $consulta = "DELETE FROM usuarios WHERE idusuario = '$idUsuario'";

    try {
        $paquete = mysqli_query($conexion, $consulta);
    } catch (Exception $error) {
        $respuestaQuery = false;
    }

    #Si se ha borrado correctamente, vaciamos la variable de session.
    if($respuestaQuery){
        $_SESSION['idUsuario'] = '';
    }

    echo json_encode($respuestaQuery);
?>