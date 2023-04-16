const URLCREARCUENTAPHP = '../php/crearCuenta.php';
const URLCOMPROBARUSUARIO = '../php/comprobarUsuario.php';

document.addEventListener('DOMContentLoaded', function () {
  let formulario = document.getElementById('formularioCrearCuenta');
  let contenedorFormulario = document.getElementById('contenedorFormulario');
  let tituloFormulario = document.getElementById('tituloFormulario');
  let alertas = document.getElementById('notificaciones');
  let usuario = document.getElementById('usuario');
  let nombre = document.getElementById('nombre');
  let apellido = document.getElementById('apellido');
  let dni = document.getElementById('dni');
  let email = document.getElementById('email');
  let pass = document.getElementById('pass');
  let confirmPass = document.getElementById('repeatPass');
  let notificacionUsuario = document.getElementById('controlUsuario');
  let notificacionNombre = document.getElementById('controlNombre');
  let notificacionApellido = document.getElementById('controlApellido');
  let notificacionDni = document.getElementById('controlDni');
  let notificacionEmail = document.getElementById('controlEmail');
  let notificacionPass = document.getElementById('controlPass');
  let notificacionConfirmPass = document.getElementById('controlRepeatPass');
  let usuarioOK = false;
  let nombreOK = false;
  let apellidoOK = false;
  let dniOK = false;
  let emailOK = false;
  let passOK = false;
  let confirmPassOK = false;

  /*
  * LISTENERS
  */

  usuario.addEventListener('keyup', function () {
    /*
    * Revisión de usuario, validación longitud y caracteres raros
    */

    usuario.value = usuario.value.trim();

    if (validarLongitud(usuario.value, 4, 45)) {
      notificacionUsuario.innerText = ''; //Elimino el mensaje de control.

      if (validarUsuario(usuario.value)) {
        usuarioOK = true;
        notificacionUsuario.innerText = '';

      } else {
        usuarioOK = false;
        notificacionUsuario.innerText = 'Contiene caracteres no válidos.';

      }
    } else {
      usuarioOK = false;
      notificacionUsuario.innerText = 'Longitud no válida';

    }
  });

  nombre.addEventListener('keyup', function () {
    /*
    * Revisión de nombre, validación longitud y letras
    */

    if (validarLongitud(nombre.value, 1, 45)) {
      notificacionNombre.innerText = '';

      if (validarNombres(nombre.value)) {
        nombreOK = true;
        notificacionNombre.innerText = '';

      } else {
        nombreOK = false;
        notificacionNombre.innerText = 'Contiene caracteres no válidos';

      }
    } else {
      nombreOK = false;
      notificacionNombre.innerText = 'Longitud no válida';

    }
  });

  nombre.addEventListener('blur', function () {
    //Eliminar espacios al cambia de campo
    nombre.value = nombre.value.trim();
  });

  apellido.addEventListener('keyup', function () {
    /*
    * Revisión de apellido, validación longitud y letras
    */

    if (validarLongitud(apellido.value, 1, 45)) {
      notificacionApellido.innerText = '';

      if (validarNombres(apellido.value)) {
        apellidoOK = true;
        notificacionApellido.innerText = '';

      } else {
        apellidoOK = false;
        notificacionApellido.innerText = 'Contiene caracteres no válidos';

      }
    } else {
      apellidoOK = false;
      notificacionApellido.innerText = 'Longitud no válida';

    }
  });

  apellido.addEventListener('blur', function () {
    //Eliminar espacios al cambia de campo
    apellido.value = apellido.value.trim();
  });

  dni.addEventListener('keyup', function () {
    dni.value = dni.value.trim();

    if (validarDni(dni.value)) {
      dniOK = true;
      notificacionDni.innerText = '';

    } else {
      dniOK = false;
      notificacionDni.innerText = 'DNI no válido. Formato: ########X';

    }
  });

  email.addEventListener('keyup', function () {
    email.value = email.value.trim();

    if (validarLongitud(email.value, 7, 45)) {//Minima longitud --@-.es (7)
      notificacionEmail.innerText = '';

      if (validarEmail(email.value)) {
        notificacionEmail.innerText = '';
        emailOK = true;
      } else {
        notificacionEmail.innerText = 'Email no válido.';
      }

    } else {
      emailOK = false;
      notificacionEmail.innerText = 'Email no válido.'

    }
  });

  pass.addEventListener('keyup', function () {
    pass.value = pass.value.trim();

    if (validarLongitud(pass.value, 5, 45)) {
      if (validarPass(pass.value)) {
        passOK = true;
        notificacionPass.innerText = '';

      } else {
        passOK = false;
        notificacionPass.innerText = 'Debe contener letras, números y caracteres (.-_*#)';

      }
    } else {
      passOK = false;
      notificacionPass.innerText = 'La longitud debe estar entre 6 y 45 caracteres.';

    }
  });

  confirmPass.addEventListener('keyup', function () {
    if (pass.value === confirmPass.value) {
      confirmPassOK = true;
      notificacionConfirmPass.innerText = '';

    } else {
      confirmPassOK = false;
      notificacionConfirmPass.innerText = 'Las contraseñas deben ser iguales.';

    }
  });

  formulario.addEventListener('submit', validaciones);

  /*
  * FUNCIONES
  */

  function validaciones(evento) {
    evento.preventDefault();

    let datosFormulario = new FormData(formulario);//Crea un objeto con los valores del atributo name

    //Añado un componente de tipo spinner y quito el formulario
    contenedorFormulario.append(spinner('cargaFormulario'));
    formulario.style.display = 'none';
    tituloFormulario.innerText = 'Cargando...';

    //Si todas las validaciones son correctes se envia una query a PHP
    if (usuarioOK === true && nombreOK && apellidoOK && dniOK && emailOK && passOK && confirmPassOK) {
      //Para evitar que se mande el formulario si todas son false, añado el === true en una de las variables

      queryPHP(URLCREARCUENTAPHP, 'POST', datosFormulario)
        .then(respuesta => {
          if (respuesta) {
            eliminarComponente('cargaFormulario');
            formulario.style.display = 'block';
            tituloFormulario.innerText = 'Nuevo usuario';
            alertas.appendChild(alerta('nuevoUsuario', 'Nuevo usuario creado!')); //Mensaje de creación de cuenta

            //Reset de los inputs
            document.getElementById('usuario').value = '';
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('dni').value = '';
            document.getElementById('email').value = '';
            document.getElementById('pass').value = '';
            document.getElementById('repeatPass').value = '';

            setTimeout(() => { //Eliminar mensaje a los 5 segundos
              eliminarComponente('nuevoUsuario');
            }, 6500);

          } else {
            eliminarComponente('cargaFormulario');
            formulario.style.display = 'block';
            tituloFormulario.innerText = 'Nuevo usuario';
            notificacionUsuario.innerText = 'Cuenta ya existente, pruebe con otra.';

            setTimeout(() => {
              notificacionUsuario.innerText = '';
            }, 5000);
          }
        });
    } else {
      alertas.appendChild(alertaError('errorUsuario', 'Comprobar formulario'));
      formulario.style.display = 'block';
      tituloFormulario.innerText = 'Nuevo usuario.';
      eliminarComponente('cargaFormulario');

      setTimeout(() => { //Eliminar mensaje a los 6,5 segundos
        eliminarComponente('errorUsuario');
      }, 6500);

    }
  }
});
