<?php
    #PHP dedicado al inicio de sesión, devuelve un booleano.
    include('conexion.php');

    $usuario = $_POST['usuario'];
    $pass = $_POST['pass'];
    $consulta = "SELECT * FROM usuarios WHERE nombreusuario = '$usuario'";
    $paquete = mysqli_query($conexion, $consulta);
    $respuestaPHP = false;
    $fila;

    session_start();

    #Se busca entre todos los usuario de la base de datos uno que coincida con el enviado.
    try {
        while($fila = mysqli_fetch_array($paquete)){
            if($fila['contrasena'] == sha1($pass)){#El usuario ya debe ser igual
                $_SESSION['usuario'] = $usuario;
                $_SESSION['idUsuario'] = $fila['idusuario'];
                $respuestaPHP = true;
            }
        }
    } catch (Exception $error) {
        echo $error;
    }

    echo json_encode($respuestaPHP);
?>
