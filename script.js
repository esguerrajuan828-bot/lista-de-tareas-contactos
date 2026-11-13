// Seleccionamos los elementos del HTML por su ID
const inputTarea = document.getElementById('inputTarea');
const btnAgregar = document.getElementById('btnAgregar');
const listaTareas = document.getElementById('listaTareas');
const spanPendientes = document.getElementById('pendientes');
const spanCompletadas = document.getElementById('completadas');

// Traemos las tareas guardadas en localStorage o creamos un arreglo vacío
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

// Función para guardar el arreglo en localStorage
function guardarDatos() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Función para dibujar todas las tareas en pantalla
function mostrarTareas() {
    listaTareas.innerHTML = '';

    let contadorPendientes = 0;
    let contadorCompletadas = 0;

    for (let i = 0; i < tareas.length; i++) {
        const tarea = tareas[i];

        // Contamos pendientes y completadas (en la foto "pendientes" muestra el total)
        contadorPendientes++;
        if (tarea.completada === true) {
            contadorCompletadas++;
        }

        // Creamos el elemento <li>
        const li = document.createElement('li');
        li.classList.add('item-tarea');

        // Creamos la parte izquierda (checkbox + texto)
        const divInfo = document.createElement('div');
        divInfo.classList.add('info-tarea');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarea.completada;

        const texto = document.createElement('span');
        texto.textContent = tarea.texto;
        if (tarea.completada === true) {
            texto.classList.add('tachado');
        }

        // Evento cuando se marca o desmarca el checkbox
        checkbox.addEventListener('change', function () {
            tareas[i].completada = checkbox.checked;
            guardarDatos();
            mostrarTareas();
        });

        // Creamos el botón de la papelera
        const btnBorrar = document.createElement('button');
        btnBorrar.textContent = '🗑️';
        btnBorrar.classList.add('btn-borrar');

        // Evento cuando se hace clic en borrar
        btnBorrar.addEventListener('click', function () {
            tareas.splice(i, 1);
            guardarDatos();
            mostrarTareas();
        });

        // Metemos todo dentro del <li> y luego dentro del <ul>
        divInfo.appendChild(checkbox);
        divInfo.appendChild(texto);
        li.appendChild(divInfo);
        li.appendChild(btnBorrar);
        listaTareas.appendChild(li);
    }

    // Actualizamos los números de abajo
    spanPendientes.textContent = contadorPendientes;
    spanCompletadas.textContent = contadorCompletadas;
}

// Función para agregar una nueva tarea
function agregarTarea() {
    const textoEscrito = inputTarea.value.trim();

    if (textoEscrito === '') {
        alert('Por favor escribe una tarea');
        return;
    }

    // Agregamos el objeto al arreglo
    tareas.push({
        texto: textoEscrito,
        completada: false
    });

    inputTarea.value = '';
    guardarDatos();
    mostrarTareas();
}

// Evento al hacer clic en el botón +
btnAgregar.addEventListener('click', agregarTarea);

// Evento extra: permitir agregar presionando la tecla Enter
inputTarea.addEventListener('keypress', function (evento) {
    if (evento.key === 'Enter') {
        agregarTarea();
    }
});

// Mostramos las tareas apenas abre la página
mostrarTareas();