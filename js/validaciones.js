const NUMEROS = '0123456789';
const LETRAS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ';
const CARACTERESRAROS = '!¡"·#@$%&¬/()=?¿ ';//Contiene espacio
const CARACTERESPASS = '.-_*#';
const CARACTERESEMPRESA = 'ºª!><·$%&/()=?¿|@#~¬¡`+^*¨[]{}-_';
const VALIDACIONEXCEL = '%oX^oRCN2eWoCmR61RlqDi4OUxni^0';

function validarLongitud(cadenaDeTexto, longitudMinima, longitudMaxima) {
  let resultadoDeLaValidacion = false;

  if (cadenaDeTexto.length > longitudMinima && cadenaDeTexto.length < longitudMaxima) {
    resultadoDeLaValidacion = true;
  }

  return resultadoDeLaValidacion;
}

/*
* buscarEnCadena: Paso un texto y una biblioteca en la que buscar
* Si encuentro en caractes, devuelvo true.
*/

function buscarEnCadena(cadenaDeTexto, biblioteca) {
  let resultadoDeLaValidacion = false;
  let salir = false;
  let iteradorBusquedas = 0;

  while (!salir) {//Buscar caracteres
    if (cadenaDeTexto.includes(biblioteca.charAt(iteradorBusquedas))) {
      salir = true;
      resultadoDeLaValidacion = true;
    } else if (iteradorBusquedas == biblioteca.length - 1) {
      salir = true;
    } else {
      iteradorBusquedas++;
    }
  }

  return resultadoDeLaValidacion;
}

function validarUsuario(cadenaTexto) {//valida un nombre, solo restringe números y caracteres raros.
  let resultadoDeLaValidacion = false;

  if (cadenaTexto != '') {
    if (!buscarEnCadena(cadenaTexto, CARACTERESRAROS)) {//Si no encuentra caracteres raros
      resultadoDeLaValidacion = true;
    } else {
      resultadoDeLaValidacion = false;
    }
  }

  return resultadoDeLaValidacion;
}

function validarNombres(cadenaTexto) {
  let resultadoDeLaValidacion = true;
  let noEncontrado = true;
  let iteradorBusquedas = 0;

  while (noEncontrado) {
    if (!LETRAS.includes(cadenaTexto.charAt(iteradorBusquedas).toUpperCase()) && cadenaTexto.charAt(iteradorBusquedas) != ' ') {
      noEncontrado = false;
      resultadoDeLaValidacion = false;
    } else if (iteradorBusquedas == LETRAS.length - 1) {
      noEncontrado = false;
    } else {
      iteradorBusquedas++;
    }
  }

  return resultadoDeLaValidacion;
}

function validarDni(dni) {
  const DIGITOCONTROL = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
  let resultadoDeLaValidacion = false;
  let digitos;
  let letra;

  if (dni.length === 9) { //Longitud
    digitos = dni.slice(0, dni.length - 1);
    letra = dni.slice(8).toUpperCase();

    if (!isNaN(digitos)) {
      if (DIGITOCONTROL[digitos % 23] === letra) {
        resultadoDeLaValidacion = true;
      }
    }
  }

  return resultadoDeLaValidacion;
}

function validarEmail(email) {
  let resultadoDeLaValidacion = false;
  let auxiliar = '';

  if (!email.includes(' ')) {//Si no contiene espacios
    auxiliar = email.indexOf('@');

    if (auxiliar != -1) {//Si se encuentra @
      if (email.charAt(auxiliar + 1) != '.') {//El caracter despues de la @ no puede ser punto
        if (auxiliar > 1 && auxiliar < (email.length - 3)) {//Si la posición esta en un valor válido
          if (email.charAt(email.length - 3) === '.' || email.charAt(email.length - 4) === '.') {//Si la posición del . es correcta
            resultadoDeLaValidacion = true;
          }
        }
      }
    }
  }

  return resultadoDeLaValidacion;
}

function validarPass(pass) {
  let resultadoDeLaValidacion = false;

  if (!pass.includes(' ')) {//Sin espacios
    if (buscarEnCadena(pass.toUpperCase(), LETRAS)) {//Con letra
      if (buscarEnCadena(pass, NUMEROS)) {//Con número
        if (buscarEnCadena(pass, CARACTERESPASS)) {//Con ciertos caracteres
          resultadoDeLaValidacion = true;
        }
      }
    }
  }

  return resultadoDeLaValidacion;
}

function validarCif(cif) {
  let cifCorrecto = false;
  let digitos = [cif.charAt(1) * 2, cif.charAt(2), cif.charAt(3) * 2, cif.charAt(4), cif.charAt(5) * 2, cif.charAt(6), cif.charAt(7) * 2,]
  let sumaPosiciones = 0;
  let digitoControl;
  let auxiliar;
  let primerDigito;
  let segundoDigito;

  for (let i = 0; i < digitos.length; i++) {
    if (digitos[i].toString().length == 2) {
      primerDigito = digitos[i].toString().charAt(0);
      segundoDigito = digitos[i].toString().charAt(1);

      auxiliar = parseInt(primerDigito) + parseInt(segundoDigito);
      sumaPosiciones += auxiliar
    } else {
      sumaPosiciones += parseInt(digitos[i]);
    }
  }

  digitoControl = sumaPosiciones.toString().charAt(sumaPosiciones.toString().length - 1)
  digitoControl = 10 - digitoControl;

  if (cif.charAt(cif.length - 1) == digitoControl) {
    cifCorrecto = true;
  }

  return cifCorrecto;
}

function validarNombreEmpresa(razonSocial) {
  let resultadoDeLaValidacion = false;

  if (!buscarEnCadena(razonSocial, CARACTERESEMPRESA)) {//Si no encuentra caracteres raros
    resultadoDeLaValidacion = true;
  } else {
    resultadoDeLaValidacion = false;
  }

  return resultadoDeLaValidacion;
}

function validarNumero(valor) {
  let numeroCorrecto = true;

  console.log(valor)

  if (!buscarEnCadena(valor.toString(), NUMEROS)) {
    numeroCorrecto = false;
  }

  return numeroCorrecto;
}

function validarNumeroBalance(numero) {
  let resultadoDeLaValidacion = false;

  if (!isNaN(numero)) {
    resultadoDeLaValidacion = true;
  }

  return resultadoDeLaValidacion;
}

function validarExcel(clave) {
  let autenticacion = false;

  if (clave == VALIDACIONEXCEL) {
    autenticacion = true;
  }

  return autenticacion;
}