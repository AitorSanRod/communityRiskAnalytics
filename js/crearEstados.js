const URLCREARESTADOSPHP = '../php/crearEstados.php';
const URLCOMPROBARESTADOSPHP = '../php/comprobarEstados.php';

document.addEventListener('DOMContentLoaded', function () {
  //Variables comunes
  let tipoDeSubida = document.getElementById('tipoEstados');
  let formularioManual = document.getElementById('formularioEstados');
  let datosExcel = document.getElementById('datosExcel');
  let archivoExcel = document.getElementById('archivoExcel');
  let anoActual = new Date();
  let datosSelectAnoExcel;
  let datosSelectAnoManual;
  let anosSelect = anoActual.getFullYear() - 5;//Los ultimos 5 años + el actual
  let inputAno = document.getElementById('ano');
  let selectAno = document.getElementById('anoSelect');
  let selectExcel = document.getElementById('anoExcel');
  let notificaciones = document.getElementById('notificaciones');
  let divInformacionExcel = document.getElementById('informacionExcel');
  let comentarioExcel = document.getElementById('comentarioExcel');
  let botonEnvioDatosConExcel = document.getElementById('enviarDatosExcel');
  let datosPlantilla = document.getElementById('informacionPlantilla');
  //comentario
  let inputComentario = document.getElementById('comentario');
  let controlComentario = document.getElementById('controlComentario');
  //activo corriente
  let inputActivoCorriente = document.getElementById('inputActivoCorriente');
  let controlActivoCorriente = document.getElementById('controlActivoCorriente');
  //deudores comerciales
  let inputDeudoresComercialesYCuentasACobrar = document.getElementById('inputDeudoresComercialesYCuentasACobrar');
  let controlDeudoresComercialesYCuentasACobrar = document.getElementById('controlDeudoresComercialesYCuentasACobrar');
  //inversiones en empresas de grupo
  let inputInversionesEnEmpresasDeGrupoCP = document.getElementById('inputInversionesEnEmpresasDeGrupoCP');
  let controlInversionesEnEmpresasDeGrupoCP = document.getElementById('controlInversionesEnEmpresasDeGrupoCP');
  //inversiones financieras
  let inputInversionesFinancierasCP = document.getElementById('inputInversionesFinancierasCP');
  let controlInversionesFinancierasCP = document.getElementById('controlInversionesFinancierasCP');
  //efectivo y activos liquidos
  let inputEfectivoYActivosLiquidos = document.getElementById('inputEfectivoYActivosLiquidos');
  let controlEfectivoYActivosLiquidos = document.getElementById('controlEfectivoYActivosLiquidos');
  //activo total
  let inputActivoTotal = document.getElementById('inputActivoTotal');
  let controlActivoTotal = document.getElementById('controlActivoTotal');
  //patrimonio
  let inputPatrimonio = document.getElementById('inputPatrimonio');
  let controlPatrimonio = document.getElementById('controlPatrimonio');
  //fondos propios
  let inputFondosPropios = document.getElementById('inputFondosPropios');
  let controlFondosPropios = document.getElementById('controlFondosPropios');
  //beneficios retenido y reservas
  let inputBeneficioRetenidoOReservas = document.getElementById('inputBeneficioRetenidoOReservas');
  let controlBeneficioRetenidoOReservas = document.getElementById('controlBeneficioRetenidoOReservas');
  //pasivo corriente
  let inputPasivoCorriente = document.getElementById('inputPasivoCorriente');
  let controlPasivoCorriente = document.getElementById('controlPasivoCorriente');
  //pasivo total
  let inputPasivoTotal = document.getElementById('inputPasivoTotal');
  let controlPasivoTotal = document.getElementById('controlPasivoTotal');
  //facturacion
  let inputFacturacion = document.getElementById('inputImporteNetoDeLaCifraDeNegocios');
  let controlFacturacion = document.getElementById('controlImporteNetoDeLaCifraDeNegocios');
  //amortizacion
  let inputAmortizacionDelInmovilizado = document.getElementById('inputAmortizacionDelInmovilizado');
  let controlAmortizacionDelInmovilizado = document.getElementById('controlAmortizacionDelInmovilizado');
  //resultado de explicacion
  let inputResultadoDeExplotacion = document.getElementById('inputResultadoDeExplotacion');
  let controlResultadoDeExplotacion = document.getElementById('controlResultadoDeExplotacion');
  //resultado antes de impuesto
  let inputResultadoAntesDeImpuestos = document.getElementById('inputResultadoAntesDeImpuestos');
  let controlResultadoAntesDeImpuestos = document.getElementById('controlResultadoAntesDeImpuestos');
  //Control de submit
  let comentarioOK = false;
  let activoCorrienteOK = false;
  let deudoresComercialesOK = false;
  let inversionesEnEmpresasOK = false;
  let inversionesFinancierasOK = false;
  let efectivoYActivosLiquidosOK = false;
  let activoTotalOK = false;
  let patrimonioOK = false;
  let fondosPropiosOK = false;
  let beneficioRetenidoOK = false;
  let pasivoCorrienteOK = false;
  let pasivoTotalOK = false;
  let facturacionOK = false;
  let amortizacionOK = false;
  let resultadoDeExplotacionOK = false;
  let resultadoOK = false;

  inputAno.value = anosSelect;

  /*
  * El siguiente fetch crea las opciones del select de años.
  * Busca en la base de datos los años de los balances ya cargados.
  * En caso de que el balance ya este, no crea la opción de ese año.
  */
  fetch(URLCOMPROBARESTADOSPHP)
    .then(respuesta => respuesta.json())
    .then(datos => {
      for (let i = 0; i < 6; i++) {
        if (!datos.includes(anosSelect.toString())) {
          datosSelectAnoExcel = document.createElement('option');
          datosSelectAnoManual = document.createElement('option');
          datosSelectAnoExcel.value = anosSelect;
          datosSelectAnoManual.value = anosSelect;
          datosSelectAnoExcel.innerText = anosSelect;
          datosSelectAnoManual.innerText = anosSelect;
          selectAno.appendChild(datosSelectAnoManual);
          selectExcel.appendChild(datosSelectAnoExcel);
        }
        anosSelect++;
      }
    })
    .catch(error => console.log(error));

  /*
  * FUNCIONES
  */
  function mostrarDatosExcel() {//Monta la vista previa de los datos del excel
    let activoCorriente = inputActivoCorriente.value;
    let deudoresComerciales = inputDeudoresComercialesYCuentasACobrar.value;
    let inversionesEnEmpresas = inputInversionesEnEmpresasDeGrupoCP.value;
    let inversionesFinancieras = inputInversionesFinancierasCP.value;
    let efectivoYActivosLiquidos = inputEfectivoYActivosLiquidos.value;
    let activoTotal = inputActivoTotal.value;
    let patrimonio = inputPatrimonio.value;
    let fondosPropios = inputFondosPropios.value;
    let beneficioRetenido = inputBeneficioRetenidoOReservas.value;
    let pasivoCorriente = inputPasivoCorriente.value;
    let pasivoTotal = inputPasivoTotal.value;
    let facturacion = inputFacturacion.value;
    let amortizacion = inputAmortizacionDelInmovilizado.value;
    let resultadoDeExplotacion = inputResultadoDeExplotacion.value;
    let resultado = inputResultadoAntesDeImpuestos.value;

    divInformacionExcel.innerHTML = '';

    divInformacionExcel.innerHTML += `Activo corriente: ${activoCorriente}<br>
    Deudores comerciales y cuentas a cobrar : ${deudoresComerciales}<br>
    Inversiones en empresas de grupo CP: ${inversionesEnEmpresas}<br>
    Inversiones financieras CP: ${inversionesFinancieras}<br>
    Efectivo y activos líquidos: ${efectivoYActivosLiquidos}<br>
    Activo total: ${activoTotal}<br>
    Patrimonio: ${patrimonio}<br>
    Fondos propios: ${fondosPropios}<br>
    Beneficio retenido o reservas: ${beneficioRetenido}<br>
    Pasivo corriente: ${pasivoCorriente}<br>
    Pasivo total: ${pasivoTotal}<br>
    Importe neto de la cifra de negocios: ${facturacion}<br>
    Amortización del inmovilizado: ${amortizacion}<br>
    Resultado de explotación: ${resultadoDeExplotacion}<br>
    Resultado antes de impuestos: ${resultado}<br>`;
  }

  function resetFormulario() {//Vacía los inputs
    //Comentario
    document.getElementById('comentario').value = '';

    //Activo corriente
    document.getElementById('inputActivoCorriente').value = '';

    //deudores comerciales
    document.getElementById('inputDeudoresComercialesYCuentasACobrar').value = '';

    //inversiones en empresas de grupo
    document.getElementById('inputInversionesEnEmpresasDeGrupoCP').value = '';

    //inversiones financieras
    document.getElementById('inputInversionesFinancierasCP').value = '';

    //efectivo y activos liquidos
    document.getElementById('inputEfectivoYActivosLiquidos').value = '';

    //activo total
    document.getElementById('inputActivoTotal').value = '';

    //patrimonio
    document.getElementById('inputPatrimonio').value = '';

    //fondos propios
    document.getElementById('inputFondosPropios').value = '';

    //beneficios retenido y reservas
    document.getElementById('inputBeneficioRetenidoOReservas').value = '';

    //pasivo corriente
    document.getElementById('inputPasivoCorriente').value = '';

    //pasivo total
    document.getElementById('inputPasivoTotal').value = '';

    //facturacion
    document.getElementById('inputImporteNetoDeLaCifraDeNegocios').value = '';

    //amortizacion
    document.getElementById('inputAmortizacionDelInmovilizado').value = '';

    //resultado de explicacion
    document.getElementById('inputResultadoDeExplotacion').value = '';

    //resultado antes de impuesto
    document.getElementById('inputResultadoAntesDeImpuestos').value = '';
  }

  /*
  * LISTENERS
  */
  tipoDeSubida.addEventListener('change', function () {// Mostrar unos datos u otros en función de elección

    if (tipoDeSubida.value == 'manual') { //Mostrar formulario
      formularioManual.style.display = 'block';
      datosExcel.style.display = 'none';
      divInformacionExcel.style.display = 'none';
      datosPlantilla.style.display = 'none';
      resetFormulario();

    } else if (tipoDeSubida.value == 'excel') { //Mostrar datos excel
      formularioManual.style.display = 'none';
      datosExcel.style.display = 'block';
      divInformacionExcel.style.display = 'block';
      datosPlantilla.style.display = 'block';
      resetFormulario();

    } else { // Dejar la sección vacia
      formularioManual.style.display = 'none';
      datosExcel.style.display = 'none';
      divInformacionExcel.style.display = 'none';
      datosPlantilla.style.display = 'none';
      resetFormulario();

    }
  });

  selectExcel.addEventListener('change', function () {//Input oculto de año para excel
    inputAno.value = selectExcel.value;
  });

  selectAno.addEventListener('change', function () {//Input oculto de año
    inputAno.value = selectAno.value;
  });

  inputComentario.addEventListener('keyup', function () {//Comentario
    if (validarLongitud(inputComentario.value, 0, 251)) {
      controlComentario.innerText = '';
      comentarioOK = true;
    } else {
      controlComentario.innerText = 'Este campo no puede estar vacío.';
      comentarioOK = false;
    }
  });

  inputActivoCorriente.addEventListener('keyup', function () {//Activo corriente
    inputActivoCorriente.value = inputActivoCorriente.value.trim();

    if (inputActivoCorriente.value != '') {
      if (validarNumeroBalance(inputActivoCorriente.value)) {
        activoCorrienteOK = true;
        controlActivoCorriente.innerText = '';
        inputActivoCorriente.value = parseInt(inputActivoCorriente.value);
      } else {
        activoCorrienteOK = false;
        controlActivoCorriente.innerText = 'Sólo puede usar números que sean enteros.';
      }
    } else {
      activoCorrienteOK = false;
      controlActivoCorriente.innerText = 'No puede dejar casillas vacías, use 0.';
    }
  });

  inputDeudoresComercialesYCuentasACobrar.addEventListener('keyup', function () {//Deudores comerciales y cuenta a cobrar
    inputDeudoresComercialesYCuentasACobrar.value = inputDeudoresComercialesYCuentasACobrar.value.trim();

    if (inputDeudoresComercialesYCuentasACobrar.value != '') {
      if (validarNumeroBalance(inputDeudoresComercialesYCuentasACobrar.value)) {
        deudoresComercialesOK = true;
        controlDeudoresComercialesYCuentasACobrar.innerText = '';
        inputDeudoresComercialesYCuentasACobrar.value = parseInt(inputDeudoresComercialesYCuentasACobrar.value);
      } else {
        deudoresComercialesOK = false;
        controlDeudoresComercialesYCuentasACobrar.innerText = 'Sólo puede usar números que sean enteros.';
      }
    } else {
      deudoresComercialesOK = false;
      controlDeudoresComercialesYCuentasACobrar.innerText = 'No puede dejar casillas vacías, use 0.';
    }
  });

  inputInversionesEnEmpresasDeGrupoCP.addEventListener('keyup', function () {//Inversiones en empresas de grupo cp
    inputInversionesEnEmpresasDeGrupoCP.value = inputInversionesEnEmpresasDeGrupoCP.value.trim();

    if (inputInversionesEnEmpresasDeGrupoCP.value != '') {
      if (validarNumeroBalance(inputInversionesEnEmpresasDeGrupoCP.value)) {
        inversionesEnEmpresasOK = true;
        controlInversionesEnEmpresasDeGrupoCP.innerText = '';
        inputInversionesEnEmpresasDeGrupoCP.value = parseInt(inputInversionesEnEmpresasDeGrupoCP.value);
      } else {
        inversionesEnEmpresasOK = false;
        controlInversionesEnEmpresasDeGrupoCP.innerText = 'Sólo puede usar números que sean enteros.';
      }
    } else {
      inversionesEnEmpresasOK = false;
      controlInversionesEnEmpresasDeGrupoCP.innerText = 'No puede dejar casillas vacías, use 0.';
    }
  });

  inputInversionesFinancierasCP.addEventListener('keyup', function () {//Inversiones financieras cp
    inputInversionesFinancierasCP.value = inputInversionesFinancierasCP.value.trim();

    if (inputInversionesFinancierasCP.value != '') {
      if (validarNumeroBalance(inputInversionesFinancierasCP.value)) {
        inversionesFinancierasOK = true;
        controlInversionesFinancierasCP.innerText = '';
        inputInversionesFinancierasCP.value = parseInt(inputInversionesFinancierasCP.value);
      } else {
        inversionesFinancierasOK = false;
        controlInversionesFinancierasCP.innerText = 'Sólo puede usar números que sean enteros.';
      }
    } else {
      inversionesFinancierasOK = false;
      controlInversionesFinancierasCP.innerText = 'No puede dejar casillas vacías, use 0.';
    }
  });

  inputEfectivoYActivosLiquidos.addEventListener('keyup', function () {//efectivo y activos liquidos
    inputEfectivoYActivosLiquidos.value = inputEfectivoYActivosLiquidos.value.trim();

    if (inputEfectivoYActivosLiquidos.value != '') {
      if (validarNumeroBalance(inputEfectivoYActivosLiquidos.value)) {
        efectivoYActivosLiquidosOK = true;
        controlEfectivoYActivosLiquidos.innerText = '';
        inputEfectivoYActivosLiquidos.value = parseInt(inputEfectivoYActivosLiquidos.value);
      } else {
        efectivoYActivosLiquidosOK = false;
        controlEfectivoYActivosLiquidos.innerText = 'Sólo puede usar números que sean enteros.';
      }
    } else {
      efectivoYActivosLiquidosOK = false;
      controlEfectivoYActivosLiquidos.innerText = 'No puede dejar casillas vacías, use 0.';
    }
  });

  inputActivoTotal.addEventListener('keyup', function () {//activo total
    inputActivoTotal.value = inputActivoTotal.value.trim();

    if (inputActivoTotal.value != '') {
      if (validarNumeroBalance(inputActivoTotal.value)) {
        activoTotalOK = true;
        controlActivoTotal.innerText = '';
        inputActivoTotal.value = parseInt(inputActivoTotal.value);
      } else {
        activoTotalOK = false;
        controlActivoTotal.innerText = 'Sólo puede usar números que sean enteros.';
      }
    } else {
      activoTotalOK = false;
      controlActivoTotal.innerText = 'No puede dejar casillas vacías, use 0.';
    }
  });

  inputPatrimonio.addEventListener('keyup', function () {//patrimonio
    inputPatrimonio.value = inputPatrimonio.value.trim();

    if (inputPatrimonio.value != '') {
      if (validarNumeroBalance(inputPatrimonio.value)) {
        patrimonioOK = true;
        controlPatrimonio.innerText = '';
        inputPatrimonio.value = parseInt(inputPatrimonio.value);
      } else {
        patrimonioOK = false;
        controlPatrimonio.innerText = 'Sólo puede usar números que sean enteros.';
      }
    } else {
      patrimonioOK = false;
      controlPatrimonio.innerText = 'No puede dejar casillas vacías, use 0.';
    }
  });

  inputFondosPropios.addEventListener('keyup', function () {//fondos propios
    inputFondosPropios.value = inputFondosPropios.value.trim();

    if (inputFondosPropios.value != '') {
      if (validarNumeroBalance(inputFondosPropios.value)) {
        fondosPropiosOK = true;
        controlFondosPropios.innerText = '';
        inputFondosPropios.value = parseInt(inputFondosPropios.value);
      } else {
        fondosPropiosOK = false;
        controlFondosPropios.innerText = 'Sólo puede usar números que sean enteros.';
      }
    } else {
      fondosPropiosOK = false;
      controlFondosPropios.innerText = 'No puede dejar casillas vacías, use 0.';
    }
  });

  inputBeneficioRetenidoOReservas.addEventListener('keyup', function () {//beneficio retenido o reserva
    inputBeneficioRetenidoOReservas.value = inputBeneficioRetenidoOReservas.value.trim();

    if (inputBeneficioRetenidoOReservas.value != '') {
      if (validarNumeroBalance(inputBeneficioRetenidoOReservas.value)) {
        beneficioRetenidoOK = true;
        controlBeneficioRetenidoOReservas.innerText = '';
        inputBeneficioRetenidoOReservas.value = parseInt(inputBeneficioRetenidoOReservas.value);
      } else {
        beneficioRetenidoOK = false;
        controlBeneficioRetenidoOReservas.innerText = 'Sólo puede usar números que sean enteros.';
      }
    } else {
      beneficioRetenidoOK = false;
      controlBeneficioRetenidoOReservas.innerText = 'No puede dejar casillas vacías, use 0.';
    }
  });

  inputPasivoCorriente.addEventListener('keyup', function () {//pasivo corriente
    inputPasivoCorriente.value = inputPasivoCorriente.value.trim();

    if (inputPasivoCorriente.value != '') {
      if (validarNumeroBalance(inputPasivoCorriente.value)) {
        pasivoCorrienteOK = true;
        controlPasivoCorriente.innerText = '';
        inputPasivoCorriente.value = parseInt(inputPasivoCorriente.value);
      } else {
        pasivoCorrienteOK = false;
        controlPasivoCorriente.innerText = 'Sólo puede usar números que sean enteros.';
      }
    } else {
      pasivoCorrienteOK = false;
      controlPasivoCorriente.innerText = 'No puede dejar casillas vacías, use 0.';
    }
  });

  inputPasivoTotal.addEventListener('keyup', function () {//pasivo total
    inputPasivoTotal.value = inputPasivoTotal.value.trim();

    if (inputPasivoTotal.value != '') {
      if (validarNumeroBalance(inputPasivoTotal.value)) {
        pasivoTotalOK = true;
        controlPasivoTotal.innerText = '';
        inputPasivoTotal.value = parseInt(inputPasivoTotal.value);
      } else {
        pasivoTotalOK = false;
        controlPasivoTotal.innerText = 'Sólo puede usar números que sean enteros.';
      }
    } else {
      pasivoTotalOK = false;
      controlPasivoTotal.innerText = 'No puede dejar casillas vacías, use 0.';
    }
  });

  inputFacturacion.addEventListener('keyup', function () {//facturacion
    inputFacturacion.value = inputFacturacion.value.trim();

    if (inputFacturacion.value != '') {
      if (validarNumeroBalance(inputFacturacion.value)) {
        facturacionOK = true;
        controlFacturacion.innerText = '';
        inputFacturacion.value = parseInt(inputFacturacion.value);
      } else {
        facturacionOK = false;
        controlFacturacion.innerText = 'Sólo puede usar números que sean enteros.';
      }
    } else {
      facturacionOK = false;
      controlFacturacion.innerText = 'No puede dejar casillas vacías, use 0.';
    }
  });

  inputAmortizacionDelInmovilizado.addEventListener('keyup', function () {//amortizacion
    inputAmortizacionDelInmovilizado.value = inputAmortizacionDelInmovilizado.value.trim();

    if (inputAmortizacionDelInmovilizado.value != '') {
      if (validarNumeroBalance(inputAmortizacionDelInmovilizado.value)) {
        amortizacionOK = true;
        controlAmortizacionDelInmovilizado.innerText = '';
        inputAmortizacionDelInmovilizado.value = parseInt(inputAmortizacionDelInmovilizado.value);
      } else {
        amortizacionOK = false;
        controlAmortizacionDelInmovilizado.innerText = 'Sólo puede usar números que sean enteros.';
      }
    } else {
      amortizacionOK = false;
      controlAmortizacionDelInmovilizado.innerText = 'No puede dejar casillas vacías, use 0.';
    }
  });

  inputResultadoDeExplotacion.addEventListener('keyup', function () {//resultado explotacion
    inputResultadoDeExplotacion.value = inputResultadoDeExplotacion.value.trim();

    if (inputResultadoDeExplotacion.value != '') {
      if (validarNumeroBalance(inputResultadoDeExplotacion.value)) {
        resultadoDeExplotacionOK = true;
        controlResultadoDeExplotacion.innerText = '';
        inputResultadoDeExplotacion.value = parseInt(inputResultadoDeExplotacion.value);
      } else {
        resultadoDeExplotacionOK = false;
        controlResultadoDeExplotacion.innerText = 'Sólo puede usar números que sean enteros.';
      }
    } else {
      resultadoDeExplotacionOK = false;
      controlResultadoDeExplotacion.innerText = 'No puede dejar casillas vacías, use 0.';
    }
  });

  inputResultadoAntesDeImpuestos.addEventListener('keyup', function () {//resultado antes de impuestos
    inputResultadoAntesDeImpuestos.value = inputResultadoAntesDeImpuestos.value.trim();

    if (inputResultadoAntesDeImpuestos.value != '') {
      if (validarNumeroBalance(inputResultadoAntesDeImpuestos.value)) {
        resultadoOK = true;
        controlResultadoAntesDeImpuestos.innerText = '';
        inputResultadoAntesDeImpuestos.value = parseInt(inputResultadoAntesDeImpuestos.value);
      } else {
        resultadoOK = false;
        controlResultadoAntesDeImpuestos.innerText = 'Sólo puede usar números que sean enteros.';
      }
    } else {
      resultadoOK = false;
      controlResultadoAntesDeImpuestos.innerText = 'No puede dejar casillas vacías, use 0.';
    }
  });

  comentarioExcel.addEventListener('keyup', function () {
    inputComentario.value = comentarioExcel.value;

    if (inputComentario.value != '') {
      comentarioOK = true;
    } else {
      comentarioOK = false;
    }

  })

  /*
  * El siguiente listener se encarga de la lectura de los archivos excel.
  * Una vez se autentica la plantilla se valida el dato.
  * Despues se recopilan los datos en el formulario manual que queda oculto.
  */
  archivoExcel.addEventListener('change', function leerExcel() {
    let valor;

    try {
      readXlsxFile(archivoExcel.files[0])
        .then(filas => {//Devuelve un array de datos del excel
          if (validarExcel(filas[0][10])) {//Revisión de plantilla correcta
            valor = filas[1][1];

            //activo corriente
            if (filas[1][1] = ! '' && validarNumeroBalance(filas[1][1])) {
              inputActivoCorriente.value = valor;
              activoCorrienteOK = true;

            } else {
              activoCorrienteOK = false;

            }

            valor = filas[2][1];

            //deudores comerciales
            if (filas[2][1] = ! '' && validarNumeroBalance(filas[2][1])) {
              inputDeudoresComercialesYCuentasACobrar.value = valor;
              deudoresComercialesOK = true;

            } else {
              deudoresComercialesOK = false;

            }

            valor = filas[3][1];

            //inversiones en empresas de grupo
            if (filas[3][1] = ! '' && validarNumeroBalance(filas[3][1])) {
              inputInversionesEnEmpresasDeGrupoCP.value = valor;
              inversionesEnEmpresasOK = true;

            } else {
              inversionesEnEmpresasOK = false;

            }

            valor = filas[4][1];

            //inversiones financieras
            if (filas[4][1] = ! '' && validarNumeroBalance(filas[4][1])) {
              inputInversionesFinancierasCP.value = valor;
              inversionesFinancierasOK = true;

            } else {
              inversionesFinancierasOK = false;

            }

            valor = filas[5][1];

            //efectivo y activos liquidos
            if (filas[5][1] = ! '' && validarNumeroBalance(filas[5][1])) {
              inputEfectivoYActivosLiquidos.value = valor;
              efectivoYActivosLiquidosOK = true;

            } else {
              efectivoYActivosLiquidosOK = false;

            }

            valor = filas[6][1];

            //activo total
            if (filas[6][1] = ! '' && validarNumeroBalance(filas[6][1])) {
              inputActivoTotal.value = valor;
              activoTotalOK = true;

            } else {
              activoTotalOK = false;

            }

            valor = filas[7][1];

            //patrimonio
            if (filas[7][1] = ! '' && validarNumeroBalance(filas[7][1])) {
              inputPatrimonio.value = valor;
              patrimonioOK = true;

            } else {
              patrimonioOK = false;

            }

            valor = filas[8][1];

            //fondos propios
            if (filas[8][1] = ! '' && validarNumeroBalance(filas[8][1])) {
              inputFondosPropios.value = valor;
              fondosPropiosOK = true;

            } else {
              fondosPropiosOK = false;

            }

            valor = filas[9][1];

            //beneficios retenido y reservas
            if (filas[9][1] = ! '' && validarNumeroBalance(filas[9][1])) {
              inputBeneficioRetenidoOReservas.value = valor;
              beneficioRetenidoOK = true;

            } else {
              beneficioRetenidoOK = false;

            }

            valor = filas[10][1];

            //pasivo corriente
            if (filas[10][1] = ! '' && validarNumeroBalance(filas[10][1])) {
              inputPasivoCorriente.value = valor;
              pasivoCorrienteOK = true;

            } else {
              pasivoCorrienteOK = false;

            }

            valor = filas[11][1];

            //pasivo total
            if (filas[11][1] = ! '' && validarNumeroBalance(filas[11][1])) {
              inputPasivoTotal.value = valor;
              pasivoTotalOK = true;

            } else {
              pasivoTotalOK = false;

            }

            valor = filas[12][1];

            //facturacion
            if (filas[12][1] = ! '' && validarNumeroBalance(filas[12][1])) {
              inputFacturacion.value = valor;
              facturacionOK = true;

            } else {
              facturacionOK = false;

            }

            valor = filas[13][1];

            //amortizacion
            if (filas[13][1] = ! '' && validarNumeroBalance(filas[13][1])) {
              inputAmortizacionDelInmovilizado.value = valor;
              amortizacionOK = true;

            } else {
              amortizacionOK = false;

            }

            valor = filas[14][1];

            //resultado de explicacion
            if (filas[14][1] = ! '' && validarNumeroBalance(filas[14][1])) {
              inputResultadoDeExplotacion.value = valor;
              resultadoDeExplotacionOK = true;

            } else {
              resultadoDeExplotacionOK = false;

            }

            valor = filas[15][1];

            //resultado antes de impuesto
            if (filas[15][1] = ! '' && validarNumeroBalance(filas[15][1])) {
              inputResultadoAntesDeImpuestos.value = valor;
              resultadoOK = true;

            } else {
              resultadoOK = false;

            }

            mostrarDatosExcel();
          } else {
            notificaciones.appendChild(alertaError('error', 'Documento subido no válido, rellene la plantilla.'));
            eliminarComponentePorTiempo('error', 4000);
            archivoExcel.value = '';

          }
        })
        .catch(() => {
          notificaciones.appendChild(alertaError('error', 'Error al leer. Compruebe que ha subido el archivo correcto.'));
          eliminarComponentePorTiempo('error', 3500);

        });
    } catch (error) {
      console.log('Error, no se ha subido nada.');

    }
  });

  /*
  * Envío de datos
  */
  formularioManual.addEventListener('submit', function crearEstadoConFormulario(evento) {//Submit
    let datosFormulario;

    evento.preventDefault();

    //Por tener esta parte del código algo mas ordenada y entendible, hago varios if, pero podrían estar en una línea.
    if (comentarioOK === true && activoCorrienteOK && deudoresComercialesOK && inversionesEnEmpresasOK && inversionesFinancierasOK && efectivoYActivosLiquidosOK) {
      if (activoTotalOK === true && patrimonioOK && fondosPropiosOK && beneficioRetenidoOK && pasivoCorrienteOK && pasivoTotalOK) {
        if (facturacionOK === true && amortizacionOK && resultadoDeExplotacionOK && resultadoOK) {

          datosFormulario = new FormData(formularioManual);

          queryPHP(URLCREARESTADOSPHP, 'POST', datosFormulario)
            .then(respuesta => {
              if (respuesta) {//Si se han añadido los datos, muestro mensaje y redirijo.
                notificaciones.appendChild(alerta('mensajeFormulario', 'Estados añadidos correctamente.'));
                eliminarComponentePorTiempo('mensajeFormulario', 3000);

                setTimeout(() => {
                  location.href = 'http://localhost/communityRiskAnalytics/pages/portalUsuario.html';
                }, 2500);

              } else {
                notificaciones.appendChild(alertaError('mensajeFormulario', 'Error en el envío de datos contacte con el administrador.'));
                eliminarComponentePorTiempo('mensajeFormulario', 3500);
              }
            })
            .catch(error => console.log(error));

        } else {
          notificaciones.appendChild(alertaError('mensajeFormulario', 'Error en el formulario, compruebe los datos.'));
          eliminarComponentePorTiempo('mensajeFormulario', 3000);
        }
      } else {
        notificaciones.appendChild(alertaError('mensajeFormulario', 'Error en el formulario, compruebe los datos.'));
        eliminarComponentePorTiempo('mensajeFormulario', 3000);
      }
    } else {
      notificaciones.appendChild(alertaError('mensajeFormulario', 'Error en el formulario, compruebe los datos.'));
      eliminarComponentePorTiempo('mensajeFormulario', 3000);
    }
  })

  botonEnvioDatosConExcel.addEventListener('click', function crearEstadosConExcel() {//Envio sin submit
    let datosFormulario;

    //Por tener esta parte del código algo mas ordenada y entendible, hago varios if, pero podrían estar en una línea.
    if (comentarioOK === true && activoCorrienteOK && deudoresComercialesOK && inversionesEnEmpresasOK && inversionesFinancierasOK && efectivoYActivosLiquidosOK) {
      if (activoTotalOK === true && patrimonioOK && fondosPropiosOK && beneficioRetenidoOK && pasivoCorrienteOK && pasivoTotalOK) {
        if (facturacionOK === true && amortizacionOK && resultadoDeExplotacionOK && resultadoOK) {

          datosFormulario = new FormData(formularioManual);

          queryPHP(URLCREARESTADOSPHP, 'POST', datosFormulario)
            .then(respuesta => {
              if (respuesta) {//Si se han añadido los datos, muestro mensaje y redirijo.
                notificaciones.appendChild(alerta('mensajeFormulario', 'Estados añadidos correctamente.'));
                eliminarComponentePorTiempo('mensajeFormulario', 3000);

                setTimeout(() => {
                  location.href = 'http://localhost/communityRiskAnalytics/pages/portalUsuario.html';
                }, 2500);

              } else {
                notificaciones.appendChild(alertaError('mensajeFormulario', 'Error en el envío de datos contacte con el administrador.'));
                eliminarComponentePorTiempo('mensajeFormulario', 3500);
              }
            })
            .catch(error => console.log(error));

        } else {
          notificaciones.appendChild(alertaError('mensajeFormulario', 'Error en el formulario, compruebe los datos.'));
          eliminarComponentePorTiempo('mensajeFormulario', 3000);
        }
      } else {
        notificaciones.appendChild(alertaError('mensajeFormulario', 'Error en el formulario, compruebe los datos.'));
        eliminarComponentePorTiempo('mensajeFormulario', 3000);
      }
    } else {
      notificaciones.appendChild(alertaError('mensajeFormulario', 'Error en el formulario, compruebe los datos.'));
      eliminarComponentePorTiempo('mensajeFormulario', 3000);
    }
  })
});
