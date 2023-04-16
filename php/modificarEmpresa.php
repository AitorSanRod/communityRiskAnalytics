<?php
    #PHP dedicado a la modificación de los datos de empresa, devuelve un booleano.
    include('conexion.php');

    $idUsuario;
    $consultaRazonSocial;
    $consultaSector;
    $paquete;
    $fila;
    $nuevaRazonSocial = $_POST['nuevaRazonSocial'];
    $nuevoSector = $_POST['seleccionSector'];
    $resultado = true;

    session_start();

    #Revisar que la nueva empresa no exista ya.
    $consulta = "SELECT * FROM empresas WHERE razonsocial = '$nuevaRazonSocial'";
    $paquete = mysqli_query($conexion, $consulta);

    while($fila = mysqli_fetch_array($paquete)){
        if($fila['razonsocial'] == $nuevaRazonSocial){
            $resultado = false;
        }
    }

    #Si no existe modificamos sus datos.
    if($resultado){
        $idUsuario = $_SESSION['idUsuario'];
        $consultaRazonSocial = "UPDATE empresas SET razonsocial = '$nuevaRazonSocial' WHERE fidusuario = '$idUsuario'";
        $consultaSector = "UPDATE empresas SET sector = '$nuevoSector' WHERE fidusuario = '$idUsuario'";

        try {
            $paquete = mysqli_query($conexion, $consultaRazonSocial);
            $paquete = mysqli_query($conexion, $consultaSector);
        } catch (Exception $error) {
            $resultado = false;
        }
    }

    #Devolución de respuesta a JS.
    echo json_encode($resultado);
?>