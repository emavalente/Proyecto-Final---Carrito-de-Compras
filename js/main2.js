let listaCarrito = [];
let contador = 0;

const contenedor = document.getElementById('contProductos');
const modal = document.getElementById('contenidoCarrito');
const contadorItems = document.getElementById('contador');


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
        agregarAlCarrito(producto.id) // OJO ACA: Si paso la funcion sola sin la funcion flecha me da ERROR!. en CODER dan ejemplo de poner solo la llamada a la funcion
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
    // Recorre el array y trae el elemento que coincida con el id del producto seleccionado.
    let item = listaProductos.find((producto) => producto.id === id);
    // Si el elemento existe solo cambia su cantidad sino agrega uno nuevo.
    if (listaCarrito.some((producto) => producto.id === item.id)) {
        item.cantidad += 1;
    } else {
        // Agrega el item encontrado al array del carrito y sumo 1 a la cantidad del producto.
        listaCarrito.push(item);
        item.cantidad += 1;
        // Muestro el item en el modal.
        mostrarEnCarrito();
    };
    console.log(listaCarrito);
};


// Creo una Funcion para mostrar los items que existen en el array del carrito dentro del modal.
const mostrarEnCarrito = () => {
    // Creo un elemento div con el Producto y su info dentro.
    const div = document.createElement('div');
    div.className = ('item-carrito');
    div.setAttribute("id", `${listaCarrito.length - 1}`); // setAttribute(type, value)
    div.innerHTML = `
                    <div class="img-item">
                        <img src="${listaCarrito[listaCarrito.length - 1].imagen}">
                    </div>
                    <div class="desc-item">
                        <p>${listaCarrito[listaCarrito.length - 1].nombre}</p>
                        <p>Precio: <i class="fas fa-dollar-sign">${listaCarrito[listaCarrito.length - 1].precio}</i></p>
                        <p>Cantidad: <span id="cantidad">${listaCarrito[listaCarrito.length - 1].cantidad}</span></p>
                    </div>
                    <div class="btn-item">
                        <button id= "btn-eliminar${listaCarrito.length - 1}" class="btn-eliminar"><i class="far fa-minus-square"></i></button>
                    </div>
                `;

    contenidoCarrito.appendChild(div);
    console.log(div);

    // Le asigno un evento al boton eliminar del producto creado.
    const btneliminar = document.getElementById(`btn-eliminar${listaCarrito.length - 1}`);
    console.log(btneliminar);
    btneliminar.addEventListener('click', () => {
        console.log(listaCarrito.length);
        eliminarDelCarrito(listaCarrito.length - 1);
        console.log(listaCarrito.length);
        console.log(listaCarrito);
    });
};


// Creo una función eliminarDelCarrito que busca el producto por su id y lo elimina del array del carrito.

const eliminarDelCarrito = (indice) => {
    console.log(indice);
    // Si el producto tiene mas de una cantidad solo se resta -1 en su cantidad. Sino se elimina todo el item.
    if (listaCarrito[indice].cantidad === 1) {
        // reinicio la cantidad a 0 y elimino el item encontrado del array del carrito.
        listaCarrito[indice].cantidad = 0;
        listaCarrito.splice(indice, 1);
        const item = document.getElementById(indice.toString());
        item.remove();
        console.log(item); // El valor que devuelve sigue siendo el elemento item, me lo borro?
    } else {
        // resto -1 a la cantidad.
        listaCarrito[indice].cantidad -= 1;
    };
    contenidoCarrito.innerHTML = ``;
    actualizarCarrito();
    console.log(listaCarrito);
};


// Creo una funcion que actualiza el carrito de ser necesario. EN PRUEBA!!
const actualizarCarrito = () => {
    listaCarrito.forEach(() => {
        mostrarEnCarrito();
    });
};


// cuento la cantidad de items del carrito. ¡¡¡TODAVIA NO FUNCIONA!!!
// contador = listaCarrito.reduce((acc, el) => acc + el.cantidad, 0);
// contadorItems.innerText = contador;