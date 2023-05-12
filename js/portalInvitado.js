document.addEventListener('DOMContentLoaded', function () {
  let selectorRatio = document.getElementById('seleccionRatio');
  let pizarraDatos = document.getElementById('pizarra');
  let encabezadoPizarra = document.getElementById('mostrarRatio');
  let formulario = document.getElementById('formulario');
  let labelInputPrincipal = document.getElementById('labelPrincipal');
  let labelInputSecundario = document.getElementById('labelSecundario');
  let inputPrincipal = document.getElementById('primerInputRatio');
  let inputSecundario = document.getElementById('segundoInputRatio');
  let controlInputPrincipal = document.getElementById('controlPrimerInputRatio');
  let controlInputSecundario = document.getElementById('controlSegundoInputRatio');
  let inputPrincipalOK = false;
  let inputSecundarioOK = false;
  let botonCalculo = document.getElementById('calcular');

  selectorRatio.addEventListener('change', function () {
    inputPrincipal.value = '';
    inputSecundario.value= '';
    montarFormulario();
  });

  botonCalculo.addEventListener('click', function () {
    let ratio = selectorRatio.value;
    let valorRatio;

    switch (ratio) {
      case 'liqGeneral':
        encabezadoPizarra.innerText = `Liquidez general:`;

        if (validarNumero(inputPrincipal.value) && validarNumero(inputSecundario.value)) {
          if (inputSecundario.value != 0) {//Revisar si el divisor es 0
            valorRatio = inputPrincipal.value / inputSecundario.value;
            valorRatio = valorRatio.toString().slice(0, 4);

            if (valorRatio >= 1 && valorRatio <= 1.8) {//Insertar resultados
              pizarraDatos.innerHTML = `<span class="text-success">${valorRatio}</span>`;
            } else if (valorRatio > 1.8) {
              pizarraDatos.innerHTML = `<span class="text-warning">${valorRatio}</span>`;
            } else {
              pizarraDatos.innerHTML = `<span class="text-danger">${valorRatio}</span>`;
            }
          } else {
            pizarraDatos.innerHTML = `<span class="text-danger">El valor del pasivo corriente no puede ser 0.</span>`;
          }
        } else {
          pizarraDatos.innerHTML = `<span class="text-danger">Datos no válidos.</span>`;
        }


        break;
      case 'fondManiobra':
        valorRatio = inputPrincipal.value - inputSecundario.value;
        valorRatio = valorRatio.toString().slice(0, 4);
        encabezadoPizarra.innerText = `Fondo de maniobra:`;

        if (validarNumero(inputPrincipal.value) && validarNumero(inputSecundario.value)) {
          if (valorRatio > 0) {
            pizarraDatos.innerHTML = `<span class="text-success">${valorRatio}</span>`;
          } else {
            pizarraDatos.innerHTML = `<span class="text-danger">${valorRatio}</span>`;
          }
        } else {
          pizarraDatos.innerHTML = `<span class="text-danger">Datos no válidos.</span>`;
        }
        break;
      case 'endeudamiento':
        if (inputSecundario.value != 0) {
          encabezadoPizarra.innerText = `Endeudamiento:`;

          if (validarNumero(inputPrincipal.value) && validarNumero(inputSecundario.value)) {
            valorRatio = inputPrincipal.value / inputSecundario.value * 100;
            valorRatio = valorRatio.toString().slice(0, 4);

            if (valorRatio >= 40 && valorRatio <= 60) {
              pizarraDatos.innerHTML = `<span class="text-success">${valorRatio}%</span>`;
            } else {
              pizarraDatos.innerHTML = `<span class="text-danger">${valorRatio}%</span>`;
            }
          } else {
            pizarraDatos.innerHTML = `<span class="text-danger">Datos no válidos..</span>`;
          }
        } else {
          pizarraDatos.innerHTML = `<span class="text-danger">El patrimonio neto no es válido.</span>`;
        }


        break;
      default:
        console.error = 'Error en la eleeción.';
    }
  });

  //Control del primer input
  inputPrincipal.addEventListener('keyup', function () {
    let valorInput = inputPrincipal.value;

    if (valorInput = ! '') {
      if (validarNumeroBalance(inputPrincipal.value)) {
        inputPrincipalOK = true;
        controlInputPrincipal.innerText = '';
      } else {
        inputPrincipalOK = false;
        controlInputPrincipal.innerText = 'Solo pueden usarse números.';
      }
    } else {
      inputPrincipalOK = false;
      controlInputPrincipal.innerText = 'El formulario no puede estar vacío.';
    }
  });

  //Control del segundo input
  inputSecundario.addEventListener('keyup', function () {
    let valorInput = inputSecundario.value;

    if (valorInput = ! '') {
      if (validarNumeroBalance(inputSecundario.value)) {
        inputSecundarioOK = true;
        controlInputSecundario.innerText = '';
      } else {
        inputSecundarioOK = false;
        controlInputSecundario.innerText = 'Solo pueden usarse números.';
      }
    } else {
      inputSecundarioOK = false;
      controlInputSecundario.innerText = 'El formulario no puede estar vacío.';
    }
  });

  //Muestra unos datos u otro dependiendo de la elección.
  function montarFormulario() {
    let ratio = selectorRatio.value;

    switch (ratio) {
      case '':
        formulario.style.display = 'none';
        botonCalculo.style.display = 'none';
        break;
      case 'liqGeneral':
        formulario.style.display = 'block';
        botonCalculo.style.display = 'block';
        labelInputPrincipal.innerText = 'Activo corriente:';
        labelInputSecundario.innerText = 'Pasivo corriente:';
        break;
      case 'fondManiobra':
        formulario.style.display = 'block';
        botonCalculo.style.display = 'block';
        labelInputPrincipal.innerText = 'Activo corriente:';
        labelInputSecundario.innerText = 'Pasivo corriente:';
        break;
      case 'endeudamiento':
        formulario.style.display = 'block';
        botonCalculo.style.display = 'block';
        labelInputPrincipal.innerText = 'Pasivo total:';
        labelInputSecundario.innerText = 'Patrimonio neto:';
        break;
      default:
        console.error = 'Se ha indicado un valor no recogido en el formulario.';
    }
  }
});

