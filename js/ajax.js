/*
* Función de envio de datos a la base de datos
*/

function queryPHP(URLdocumentoPHP, metodo, formulario) {
  //Devuelve un booleano del documento PHP indicado,
  return new Promise((resolve) => {

    fetch(URLdocumentoPHP, { method: metodo, body: formulario })
      .then(respuesta => respuesta.json())
      .then(respuestaDePHP => {
        resolve(respuestaDePHP);
      })
      .catch(() => {
        console.log('Error en el envío ajax. Consultar ajax.js');
      });
  });
}