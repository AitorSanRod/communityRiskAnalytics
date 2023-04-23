/*
* JavaScript dedicado a generación de componentes de bootstrap 
* con datos personalizados y funciones de eliminación de los 
* componentes.
* 
* Todas las funciones necesitan de un id para poder borrarlas.
* 
* Estas funciones devuelven un div.
*/

function eliminarComponente(idComponente) {
  return document.getElementById(idComponente).remove();
}

function eliminarComponentePorTiempo(idDelComponente, tiempoEnMS) {
  return (
    setTimeout(() => {
      document.getElementById(idDelComponente).remove();
    }, tiempoEnMS)
  );
}

function botonEliminarComponente(idDelComponenteABorrar) {
  let boton = document.createElement('button');

  boton.className = 'btn btn-outline-danger';
  boton.innerText = 'Eliminar';
  boton.onclick = eliminarComponente(idDelComponenteABorrar);

  return boton;
}

function spinner(idComponente) {
  /*
  * Crea un componente de tipo spinner para sustituir formularios cuando se han enviado
  * y se esta a la espera de respuesta.
  */
  let spinner = document.createElement('div');
  let divSpinner = document.createElement('div');
  let spanSpinner = document.createElement('span');

  spinner.className = 'text-center my-5';
  spinner.id = idComponente;
  divSpinner.className = 'spinner-border text-primary';
  divSpinner.role = 'status';
  divSpinner.style = "width: 3rem; height: 3rem;"
  spanSpinner.className = 'visually-hidden';
  spanSpinner.innerText = 'Cargando...';

  divSpinner.appendChild(spanSpinner);
  spinner.appendChild(divSpinner)

  return spinner;
}

function alerta(id, mensaje) {
  //Alert de bootstrap
  let alerta = document.createElement('div');

  alerta.className = 'alert alert-success text-center';
  alerta.role = 'alert';
  alerta.id = id;
  alerta.innerText = mensaje;

  return alerta;
}

function alertaError(id, mensaje) {
  let alerta = document.createElement('div');

  alerta.className = 'alert alert-danger text-center';
  alerta.role = 'alert';
  alerta.id = id;
  alerta.innerText = mensaje;

  return alerta;
}

function modal(id, empresa, contenidoDelModal) {
  /*
  * Esta función monta el modal de bootstrap 
  * contenidoDelModal es la información que se mostrará.
  * 
  * Para mostrar este modal hay que añadir un boton de la funcion botonParaAbrirModal()
  */
  let divPrincipal = document.createElement('div');
  let modalDialog = document.createElement('div');
  let modalContent = document.createElement('div');
  let divCabecera = document.createElement('div');
  let tituloModal = document.createElement('h5');
  let botonCierreModal = document.createElement('button');
  let cuerpoDelModal = document.createElement('div');
  let footerModal = document.createElement('div');
  let botonCierreFinal = document.createElement('button');

  divPrincipal.className = 'modal';
  divPrincipal.tabIndex = '-1';
  divPrincipal.id = id;
  modalDialog.className = 'modal-dialog';
  modalContent.className = 'modal-content';
  divCabecera.className = 'modal-header';
  tituloModal.className = 'modal-title';
  tituloModal.innerText = empresa;
  botonCierreModal.type = 'button';
  botonCierreModal.className = 'btn-close';
  botonCierreModal.setAttribute('data-bs-dismiss', 'modal');
  botonCierreModal.ariaLabel = 'Close';

  divCabecera.appendChild(tituloModal);
  divCabecera.appendChild(botonCierreModal);
  modalContent.appendChild(divCabecera);
  modalContent.appendChild(cuerpoDelModal);

  cuerpoDelModal.className = 'modal-body';
  cuerpoDelModal.appendChild(contenidoDelModal);
  footerModal.className = 'modal-footer';
  botonCierreFinal.type = 'button';
  botonCierreFinal.className = 'btn btn-danger';
  botonCierreFinal.setAttribute('data-bs-dismiss', 'modal');
  botonCierreFinal.innerText = 'Cerrar';

  footerModal.appendChild(botonCierreFinal);
  modalContent.appendChild(footerModal);
  modalDialog.appendChild(modalContent);
  divPrincipal.appendChild(modalDialog);

  return divPrincipal;
}

