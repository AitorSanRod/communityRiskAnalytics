<?php
    #PHP dedicado a comprobar si un usuario tiene estados asociados y de que años.
    #Devuelve un array con los años de cada estado financiero en la BD.
    #De ese dato se monta la elección del año a la hora de crear un nuevo estado.
    include('conexion.php');

    $usuario;
    $idEmpresa;
    $consulta;
    $paquete;
    $fila;
    $datosEstados = [];

    session_start();

    #Se buscan las empresas del usuario y se recorren.
    $usuario = $_SESSION['idUsuario'];
    $idEmpresa = $_SESSION['idEmpresa'];
    $consulta = "SELECT * FROM estados WHERE fidempresa = '$idEmpresa'";
    $paquete = mysqli_query($conexion, $consulta);

    while($fila = mysqli_fetch_array($paquete)){
        array_push($datosEstados, $fila['ano']);
    }
    
    echo json_encode($datosEstados);
?>
