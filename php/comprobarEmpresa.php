<?php
    #PHP dedicado a la comprobación de empresas del usuario, devuelve un booleano.
    include('conexion.php');

    $usuario;
    $datosEmpresa;
    $consulta;
    $paquete;
    $fila;
    $empresasExistentes;

    session_start();

    #Se monta la query con los datos de session. Devuelve las empresas del usuario indicado.
    $usuario = $_SESSION['idUsuario'];
    $consulta = "SELECT * FROM empresas WHERE fidusuario = '$usuario'";
    $paquete = mysqli_query($conexion, $consulta);

    #Se recorre el resultado de la query
    while($fila = mysqli_fetch_array($paquete)){
        #Se compara los ids para entrar en cada dato, si hay al menos una linea, significa que el usuario tiene empresas asociadas.
        if($fila['fidusuario'] == $usuario){
            $_SESSION['idEmpresa'] = $fila['idempresa'];
            $empresasExistentes = true;
        }else {
            $empresasExistentes = false;
        }
    }
    
    echo json_encode($empresasExistentes);
?>