function botonParaAbrirModal(idBoton, idModal, textoBoton) {
  let boton = document.createElement('button');

  boton.innerText = textoBoton;
  boton.type = 'button';
  boton.id = idBoton;
  boton.className = 'btn btn-primary';
  boton.setAttribute('data-bs-target', `#${idModal}`);
  boton.setAttribute('data-bs-toggle', 'modal');

  return boton;
}

function tarjeta(id, encabezado, comentario, boton) {
  /*
  * Esta función devuelve una tarjeta.
  * El boton debe ser un componente de botonParaAbrirModal.
  */
  let divTarjeta = document.createElement('div');
  let encabezadoTarjeta = document.createElement('div');
  let cuerpoTarjeta = document.createElement('div');
  let comentarioTarjeta = document.createElement('p');

  divTarjeta.className = 'card my-3';
  divTarjeta.id = id;
  encabezadoTarjeta.className = 'card-header';
  encabezadoTarjeta.innerText = encabezado;

  divTarjeta.appendChild(encabezadoTarjeta);

  cuerpoTarjeta.className = 'card-body';
  comentarioTarjeta.className = 'card-text';
  comentarioTarjeta.innerText = comentario;

  cuerpoTarjeta.appendChild(comentarioTarjeta);
  cuerpoTarjeta.appendChild(boton);
  divTarjeta.appendChild(cuerpoTarjeta);

  return divTarjeta;
}

function formularioInvisibleParaBorradoPorID(idDelFormulario, namePHP, valor) {
  //Crea un formulario que no se ve y del cual no se pueden modificar los datos el input
  let formulario = document.createElement('form');
  let input = document.createElement('input');

  formulario.method = 'POST';
  formulario.id = idDelFormulario;
  input.type = 'text';
  input.name = namePHP;
  input.value = valor;
  input.setAttribute('readonly', 'true');

  formulario.appendChild(input);
  formulario.style.display = 'none';

  return formulario;
}

function tarjetaPequena(urlImagen, titulo, descripcion, idModalQueAbre) {
  let tarjeta = document.createElement('div');
  let contenidoTarjeta = document.createElement('div');
  let divImg = document.createElement('div');
  let imagenTarjeta = document.createElement('img');
  let divCuerpo = document.createElement('div');
  let divContenidoCuerpo = document.createElement('div');
  let encabezadoTarjeta = document.createElement('h5');
  let descripcionCarta = document.createElement('p');

  tarjeta.className = 'card mb-3 tarjetaPequena p-2';
  tarjeta.style = "max-width: 540px;";
  tarjeta.setAttribute('data-bs-target', `#${idModalQueAbre}`);
  tarjeta.setAttribute('data-bs-toggle', 'modal');

  contenidoTarjeta.className = 'row';
  divImg.className = 'col-md-4';
  imagenTarjeta.src = urlImagen;
  imagenTarjeta.className = 'img-fluid rounded-start';
  imagenTarjeta.alt = 'iconos de la documentación de bootstrap.';

  divImg.appendChild(imagenTarjeta);

  divCuerpo.className = 'col-md-6';
  divContenidoCuerpo.className = 'card-body';
  encabezadoTarjeta.innerText = titulo;
  descripcionCarta.innerText = descripcion;

  divContenidoCuerpo.appendChild(encabezadoTarjeta);
  divContenidoCuerpo.appendChild(descripcionCarta);
  divCuerpo.appendChild(divContenidoCuerpo);

  contenidoTarjeta.appendChild(divImg);
  contenidoTarjeta.appendChild(divCuerpo);

  tarjeta.appendChild(contenidoTarjeta);

  return tarjeta;
}