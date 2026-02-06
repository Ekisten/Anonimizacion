// Se obtiene el botón del documento HTML usando su id ("procesar")
// y se le añade un evento que escucha el clic del usuario.
// Cuando el botón es pulsado, se ejecuta la función llamada "procesar":
document.getElementById("procesar").addEventListener("click", procesar);

// Definición de la función "procesar", que se ejecuta al hacer clic en el botón:
function procesar() {

  // Se obtiene el valor (texto escrito) del elemento HTML con id "texto"
  // Normalmente será un textarea o un input de tipo texto:
  const texto = document.getElementById("texto").value;

  // Se obtiene el elemento HTML donde se mostrarán mensajes al usuario.
  // (por ejemplo, errores o confirmaciones):
  const mensaje = document.getElementById("mensaje");

  // Se comprueba si el texto está vacío o solo contiene espacios en blanco.
  // trim() elimina los espacios al inicio y al final del texto:
  if (texto.trim() === "") {

    // Si el texto está vacío, se muestra un mensaje de aviso al usuario:
    mensaje.innerText = "Introduce un texto";

    // return detiene la ejecución de la función para que no continúe:
    return;
  }

  // Se crea una variable llamada "resultado" que contendrá el texto anonimizado.
  // Se parte del texto original y se aplican sustituciones con expresiones regulares:
  let resultado = texto

    // Se sustituyen los DNIs españoles.
    // \b asegura que sea una palabra completa.
    // \d{8} busca exactamente 8 números.
    // [A-Z] busca una letra mayúscula.
    // g indica que se busquen todas las coincidencias:
    .replace(/\b\d{8}[A-Z]\b/g, "[DNI]")

    // Se sustituyen los números de teléfono móviles españoles.
    // Empiezan por 6, 7, 8 o 9 y tienen 9 cifras en total:
    .replace(/\b[6-9]\d{8}\b/g, "[TELEFONO]")

    // Se sustituyen los email tipo jose@example.es
    .replace(/\b[\w.-]+@[\w.-]+\.\w+\b/g, "[EMAIL]");

  // Se crea un objeto llamado "datos" que agrupa toda la información final:
  const datos = {

    // Se guarda el texto original sin modificar:
    original: texto,

    // Se guarda el texto anonimizado:
    anonimizado: resultado,

    // Se guarda la fecha y hora actual en formato ISO (estándar):
    fecha: new Date().toISOString()
  };

  // Se crea un objeto Blob que representa un archivo en memoria.
  // JSON.stringify convierte el objeto "datos" en texto JSON.
  // null y 2 sirven para que el JSON esté bien formateado (legible):
  const blob = new Blob(
    [JSON.stringify(datos, null, 2)],
    { type: "application/json" }
  );

  // Se genera una URL temporal que apunta al archivo Blob creado.
  // Esta URL permite descargar el archivo desde el navegador:
  const url = URL.createObjectURL(blob);

  // Se crea dinámicamente un elemento <a> (enlace):
  const enlace = document.createElement("a");

  // Se asigna la URL del archivo al atributo href del enlace:
  enlace.href = url;

  // Se indica el nombre con el que se descargará el archivo:
  enlace.download = "datos.json";

  // Se añade el enlace al cuerpo del documento (necesario para que funcione):
  document.body.appendChild(enlace);

  // Se simula un clic automático sobre el enlace.
  // Esto inicia la descarga del archivo sin intervención del usuario:
  enlace.click();

  // Se elimina el enlace del documento una vez usado:
  document.body.removeChild(enlace);

  // Se libera la memoria asociada a la URL temporal creada:
  URL.revokeObjectURL(url);

  // Se muestra un mensaje final indicando que el proceso ha terminado correctamente:
  mensaje.innerText = "Texto procesado y fichero descargado.";
}