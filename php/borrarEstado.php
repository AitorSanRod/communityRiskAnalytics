<?php
    #PHP dedicado al borrado de estados financieros, devuelve un booleano.
    include('conexion.php');

    #El id del estado se recoge directamente de un formulario.
    $idEstado = $_POST['idEstado'];
    $respuestaQuery = true;
    $consulta = "DELETE FROM estados WHERE idestado = '$idEstado'";
    $paquete;

    #Puede que la sesion aqui no haga falta, se revisará
    #session_start();

    try {
        $paquete = mysqli_query($conexion, $consulta);
    } catch (Exception $error) {
        $respuestaQuery = false;
    }

    echo json_encode($respuestaQuery);
?>