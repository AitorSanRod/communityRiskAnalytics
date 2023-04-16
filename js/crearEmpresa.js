const PHPCREAREMPRESA = '../php/crearEmpresa.php';

document.addEventListener('DOMContentLoaded', function () {
  let inputCif = document.getElementById('inputCif');
  let mensajeCif = document.getElementById('mensajeCif');
  let inputNombre = document.getElementById('inputNombre');
  let mensajeNombre = document.getElementById('mensajeNombreEmpresa');
  let inputSector = document.getElementById('inputSeleccionSector');
  let mensajeSector = document.getElementById('mensajeSector');
  let formulario = document.getElementById('formulario');
  let selectorSector = document.getElementById('selectSector');
  let notificaciones = document.getElementById('notificaciones');
  let validacionCif = false;
  let validacionNombre = false;
  let validacionSector = false;
  let datosFormulario;

  /*
  * Validaciones
  */
  inputCif.addEventListener('keyup', function () {
    let cif;

    inputCif.value = inputCif.value.trim();
    cif = inputCif.value;

    if (validarLongitud(cif, 8, 10)) {//Longitud
      mensajeCif.innerText = '';

      if (validarCif(cif)) {//Especificaciones de CIF
        mensajeCif.innerText = '';
        inputCif.value = inputCif.value.charAt(0).toUpperCase() + inputCif.value.slice(1);
        validacionCif = true;
      } else {
        mensajeCif.innerText = 'CIF no válido.';
        validacionCif = false;
      }
    } else {
      mensajeCif.innerText = 'Longitud no válida.';
      validacionCif = false;
    }
  });

  inputNombre.addEventListener('keyup', function () {
    let nombre = inputNombre.value;

    nombre = nombre.trim();

    if (validarLongitud(nombre, 3, 45)) {
      mensajeNombre.innerText = '';

      if (validarNombreEmpresa(nombre)) {
        mensajeNombre.innerText = '';
        validacionNombre = true;
      } else {
        mensajeNombre.innerText = 'Nombre no válido.';
        validacionNombre = false;
      }
    } else {
      mensajeNombre.innerText = 'Longitud del nombre no válida.';
      validacionNombre = false;
    }
  });

  selectorSector.addEventListener('change', function () {
    inputSector.value = selectorSector.value;

    if (inputSector.value != '') {
      mensajeSector.innerText = '';
      validacionSector = true;
    } else {
      mensajeSector.innerText = 'Selecciona un sector';
      validacionSector = false;
    }
  })

  /*
  * Submit
  */
  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    datosFormulario = new FormData(formulario);

    if (validacionCif === true && validacionNombre && validacionSector) {
      //ENVIAR
      queryPHP(PHPCREAREMPRESA, 'POST', datosFormulario)
        .then(respuesta => {
          if (respuesta) { //Si se crea correctamente, espera 3 segundo y vuelve al portal
            notificaciones.appendChild(alerta('mensajeRespuestaCorrecta', 'Empresa creada.'));

            setTimeout(() => {
              location.href = 'http://localhost/communityRiskAnalytics/pages/portalUsuario.html';
            }, 3000);
          } else {
            notificaciones.appendChild(alertaError('errorEnCreacion', 'Error al crear la cuenta, puede que el CIF ya este en la base de datos.'));

            setTimeout(() => {
              eliminarComponente('errorEnCreacion');
            }, 5000);
          }
        });

    } else {
      notificaciones.appendChild(alertaError('errorEnCreacion', 'Error al crear la cuenta, revise los campos.'));

      setTimeout(() => {
        eliminarComponente('errorEnCreacion');
      }, 3500);
    }
  });
});