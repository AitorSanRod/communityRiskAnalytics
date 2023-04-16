<?php
    #PHP dedicado a la creación de estados, devuelve un booleano.
    include('conexion.php');

    #Los datos son vienen de formularios.
    $ano = $_POST['ano'];
    $comentario = $_POST['comentario'];
    $activoCorriente = $_POST['activoCorriente'];
    $deudoresComercialesYCtasACobrar = $_POST['deudoresComercialesYCuentasACobrar'];
    $inversionesEnEmpresasDeGrupoCP = $_POST['inversionesEnEmpresasDeGrupoCP'];
    $inversionesFinancierasCP = $_POST['inversionesFinancierasCP'];
    $efectivoYActivosLiquidos = $_POST['efectivoYActivosLiquidos'];
    $activoTotal = $_POST['activoTotal'];
    $patrimonio = $_POST['patrimonio'];
    $fondosPropios = $_POST['fondosPropios'];
    $beneficioRetenidoOReservas = $_POST['beneficioRetenidoOReservas'];
    $pasivoCorriente = $_POST['pasivoCorriente'];
    $pasivoTotal = $_POST['pasivoTotal'];
    $facturacion = $_POST['importeNetoDeLaCifraDeNegocios'];
    $amortizacionDelInmovilizado = $_POST['amortizacionDelInmovilizado'];
    $resultadoDeExplotacion = $_POST['resultadoDeExplotacion'];
    $resultadoAntesDeImpuestos = $_POST['resultadoAntesDeImpuestos'];
    $envioDeDatos = true;
    $consulta;
    $paquete;
    $idEmpresa;

    session_start();

    $idEmpresa = $_SESSION['idEmpresa'];
    $consulta = "INSERT INTO estados (fidempresa, ano, comentario, activocorriente, deudorescomercialesycuentasacobrar, 
        inversionesenempresasdegrupocp, inversionesfinancierascp, efectivoyactivosliquidos, activototal, patrimonio, 
        fondospropios, beneficioretenidooreservas, pasivocorriente, pasivototal, importenetodelacifradenegocios, 
        amortizaciondelinmovilizado, resultadodeexplotacion, resultadoantesdeimpuestos) 
        VALUES ('$idEmpresa', '$ano', '$comentario', '$activoCorriente', '$deudoresComercialesYCtasACobrar', '$inversionesEnEmpresasDeGrupoCP', 
        '$inversionesFinancierasCP', '$efectivoYActivosLiquidos', '$activoTotal', '$patrimonio', '$fondosPropios', '$beneficioRetenidoOReservas', 
        '$pasivoCorriente', '$pasivoTotal', '$facturacion', '$amortizacionDelInmovilizado', '$resultadoDeExplotacion', '$resultadoAntesDeImpuestos')";

    try {
        $paquete = mysqli_query($conexion, $consulta);
    } catch (Exception $error) {
        $envioDeDatos = false;
    }

    echo json_encode($envioDeDatos);
?>
