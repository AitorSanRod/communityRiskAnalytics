<?php
    #PHP dedicado a la modificación de la contraseña, devuelve un booleano.
    include('conexion.php');

    $idUsuario;
    $paquete;
    $consulta;
    $fila;
    $usuario;
    $nuevaContrasena = $_POST['nuevaContrasena'];
    $contrasenaAntigua = $_POST['contrasenaAntigua'];
    $resultado = true;

    session_start();

    $idUsuario = $_SESSION['idUsuario'];
    $usuario = $_SESSION['usuario'];

    $consulta = "SELECT * FROM usuarios WHERE nombreusuario = '$usuario'";
    $paquete = mysqli_query($conexion, $consulta);

    #Se busca entre todos los usuario de la base de datos uno que coincida con el enviado.
    try {
        while($fila = mysqli_fetch_array($paquete)){
            if($fila['contrasena'] != sha1($contrasenaAntigua)){#El usuario ya debe ser igual
                $resultado = false;
            }
        }
    } catch (Exception $error) {
        echo $error;
    }

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