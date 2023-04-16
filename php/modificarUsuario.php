<?php
    #PHP dedicado a la modificación del usuario, devuelve un booleano.
    include('conexion.php');

    $usuario;
    $idUsuario;
    $consulta;
    $paquete;
    $fila;
    $nuevoUsuario = $_POST['nuevoUsuario'];
    $resultado = true;

    session_start();

    #Revisar que el nuevo usuario no exista ya.
    $consulta = "SELECT * FROM usuarios WHERE nombreusuario = '$nuevoUsuario'";
    $paquete = mysqli_query($conexion, $consulta);

    while($fila = mysqli_fetch_array($paquete)){
        if($fila['nombreusuario'] == $nuevoUsuario){
            $resultado = false;
        }
    }

    if($resultado){
        $usuario = $_SESSION['usuario'];
        $idUsuario = $_SESSION['idUsuario'];
        $consulta = "UPDATE usuarios SET nombreusuario = '$nuevoUsuario' WHERE idusuario = '$idUsuario'";

        try {
            $paquete = mysqli_query($conexion, $consulta);
        } catch (Exception $error) {
            $resultado = false;
        }

        #Modificar datos de session.
        if($resultado){
            $_SESSION['usuario'] = $usuario;
        }
    }

    echo json_encode($resultado);
?>