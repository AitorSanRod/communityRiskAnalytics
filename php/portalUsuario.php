<?php
    #PHP dedicado al montaje de los datos del portal de usuario, devuelve un array de 2 dimensiones.
    #La primera siempre tendra los datos de la empresa, la segunda los datos de los balances asociados.
    include('conexion.php');

    $consulta;
    $paquete;
    $fila;
    $idEmpresa;
    $usuario;
    $datosDeEstados;
    $datosEmpresa;
    $paqueteDatos = [];

    session_start();

    #Datos de empresa.
    $idEmpresa = $_SESSION['idEmpresa'];
    $usuario = $_SESSION['idUsuario'];
    $consulta = "SELECT * FROM empresas WHERE fidusuario = '$usuario'";
    $paquete = mysqli_query($conexion, $consulta);

    while($fila = mysqli_fetch_array($paquete)){
        $datosEmpresa = [];
        array_push($datosEmpresa, $fila['cif']);
        array_push($datosEmpresa, $fila['razonsocial']);
        array_push($paqueteDatos, $datosEmpresa);
    }

    #Datos de estados.
    $consulta = "SELECT * FROM estados WHERE fidempresa = '$idEmpresa'";
    $paquete = mysqli_query($conexion, $consulta);

    while($fila = mysqli_fetch_array($paquete)){
        $datosDeEstados = [];
        array_push($datosDeEstados, $fila['idestado']);
        array_push($datosDeEstados, $fila['ano']);
        array_push($datosDeEstados, $fila['comentario']);
        array_push($datosDeEstados, $fila['activocorriente']);
        array_push($datosDeEstados, $fila['deudorescomercialesycuentasacobrar']);
        array_push($datosDeEstados, $fila['inversionesenempresasdegrupocp']);
        array_push($datosDeEstados, $fila['inversionesfinancierascp']);
        array_push($datosDeEstados, $fila['efectivoyactivosliquidos']);
        array_push($datosDeEstados, $fila['activototal']);
        array_push($datosDeEstados, $fila['patrimonio']);
        array_push($datosDeEstados, $fila['fondospropios']);
        array_push($datosDeEstados, $fila['beneficioretenidooreservas']);
        array_push($datosDeEstados, $fila['pasivocorriente']);
        array_push($datosDeEstados, $fila['pasivototal']);
        array_push($datosDeEstados, $fila['importenetodelacifradenegocios']);
        array_push($datosDeEstados, $fila['amortizaciondelinmovilizado']);
        array_push($datosDeEstados, $fila['resultadodeexplotacion']);
        array_push($datosDeEstados, $fila['resultadoantesdeimpuestos']);
        array_push($paqueteDatos, $datosDeEstados);
    }

    echo json_encode($paqueteDatos);
?>
