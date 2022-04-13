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
        agregarAlCarrito(producto.id) // OJO ACA: Si paso la funcion sola sin la funcion flecha me da ERROR!. en CODER dan ejemplo de poner solo la llamada a la funcion
    });
});


// Creo una función agregarAlCarrito que busca el producto por su id y lo agrega al array del carrito.
const agregarAlCarrito = (id) => {
    const item = listaProductos.find((producto) => producto.id === id);

    // agrega el item encontrado al array del carrito.
    listaCarrito.push(item);
    console.log(listaCarrito);
    // muestro el item en el modal.
    mostrarEnCarrito();
    console.log(listaCarrito);

    // cuento la cantidad de items del carrito. ¡¡¡NO FUNCIONA!!!
    contador = listaCarrito.reduce((acc, el) => acc + el.cantidad, 0);
    contadorItems.innerText = contador;
};

// Creo una función eliminarDelCarrito que busca el producto por su id y lo elimina del array del carrito.
// const eliminarDelCarrito = (id) => {
//     const item = listaCarrito.find((producto) => producto.id === id);
//     const indice = listaCarrito.indexOf(item)

//     // elimino el item encontrado del array del carrito.
//     listaCarrito.splice(indice, 1)
//     console.log(listaCarrito);
// };


// Creo una Funcion para mostrar los items que existen en el array del carrito dentro del modal.
const mostrarEnCarrito = () => {
    // Creo un elemento div con el Producto y su info dentro.

    const div = document.createElement('div');
    div.className = ('item-carrito');
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
                <button id= "btn-eliminar${listaCarrito.indexOf(listaCarrito[listaCarrito.length - 1])}" class="btn-eliminar"><i class="far fa-minus-square"></i></button>
            </div>
        `
    contenidoCarrito.appendChild(div);
    console.log(listaCarrito.indexOf(listaCarrito[listaCarrito.length - 1]));

    // Le asigno un evento para el boton eliminar del producto creado.
    const btneliminar = document.getElementById('btn-eliminar${listaCarrito.indexOf(listaCarrito[listaCarrito.length - 1])}');
    console.log(btneliminar);
    // btneliminar.addEventListener('click', () => {
    //     console.log('SE ELIMINO EL ITEM')
    // });
    console.log(modal);
};
// };


// MOSTRAR Y OCULTAR EL MODAL:
const btnModal = document.getElementById('btn-carrito');
const ventanaModal = document.getElementById('modal');

btnModal.addEventListener('click', () => {
    ventanaModal.classList.toggle('modal-show');
});