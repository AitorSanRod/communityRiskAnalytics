function crearDivConAnalisis(datosDelBalance) {
  let contenedorConDatos = document.createElement('div');
  let activoCorriente = datosDelBalance[3];
  // let deudoresComercialesYCuentasACobrar = datosDelBalance[4];
  // let inversionesEnEmpresasDeGrupoCP = datosDelBalance[5];
  // let inversionesFinancierasCP = datosDelBalance[6];
  let efectivoYActivosLiquidos = datosDelBalance[7];
  let activoTotal = datosDelBalance[8];
  let patrimonio = datosDelBalance[9];
  let fondosPropios = datosDelBalance[10];
  //let beneficioRetenidoOReservas = datosDelBalance[11];
  let pasivoCorriente = datosDelBalance[12];
  let pasivoTotal = datosDelBalance[13];
  let facturacion = datosDelBalance[14];
  //let amortizacionDelInmovilizado = datosDelBalance[15];
  let resultadoDeExplotacion = datosDelBalance[16];
  let resultadoAntesDeImpuestos = datosDelBalance[17];
  let liquidezGeneral;
  let pruebaAcida;
  let fondoDeManiobra;
  let margenOperativo;
  let ROA;
  let ROE;
  let endeudamiento;
  let ROCE;
  let puntuacionGeneral = 0;

  /*
  * Modificar valores en caso de ser 0
  */

  if (pasivoCorriente == 0) {
    pasivoCorriente = 0.1;
  }

  if (facturacion == 0) {
    facturacion = 0.1;
  }

  if (activoTotal == 0) {
    activoTotal = 0.1;
  }

  if (fondosPropios == 0) {
    fondosPropios = 0.1;
  }

  if (patrimonio == 0) {
    patrimonio = 0.1;
  }

  /*
  * RATIOS
  */

  //Liquidez general
  liquidezGeneral = (activoCorriente / pasivoCorriente).toString().slice(0, 3);

  if (liquidezGeneral >= 1 && liquidezGeneral <= 1.8) {
    contenedorConDatos.innerHTML += `Liquidez general: <span class="text-success fw-bold">${liquidezGeneral}</span>`;
    puntuacionGeneral += 2;
  } else if (liquidezGeneral > 1.8) {
    contenedorConDatos.innerHTML += `Liquidez general: <span class="text-warning fw-bold">${liquidezGeneral}</span> - 
      <span class="text-warning">Atención</span>: Su activo corriente es muy superior a su pasivo corriente, busque nuevas inveriones para dar uso a este activo.`;
    puntuacionGeneral++;
  } else {
    contenedorConDatos.innerHTML += `Liquidez general: <span class="text-danger fw-bold">${liquidezGeneral}</span> - 
      <span class="text-danger">Atención</span>: Su pasivo corriente es superior a su activo corriente, puede llegar a tener problemas en sus
        obligaciones a corto plazo.`;
    puntuacionGeneral--;
  }

  contenedorConDatos.innerHTML += '<hr>';

  //Prueba acida
  pruebaAcida = ((activoCorriente - efectivoYActivosLiquidos) / pasivoCorriente).toString().slice(0, 3);

  if (pruebaAcida == 1) {
    contenedorConDatos.innerHTML += `Prueba ácida: <span class="text-success fw-bold">${pruebaAcida}</span>`;
    puntuacionGeneral += 2;
  } else if (pruebaAcida >= 3) {
    contenedorConDatos.innerHTML += `Prueba ácida: <span class="text-warning fw-bold">${pruebaAcida}</span> - 
      <span class="text-warning">Atención</span>: Activo corriente elevado.`;
    puntuacionGeneral++;
  } else {
    contenedorConDatos.innerHTML += `Prueba ácida: <span class="text-danger fw-bold">${pruebaAcida}</span> - 
      <span class="text-danger">Atención</span>: Puede no disponer de recursos suficientes para hacer frente a 
      deuda en el corto plazo.`;
    puntuacionGeneral--;
  }

  contenedorConDatos.innerHTML += '<hr>';

  //Fondo de maniobra
  fondoDeManiobra = (activoCorriente - pasivoCorriente).toString();

  if (fondoDeManiobra >= 0) {
    contenedorConDatos.innerHTML += `Fondo de maniobra: <span class="text-success fw-bold">POSITIVO</span>`;
    puntuacionGeneral++;
  } else {
    contenedorConDatos.innerHTML += `Fondo de maniobra: <span class="text-danger fw-bold">NEGATIVO</span> - 
    <span class="text-danger">Atención</span>: Intente pasar deuda de corto a largo plazo.
    <br><br><span>El fondo de maniobra tiene caracter general, depende del tipo de empresa 
    el dato negativo puede ser un indicador normal.</span>`;
    puntuacionGeneral--;
  }

  contenedorConDatos.innerHTML += '<hr>';

  //Margen operativo
  margenOperativo = Math.round((resultadoDeExplotacion / facturacion * 100)).toString();

  if (margenOperativo > 5) {
    contenedorConDatos.innerHTML += `Margen operativo: Por cada € que factura, 
    retiene <span class="text-success fw-bold">${margenOperativo}</span> centimos.`;
    puntuacionGeneral++;
  } else {
    contenedorConDatos.innerHTML += `Margen operativo: Por cada € que factura, 
    retiene <span class="text-danger fw-bold">${margenOperativo}</span> centimos.`;
    puntuacionGeneral--;
  }

  contenedorConDatos.innerHTML += '<hr>';

  //ROA
  ROA = (resultadoAntesDeImpuestos / activoTotal * 100).toString().slice(0, 4);

  if (ROA >= 5) {
    contenedorConDatos.innerHTML += `ROA (Rentabilidad de la empresa): <span class="text-success fw-bold">${ROA}%</span>`;
    puntuacionGeneral++;
  } else {
    contenedorConDatos.innerHTML += `ROA (Rentabilidad de la empresa): <span class="text-danger fw-bold">${ROA}%</span>
    <span class="text-danger">Atención</span>: La rentabilidad de su empresa se situa en un valor muy bajo.`;
    puntuacionGeneral--;
  }

  contenedorConDatos.innerHTML += '<hr>';

  //ROE
  ROE = (resultadoAntesDeImpuestos / fondosPropios * 100).toString().slice(0, 4);

  if (ROE >= 5) {
    contenedorConDatos.innerHTML += `ROE (Capacidad de generar beneficios): <span class="text-success fw-bold">${ROE}%</span>`;
    puntuacionGeneral++;
  } else {
    contenedorConDatos.innerHTML += `ROE (Capacidad de generar beneficios): <span class="text-warning fw-bold">${ROE}%</span>
    <br><br><span>El ROE tiene caracter general, depende del tipo de empresa. 
    Un dato bajo puede ser un indicador normal ya que depende de sus fondos propios.</span>`;
    puntuacionGeneral--;
  }

  contenedorConDatos.innerHTML += '<hr>';

  //ROCE
  if (activoTotal == 0.1 && pasivoCorriente == 0.1) {
    pasivoCorriente = 0;
  }

  ROCE = (resultadoAntesDeImpuestos / (activoTotal - pasivoCorriente) * 100).toString().slice(0, 4);

  if (ROCE >= 9) {
    contenedorConDatos.innerHTML += `ROCE: <span class="text-success fw-bold">${ROCE}%</span>`;
    puntuacionGeneral += 2;
  } else if (ROCE < 9 && ROCE >= 3) {
    contenedorConDatos.innerHTML += `ROCE: <span class="text-success fw-bold">${ROCE}%</span>`;
    puntuacionGeneral++;
  } else {
    contenedorConDatos.innerHTML += `ROCE: <span class="text-danger fw-bold">${ROCE}%</span> - 
    <span class="text-danger">Atención</span>: El retorno del capital empleado de su empresa es bajo.`;
    puntuacionGeneral--;
  }

  contenedorConDatos.innerHTML += '<hr>';

  //Endeudamiento
  endeudamiento = (pasivoTotal / patrimonio * 100).toString().slice(0, 4);

  if (endeudamiento >= 40 && endeudamiento <= 60) {
    contenedorConDatos.innerHTML += `Endeudamiento: <span class="text-success fw-bold">${endeudamiento}%</span>`;
    puntuacionGeneral += 2;
  } else if (endeudamiento > 60) {
    contenedorConDatos.innerHTML += `Endeudamiento: <span class="text-danger fw-bold">${endeudamiento}%</span> - 
    <span class="text-danger">Atención</span>: Endeudamiento excesivamente alto, puede perder autonomía en 
    cuanto a la financiación de su empresa.`;
    puntuacionGeneral--;
  } else {
    contenedorConDatos.innerHTML += `Endeudamiento: <span class="text-warning fw-bold">${endeudamiento}%</span> - 
    <span class="text-warning">Atención</span>: Endeudamiento bajo, busque maneras de aprovechar mejor sus 
    recursos propios.`;
    puntuacionGeneral++;
  }

  contenedorConDatos.innerHTML += '<hr>';

  //Valoración SOBRE 12
  if (puntuacionGeneral >= 7) {
    contenedorConDatos.innerHTML += `Puntuación total: <span class="text-success fw-bold">${puntuacionGeneral} / 12</span> 
    Riesgo <span class="text-success fw-bold">bajo</span>.`;
  } else if (puntuacionGeneral >= 5 && puntuacionGeneral < 7) {
    contenedorConDatos.innerHTML += `Puntuación total: <span class="text-warning fw-bold">${puntuacionGeneral} / 12</span> 
    Riesgo <span class="text-warning fw-bold">medio - bajo</span>.`;
  } else if (puntuacionGeneral < 0) {
    puntuacionGeneral = 0;
    contenedorConDatos.innerHTML += `Puntuación total: <span class="text-danger fw-bold">${puntuacionGeneral} / 12</span> 
    Riesgo <span class="text-danger fw-bold">alto</span>.`;
  } else {
    contenedorConDatos.innerHTML += `Puntuación total: <span class="text-danger fw-bold">${puntuacionGeneral} / 12</span> 
    Riesgo <span class="text-danger fw-bold">alto</span>.`;
  }

  return contenedorConDatos;
}