<?php
    #PHP dedicado al borrado de empresa de usuario, se devuelve un booleano.
    include('conexion.php');

    $respuestaQuery = true;
    $idEmpresa;
    $consulta;
    $paquete;

    session_start();

    #Con el id de la sesión de empresa montamos la query
    $idEmpresa = $_SESSION['idEmpresa'];
    $consulta = "DELETE FROM empresas WHERE idempresa = '$idEmpresa'";

    #Lanzamos la query
    try {
        $paquete = mysqli_query($conexion, $consulta);
    } catch (Exception $error) {
        $respuestaQuery = false;
    }

    #Si se ha borrado correctamente, vaciamos la variable de session
    if($respuestaQuery){
        $_SESSION['idEmpresa'] = '';
    }

    echo json_encode($respuestaQuery);
?>