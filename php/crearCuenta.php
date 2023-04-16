<?php
    #PHP dedicado a la creación de cuentas
    include('conexion.php');

    $nombreUsuario = $_POST['usuario'];
    $contrasena = $_POST['pass'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $email = $_POST['email'];
    $dni = $_POST['dni'];
    $consulta = "SELECT * FROM usuarios";
    $respuestaDeLaQuery = true;
    $paquete = mysqli_query($conexion, $consulta);
    $fila;

    #Revisión del nombre de usuario, si el usuario ya existe devuelve false a JS
    while($fila = mysqli_fetch_array($paquete)){
        if($fila['nombreusuario'] == $nombreUsuario){
            $respuestaDeLaQuery = false;
        }
    }

    #Si el nombre de usuario no existe en la BD se lanza la query
    if($respuestaDeLaQuery){
        $consulta = "INSERT INTO usuarios (nombreusuario,contrasena,nombre,apellido,email,dni) VALUES ('$nombreUsuario', SHA1('$contrasena'),'$nombre','$apellido','$email','$dni')";

        try {
            $paquete = mysqli_query($conexion, $consulta);
        } catch (Exception $error) {
            $respuestaDeLaQuery = false;
        } 
    }

    echo json_encode($respuestaDeLaQuery);
?>
