<?php
    #PHP dedicado a la creación de empresa del usuario, devuelve un booleano.
    include('conexion.php');

    $cifEmpresa = $_POST['cif'];
    $razonSocial = $_POST['razonSocial'];
    $sector = $_POST['seleccionSector'];
    $consulta = "SELECT * FROM empresas";
    $respuestaDeLaQuery = true;
    $paquete = mysqli_query($conexion, $consulta);
    $fila;

    session_start();

    #Si el usuario ya tiene una empresa creada, devolvemos false.
    while($fila = mysqli_fetch_array($paquete)){
        if($fila['cif'] == $cifEmpresa){
            $respuestaDeLaQuery = false;
        }
    }

    #Si el usuario aun no tiene empresas asociadas lanzamos la query.
    if($respuestaDeLaQuery){
        $consulta = "INSERT INTO empresas (fidusuario,cif,razonsocial,sector) VALUES (".$_SESSION['idUsuario'].",'$cifEmpresa','$razonSocial','$sector')";
        try {
            $paquete = mysqli_query($conexion, $consulta);
        } catch (Exception $error) {
            $respuestaDeLaQuery = false;
        } 
    }

    echo json_encode($respuestaDeLaQuery);
?>
