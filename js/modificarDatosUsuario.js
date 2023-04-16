const URLMODIFICACIONUSUARIO = '../php/modificarUsuario.php';
const URLMODIFICACIONEMPRESA = '../php/modificarEmpresa.php';
const URLMODIFICACIONCONTRASENA = '../php/modificarContrasena.php';

document.addEventListener('DOMContentLoaded', function () {
  let contenido = document.getElementById('contenedorPrincipal');
  let contenedorNotificaciones = document.getElementById('notificaciones');
  let formularioNombreUsuario = document.getElementById('formularioNombreUsuario');
  let notificacionUsuario = document.getElementById('controlUsuario');
  let nuevoNombreUsuarioOK = false;
  let formularioEmpresa = document.getElementById('formularioEmpresa');
  let inputRazonSocial = document.getElementById('nuevaRazonSocial');
  let nuevaRazonSocialOK = false;
  let selectSector = document.getElementById('selectSector');
  let inputSector = document.getElementById('inputSeleccionSector');
  let notificacionSector = document.getElementById('mensajeSector');
  let sectorOK = false;
  let inputNuevaContrasena = document.getElementById('nuevaContrasena');
  let controlContrasena = document.getElementById('controlContrasena');
  let contrasenaOK = false;
  let inputRepetirContrasena = document.getElementById('repetirContrasena');
  let controlRepetirContrasena = document.getElementById('controlRepetirContrasena');
  let formularioCambioContrasena = document.getElementById('formularioContrasena');
  let nuevoNombre = document.getElementById('nuevoNombreUsuario');

  contenido.appendChild(tarjetaPequena('../media/img/usuario.png', 'Nombre de usuario', 'nombreUsuario', 'Modificar'));
  contenido.appendChild(tarjetaPequena('../media/img/empresa.png', 'Datos de empresa', 'datosEmpresa', 'Modificar'));
  contenido.appendChild(tarjetaPequena('../media/img/contrasena.png', 'Contraseña', 'contrasena', 'Modificar'));

  /*
  * LISTENERS
  */

  //Controladores del click al guardar cambios
  formularioNombreUsuario.addEventListener('submit', function (evento) {//Nombre del usuario
    let datoNuevoNombre = new FormData(formularioNombreUsuario);

    evento.preventDefault();

    if (nuevoNombreUsuarioOK) {
      queryPHP(URLMODIFICACIONUSUARIO, 'POST', datoNuevoNombre)
        .then(respuesta => {
          if (respuesta) {
            contenedorNotificaciones.appendChild(alerta('usuarioModificado', 'Usuario modificado correctamente.'));
            eliminarComponentePorTiempo('usuarioModificado', 1800);

          } else {
            contenedorNotificaciones.appendChild(alertaError('errorAlModificar', 'Error en la modificación del usuario.'));
            eliminarComponentePorTiempo('errorAlModificar', 1800);

          }
        })
        .catch(() => {
          console.log('Error en ajax.');
        });

      document.getElementById('nuevoNombreUsuario').value = '';
    } else {
      contenedorNotificaciones.appendChild(alertaError('errorAlModificar', 'Datos no válidos.'));
      eliminarComponentePorTiempo('errorAlModificar', 1800);
    }
  });

  formularioEmpresa.addEventListener('submit', function (evento) {//Razón social de la empresa
    let datosFormulario = new FormData(formularioEmpresa);

    evento.preventDefault();

    if (nuevaRazonSocialOK) {
      if (sectorOK) {
        queryPHP(URLMODIFICACIONEMPRESA, 'POST', datosFormulario)
          .then(respuesta => {
            if (respuesta) {
              contenedorNotificaciones.appendChild(alerta('empresaModificada', 'Los datos de la empresa se han modificado correctamente.'));
              eliminarComponentePorTiempo('empresaModificada', 1800);
            } else {
              contenedorNotificaciones.appendChild(alertaError('errorAlModificar', 'Error en la modificación de la empresa.'));
              eliminarComponentePorTiempo('errorAlModificar', 1800);
            }
          })
          .catch(() => {
            contenedorNotificaciones.appendChild(alertaError('errorAjax', 'Error en la base de datos, contacte con el administrador.'));
            eliminarComponentePorTiempo('errorAjax', 2500);
          });
      } else {
        contenedorNotificaciones.appendChild(alertaError('errorAlModificar', 'Debes seleccionar un sector.'));
        eliminarComponentePorTiempo('errorAlModificar', 1800);
      }
    } else {
      contenedorNotificaciones.appendChild(alertaError('errorAlModificar', 'Datos no válidos.'));
      eliminarComponentePorTiempo('errorAlModificar', 1800);
    }
  });

  formularioCambioContrasena.addEventListener('submit', function (evento) {//TODO
    let datosFormulario = new FormData(formularioCambioContrasena);

    evento.preventDefault();

    if (contrasenaOK) {
      queryPHP(URLMODIFICACIONCONTRASENA, 'POST', datosFormulario)
        .then(respuesta => {
          if (respuesta) {
            contenedorNotificaciones.appendChild(alerta('contrasenaModificada', 'La contraseña ha sido modificada.'));
            eliminarComponentePorTiempo('contrasenaModificada', 1800);
          } else {
            contenedorNotificaciones.appendChild(alertaError('errorAlModificar', 'Error al cambiar de contraseña.'));
            eliminarComponentePorTiempo('errorAlModificar', 1800);
          }
        })
        .catch(() => {
          contenedorNotificaciones.appendChild(alertaError('errorAjax', 'Error en la base de datos, contacte con el administrador.'));
          eliminarComponentePorTiempo('errorAjax', 2500);
        });
    }

  });

  //Controladores de los inputs
  nuevoNombre.addEventListener('keyup', function () {//Input del nombre de usuario
    nuevoNombre.value = nuevoNombre.value.trim();

    if (validarLongitud(nuevoNombre.value, 4, 45)) {
      notificacionUsuario.innerText = ''; //Elimino el mensaje de control.

      if (validarUsuario(nuevoNombre.value)) {
        nuevoNombreUsuarioOK = true;
        notificacionUsuario.innerText = '';

      } else {
        nuevoNombreUsuarioOK = false;
        notificacionUsuario.innerText = 'Contiene caracteres no válidos.';

      }
    } else {
      nuevoNombreUsuarioOK = false;
      notificacionUsuario.innerText = 'Longitud no válida.';

    }
  });

  inputRazonSocial.addEventListener('keyup', function () {//Input de la razón social de la empresa.
    let razonSocial = inputRazonSocial.value;

    razonSocial = razonSocial.trim();

    if (validarLongitud(razonSocial, 3, 50)) {
      controlRazonSocial.innerText = '';

      if (validarNombreEmpresa(razonSocial)) {
        controlRazonSocial.innerText = '';
        nuevaRazonSocialOK = true;
      } else {
        controlRazonSocial.innerText = 'Nombre no válido.';
        nuevaRazonSocialOK = false;
      }
    } else {
      controlRazonSocial.innerText = 'Longitud del nombre no válida.';
      nuevaRazonSocialOK = false;
    }
  });

  selectSector.addEventListener('change', function () {
    inputSector.value = selectSector.value;

    if (inputSector.value != '') {
      notificacionSector.innerText = '';
      sectorOK = true;
    } else {
      notificacionSector.innerText = 'Selecciona un sector';
      sectorOK = false;
    }
  });

  inputNuevaContrasena.addEventListener('keyup', function () {
    inputNuevaContrasena.value = inputNuevaContrasena.value.trim();

    if (validarLongitud(inputNuevaContrasena.value, 5, 45)) {
      if (validarPass(inputNuevaContrasena.value)) {
        controlContrasena.innerText = '';

      } else {
        controlContrasena.innerText = 'Debe contener letras, números y caracteres (.-_*#)';

      }
    } else {
      controlContrasena.innerText = 'La longitud debe estar entre 6 y 45 caracteres.';

    }
  });

  inputRepetirContrasena.addEventListener('keyup', function () {
    if (inputNuevaContrasena.value.trim() === inputRepetirContrasena.value.trim()) {
      controlRepetirContrasena.innerText = '';
      contrasenaOK = true;
    } else {
      controlRepetirContrasena.innerText = 'Las contraseñas no son iguales.';
      contrasenaOK = false;
    }
  });
});