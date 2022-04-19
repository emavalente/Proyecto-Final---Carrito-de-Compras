let listaCarrito = [];
let contador = 0;

const contenedor = document.getElementById('contProductos');
const modal = document.getElementById('contenidoCarrito');



// MOSTRAR PRODUCTOS EN PANTALLA: Recorro el array y por cada objeto pinto la card dentro del main html.
listaProductos.forEach(producto => {
    //Creo el elemento div para la card.
    const div = document.createElement('div');
    // Le asigno una clase 'product'
    div.classList.add('product');
    // inserto codigo html dentro de ese elemento div.
    div.innerHTML = `
    <div class="prod-image">
        <img src="${producto.imagen}" alt="imagen de ${producto.nombre}">
    </div>
    <div class="prod-details">
        <span>Popular</span>
        <h1>${producto.nombre}</h1>
        <p>${producto.tipo}</p>
        <p>${producto.desc}</p>
        <h4><i class="fas fa-dollar-sign">${producto.precio}</i></h4>
        <div>
            <button id="agregar${producto.id}" class="btn-agregar">Agregar al Carrito</button>
        </div>
    </div>
    `
    // asigno el div que cree como hijo del elemento 'contenedor' (contProducts).
    contenedor.appendChild(div);

    // Creo un evento para cada boton Agregar al Carrito.
    const btnAgregar = document.getElementById(`agregar${producto.id}`);
    btnAgregar.addEventListener('click', () => {
        // llamo a la función agregarAlCarrito.
        agregarAlCarrito(producto.id)
    });
});



// MOSTRAR Y OCULTAR EL MODAL:
const btnModal = document.getElementById('btn-carrito');
const ventanaModal = document.getElementById('modal');

btnModal.addEventListener('click', () => {
    ventanaModal.classList.toggle('modal-show'); // toggle intercambia entre clases.
});



//DECLARACION DE FUNCIONES.

// Creo una función agregarAlCarrito que busca el producto por su id y lo agrega al array del carrito.
const agregarAlCarrito = (id) => {
    // Recorre el array y trae el elemento que tenga un id que coincida con el id del producto seleccionado.
    let item = listaProductos.find((producto) => producto.id === id);
    // Si el elemento existe, solo cambia su cantidad sino agrega uno nuevo.
    if (listaCarrito.some((producto) => producto.id === item.id)) {
        item.cantidad += 1;
        actualizarCarrito();
    } else {
        // Agrega el item encontrado al array del carrito y sumo 1 a la cantidad del producto.
        listaCarrito.push(item);
        item.cantidad += 1;
        // Muestro el item en el modal.
        mostrarEnCarrito();
    };
    // Muestro la cantidad de productos.
    contadorCarrito();
};


// Creo una Funcion para mostrar los items que existen en el array del carrito dentro del modal.
const mostrarEnCarrito = () => {
    // Borro el modal para evitar duplicados.
    modal.innerHTML = ``;
    // Recorro el array listaCarrito y pinto cada elemento.
    listaCarrito.forEach((producto) => {
        const div = document.createElement('div');
        div.className = ('item-carrito');
        div.setAttribute("id", `item${producto.id}`); // setAttribute(type, value)
        div.innerHTML = `
                    <div class="img-item">
                        <img src="${producto.imagen}">
                    </div>
                    <div class="desc-item">
                        <p>${producto.nombre}</p>
                        <p>Precio: <i class="fas fa-dollar-sign">${producto.precio}</i></p>
                        <p>Cantidad: <span id="cantidad">${producto.cantidad}</span></p>
                    </div>
                    <div class="btn-item">
                        <button id= "btn-eliminar${producto.id}" class="btn-eliminar"><i class="far fa-minus-square"></i></button>
                    </div>
                `;

        contenidoCarrito.appendChild(div);
        console.log(div);

        // Le asigno un evento al boton eliminar de cada elemento.
        const btneliminar = document.getElementById(`btn-eliminar${producto.id}`);
        btneliminar.addEventListener('click', () => {
            console.log('Ingreso a la funcion eliminar');
            eliminarDelCarrito(producto.id);
        });
        console.log(listaCarrito.length - 1);
    });
};


// Creo una función eliminarDelCarrito que busca el producto por su id y lo elimina del array del carrito.
const eliminarDelCarrito = (id) => {
    let item = listaCarrito.find((producto) => producto.id === id);
    let indiceDeItem = listaCarrito.indexOf(item);
    // Si el producto tiene una cantidad mayor a 1 solo se resta -1 en su cantidad.
    if (item.cantidad > 1) {
        // resto -1 a la cantidad.
        item.cantidad -= 1;
        actualizarCarrito();
    } else {
        // reinicio la cantidad a 0 y elimino el item total indicado en el array del carrito.
        item.cantidad = 0;
        listaCarrito.splice(indiceDeItem, 1);
        const itemHtml = document.getElementById(`item${id}`);
        itemHtml.remove();
        actualizarCarrito();
    };
    // Muestro la cantidad de productos.
    contadorCarrito();
};


// Creo una funcion que actualiza el carrito de ser necesario.
const actualizarCarrito = () => {
    modal.innerHTML = ``;
    listaCarrito.forEach((producto) => {
        mostrarEnCarrito()
    });
};


// Creo una funcion que cuenta la cantidad de items agregados al carrito. ¡¡¡TODAVIA NO FUNCIONA!!!
const contadorCarrito = () => {
    const contadorItems = document.getElementById('contador');
    //Recorro el array del carrito y sumo todas las cantidades.
    contador = listaCarrito.reduce((acc, el) => acc + el.cantidad, 0);
    contadorItems.innerText = contador;
};