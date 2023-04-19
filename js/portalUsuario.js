const URLPORTALUSUARIO = '../php/portalUsuario.php';
const COMPROBAREMPRESA = '../php/comprobarEmpresa.php';
const URLBORRADOESTADO = '../php/borrarEstado.php';
const URLBORRARCUENTA = '../php/borrarUsuario.php';
const URLBORRAREMPRESA = '../php/borrarEmpresa.php';
const URLCERRARSESION = '../php/cerrarSesion.php';
const COMPROBARUSUARIO = '../php/comprobarUsuario.php';

document.addEventListener('DOMContentLoaded', function () {
  let seccionEmpresas = document.getElementById('empresas');
  let botonNuevaEmpresa = document.getElementById('nuevaEmpresa');
  let botonNuevoEstado = document.getElementById('nuevoEstado');
  let botonModal;
  let botonEliminar = document.createElement('button');
  let botonEliminarCuenta = document.getElementById('botonEliminarCuenta');
  let botonEliminarEmpresa = document.getElementById('botonEliminarEmpresa');
  let contenedorEspera = document.getElementById('vistaEspera');
  let contenedorPrincipal = document.getElementById('contenidoPrincipal');
  let botonCerrarSesion = document.getElementById('cerrarSesion');
  let botonSalir = document.getElementById('enlaceSalir');

  contenedorEspera.appendChild(spinner('spinnerEspera'));

  /*
  * El siguient fetc revisa que el usuario este logeado mendiante la revisión
  * de la variable de session en PHP. Si no hay sesión activa, devuelve al index.
  */
  fetch(COMPROBARUSUARIO)
    .then(revisar => revisar.json())
    .then(respuesta => {
      if (!respuesta) {
        this.location.href = 'http://localhost/communityRiskAnalytics/';

      } else {
        /*
          * El siguiente fetch revisa que la cuenta tenga o no una empresa asociada.
          * Si la tiene quita el boton de añadir empresa y habilita el de añadir estados.
          */
        fetch(COMPROBAREMPRESA)
          .then(respuesta => respuesta.json())
          .then(empresaExistente => {
            if (empresaExistente) {
              botonNuevaEmpresa.classList.add('disabled');
              botonNuevoEstado.classList.remove('disabled');
            }
          })
          .catch(() => console.info('Este usuario no tiene balances o empresas asociadas.'));

        /*
        * El siguiente fetch busca cada estado de la empresa asociada a la cuenta.
        * Por cada estado crea un modal con los datos del balance y los añade a la página.
        * Despues crea una tarjeta con datos de ese balance y un boton que abre el modal.
        * 
        * En este caso hay ciertos ids que no son necesarios ya que no vamos a eliminar los
        * componentes por tiempo o manualmente.
        */
        fetch(URLPORTALUSUARIO)
          .then(respuesta => respuesta.json())
          .then(datos => {
            /*
            * datos devuelve un array con al menos 2 arrays dentro:
            * El primero SIEMPRE serán los datos de la empresa.
            * Del segundo en adelante son los estados que tengamos añadidos
            */
            for (let i = 1; i < datos.length; i++) {
              //Empieza en 1 porque la posición 0 son los datos de la empresa.
              //Se crea el boton del eliminar
              botonEliminar = document.createElement('button');
              botonEliminar.className = 'btn btn-outline-danger mx-3';
              botonEliminar.innerText = 'Eliminar';

              //Añadimos a la seccion un formulario que invisible que contiene los datos de id para borrado.
              seccionEmpresas.appendChild(formularioInvisibleParaBorradoPorID(`formulario${datos[i][0]}`, 'idEstado', `${datos[i][0]}`));

              //Añado la funcion para eliminar los datos del balance
              botonEliminar.addEventListener('click', function () {
                let nodoFormulario = document.getElementById(`formulario${datos[i][0]}`);
                let datosFormulario = new FormData(nodoFormulario);

                //ESTARIA BIEN CREAR UN MODAL QUE PREGUNTE SI ESTAMOS SEGUROS
                queryPHP(URLBORRADOESTADO, 'POST', datosFormulario)
                  .then(respuesta => {
                    if (respuesta) {
                      location.reload();
                    }
                  })
                  .catch(() => console.log('Error en el envio de datos.'));
              });

              //Añadir el modal
              seccionEmpresas.appendChild(modal(`modal${i}`, `${datos[0][1]} - ${datos[i][1]}`, crearDivConAnalisis(datos[i])));

              //Añadir el boton que abre el modal
              botonModal = botonParaAbrirModal(i, `modal${i}`, 'Abrir');

              //Crea la tarjeta y pone dentro los componentes
              seccionEmpresas.appendChild(tarjeta(`${i}${datos[0][0]}`, `${datos[0][1]} - ${datos[i][1]}`, datos[i][2], botonModal));

              //Ponemos el boton de eliminar dentro de la tarjeta
              document.getElementsByClassName('card-body')[i - 1].appendChild(botonEliminar);
            }

            eliminarComponente('spinnerEspera');
            contenedorPrincipal.style.display = 'flex';

          })
          .catch(() => {
            eliminarComponente('spinnerEspera');
            contenedorPrincipal.style.display = 'flex';

            console.log("No hay estados asociados.");
          });

        //Este listener desencadena el borrado de todos los datos del usuario
        botonEliminarCuenta.addEventListener('click', function () {
          fetch(URLBORRARCUENTA)
            .then(respuesta => respuesta.json())
            .then(estado => {
              if (estado) {
                location.href = 'http://localhost/communityRiskAnalytics/';
              } else {
                seccionEmpresas.appendChild(alertaError('errorCuenta', 'No se ha podido eliminar la cuenta.'));
                eliminarComponentePorTiempo('errorCuenta', 3000);
              }
            })
            .catch(() => console.log('Error en base de datos.'));
        });

        botonEliminarEmpresa.addEventListener('click', function () {
          fetch(URLBORRAREMPRESA)
            .then(respuesta => respuesta.json())
            .then(estado => {
              if (estado) {
                location.reload();
              } else {
                seccionEmpresas.appendChild(alertaError('errorCuenta', 'No se ha podido eliminar la cuenta.'));
                eliminarComponentePorTiempo('errorCuenta', 3000);
              }
            })
            .catch(() => console.log('Error en base de datos.'));
        });

        botonCerrarSesion.addEventListener('click', function () {
          fetch(URLCERRARSESION)
            .then(envio => envio.json())
            .then(respuesta => {
              if (respuesta) {
                location.href = 'http://localhost/communityRiskAnalytics/';
              } else {
                seccionEmpresas.appendChild(alertaError('cierreSesion', 'En este momento no puede cerrarse la sesión.'));
              }
            });
        });

        botonSalir.addEventListener('click', function () {
          fetch(URLCERRARSESION)
            .then(envio => envio.json())
            .then(respuesta => {
              if (respuesta) {
                location.href = 'http://localhost/communityRiskAnalytics/';
              } else {
                seccionEmpresas.appendChild(alertaError('cierreSesion', 'En este momento no puede cerrarse la sesión.'));
              }
            });
        });
      }
    });
});
