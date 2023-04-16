const URLLOGIN = '../php/login.php';
const COMPROBARUSUARIO = '../php/comprobarUsuario.php';

document.addEventListener('DOMContentLoaded', function () {
  let formulario = document.getElementById('formularioLogin');
  let notificaciones = document.getElementById('notificaciones');
  let datosFormulario;

  //Si no hemos cerrado la sesión, redirigir al portal
  fetch(COMPROBARUSUARIO)
    .then(revisar => revisar.json())
    .then(respuesta => {
      if (respuesta) {
        this.location.href = 'http://localhost/communityRiskAnalytics/pages/portalUsuario.html';
      }
    });

  formulario.addEventListener('submit', function (evento) {//Comprobar datos
    datosFormulario = new FormData(formulario);

    evento.preventDefault();

    queryPHP(URLLOGIN, 'POST', datosFormulario)
      .then(respuesta => {
        if (respuesta) {//Credenciales incorrectas
          location.href = 'http://localhost/communityRiskAnalytics/pages/portalUsuario.html';
        } else {
          notificaciones.appendChild(alertaError('errorCredenciales', 'Usuario o contraseña incorrectos.'));

          setTimeout(() => {//Cerrar mensaje a los 5 segundo
            eliminarComponente('errorCredenciales');
          }, 5000);
        }
      })
  });
});