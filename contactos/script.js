// 1. Seleccionar los elementos del DOM por su ID
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputTelefono = document.getElementById('telefono');
const inputCiudad = document.getElementById('ciudad');
const inputDireccion = document.getElementById('direccion');
const radioFemale = document.getElementById('radioFemale');
const radioMale = document.getElementById('radioMale');
const btnAgregar = document.getElementById('btnAgregar');
const listaContactos = document.getElementById('listaContactos');

// 2. Traer los datos de localStorage (el profe usó la clave "contacts" en clase)
let contactos = JSON.parse(localStorage.getItem('contacts')) || [];

// Variable para saber si estamos agregando (-1) o editando un contacto existente
let indiceEditar = -1;

// 3. Función para guardar el arreglo en localStorage
function guardarDatos() {
    localStorage.setItem('contacts', JSON.stringify(contactos));
}

// 4. Función para dibujar los contactos en la pantalla
function mostrarContactos() {
    listaContactos.innerHTML = '';

    for (let i = 0; i < contactos.length; i++) {
        const c = contactos[i];

        const li = document.createElement('li');
        li.classList.add('item-contacto');

        // Elegir el emoji según el género guardado
        let icono = '👱‍♀️';
        if (c.genero === 'male') {
            icono = '👱‍♂️';
        }

        // Texto con los datos como sale en la imagen del profesor
        const spanTexto = document.createElement('span');
        spanTexto.classList.add('texto-contacto');
        spanTexto.textContent = icono + ' ' + c.nombre + ' ' + c.apellido + ' - ' + c.ciudad + ' (' + c.telefono + ')';

        // Contenedor para los botones de papelera y lápiz
        const divBotones = document.createElement('div');
        divBotones.classList.add('botones-accion');

        // Botón de eliminar (Papelera)
        const btnBorrar = document.createElement('button');
        btnBorrar.textContent = '🗑️';
        btnBorrar.classList.add('btn-icono');
        btnBorrar.addEventListener('click', function () {
            contactos.splice(i, 1);
            guardarDatos();
            mostrarContactos();
        });

        // Botón de editar (Lápiz)
        const btnEditar = document.createElement('button');
        btnEditar.textContent = '✏️';
        btnEditar.classList.add('btn-icono');
        btnEditar.addEventListener('click', function () {
            // Subimos los datos del contacto a los inputs para poder editarlos
            inputNombre.value = c.nombre;
            inputApellido.value = c.apellido;
            inputTelefono.value = c.telefono;
            inputCiudad.value = c.ciudad;
            inputDireccion.value = c.direccion;

            if (c.genero === 'female') {
                radioFemale.checked = true;
            } else {
                radioMale.checked = true;
            }

            indiceEditar = i;
            btnAgregar.textContent = 'UPDATE';
        });

        // Agregar botones e información a la lista
        divBotones.appendChild(btnBorrar);
        divBotones.appendChild(btnEditar);
        li.appendChild(spanTexto);
        li.appendChild(divBotones);
        listaContactos.appendChild(li);
    }
}

// 5. Función para agregar o actualizar cuando se presiona el botón
function guardarContacto() {
    const nombre = inputNombre.value.trim();
    const apellido = inputApellido.value.trim();
    const telefono = inputTelefono.value.trim();
    const ciudad = inputCiudad.value.trim();
    const direccion = inputDireccion.value.trim();

    if (nombre === '' || apellido === '' || telefono === '' || ciudad === '') {
        alert('Por favor llena los datos del contacto');
        return;
    }

    let generoSeleccionado = 'female';
    if (radioMale.checked === true) {
        generoSeleccionado = 'male';
    }

    const nuevoContacto = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        ciudad: ciudad,
        direccion: direccion,
        genero: generoSeleccionado
    };

    if (indiceEditar === -1) {
        // Si no estamos editando, agregamos uno nuevo
        contactos.push(nuevoContacto);
    } else {
        // Si estamos editando, reemplazamos el que estaba en esa posición
        contactos[indiceEditar] = nuevoContacto;
        indiceEditar = -1;
        btnAgregar.textContent = 'ADD';
    }

    // Limpiar las cajas de texto
    inputNombre.value = '';
    inputApellido.value = '';
    inputTelefono.value = '';
    inputCiudad.value = '';
    inputDireccion.value = '';
    radioFemale.checked = true;

    guardarDatos();
    mostrarContactos();
}

// Evento click en el botón principal
btnAgregar.addEventListener('click', guardarContacto);

// Mostrar los contactos guardados apenas cargue la página
mostrarContactos();
